/**
 * EMR (Electronic Medical Record) Integration Service
 * Supports HL7 v2.x and FHIR R4 standards
 * Compatible with major Korean HIS (Hospital Information Systems)
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { logger } from '../utils/logger';

// ==================== Types & Interfaces ====================

export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier: Array<{
    system: string;
    value: string;
  }>;
  name: Array<{
    use: string;
    family: string;
    given: string[];
  }>;
  gender: 'male' | 'female' | 'other' | 'unknown';
  birthDate: string;
  address: Array<{
    use: string;
    text: string;
    city?: string;
    district?: string;
    postalCode?: string;
  }>;
  telecom?: Array<{
    system: 'phone' | 'email';
    value: string;
    use: string;
  }>;
}

export interface FHIREncounter {
  resourceType: 'Encounter';
  id: string;
  status: 'planned' | 'arrived' | 'in-progress' | 'finished' | 'cancelled';
  class: {
    system: string;
    code: string;
    display: string;
  };
  subject: {
    reference: string;
  };
  period: {
    start: string;
    end?: string;
  };
  diagnosis?: Array<{
    condition: {
      reference: string;
      display: string;
    };
    use?: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    };
  }>;
}

export interface FHIRMedicationRequest {
  resourceType: 'MedicationRequest';
  id: string;
  status: 'active' | 'on-hold' | 'cancelled' | 'completed';
  intent: 'proposal' | 'plan' | 'order' | 'instance-order';
  medicationCodeableConcept: {
    coding: Array<{
      system: string;
      code: string;
      display: string;
    }>;
    text: string;
  };
  subject: {
    reference: string;
  };
  authoredOn: string;
  dosageInstruction: Array<{
    text: string;
    route?: {
      coding: Array<{
        system: string;
        code: string;
        display: string;
      }>;
    };
    timing?: {
      code: {
        text: string;
      };
    };
  }>;
}

export interface FHIRBundle {
  resourceType: 'Bundle';
  type: 'searchset' | 'collection' | 'document';
  total?: number;
  entry?: Array<{
    resource: FHIRPatient | FHIREncounter | FHIRMedicationRequest;
  }>;
}

export interface HL7Message {
  messageType: string;
  eventType: string;
  segments: Record<string, string[]>;
  raw: string;
}

export interface EMRConfig {
  baseUrl: string;
  apiKey: string;
  apiSecret?: string;
  hospitalId: string;
  timeout?: number;
  standard: 'FHIR' | 'HL7';
  version?: string;
}

export interface PatientQuery {
  patientId?: string;
  name?: string;
  birthDate?: string;
  phone?: string;
  visitDate?: string;
}

export interface MedicalData {
  patient: FHIRPatient;
  encounters: FHIREncounter[];
  medications: FHIRMedicationRequest[];
  labResults?: any[];
  diagnoses?: Array<{
    code: string;
    name: string;
    date: string;
    status: string;
  }>;
}

// ==================== HL7 Parser ====================

export class HL7Parser {
  private static readonly SEGMENT_DELIMITER = /\r\n|\r|\n/;
  private static readonly FIELD_DELIMITER = '|';
  private static readonly COMPONENT_DELIMITER = '^';

  static parse(message: string): HL7Message {
    const segments: Record<string, string[]> = {};
    const lines = message.split(this.SEGMENT_DELIMITER).filter(line => line.trim());

    if (lines.length === 0) {
      throw new Error('Empty HL7 message');
    }

    // Parse MSH segment (header)
    const msh = lines[0].split(this.FIELD_DELIMITER);
    if (msh[0] !== 'MSH') {
      throw new Error('Invalid HL7 message: MSH segment not found');
    }

    const delimiters = msh[1];
    const messageType = msh[8]?.split(this.COMPONENT_DELIMITER)[0] || '';
    const eventType = msh[8]?.split(this.COMPONENT_DELIMITER)[1] || '';

    // Parse all segments
    for (const line of lines) {
      const fields = line.split(this.FIELD_DELIMITER);
      const segmentName = fields[0];
      
      if (!segments[segmentName]) {
        segments[segmentName] = [];
      }
      segments[segmentName].push(...fields.slice(1));
    }

    return {
      messageType,
      eventType,
      segments,
      raw: message
    };
  }

  static extractPatientData(message: HL7Message): Partial<FHIRPatient> {
    const pid = message.segments['PID'];
    if (!pid) {
      throw new Error('PID segment not found');
    }

    const nameParts = pid[4]?.split(this.COMPONENT_DELIMITER) || [];
    
    return {
      resourceType: 'Patient',
      identifier: [{
        system: 'urn:oid:1.2.410.200049.1',
        value: pid[2] || ''
      }],
      name: [{
        use: 'official',
        family: nameParts[0] || '',
        given: nameParts.slice(1)
      }],
      gender: this.mapGender(pid[7]),
      birthDate: this.formatDate(pid[6] || ''),
      telecom: pid[13] ? [{
        system: 'phone',
        value: pid[13],
        use: 'mobile'
      }] : undefined
    };
  }

  private static mapGender(hl7Gender: string): 'male' | 'female' | 'other' | 'unknown' {
    const mapping: Record<string, 'male' | 'female' | 'other' | 'unknown'> = {
      'M': 'male',
      'F': 'female',
      'O': 'other',
      'U': 'unknown'
    };
    return mapping[hl7Gender] || 'unknown';
  }

  private static formatDate(hl7Date: string): string {
    // HL7: YYYYMMDD or YYYYMMDDHHMMSS → FHIR: YYYY-MM-DD
    if (hl7Date.length >= 8) {
      return `${hl7Date.substring(0, 4)}-${hl7Date.substring(4, 6)}-${hl7Date.substring(6, 8)}`;
    }
    return hl7Date;
  }
}

// ==================== EMR Service ====================

export class EMRService {
  private client: AxiosInstance;
  private config: EMRConfig;

  constructor(config: EMRConfig) {
    this.config = {
      timeout: 30000,
      version: 'R4',
      ...config
    };

    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json',
        'X-API-Key': config.apiKey,
        'X-Hospital-ID': config.hospitalId
      }
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        logger.debug(`EMR API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        logger.error({ err: error }, 'EMR API Request Error');
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          logger.error(
            { err: error, status: error.response.status, data: error.response.data },
            'EMR API Error'
          );
        } else if (error.request) {
          logger.error({ err: error, message: error.message }, 'EMR API No Response');
        } else {
          logger.error({ err: error, message: error.message }, 'EMR API Request Setup Error');
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== FHIR Operations ====================

  async searchPatient(query: PatientQuery): Promise<FHIRBundle> {
    const params = new URLSearchParams();
    
    if (query.patientId) params.append('_id', query.patientId);
    if (query.name) params.append('name', query.name);
    if (query.birthDate) params.append('birthdate', query.birthDate);
    if (query.phone) params.append('telecom', query.phone);

    const response: AxiosResponse<FHIRBundle> = await this.client.get(
      `/Patient?${params.toString()}`
    );

    return response.data;
  }

  async getPatient(patientId: string): Promise<FHIRPatient> {
    const response: AxiosResponse<FHIRPatient> = await this.client.get(
      `/Patient/${patientId}`
    );
    return response.data;
  }

  async getPatientEncounters(patientId: string, dateFrom?: string, dateTo?: string): Promise<FHIRBundle> {
    const params = new URLSearchParams();
    params.append('patient', patientId);
    if (dateFrom) params.append('date', `ge${dateFrom}`);
    if (dateTo) params.append('date', `le${dateTo}`);

    const response: AxiosResponse<FHIRBundle> = await this.client.get(
      `/Encounter?${params.toString()}`
    );
    return response.data;
  }

  async getPatientMedications(patientId: string, status = 'active'): Promise<FHIRBundle> {
    const params = new URLSearchParams();
    params.append('patient', patientId);
    params.append('status', status);

    const response: AxiosResponse<FHIRBundle> = await this.client.get(
      `/MedicationRequest?${params.toString()}`
    );
    return response.data;
  }

  async getCompleteMedicalData(patientId: string): Promise<MedicalData> {
    try {
      const [patient, encountersBundle, medicationsBundle] = await Promise.all([
        this.getPatient(patientId),
        this.getPatientEncounters(patientId),
        this.getPatientMedications(patientId)
      ]);

      const encounters = (encountersBundle.entry || []).map(e => e.resource as FHIREncounter);
      const medications = (medicationsBundle.entry || []).map(e => e.resource as FHIRMedicationRequest);

      // Extract diagnoses from encounters
      const diagnoses: MedicalData['diagnoses'] = [];
      encounters.forEach(encounter => {
        encounter.diagnosis?.forEach(dx => {
          diagnoses.push({
            code: dx.use?.coding?.[0]?.code || 'unknown',
            name: dx.condition.display,
            date: encounter.period.start,
            status: encounter.status
          });
        });
      });

      return {
        patient,
        encounters,
        medications,
        diagnoses
      };
    } catch (error) {
      logger.error({ err: error, patientId }, 'Failed to get complete medical data');
      throw error;
    }
  }

  // ==================== HL7 Operations ====================

  async sendHL7Message(message: string): Promise<HL7Message> {
    if (this.config.standard !== 'HL7') {
      throw new Error('HL7 not supported by this EMR configuration');
    }

    const response = await this.client.post('/hl7', {
      message,
      format: 'pipe'
    }, {
      headers: {
        'Content-Type': 'application/hl7-v2+er7'
      }
    });

    return HL7Parser.parse(response.data.ack);
  }

  // ==================== Care-Specific Operations ====================

  async getLongTermCareReferralData(patientId: string): Promise<{
    diagnoses: string[];
    medications: string[];
    functionalStatus?: string;
    cognitiveStatus?: string;
  }> {
    const data = await this.getCompleteMedicalData(patientId);

    // Filter relevant diagnoses for long-term care
    const ltcRelevantDiagnoses = [
      'dementia', 'alzheimer', 'parkinson', 'stroke', 'cerebrovascular',
      'fracture', 'osteoporosis', 'diabetes', 'hypertension', 'heart failure'
    ];

    const diagnoses = data.diagnoses || [];
    const relevantDx = diagnoses.filter(dx => 
      ltcRelevantDiagnoses.some(keyword => 
        dx.name.toLowerCase().includes(keyword)
      )
    );

    // Extract current medications
    const activeMeds = data.medications
      .filter(med => med.status === 'active')
      .map(med => med.medicationCodeableConcept.text);

    return {
      diagnoses: relevantDx.map(dx => `${dx.name} (${dx.code})`),
      medications: activeMeds,
      functionalStatus: this.estimateFunctionalStatus(relevantDx),
      cognitiveStatus: this.estimateCognitiveStatus(relevantDx)
    };
  }

  private estimateFunctionalStatus(diagnoses: any[]): string {
    const mobilityImpairing = ['fracture', 'stroke', 'parkinson', 'osteoporosis'];
    const hasImpairment = diagnoses.some(dx => 
      mobilityImpairing.some(keyword => dx.name.toLowerCase().includes(keyword))
    );
    
    return hasImpairment ? '임시: ADL 평가 필요' : '임시: 자가 가능 가능성';
  }

  private estimateCognitiveStatus(diagnoses: any[]): string {
    const cognitive = ['dementia', 'alzheimer'];
    const hasCognitive = diagnoses.some(dx => 
      cognitive.some(keyword => dx.name.toLowerCase().includes(keyword))
    );
    
    return hasCognitive ? '임시: 인지기능 평가 필요' : '임시: 정상 가능성';
  }
}

// ==================== Mock EMR Server (for Testing) ====================

export class MockEMRServer {
  private patients: Map<string, FHIRPatient> = new Map();
  private encounters: Map<string, FHIREncounter[]> = new Map();
  private medications: Map<string, FHIRMedicationRequest[]> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock Patient 1: Elderly with dementia
    const patient1: FHIRPatient = {
      resourceType: 'Patient',
      id: 'P001',
      identifier: [{
        system: 'urn:oid:1.2.410.200049.1',
        value: '1234567890'
      }],
      name: [{
        use: 'official',
        family: '김',
        given: ['순자']
      }],
      gender: 'female',
      birthDate: '1945-03-15',
      address: [{
        use: 'home',
        text: '서울특별시 강남구 테헤란로 123',
        city: '서울특별시',
        district: '강남구',
        postalCode: '06234'
      }],
      telecom: [{
        system: 'phone',
        value: '010-1234-5678',
        use: 'mobile'
      }]
    };

    const encounter1: FHIREncounter = {
      resourceType: 'Encounter',
      id: 'E001',
      status: 'finished',
      class: {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code: 'AMB',
        display: 'ambulatory'
      },
      subject: { reference: 'Patient/P001' },
      period: { start: '2024-01-15T09:00:00Z' },
      diagnosis: [{
        condition: {
          reference: 'Condition/C001',
          display: 'Alzheimer disease (G30.9)'
        },
        use: {
          coding: [{
            system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
            code: 'AD',
            display: 'Admission diagnosis'
          }]
        }
      }]
    };

    const medication1: FHIRMedicationRequest = {
      resourceType: 'MedicationRequest',
      id: 'M001',
      status: 'active',
      intent: 'order',
      medicationCodeableConcept: {
        coding: [{
          system: 'http://www.whocc.no/atc',
          code: 'N06D',
          display: 'Anti-dementia drugs'
        }],
        text: '돈페질정 10mg'
      },
      subject: { reference: 'Patient/P001' },
      authoredOn: '2024-01-15',
      dosageInstruction: [{
        text: '1일 1회 1정 취침전 복용',
        route: {
          coding: [{
            system: 'http://snomed.info/sct',
            code: '26643006',
            display: 'Oral route'
          }]
        }
      }]
    };

    this.patients.set('P001', patient1);
    this.encounters.set('P001', [encounter1]);
    this.medications.set('P001', [medication1]);

    // Add more mock patients...
    this.createAdditionalMockPatients();
  }

  private createAdditionalMockPatients() {
    const patient2: FHIRPatient = {
      resourceType: 'Patient',
      id: 'P002',
      identifier: [{ system: 'urn:oid:1.2.410.200049.1', value: '0987654321' }],
      name: [{ use: 'official', family: '박', given: ['철수'] }],
      gender: 'male',
      birthDate: '1940-08-20',
      address: [{ use: 'home', text: '경기도 성남시 분당구 판교로 456', city: '성남시', district: '분당구' }],
      telecom: [{ system: 'phone', value: '010-8765-4321', use: 'mobile' }]
    };

    this.patients.set('P002', patient2);
    this.encounters.set('P002', []);
    this.medications.set('P002', []);
  }

  // Mock API Handlers
  searchPatients(query: PatientQuery): FHIRBundle {
    const results: FHIRPatient[] = [];
    
    for (const [id, patient] of this.patients) {
      let match = true;
      
      if (query.patientId && id !== query.patientId) match = false;
      if (query.name && !patient.name[0]?.given.some(n => n.includes(query.name!))) match = false;
      if (query.birthDate && patient.birthDate !== query.birthDate) match = false;
      
      if (match) results.push(patient);
    }

    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: results.length,
      entry: results.map(r => ({ resource: r }))
    };
  }

  getPatient(id: string): FHIRPatient | null {
    return this.patients.get(id) || null;
  }

  getPatientEncounters(patientId: string): FHIRBundle {
    const encounters = this.encounters.get(patientId) || [];
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: encounters.length,
      entry: encounters.map(e => ({ resource: e }))
    };
  }

  getPatientMedications(patientId: string): FHIRBundle {
    const medications = this.medications.get(patientId) || [];
    return {
      resourceType: 'Bundle',
      type: 'searchset',
      total: medications.length,
      entry: medications.map(m => ({ resource: m }))
    };
  }
}

// ==================== Factory ====================

export function createEMRService(config: EMRConfig): EMRService {
  return new EMRService(config);
}

export function createMockEMRServer(): MockEMRServer {
  return new MockEMRServer();
}
