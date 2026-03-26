/**
 * EMR (Electronic Medical Record) Integration Routes
 * FHIR R4 / HL7 v2.x 표준 지원
 * 실제 병원 HIS 연동 및 Mock 서버 지원
 */

import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { 
  EMRService, 
  MockEMRServer, 
  HL7Parser, 
  createEMRService,
  PatientQuery,
  EMRConfig
} from '../services/emrService';
import { logger } from '../utils/logger';

// In-memory mock server for development/testing
const mockServer = new MockEMRServer();

// Active EMR connections (hospitalId -> service)
const emrConnections: Map<string, EMRService> = new Map();

interface EMRSearchQuery {
  patientId?: string;
  name?: string;
  birthDate?: string;
  phone?: string;
}

interface HL7MessageBody {
  message: string;
  hospitalId: string;
}

interface ConnectRequest {
  hospitalId: string;
  baseUrl: string;
  apiKey: string;
  apiSecret?: string;
  standard: 'FHIR' | 'HL7';
  isMock?: boolean;
}

export default async function emrRoutes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // ==================== Connection Management ====================

  /**
   * POST /connect
   * 새로운 병원 EMR 시스템 연결 설정
   */
  fastify.post<{ Body: ConnectRequest }>('/connect', {
    schema: {
      description: 'EMR 시스템 연결 설정',
      tags: ['EMR'],
      body: {
        type: 'object',
        required: ['hospitalId', 'baseUrl', 'apiKey', 'standard'],
        properties: {
          hospitalId: { type: 'string', description: '병원 고유 ID' },
          baseUrl: { type: 'string', description: 'EMR API 기본 URL' },
          apiKey: { type: 'string', description: 'API 인증 키' },
          apiSecret: { type: 'string', description: 'API 시크릿 (선택)' },
          standard: { type: 'string', enum: ['FHIR', 'HL7'], description: '연동 표준' },
          isMock: { type: 'boolean', description: 'Mock 서버 사용 여부' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            hospitalId: { type: 'string' },
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { hospitalId, baseUrl, apiKey, apiSecret, standard, isMock } = request.body;

    try {
      const config: EMRConfig = {
        hospitalId,
        baseUrl: isMock ? `http://localhost:${process.env.PORT || 3001}/emr/mock` : baseUrl,
        apiKey,
        apiSecret,
        standard,
        timeout: 30000
      };

      const service = createEMRService(config);
      emrConnections.set(hospitalId, service);

      // Test connection
      if (!isMock) {
        // 실제 연결 테스트는 환자 검색으로 수행
        await service.searchPatient({});
      }

      logger.info(`EMR connection established: ${hospitalId} (${standard})`);

      return {
        success: true,
        hospitalId,
        message: isMock ? 'Mock EMR 서버에 연결되었습니다' : 'EMR 시스템 연결 성공'
      };
    } catch (error) {
      logger.error({ err: error, hospitalId, standard }, 'EMR connection failed');
      reply.status(500);
      return {
        success: false,
        hospitalId,
        message: `연결 실패: ${(error as Error).message}`
      };
    }
  });

  /**
   * GET /connections
   * 활성화된 EMR 연결 목록 조회
   */
  fastify.get('/connections', {
    schema: {
      description: '활성 EMR 연결 목록',
      tags: ['EMR'],
      response: {
        200: {
          type: 'object',
          properties: {
            connections: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  hospitalId: { type: 'string' },
                  standard: { type: 'string' },
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  }, async () => {
    const connections = Array.from(emrConnections.keys()).map(hospitalId => ({
      hospitalId,
      standard: 'FHIR', // 실제로는 저장된 설정에서 가져와야 함
      status: 'connected'
    }));

    return { connections };
  });

  // ==================== Patient Search ====================

  /**
   * GET /patients/search
   * 환자 검색 (FHIR 기반)
   */
  fastify.get<{ Querystring: EMRSearchQuery & { hospitalId: string } }>('/patients/search', {
    schema: {
      description: 'EMR 환자 검색',
      tags: ['EMR'],
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string', description: '병원 ID' },
          patientId: { type: 'string', description: '환자 ID' },
          name: { type: 'string', description: '환자 이름' },
          birthDate: { type: 'string', description: '생년월일 (YYYY-MM-DD)' },
          phone: { type: 'string', description: '연락처' }
        }
      }
    }
  }, async (request, reply) => {
    const { hospitalId, ...searchParams } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected', hospitalId };
      }

      const result = await service.searchPatient(searchParams);
      return result;
    } catch (error) {
      logger.error({ err: error, hospitalId, searchParams }, 'Patient search failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  /**
   * GET /patients/:id
   * 환자 상세 조회
   */
  fastify.get<{ Params: { id: string }; Querystring: { hospitalId: string } }>('/patients/:id', {
    schema: {
      description: '환자 상세 정보 조회',
      tags: ['EMR'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '환자 ID' }
        }
      },
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { hospitalId } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const patient = await service.getPatient(id);
      return patient;
    } catch (error) {
      logger.error({ err: error, hospitalId, patientId: id }, 'Get patient failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  // ==================== Medical Data ====================

  /**
   * GET /patients/:id/encounters
   * 진료 내역 조회
   */
  fastify.get<{ Params: { id: string }; Querystring: { hospitalId: string; dateFrom?: string; dateTo?: string } }>('/patients/:id/encounters', {
    schema: {
      description: '환자 진료 내역 조회',
      tags: ['EMR'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '환자 ID' }
        }
      },
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string' },
          dateFrom: { type: 'string', description: '조회 시작일 (YYYY-MM-DD)' },
          dateTo: { type: 'string', description: '조회 종료일 (YYYY-MM-DD)' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { hospitalId, dateFrom, dateTo } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const encounters = await service.getPatientEncounters(id, dateFrom, dateTo);
      return encounters;
    } catch (error) {
      logger.error({ err: error, hospitalId, patientId: id, dateFrom, dateTo }, 'Get encounters failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  /**
   * GET /patients/:id/medications
   * 처방 정보 조회
   */
  fastify.get<{ Params: { id: string }; Querystring: { hospitalId: string; status?: string } }>('/patients/:id/medications', {
    schema: {
      description: '환자 처방 정보 조회',
      tags: ['EMR'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '환자 ID' }
        }
      },
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string' },
          status: { type: 'string', enum: ['active', 'completed', 'cancelled'], default: 'active' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { hospitalId, status = 'active' } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const medications = await service.getPatientMedications(id, status);
      return medications;
    } catch (error) {
      logger.error({ err: error, hospitalId, patientId: id, status }, 'Get medications failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  /**
   * GET /patients/:id/complete
   * 환자 전체 의료 정보 조회 (진단+처방+진료)
   */
  fastify.get<{ Params: { id: string }; Querystring: { hospitalId: string } }>('/patients/:id/complete', {
    schema: {
      description: '환자 전체 의료 정보 통합 조회',
      tags: ['EMR'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '환자 ID' }
        }
      },
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { hospitalId } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const data = await service.getCompleteMedicalData(id);
      
      // Transform for care center needs
      const ltcData = await service.getLongTermCareReferralData(id);
      
      return {
        ...data,
        longTermCare: ltcData,
        summary: {
          totalEncounters: data.encounters.length,
          activeMedications: data.medications.filter(m => m.status === 'active').length,
          diagnoses: data.diagnoses?.length || 0,
          ltcRelevantDiagnoses: ltcData.diagnoses.length
        }
      };
    } catch (error) {
      logger.error({ err: error, hospitalId, patientId: id }, 'Get complete data failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  // ==================== Long-term Care Integration ====================

  /**
   * GET /patients/:id/ltc-referral
   * 장기요양 입소 의뢰용 데이터 패키지
   */
  fastify.get<{ Params: { id: string }; Querystring: { hospitalId: string } }>('/patients/:id/ltc-referral', {
    schema: {
      description: '장기요양 입소 의뢰용 의료 정보 패키지',
      tags: ['EMR', 'LongTermCare'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'string', description: '환자 ID' }
        }
      },
      querystring: {
        type: 'object',
        required: ['hospitalId'],
        properties: {
          hospitalId: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    const { hospitalId } = request.query;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const ltcData = await service.getLongTermCareReferralData(id);
      const patient = await service.getPatient(id);

      return {
        patient: {
          id: patient.id,
          name: patient.name[0]?.given.join(' ') + ' ' + patient.name[0]?.family,
          birthDate: patient.birthDate,
          gender: patient.gender,
          phone: patient.telecom?.find(t => t.system === 'phone')?.value
        },
        medicalInfo: ltcData,
        generatedAt: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30일 유효
      };
    } catch (error) {
      logger.error({ err: error, hospitalId, patientId: id }, 'Get LTC referral data failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  // ==================== HL7 Operations ====================

  /**
   * POST /hl7/parse
   * HL7 메시지 파싱
   */
  fastify.post<{ Body: { message: string } }>('/hl7/parse', {
    schema: {
      description: 'HL7 메시지 파싱',
      tags: ['EMR', 'HL7'],
      body: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string', description: 'HL7 v2.x 메시지 (pipe-delimited)' }
        }
      }
    }
  }, async (request, reply) => {
    try {
      const parsed = HL7Parser.parse(request.body.message);
      const patientData = HL7Parser.extractPatientData(parsed);

      return {
        parsed,
        extractedPatient: patientData,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error({ err: error }, 'HL7 parse failed');
      reply.status(400);
      return { error: (error as Error).message };
    }
  });

  /**
   * POST /hl7/send
   * HL7 메시지 전송
   */
  fastify.post<{ Body: HL7MessageBody }>('/hl7/send', {
    schema: {
      description: 'HL7 메시지 EMR 전송',
      tags: ['EMR', 'HL7'],
      body: {
        type: 'object',
        required: ['message', 'hospitalId'],
        properties: {
          message: { type: 'string', description: 'HL7 메시지' },
          hospitalId: { type: 'string', description: '대상 병원 ID' }
        }
      }
    }
  }, async (request, reply) => {
    const { message, hospitalId } = request.body;

    try {
      const service = emrConnections.get(hospitalId);
      if (!service) {
        reply.status(404);
        return { error: 'Hospital not connected' };
      }

      const response = await service.sendHL7Message(message);
      return {
        success: true,
        response,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      logger.error({ err: error, hospitalId }, 'HL7 send failed');
      reply.status(500);
      return { error: (error as Error).message };
    }
  });

  // ==================== Mock Server Routes (Development Only) ====================

  if (process.env.NODE_ENV !== 'production') {
    /**
     * GET /mock/Patient
     * Mock 환자 검색 (개발/테스트용)
     */
    fastify.get<{ Querystring: PatientQuery }>('/mock/Patient', async (request) => {
      return mockServer.searchPatients(request.query);
    });

    fastify.get<{ Params: { id: string } }>('/mock/Patient/:id', async (request) => {
      const patient = mockServer.getPatient(request.params.id);
      if (!patient) {
        return { resourceType: 'OperationOutcome', issue: [{ severity: 'error', code: 'not-found' }] };
      }
      return patient;
    });

    fastify.get<{ Params: { id: string } }>('/mock/Patient/:id/Encounter', async (request) => {
      return mockServer.getPatientEncounters(request.params.id);
    });

    fastify.get<{ Params: { id: string } }>('/mock/Patient/:id/MedicationRequest', async (request) => {
      return mockServer.getPatientMedications(request.params.id);
    });
  }
}
