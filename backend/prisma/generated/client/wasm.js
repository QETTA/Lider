
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  plan: 'plan',
  settings: 'settings',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  role: 'role',
  orgId: 'orgId',
  preferences: 'preferences',
  passwordHash: 'passwordHash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLoginAt: 'lastLoginAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  orgId: 'orgId',
  status: 'status',
  contextTokens: 'contextTokens',
  metadata: 'metadata',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.RequestLogScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  sessionId: 'sessionId',
  userId: 'userId',
  orgId: 'orgId',
  endpoint: 'endpoint',
  modelUsed: 'modelUsed',
  promptTokens: 'promptTokens',
  completionTokens: 'completionTokens',
  latencyMs: 'latencyMs',
  fallbackUsed: 'fallbackUsed',
  schemaValid: 'schemaValid',
  toolCount: 'toolCount',
  estimatedCostUsd: 'estimatedCostUsd',
  traceId: 'traceId',
  createdAt: 'createdAt'
};

exports.Prisma.ExtractionScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  fileId: 'fileId',
  docType: 'docType',
  fields: 'fields',
  confidenceScores: 'confidenceScores',
  warnings: 'warnings',
  needsReview: 'needsReview',
  reviewStatus: 'reviewStatus',
  reviewedBy: 'reviewedBy',
  reviewedAt: 'reviewedAt',
  createdAt: 'createdAt'
};

exports.Prisma.ActionPreviewScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  actionType: 'actionType',
  targetType: 'targetType',
  targetId: 'targetId',
  payload: 'payload',
  allowed: 'allowed',
  missingChecks: 'missingChecks',
  impactSummary: 'impactSummary',
  humanConfirmationRequired: 'humanConfirmationRequired',
  previewToken: 'previewToken',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt'
};

exports.Prisma.ActionExecutionScalarFieldEnum = {
  id: 'id',
  previewId: 'previewId',
  executedBy: 'executedBy',
  executedAt: 'executedAt',
  confirmationMethod: 'confirmationMethod',
  result: 'result',
  auditTrail: 'auditTrail'
};

exports.Prisma.BadcaseScalarFieldEnum = {
  id: 'id',
  requestId: 'requestId',
  category: 'category',
  severity: 'severity',
  description: 'description',
  inputSnapshot: 'inputSnapshot',
  expectedOutput: 'expectedOutput',
  actualOutput: 'actualOutput',
  rootCauseAnalysis: 'rootCauseAnalysis',
  fixStatus: 'fixStatus',
  fixedBy: 'fixedBy',
  fixedAt: 'fixedAt',
  createdAt: 'createdAt',
  resolvedAt: 'resolvedAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  fileName: 'fileName',
  mimeType: 'mimeType',
  sizeBytes: 'sizeBytes',
  uploadedBy: 'uploadedBy',
  purpose: 'purpose',
  storagePath: 'storagePath',
  extractedText: 'extractedText',
  createdAt: 'createdAt',
  expiresAt: 'expiresAt'
};

exports.Prisma.DocumentEmbeddingScalarFieldEnum = {
  id: 'id',
  documentId: 'documentId',
  content: 'content',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.FundingProgramScalarFieldEnum = {
  id: 'id',
  programName: 'programName',
  agency: 'agency',
  maxAmount: 'maxAmount',
  minAmount: 'minAmount',
  targetIndustries: 'targetIndustries',
  targetCompanySizes: 'targetCompanySizes',
  applicationStart: 'applicationStart',
  applicationEnd: 'applicationEnd',
  eligibility: 'eligibility',
  description: 'description',
  sourceUrl: 'sourceUrl',
  status: 'status',
  lastScrapedAt: 'lastScrapedAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FundingApplicationScalarFieldEnum = {
  id: 'id',
  orgId: 'orgId',
  programId: 'programId',
  status: 'status',
  submittedAt: 'submittedAt',
  documents: 'documents',
  notes: 'notes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  orgId: 'orgId',
  action: 'action',
  entityType: 'entityType',
  entityId: 'entityId',
  oldValue: 'oldValue',
  newValue: 'newValue',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  metadata: 'metadata',
  createdAt: 'createdAt'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  id: 'id',
  name: 'name',
  key: 'key',
  orgId: 'orgId',
  isActive: 'isActive',
  expiresAt: 'expiresAt',
  lastUsedAt: 'lastUsedAt',
  scopes: 'scopes',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.PlanTier = exports.$Enums.PlanTier = {
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  ENTERPRISE: 'ENTERPRISE'
};

exports.UserRole = exports.$Enums.UserRole = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  AGENT: 'AGENT',
  VIEWER: 'VIEWER'
};

exports.SessionStatus = exports.$Enums.SessionStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
};

exports.EndpointType = exports.$Enums.EndpointType = {
  ASSIST: 'ASSIST',
  EXTRACT: 'EXTRACT',
  ACTION_PREVIEW: 'ACTION_PREVIEW'
};

exports.ExtractionDocType = exports.$Enums.ExtractionDocType = {
  POSTER: 'POSTER',
  INVOICE: 'INVOICE',
  FORM: 'FORM',
  SCREEN: 'SCREEN',
  GENERIC: 'GENERIC'
};

exports.ReviewStatus = exports.$Enums.ReviewStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  NOT_NEEDED: 'NOT_NEEDED'
};

exports.ActionType = exports.$Enums.ActionType = {
  TICKET_CLOSE: 'TICKET_CLOSE',
  REFUND_PROCESS: 'REFUND_PROCESS',
  DATA_EXPORT: 'DATA_EXPORT',
  USER_DELETE: 'USER_DELETE',
  ORG_DELETE: 'ORG_DELETE',
  CONFIG_CHANGE: 'CONFIG_CHANGE',
  BULK_OPERATION: 'BULK_OPERATION'
};

exports.ConfirmationMethod = exports.$Enums.ConfirmationMethod = {
  SSO: 'SSO',
  MFA: 'MFA',
  EMAIL: 'EMAIL',
  MANUAL: 'MANUAL'
};

exports.BadcaseCategory = exports.$Enums.BadcaseCategory = {
  JSON_INVALID: 'JSON_INVALID',
  HALLUCINATION: 'HALLUCINATION',
  WRONG_TOOL: 'WRONG_TOOL',
  EXTRACTION_FAIL: 'EXTRACTION_FAIL',
  SCHEMA_MISMATCH: 'SCHEMA_MISMATCH',
  TIMEOUT: 'TIMEOUT'
};

exports.Severity = exports.$Enums.Severity = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

exports.FixStatus = exports.$Enums.FixStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  FIXED: 'FIXED',
  WONT_FIX: 'WONT_FIX'
};

exports.DocumentPurpose = exports.$Enums.DocumentPurpose = {
  EXTRACT: 'EXTRACT',
  REFERENCE: 'REFERENCE',
  ATTACHMENT: 'ATTACHMENT'
};

exports.FundingProgramStatus = exports.$Enums.FundingProgramStatus = {
  UPCOMING: 'UPCOMING',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

exports.ApplicationStatus = exports.$Enums.ApplicationStatus = {
  PREPARING: 'PREPARING',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
};

exports.Prisma.ModelName = {
  Organization: 'Organization',
  User: 'User',
  Session: 'Session',
  RequestLog: 'RequestLog',
  Extraction: 'Extraction',
  ActionPreview: 'ActionPreview',
  ActionExecution: 'ActionExecution',
  Badcase: 'Badcase',
  Document: 'Document',
  DocumentEmbedding: 'DocumentEmbedding',
  FundingProgram: 'FundingProgram',
  FundingApplication: 'FundingApplication',
  AuditLog: 'AuditLog',
  ApiKey: 'ApiKey'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
