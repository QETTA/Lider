
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model RequestLog
 * 
 */
export type RequestLog = $Result.DefaultSelection<Prisma.$RequestLogPayload>
/**
 * Model Extraction
 * 
 */
export type Extraction = $Result.DefaultSelection<Prisma.$ExtractionPayload>
/**
 * Model ActionPreview
 * 
 */
export type ActionPreview = $Result.DefaultSelection<Prisma.$ActionPreviewPayload>
/**
 * Model ActionExecution
 * 
 */
export type ActionExecution = $Result.DefaultSelection<Prisma.$ActionExecutionPayload>
/**
 * Model Badcase
 * 
 */
export type Badcase = $Result.DefaultSelection<Prisma.$BadcasePayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentEmbedding
 * 
 */
export type DocumentEmbedding = $Result.DefaultSelection<Prisma.$DocumentEmbeddingPayload>
/**
 * Model FundingProgram
 * 
 */
export type FundingProgram = $Result.DefaultSelection<Prisma.$FundingProgramPayload>
/**
 * Model FundingApplication
 * 
 */
export type FundingApplication = $Result.DefaultSelection<Prisma.$FundingApplicationPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PlanTier: {
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  ENTERPRISE: 'ENTERPRISE'
};

export type PlanTier = (typeof PlanTier)[keyof typeof PlanTier]


export const UserRole: {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  AGENT: 'AGENT',
  VIEWER: 'VIEWER'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const SessionStatus: {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  TERMINATED: 'TERMINATED'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]


export const EndpointType: {
  ASSIST: 'ASSIST',
  EXTRACT: 'EXTRACT',
  ACTION_PREVIEW: 'ACTION_PREVIEW'
};

export type EndpointType = (typeof EndpointType)[keyof typeof EndpointType]


export const ExtractionDocType: {
  POSTER: 'POSTER',
  INVOICE: 'INVOICE',
  FORM: 'FORM',
  SCREEN: 'SCREEN',
  GENERIC: 'GENERIC'
};

export type ExtractionDocType = (typeof ExtractionDocType)[keyof typeof ExtractionDocType]


export const ReviewStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  NOT_NEEDED: 'NOT_NEEDED'
};

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus]


export const ActionType: {
  TICKET_CLOSE: 'TICKET_CLOSE',
  REFUND_PROCESS: 'REFUND_PROCESS',
  DATA_EXPORT: 'DATA_EXPORT',
  USER_DELETE: 'USER_DELETE',
  ORG_DELETE: 'ORG_DELETE',
  CONFIG_CHANGE: 'CONFIG_CHANGE',
  BULK_OPERATION: 'BULK_OPERATION'
};

export type ActionType = (typeof ActionType)[keyof typeof ActionType]


export const ConfirmationMethod: {
  SSO: 'SSO',
  MFA: 'MFA',
  EMAIL: 'EMAIL',
  MANUAL: 'MANUAL'
};

export type ConfirmationMethod = (typeof ConfirmationMethod)[keyof typeof ConfirmationMethod]


export const BadcaseCategory: {
  JSON_INVALID: 'JSON_INVALID',
  HALLUCINATION: 'HALLUCINATION',
  WRONG_TOOL: 'WRONG_TOOL',
  EXTRACTION_FAIL: 'EXTRACTION_FAIL',
  SCHEMA_MISMATCH: 'SCHEMA_MISMATCH',
  TIMEOUT: 'TIMEOUT'
};

export type BadcaseCategory = (typeof BadcaseCategory)[keyof typeof BadcaseCategory]


export const Severity: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
};

export type Severity = (typeof Severity)[keyof typeof Severity]


export const FixStatus: {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  FIXED: 'FIXED',
  WONT_FIX: 'WONT_FIX'
};

export type FixStatus = (typeof FixStatus)[keyof typeof FixStatus]


export const DocumentPurpose: {
  EXTRACT: 'EXTRACT',
  REFERENCE: 'REFERENCE',
  ATTACHMENT: 'ATTACHMENT'
};

export type DocumentPurpose = (typeof DocumentPurpose)[keyof typeof DocumentPurpose]


export const FundingProgramStatus: {
  UPCOMING: 'UPCOMING',
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED'
};

export type FundingProgramStatus = (typeof FundingProgramStatus)[keyof typeof FundingProgramStatus]


export const ApplicationStatus: {
  PREPARING: 'PREPARING',
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]

}

export type PlanTier = $Enums.PlanTier

export const PlanTier: typeof $Enums.PlanTier

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

export type EndpointType = $Enums.EndpointType

export const EndpointType: typeof $Enums.EndpointType

export type ExtractionDocType = $Enums.ExtractionDocType

export const ExtractionDocType: typeof $Enums.ExtractionDocType

export type ReviewStatus = $Enums.ReviewStatus

export const ReviewStatus: typeof $Enums.ReviewStatus

export type ActionType = $Enums.ActionType

export const ActionType: typeof $Enums.ActionType

export type ConfirmationMethod = $Enums.ConfirmationMethod

export const ConfirmationMethod: typeof $Enums.ConfirmationMethod

export type BadcaseCategory = $Enums.BadcaseCategory

export const BadcaseCategory: typeof $Enums.BadcaseCategory

export type Severity = $Enums.Severity

export const Severity: typeof $Enums.Severity

export type FixStatus = $Enums.FixStatus

export const FixStatus: typeof $Enums.FixStatus

export type DocumentPurpose = $Enums.DocumentPurpose

export const DocumentPurpose: typeof $Enums.DocumentPurpose

export type FundingProgramStatus = $Enums.FundingProgramStatus

export const FundingProgramStatus: typeof $Enums.FundingProgramStatus

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Organizations
 * const organizations = await prisma.organization.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Organizations
   * const organizations = await prisma.organization.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.requestLog`: Exposes CRUD operations for the **RequestLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestLogs
    * const requestLogs = await prisma.requestLog.findMany()
    * ```
    */
  get requestLog(): Prisma.RequestLogDelegate<ExtArgs>;

  /**
   * `prisma.extraction`: Exposes CRUD operations for the **Extraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Extractions
    * const extractions = await prisma.extraction.findMany()
    * ```
    */
  get extraction(): Prisma.ExtractionDelegate<ExtArgs>;

  /**
   * `prisma.actionPreview`: Exposes CRUD operations for the **ActionPreview** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionPreviews
    * const actionPreviews = await prisma.actionPreview.findMany()
    * ```
    */
  get actionPreview(): Prisma.ActionPreviewDelegate<ExtArgs>;

  /**
   * `prisma.actionExecution`: Exposes CRUD operations for the **ActionExecution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionExecutions
    * const actionExecutions = await prisma.actionExecution.findMany()
    * ```
    */
  get actionExecution(): Prisma.ActionExecutionDelegate<ExtArgs>;

  /**
   * `prisma.badcase`: Exposes CRUD operations for the **Badcase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Badcases
    * const badcases = await prisma.badcase.findMany()
    * ```
    */
  get badcase(): Prisma.BadcaseDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.documentEmbedding`: Exposes CRUD operations for the **DocumentEmbedding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentEmbeddings
    * const documentEmbeddings = await prisma.documentEmbedding.findMany()
    * ```
    */
  get documentEmbedding(): Prisma.DocumentEmbeddingDelegate<ExtArgs>;

  /**
   * `prisma.fundingProgram`: Exposes CRUD operations for the **FundingProgram** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingPrograms
    * const fundingPrograms = await prisma.fundingProgram.findMany()
    * ```
    */
  get fundingProgram(): Prisma.FundingProgramDelegate<ExtArgs>;

  /**
   * `prisma.fundingApplication`: Exposes CRUD operations for the **FundingApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FundingApplications
    * const fundingApplications = await prisma.fundingApplication.findMany()
    * ```
    */
  get fundingApplication(): Prisma.FundingApplicationDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "organization" | "user" | "session" | "requestLog" | "extraction" | "actionPreview" | "actionExecution" | "badcase" | "document" | "documentEmbedding" | "fundingProgram" | "fundingApplication" | "auditLog" | "apiKey"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      RequestLog: {
        payload: Prisma.$RequestLogPayload<ExtArgs>
        fields: Prisma.RequestLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findFirst: {
            args: Prisma.RequestLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findMany: {
            args: Prisma.RequestLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          create: {
            args: Prisma.RequestLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          createMany: {
            args: Prisma.RequestLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          delete: {
            args: Prisma.RequestLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          update: {
            args: Prisma.RequestLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          deleteMany: {
            args: Prisma.RequestLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RequestLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          aggregate: {
            args: Prisma.RequestLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestLog>
          }
          groupBy: {
            args: Prisma.RequestLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestLogCountArgs<ExtArgs>
            result: $Utils.Optional<RequestLogCountAggregateOutputType> | number
          }
        }
      }
      Extraction: {
        payload: Prisma.$ExtractionPayload<ExtArgs>
        fields: Prisma.ExtractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExtractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExtractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          findFirst: {
            args: Prisma.ExtractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExtractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          findMany: {
            args: Prisma.ExtractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>[]
          }
          create: {
            args: Prisma.ExtractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          createMany: {
            args: Prisma.ExtractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExtractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>[]
          }
          delete: {
            args: Prisma.ExtractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          update: {
            args: Prisma.ExtractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          deleteMany: {
            args: Prisma.ExtractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExtractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExtractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExtractionPayload>
          }
          aggregate: {
            args: Prisma.ExtractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExtraction>
          }
          groupBy: {
            args: Prisma.ExtractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExtractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExtractionCountArgs<ExtArgs>
            result: $Utils.Optional<ExtractionCountAggregateOutputType> | number
          }
        }
      }
      ActionPreview: {
        payload: Prisma.$ActionPreviewPayload<ExtArgs>
        fields: Prisma.ActionPreviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionPreviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionPreviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          findFirst: {
            args: Prisma.ActionPreviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionPreviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          findMany: {
            args: Prisma.ActionPreviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>[]
          }
          create: {
            args: Prisma.ActionPreviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          createMany: {
            args: Prisma.ActionPreviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionPreviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>[]
          }
          delete: {
            args: Prisma.ActionPreviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          update: {
            args: Prisma.ActionPreviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          deleteMany: {
            args: Prisma.ActionPreviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionPreviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActionPreviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionPreviewPayload>
          }
          aggregate: {
            args: Prisma.ActionPreviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionPreview>
          }
          groupBy: {
            args: Prisma.ActionPreviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionPreviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionPreviewCountArgs<ExtArgs>
            result: $Utils.Optional<ActionPreviewCountAggregateOutputType> | number
          }
        }
      }
      ActionExecution: {
        payload: Prisma.$ActionExecutionPayload<ExtArgs>
        fields: Prisma.ActionExecutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionExecutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionExecutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          findFirst: {
            args: Prisma.ActionExecutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionExecutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          findMany: {
            args: Prisma.ActionExecutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>[]
          }
          create: {
            args: Prisma.ActionExecutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          createMany: {
            args: Prisma.ActionExecutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionExecutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>[]
          }
          delete: {
            args: Prisma.ActionExecutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          update: {
            args: Prisma.ActionExecutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          deleteMany: {
            args: Prisma.ActionExecutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionExecutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActionExecutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionExecutionPayload>
          }
          aggregate: {
            args: Prisma.ActionExecutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionExecution>
          }
          groupBy: {
            args: Prisma.ActionExecutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionExecutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionExecutionCountArgs<ExtArgs>
            result: $Utils.Optional<ActionExecutionCountAggregateOutputType> | number
          }
        }
      }
      Badcase: {
        payload: Prisma.$BadcasePayload<ExtArgs>
        fields: Prisma.BadcaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadcaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadcaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          findFirst: {
            args: Prisma.BadcaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadcaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          findMany: {
            args: Prisma.BadcaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>[]
          }
          create: {
            args: Prisma.BadcaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          createMany: {
            args: Prisma.BadcaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadcaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>[]
          }
          delete: {
            args: Prisma.BadcaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          update: {
            args: Prisma.BadcaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          deleteMany: {
            args: Prisma.BadcaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadcaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BadcaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadcasePayload>
          }
          aggregate: {
            args: Prisma.BadcaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadcase>
          }
          groupBy: {
            args: Prisma.BadcaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadcaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadcaseCountArgs<ExtArgs>
            result: $Utils.Optional<BadcaseCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentEmbedding: {
        payload: Prisma.$DocumentEmbeddingPayload<ExtArgs>
        fields: Prisma.DocumentEmbeddingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentEmbeddingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentEmbeddingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload>
          }
          findFirst: {
            args: Prisma.DocumentEmbeddingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentEmbeddingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload>
          }
          findMany: {
            args: Prisma.DocumentEmbeddingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload>[]
          }
          delete: {
            args: Prisma.DocumentEmbeddingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload>
          }
          update: {
            args: Prisma.DocumentEmbeddingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentEmbeddingPayload>
          }
          deleteMany: {
            args: Prisma.DocumentEmbeddingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentEmbeddingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          aggregate: {
            args: Prisma.DocumentEmbeddingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentEmbedding>
          }
          groupBy: {
            args: Prisma.DocumentEmbeddingGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentEmbeddingGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentEmbeddingCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentEmbeddingCountAggregateOutputType> | number
          }
        }
      }
      FundingProgram: {
        payload: Prisma.$FundingProgramPayload<ExtArgs>
        fields: Prisma.FundingProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          findFirst: {
            args: Prisma.FundingProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          findMany: {
            args: Prisma.FundingProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>[]
          }
          create: {
            args: Prisma.FundingProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          createMany: {
            args: Prisma.FundingProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>[]
          }
          delete: {
            args: Prisma.FundingProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          update: {
            args: Prisma.FundingProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          deleteMany: {
            args: Prisma.FundingProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FundingProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingProgramPayload>
          }
          aggregate: {
            args: Prisma.FundingProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingProgram>
          }
          groupBy: {
            args: Prisma.FundingProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingProgramCountArgs<ExtArgs>
            result: $Utils.Optional<FundingProgramCountAggregateOutputType> | number
          }
        }
      }
      FundingApplication: {
        payload: Prisma.$FundingApplicationPayload<ExtArgs>
        fields: Prisma.FundingApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FundingApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FundingApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          findFirst: {
            args: Prisma.FundingApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FundingApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          findMany: {
            args: Prisma.FundingApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>[]
          }
          create: {
            args: Prisma.FundingApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          createMany: {
            args: Prisma.FundingApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FundingApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>[]
          }
          delete: {
            args: Prisma.FundingApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          update: {
            args: Prisma.FundingApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          deleteMany: {
            args: Prisma.FundingApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FundingApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FundingApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FundingApplicationPayload>
          }
          aggregate: {
            args: Prisma.FundingApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFundingApplication>
          }
          groupBy: {
            args: Prisma.FundingApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FundingApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.FundingApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<FundingApplicationCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
    documents: number
    fundingApplications: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
    documents?: boolean | OrganizationCountOutputTypeCountDocumentsArgs
    fundingApplications?: boolean | OrganizationCountOutputTypeCountFundingApplicationsArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountFundingApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingApplicationWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    requestLogs: number
    actionExecutions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    requestLogs?: boolean | UserCountOutputTypeCountRequestLogsArgs
    actionExecutions?: boolean | UserCountOutputTypeCountActionExecutionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRequestLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionExecutionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    requestLogs: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLogs?: boolean | SessionCountOutputTypeCountRequestLogsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountRequestLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
  }


  /**
   * Count Type RequestLogCountOutputType
   */

  export type RequestLogCountOutputType = {
    extractions: number
    actionPreviews: number
    badcases: number
  }

  export type RequestLogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    extractions?: boolean | RequestLogCountOutputTypeCountExtractionsArgs
    actionPreviews?: boolean | RequestLogCountOutputTypeCountActionPreviewsArgs
    badcases?: boolean | RequestLogCountOutputTypeCountBadcasesArgs
  }

  // Custom InputTypes
  /**
   * RequestLogCountOutputType without action
   */
  export type RequestLogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLogCountOutputType
     */
    select?: RequestLogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RequestLogCountOutputType without action
   */
  export type RequestLogCountOutputTypeCountExtractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExtractionWhereInput
  }

  /**
   * RequestLogCountOutputType without action
   */
  export type RequestLogCountOutputTypeCountActionPreviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionPreviewWhereInput
  }

  /**
   * RequestLogCountOutputType without action
   */
  export type RequestLogCountOutputTypeCountBadcasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadcaseWhereInput
  }


  /**
   * Count Type ActionPreviewCountOutputType
   */

  export type ActionPreviewCountOutputType = {
    executions: number
  }

  export type ActionPreviewCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    executions?: boolean | ActionPreviewCountOutputTypeCountExecutionsArgs
  }

  // Custom InputTypes
  /**
   * ActionPreviewCountOutputType without action
   */
  export type ActionPreviewCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreviewCountOutputType
     */
    select?: ActionPreviewCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActionPreviewCountOutputType without action
   */
  export type ActionPreviewCountOutputTypeCountExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionExecutionWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    embeddings: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    embeddings?: boolean | DocumentCountOutputTypeCountEmbeddingsArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountEmbeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentEmbeddingWhereInput
  }


  /**
   * Count Type FundingProgramCountOutputType
   */

  export type FundingProgramCountOutputType = {
    applications: number
  }

  export type FundingProgramCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | FundingProgramCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * FundingProgramCountOutputType without action
   */
  export type FundingProgramCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgramCountOutputType
     */
    select?: FundingProgramCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FundingProgramCountOutputType without action
   */
  export type FundingProgramCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingApplicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    plan: $Enums.PlanTier | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    plan: $Enums.PlanTier | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    plan: number
    settings: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    plan?: true
    settings?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    plan: $Enums.PlanTier
    settings: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Organization$usersArgs<ExtArgs>
    documents?: boolean | Organization$documentsArgs<ExtArgs>
    fundingApplications?: boolean | Organization$fundingApplicationsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    plan?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    plan?: boolean
    settings?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Organization$usersArgs<ExtArgs>
    documents?: boolean | Organization$documentsArgs<ExtArgs>
    fundingApplications?: boolean | Organization$fundingApplicationsArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
      fundingApplications: Prisma.$FundingApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      plan: $Enums.PlanTier
      settings: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends Organization$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
    fundingApplications<T extends Organization$fundingApplicationsArgs<ExtArgs> = {}>(args?: Subset<T, Organization$fundingApplicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly plan: FieldRef<"Organization", 'PlanTier'>
    readonly settings: FieldRef<"Organization", 'Json'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization.documents
   */
  export type Organization$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Organization.fundingApplications
   */
  export type Organization$fundingApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    where?: FundingApplicationWhereInput
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    cursor?: FundingApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FundingApplicationScalarFieldEnum | FundingApplicationScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    orgId: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: $Enums.UserRole | null
    orgId: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLoginAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    orgId: number
    preferences: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    lastLoginAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    orgId?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    orgId?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    orgId?: true
    preferences?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLoginAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    role: $Enums.UserRole
    orgId: string
    preferences: JsonValue
    passwordHash: string
    createdAt: Date
    updatedAt: Date
    lastLoginAt: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    orgId?: boolean
    preferences?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    requestLogs?: boolean | User$requestLogsArgs<ExtArgs>
    actionExecutions?: boolean | User$actionExecutionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    orgId?: boolean
    preferences?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    orgId?: boolean
    preferences?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLoginAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    requestLogs?: boolean | User$requestLogsArgs<ExtArgs>
    actionExecutions?: boolean | User$actionExecutionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      org: Prisma.$OrganizationPayload<ExtArgs>
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      requestLogs: Prisma.$RequestLogPayload<ExtArgs>[]
      actionExecutions: Prisma.$ActionExecutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      role: $Enums.UserRole
      orgId: string
      preferences: Prisma.JsonValue
      passwordHash: string
      createdAt: Date
      updatedAt: Date
      lastLoginAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    org<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    requestLogs<T extends User$requestLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$requestLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany"> | Null>
    actionExecutions<T extends User$actionExecutionsArgs<ExtArgs> = {}>(args?: Subset<T, User$actionExecutionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly orgId: FieldRef<"User", 'String'>
    readonly preferences: FieldRef<"User", 'Json'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLoginAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.requestLogs
   */
  export type User$requestLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    cursor?: RequestLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * User.actionExecutions
   */
  export type User$actionExecutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    where?: ActionExecutionWhereInput
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    cursor?: ActionExecutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionExecutionScalarFieldEnum | ActionExecutionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    contextTokens: number | null
  }

  export type SessionSumAggregateOutputType = {
    contextTokens: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    orgId: string | null
    status: $Enums.SessionStatus | null
    contextTokens: number | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    orgId: string | null
    status: $Enums.SessionStatus | null
    contextTokens: number | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    orgId: number
    status: number
    contextTokens: number
    metadata: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    contextTokens?: true
  }

  export type SessionSumAggregateInputType = {
    contextTokens?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    status?: true
    contextTokens?: true
    createdAt?: true
    expiresAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    status?: true
    contextTokens?: true
    createdAt?: true
    expiresAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    status?: true
    contextTokens?: true
    metadata?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    orgId: string
    status: $Enums.SessionStatus
    contextTokens: number
    metadata: JsonValue
    createdAt: Date
    expiresAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    orgId?: boolean
    status?: boolean
    contextTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    requestLogs?: boolean | Session$requestLogsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    orgId?: boolean
    status?: boolean
    contextTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    orgId?: boolean
    status?: boolean
    contextTokens?: boolean
    metadata?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    requestLogs?: boolean | Session$requestLogsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      requestLogs: Prisma.$RequestLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      orgId: string
      status: $Enums.SessionStatus
      contextTokens: number
      metadata: Prisma.JsonValue
      createdAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    requestLogs<T extends Session$requestLogsArgs<ExtArgs> = {}>(args?: Subset<T, Session$requestLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly orgId: FieldRef<"Session", 'String'>
    readonly status: FieldRef<"Session", 'SessionStatus'>
    readonly contextTokens: FieldRef<"Session", 'Int'>
    readonly metadata: FieldRef<"Session", 'Json'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session.requestLogs
   */
  export type Session$requestLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    cursor?: RequestLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model RequestLog
   */

  export type AggregateRequestLog = {
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  export type RequestLogAvgAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    latencyMs: number | null
    toolCount: number | null
    estimatedCostUsd: Decimal | null
  }

  export type RequestLogSumAggregateOutputType = {
    promptTokens: number | null
    completionTokens: number | null
    latencyMs: number | null
    toolCount: number | null
    estimatedCostUsd: Decimal | null
  }

  export type RequestLogMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    sessionId: string | null
    userId: string | null
    orgId: string | null
    endpoint: $Enums.EndpointType | null
    modelUsed: string | null
    promptTokens: number | null
    completionTokens: number | null
    latencyMs: number | null
    fallbackUsed: boolean | null
    schemaValid: boolean | null
    toolCount: number | null
    estimatedCostUsd: Decimal | null
    traceId: string | null
    createdAt: Date | null
  }

  export type RequestLogMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    sessionId: string | null
    userId: string | null
    orgId: string | null
    endpoint: $Enums.EndpointType | null
    modelUsed: string | null
    promptTokens: number | null
    completionTokens: number | null
    latencyMs: number | null
    fallbackUsed: boolean | null
    schemaValid: boolean | null
    toolCount: number | null
    estimatedCostUsd: Decimal | null
    traceId: string | null
    createdAt: Date | null
  }

  export type RequestLogCountAggregateOutputType = {
    id: number
    requestId: number
    sessionId: number
    userId: number
    orgId: number
    endpoint: number
    modelUsed: number
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed: number
    schemaValid: number
    toolCount: number
    estimatedCostUsd: number
    traceId: number
    createdAt: number
    _all: number
  }


  export type RequestLogAvgAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    latencyMs?: true
    toolCount?: true
    estimatedCostUsd?: true
  }

  export type RequestLogSumAggregateInputType = {
    promptTokens?: true
    completionTokens?: true
    latencyMs?: true
    toolCount?: true
    estimatedCostUsd?: true
  }

  export type RequestLogMinAggregateInputType = {
    id?: true
    requestId?: true
    sessionId?: true
    userId?: true
    orgId?: true
    endpoint?: true
    modelUsed?: true
    promptTokens?: true
    completionTokens?: true
    latencyMs?: true
    fallbackUsed?: true
    schemaValid?: true
    toolCount?: true
    estimatedCostUsd?: true
    traceId?: true
    createdAt?: true
  }

  export type RequestLogMaxAggregateInputType = {
    id?: true
    requestId?: true
    sessionId?: true
    userId?: true
    orgId?: true
    endpoint?: true
    modelUsed?: true
    promptTokens?: true
    completionTokens?: true
    latencyMs?: true
    fallbackUsed?: true
    schemaValid?: true
    toolCount?: true
    estimatedCostUsd?: true
    traceId?: true
    createdAt?: true
  }

  export type RequestLogCountAggregateInputType = {
    id?: true
    requestId?: true
    sessionId?: true
    userId?: true
    orgId?: true
    endpoint?: true
    modelUsed?: true
    promptTokens?: true
    completionTokens?: true
    latencyMs?: true
    fallbackUsed?: true
    schemaValid?: true
    toolCount?: true
    estimatedCostUsd?: true
    traceId?: true
    createdAt?: true
    _all?: true
  }

  export type RequestLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLog to aggregate.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestLogs
    **/
    _count?: true | RequestLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestLogMaxAggregateInputType
  }

  export type GetRequestLogAggregateType<T extends RequestLogAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestLog[P]>
      : GetScalarType<T[P], AggregateRequestLog[P]>
  }




  export type RequestLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithAggregationInput | RequestLogOrderByWithAggregationInput[]
    by: RequestLogScalarFieldEnum[] | RequestLogScalarFieldEnum
    having?: RequestLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestLogCountAggregateInputType | true
    _avg?: RequestLogAvgAggregateInputType
    _sum?: RequestLogSumAggregateInputType
    _min?: RequestLogMinAggregateInputType
    _max?: RequestLogMaxAggregateInputType
  }

  export type RequestLogGroupByOutputType = {
    id: string
    requestId: string
    sessionId: string | null
    userId: string | null
    orgId: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed: boolean
    schemaValid: boolean
    toolCount: number
    estimatedCostUsd: Decimal
    traceId: string | null
    createdAt: Date
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  type GetRequestLogGroupByPayload<T extends RequestLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
            : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
        }
      >
    >


  export type RequestLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    sessionId?: boolean
    userId?: boolean
    orgId?: boolean
    endpoint?: boolean
    modelUsed?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    latencyMs?: boolean
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: boolean
    estimatedCostUsd?: boolean
    traceId?: boolean
    createdAt?: boolean
    session?: boolean | RequestLog$sessionArgs<ExtArgs>
    user?: boolean | RequestLog$userArgs<ExtArgs>
    extractions?: boolean | RequestLog$extractionsArgs<ExtArgs>
    actionPreviews?: boolean | RequestLog$actionPreviewsArgs<ExtArgs>
    badcases?: boolean | RequestLog$badcasesArgs<ExtArgs>
    _count?: boolean | RequestLogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLog"]>

  export type RequestLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    sessionId?: boolean
    userId?: boolean
    orgId?: boolean
    endpoint?: boolean
    modelUsed?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    latencyMs?: boolean
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: boolean
    estimatedCostUsd?: boolean
    traceId?: boolean
    createdAt?: boolean
    session?: boolean | RequestLog$sessionArgs<ExtArgs>
    user?: boolean | RequestLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["requestLog"]>

  export type RequestLogSelectScalar = {
    id?: boolean
    requestId?: boolean
    sessionId?: boolean
    userId?: boolean
    orgId?: boolean
    endpoint?: boolean
    modelUsed?: boolean
    promptTokens?: boolean
    completionTokens?: boolean
    latencyMs?: boolean
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: boolean
    estimatedCostUsd?: boolean
    traceId?: boolean
    createdAt?: boolean
  }

  export type RequestLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RequestLog$sessionArgs<ExtArgs>
    user?: boolean | RequestLog$userArgs<ExtArgs>
    extractions?: boolean | RequestLog$extractionsArgs<ExtArgs>
    actionPreviews?: boolean | RequestLog$actionPreviewsArgs<ExtArgs>
    badcases?: boolean | RequestLog$badcasesArgs<ExtArgs>
    _count?: boolean | RequestLogCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RequestLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | RequestLog$sessionArgs<ExtArgs>
    user?: boolean | RequestLog$userArgs<ExtArgs>
  }

  export type $RequestLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestLog"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
      extractions: Prisma.$ExtractionPayload<ExtArgs>[]
      actionPreviews: Prisma.$ActionPreviewPayload<ExtArgs>[]
      badcases: Prisma.$BadcasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      sessionId: string | null
      userId: string | null
      orgId: string | null
      endpoint: $Enums.EndpointType
      modelUsed: string
      promptTokens: number
      completionTokens: number
      latencyMs: number
      fallbackUsed: boolean
      schemaValid: boolean
      toolCount: number
      estimatedCostUsd: Prisma.Decimal
      traceId: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestLog"]>
    composites: {}
  }

  type RequestLogGetPayload<S extends boolean | null | undefined | RequestLogDefaultArgs> = $Result.GetResult<Prisma.$RequestLogPayload, S>

  type RequestLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RequestLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RequestLogCountAggregateInputType | true
    }

  export interface RequestLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestLog'], meta: { name: 'RequestLog' } }
    /**
     * Find zero or one RequestLog that matches the filter.
     * @param {RequestLogFindUniqueArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestLogFindUniqueArgs>(args: SelectSubset<T, RequestLogFindUniqueArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one RequestLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RequestLogFindUniqueOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestLogFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first RequestLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestLogFindFirstArgs>(args?: SelectSubset<T, RequestLogFindFirstArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first RequestLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestLogFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more RequestLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestLogs
     * const requestLogs = await prisma.requestLog.findMany()
     * 
     * // Get first 10 RequestLogs
     * const requestLogs = await prisma.requestLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestLogFindManyArgs>(args?: SelectSubset<T, RequestLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a RequestLog.
     * @param {RequestLogCreateArgs} args - Arguments to create a RequestLog.
     * @example
     * // Create one RequestLog
     * const RequestLog = await prisma.requestLog.create({
     *   data: {
     *     // ... data to create a RequestLog
     *   }
     * })
     * 
     */
    create<T extends RequestLogCreateArgs>(args: SelectSubset<T, RequestLogCreateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many RequestLogs.
     * @param {RequestLogCreateManyArgs} args - Arguments to create many RequestLogs.
     * @example
     * // Create many RequestLogs
     * const requestLog = await prisma.requestLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestLogCreateManyArgs>(args?: SelectSubset<T, RequestLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestLogs and returns the data saved in the database.
     * @param {RequestLogCreateManyAndReturnArgs} args - Arguments to create many RequestLogs.
     * @example
     * // Create many RequestLogs
     * const requestLog = await prisma.requestLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestLogs and only return the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestLogCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a RequestLog.
     * @param {RequestLogDeleteArgs} args - Arguments to delete one RequestLog.
     * @example
     * // Delete one RequestLog
     * const RequestLog = await prisma.requestLog.delete({
     *   where: {
     *     // ... filter to delete one RequestLog
     *   }
     * })
     * 
     */
    delete<T extends RequestLogDeleteArgs>(args: SelectSubset<T, RequestLogDeleteArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one RequestLog.
     * @param {RequestLogUpdateArgs} args - Arguments to update one RequestLog.
     * @example
     * // Update one RequestLog
     * const requestLog = await prisma.requestLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestLogUpdateArgs>(args: SelectSubset<T, RequestLogUpdateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more RequestLogs.
     * @param {RequestLogDeleteManyArgs} args - Arguments to filter RequestLogs to delete.
     * @example
     * // Delete a few RequestLogs
     * const { count } = await prisma.requestLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestLogDeleteManyArgs>(args?: SelectSubset<T, RequestLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestLogs
     * const requestLog = await prisma.requestLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestLogUpdateManyArgs>(args: SelectSubset<T, RequestLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RequestLog.
     * @param {RequestLogUpsertArgs} args - Arguments to update or create a RequestLog.
     * @example
     * // Update or create a RequestLog
     * const requestLog = await prisma.requestLog.upsert({
     *   create: {
     *     // ... data to create a RequestLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestLog we want to update
     *   }
     * })
     */
    upsert<T extends RequestLogUpsertArgs>(args: SelectSubset<T, RequestLogUpsertArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogCountArgs} args - Arguments to filter RequestLogs to count.
     * @example
     * // Count the number of RequestLogs
     * const count = await prisma.requestLog.count({
     *   where: {
     *     // ... the filter for the RequestLogs we want to count
     *   }
     * })
    **/
    count<T extends RequestLogCountArgs>(
      args?: Subset<T, RequestLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestLogAggregateArgs>(args: Subset<T, RequestLogAggregateArgs>): Prisma.PrismaPromise<GetRequestLogAggregateType<T>>

    /**
     * Group by RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RequestLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestLogGroupByArgs['orderBy'] }
        : { orderBy?: RequestLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RequestLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestLog model
   */
  readonly fields: RequestLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends RequestLog$sessionArgs<ExtArgs> = {}>(args?: Subset<T, RequestLog$sessionArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends RequestLog$userArgs<ExtArgs> = {}>(args?: Subset<T, RequestLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    extractions<T extends RequestLog$extractionsArgs<ExtArgs> = {}>(args?: Subset<T, RequestLog$extractionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findMany"> | Null>
    actionPreviews<T extends RequestLog$actionPreviewsArgs<ExtArgs> = {}>(args?: Subset<T, RequestLog$actionPreviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findMany"> | Null>
    badcases<T extends RequestLog$badcasesArgs<ExtArgs> = {}>(args?: Subset<T, RequestLog$badcasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestLog model
   */ 
  interface RequestLogFieldRefs {
    readonly id: FieldRef<"RequestLog", 'String'>
    readonly requestId: FieldRef<"RequestLog", 'String'>
    readonly sessionId: FieldRef<"RequestLog", 'String'>
    readonly userId: FieldRef<"RequestLog", 'String'>
    readonly orgId: FieldRef<"RequestLog", 'String'>
    readonly endpoint: FieldRef<"RequestLog", 'EndpointType'>
    readonly modelUsed: FieldRef<"RequestLog", 'String'>
    readonly promptTokens: FieldRef<"RequestLog", 'Int'>
    readonly completionTokens: FieldRef<"RequestLog", 'Int'>
    readonly latencyMs: FieldRef<"RequestLog", 'Int'>
    readonly fallbackUsed: FieldRef<"RequestLog", 'Boolean'>
    readonly schemaValid: FieldRef<"RequestLog", 'Boolean'>
    readonly toolCount: FieldRef<"RequestLog", 'Int'>
    readonly estimatedCostUsd: FieldRef<"RequestLog", 'Decimal'>
    readonly traceId: FieldRef<"RequestLog", 'String'>
    readonly createdAt: FieldRef<"RequestLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestLog findUnique
   */
  export type RequestLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findUniqueOrThrow
   */
  export type RequestLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findFirst
   */
  export type RequestLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findFirstOrThrow
   */
  export type RequestLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findMany
   */
  export type RequestLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogs to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog create
   */
  export type RequestLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestLog.
     */
    data: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
  }

  /**
   * RequestLog createMany
   */
  export type RequestLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestLogs.
     */
    data: RequestLogCreateManyInput | RequestLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RequestLog createManyAndReturn
   */
  export type RequestLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many RequestLogs.
     */
    data: RequestLogCreateManyInput | RequestLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestLog update
   */
  export type RequestLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestLog.
     */
    data: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
    /**
     * Choose, which RequestLog to update.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog updateMany
   */
  export type RequestLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestLogs.
     */
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogs to update
     */
    where?: RequestLogWhereInput
  }

  /**
   * RequestLog upsert
   */
  export type RequestLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestLog to update in case it exists.
     */
    where: RequestLogWhereUniqueInput
    /**
     * In case the RequestLog found by the `where` argument doesn't exist, create a new RequestLog with this data.
     */
    create: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
    /**
     * In case the RequestLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
  }

  /**
   * RequestLog delete
   */
  export type RequestLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter which RequestLog to delete.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog deleteMany
   */
  export type RequestLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogs to delete
     */
    where?: RequestLogWhereInput
  }

  /**
   * RequestLog.session
   */
  export type RequestLog$sessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
  }

  /**
   * RequestLog.user
   */
  export type RequestLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RequestLog.extractions
   */
  export type RequestLog$extractionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    where?: ExtractionWhereInput
    orderBy?: ExtractionOrderByWithRelationInput | ExtractionOrderByWithRelationInput[]
    cursor?: ExtractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExtractionScalarFieldEnum | ExtractionScalarFieldEnum[]
  }

  /**
   * RequestLog.actionPreviews
   */
  export type RequestLog$actionPreviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    where?: ActionPreviewWhereInput
    orderBy?: ActionPreviewOrderByWithRelationInput | ActionPreviewOrderByWithRelationInput[]
    cursor?: ActionPreviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionPreviewScalarFieldEnum | ActionPreviewScalarFieldEnum[]
  }

  /**
   * RequestLog.badcases
   */
  export type RequestLog$badcasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    where?: BadcaseWhereInput
    orderBy?: BadcaseOrderByWithRelationInput | BadcaseOrderByWithRelationInput[]
    cursor?: BadcaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BadcaseScalarFieldEnum | BadcaseScalarFieldEnum[]
  }

  /**
   * RequestLog without action
   */
  export type RequestLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
  }


  /**
   * Model Extraction
   */

  export type AggregateExtraction = {
    _count: ExtractionCountAggregateOutputType | null
    _min: ExtractionMinAggregateOutputType | null
    _max: ExtractionMaxAggregateOutputType | null
  }

  export type ExtractionMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    fileId: string | null
    docType: $Enums.ExtractionDocType | null
    needsReview: boolean | null
    reviewStatus: $Enums.ReviewStatus | null
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type ExtractionMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    fileId: string | null
    docType: $Enums.ExtractionDocType | null
    needsReview: boolean | null
    reviewStatus: $Enums.ReviewStatus | null
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date | null
  }

  export type ExtractionCountAggregateOutputType = {
    id: number
    requestId: number
    fileId: number
    docType: number
    fields: number
    confidenceScores: number
    warnings: number
    needsReview: number
    reviewStatus: number
    reviewedBy: number
    reviewedAt: number
    createdAt: number
    _all: number
  }


  export type ExtractionMinAggregateInputType = {
    id?: true
    requestId?: true
    fileId?: true
    docType?: true
    needsReview?: true
    reviewStatus?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type ExtractionMaxAggregateInputType = {
    id?: true
    requestId?: true
    fileId?: true
    docType?: true
    needsReview?: true
    reviewStatus?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
  }

  export type ExtractionCountAggregateInputType = {
    id?: true
    requestId?: true
    fileId?: true
    docType?: true
    fields?: true
    confidenceScores?: true
    warnings?: true
    needsReview?: true
    reviewStatus?: true
    reviewedBy?: true
    reviewedAt?: true
    createdAt?: true
    _all?: true
  }

  export type ExtractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Extraction to aggregate.
     */
    where?: ExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extractions to fetch.
     */
    orderBy?: ExtractionOrderByWithRelationInput | ExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Extractions
    **/
    _count?: true | ExtractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExtractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExtractionMaxAggregateInputType
  }

  export type GetExtractionAggregateType<T extends ExtractionAggregateArgs> = {
        [P in keyof T & keyof AggregateExtraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExtraction[P]>
      : GetScalarType<T[P], AggregateExtraction[P]>
  }




  export type ExtractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExtractionWhereInput
    orderBy?: ExtractionOrderByWithAggregationInput | ExtractionOrderByWithAggregationInput[]
    by: ExtractionScalarFieldEnum[] | ExtractionScalarFieldEnum
    having?: ExtractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExtractionCountAggregateInputType | true
    _min?: ExtractionMinAggregateInputType
    _max?: ExtractionMaxAggregateInputType
  }

  export type ExtractionGroupByOutputType = {
    id: string
    requestId: string
    fileId: string | null
    docType: $Enums.ExtractionDocType
    fields: JsonValue
    confidenceScores: JsonValue
    warnings: JsonValue
    needsReview: boolean
    reviewStatus: $Enums.ReviewStatus
    reviewedBy: string | null
    reviewedAt: Date | null
    createdAt: Date
    _count: ExtractionCountAggregateOutputType | null
    _min: ExtractionMinAggregateOutputType | null
    _max: ExtractionMaxAggregateOutputType | null
  }

  type GetExtractionGroupByPayload<T extends ExtractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExtractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExtractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExtractionGroupByOutputType[P]>
            : GetScalarType<T[P], ExtractionGroupByOutputType[P]>
        }
      >
    >


  export type ExtractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    fileId?: boolean
    docType?: boolean
    fields?: boolean
    confidenceScores?: boolean
    warnings?: boolean
    needsReview?: boolean
    reviewStatus?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extraction"]>

  export type ExtractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    fileId?: boolean
    docType?: boolean
    fields?: boolean
    confidenceScores?: boolean
    warnings?: boolean
    needsReview?: boolean
    reviewStatus?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["extraction"]>

  export type ExtractionSelectScalar = {
    id?: boolean
    requestId?: boolean
    fileId?: boolean
    docType?: boolean
    fields?: boolean
    confidenceScores?: boolean
    warnings?: boolean
    needsReview?: boolean
    reviewStatus?: boolean
    reviewedBy?: boolean
    reviewedAt?: boolean
    createdAt?: boolean
  }

  export type ExtractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }
  export type ExtractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }

  export type $ExtractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Extraction"
    objects: {
      requestLog: Prisma.$RequestLogPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      fileId: string | null
      docType: $Enums.ExtractionDocType
      fields: Prisma.JsonValue
      confidenceScores: Prisma.JsonValue
      warnings: Prisma.JsonValue
      needsReview: boolean
      reviewStatus: $Enums.ReviewStatus
      reviewedBy: string | null
      reviewedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["extraction"]>
    composites: {}
  }

  type ExtractionGetPayload<S extends boolean | null | undefined | ExtractionDefaultArgs> = $Result.GetResult<Prisma.$ExtractionPayload, S>

  type ExtractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExtractionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExtractionCountAggregateInputType | true
    }

  export interface ExtractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Extraction'], meta: { name: 'Extraction' } }
    /**
     * Find zero or one Extraction that matches the filter.
     * @param {ExtractionFindUniqueArgs} args - Arguments to find a Extraction
     * @example
     * // Get one Extraction
     * const extraction = await prisma.extraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExtractionFindUniqueArgs>(args: SelectSubset<T, ExtractionFindUniqueArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Extraction that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExtractionFindUniqueOrThrowArgs} args - Arguments to find a Extraction
     * @example
     * // Get one Extraction
     * const extraction = await prisma.extraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExtractionFindUniqueOrThrowArgs>(args: SelectSubset<T, ExtractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Extraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionFindFirstArgs} args - Arguments to find a Extraction
     * @example
     * // Get one Extraction
     * const extraction = await prisma.extraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExtractionFindFirstArgs>(args?: SelectSubset<T, ExtractionFindFirstArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Extraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionFindFirstOrThrowArgs} args - Arguments to find a Extraction
     * @example
     * // Get one Extraction
     * const extraction = await prisma.extraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExtractionFindFirstOrThrowArgs>(args?: SelectSubset<T, ExtractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Extractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Extractions
     * const extractions = await prisma.extraction.findMany()
     * 
     * // Get first 10 Extractions
     * const extractions = await prisma.extraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const extractionWithIdOnly = await prisma.extraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExtractionFindManyArgs>(args?: SelectSubset<T, ExtractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Extraction.
     * @param {ExtractionCreateArgs} args - Arguments to create a Extraction.
     * @example
     * // Create one Extraction
     * const Extraction = await prisma.extraction.create({
     *   data: {
     *     // ... data to create a Extraction
     *   }
     * })
     * 
     */
    create<T extends ExtractionCreateArgs>(args: SelectSubset<T, ExtractionCreateArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Extractions.
     * @param {ExtractionCreateManyArgs} args - Arguments to create many Extractions.
     * @example
     * // Create many Extractions
     * const extraction = await prisma.extraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExtractionCreateManyArgs>(args?: SelectSubset<T, ExtractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Extractions and returns the data saved in the database.
     * @param {ExtractionCreateManyAndReturnArgs} args - Arguments to create many Extractions.
     * @example
     * // Create many Extractions
     * const extraction = await prisma.extraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Extractions and only return the `id`
     * const extractionWithIdOnly = await prisma.extraction.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExtractionCreateManyAndReturnArgs>(args?: SelectSubset<T, ExtractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Extraction.
     * @param {ExtractionDeleteArgs} args - Arguments to delete one Extraction.
     * @example
     * // Delete one Extraction
     * const Extraction = await prisma.extraction.delete({
     *   where: {
     *     // ... filter to delete one Extraction
     *   }
     * })
     * 
     */
    delete<T extends ExtractionDeleteArgs>(args: SelectSubset<T, ExtractionDeleteArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Extraction.
     * @param {ExtractionUpdateArgs} args - Arguments to update one Extraction.
     * @example
     * // Update one Extraction
     * const extraction = await prisma.extraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExtractionUpdateArgs>(args: SelectSubset<T, ExtractionUpdateArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Extractions.
     * @param {ExtractionDeleteManyArgs} args - Arguments to filter Extractions to delete.
     * @example
     * // Delete a few Extractions
     * const { count } = await prisma.extraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExtractionDeleteManyArgs>(args?: SelectSubset<T, ExtractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Extractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Extractions
     * const extraction = await prisma.extraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExtractionUpdateManyArgs>(args: SelectSubset<T, ExtractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Extraction.
     * @param {ExtractionUpsertArgs} args - Arguments to update or create a Extraction.
     * @example
     * // Update or create a Extraction
     * const extraction = await prisma.extraction.upsert({
     *   create: {
     *     // ... data to create a Extraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Extraction we want to update
     *   }
     * })
     */
    upsert<T extends ExtractionUpsertArgs>(args: SelectSubset<T, ExtractionUpsertArgs<ExtArgs>>): Prisma__ExtractionClient<$Result.GetResult<Prisma.$ExtractionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Extractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionCountArgs} args - Arguments to filter Extractions to count.
     * @example
     * // Count the number of Extractions
     * const count = await prisma.extraction.count({
     *   where: {
     *     // ... the filter for the Extractions we want to count
     *   }
     * })
    **/
    count<T extends ExtractionCountArgs>(
      args?: Subset<T, ExtractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExtractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Extraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExtractionAggregateArgs>(args: Subset<T, ExtractionAggregateArgs>): Prisma.PrismaPromise<GetExtractionAggregateType<T>>

    /**
     * Group by Extraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExtractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExtractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExtractionGroupByArgs['orderBy'] }
        : { orderBy?: ExtractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExtractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExtractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Extraction model
   */
  readonly fields: ExtractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Extraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExtractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requestLog<T extends RequestLogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RequestLogDefaultArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Extraction model
   */ 
  interface ExtractionFieldRefs {
    readonly id: FieldRef<"Extraction", 'String'>
    readonly requestId: FieldRef<"Extraction", 'String'>
    readonly fileId: FieldRef<"Extraction", 'String'>
    readonly docType: FieldRef<"Extraction", 'ExtractionDocType'>
    readonly fields: FieldRef<"Extraction", 'Json'>
    readonly confidenceScores: FieldRef<"Extraction", 'Json'>
    readonly warnings: FieldRef<"Extraction", 'Json'>
    readonly needsReview: FieldRef<"Extraction", 'Boolean'>
    readonly reviewStatus: FieldRef<"Extraction", 'ReviewStatus'>
    readonly reviewedBy: FieldRef<"Extraction", 'String'>
    readonly reviewedAt: FieldRef<"Extraction", 'DateTime'>
    readonly createdAt: FieldRef<"Extraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Extraction findUnique
   */
  export type ExtractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter, which Extraction to fetch.
     */
    where: ExtractionWhereUniqueInput
  }

  /**
   * Extraction findUniqueOrThrow
   */
  export type ExtractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter, which Extraction to fetch.
     */
    where: ExtractionWhereUniqueInput
  }

  /**
   * Extraction findFirst
   */
  export type ExtractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter, which Extraction to fetch.
     */
    where?: ExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extractions to fetch.
     */
    orderBy?: ExtractionOrderByWithRelationInput | ExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Extractions.
     */
    cursor?: ExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Extractions.
     */
    distinct?: ExtractionScalarFieldEnum | ExtractionScalarFieldEnum[]
  }

  /**
   * Extraction findFirstOrThrow
   */
  export type ExtractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter, which Extraction to fetch.
     */
    where?: ExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extractions to fetch.
     */
    orderBy?: ExtractionOrderByWithRelationInput | ExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Extractions.
     */
    cursor?: ExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Extractions.
     */
    distinct?: ExtractionScalarFieldEnum | ExtractionScalarFieldEnum[]
  }

  /**
   * Extraction findMany
   */
  export type ExtractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter, which Extractions to fetch.
     */
    where?: ExtractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Extractions to fetch.
     */
    orderBy?: ExtractionOrderByWithRelationInput | ExtractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Extractions.
     */
    cursor?: ExtractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Extractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Extractions.
     */
    skip?: number
    distinct?: ExtractionScalarFieldEnum | ExtractionScalarFieldEnum[]
  }

  /**
   * Extraction create
   */
  export type ExtractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * The data needed to create a Extraction.
     */
    data: XOR<ExtractionCreateInput, ExtractionUncheckedCreateInput>
  }

  /**
   * Extraction createMany
   */
  export type ExtractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Extractions.
     */
    data: ExtractionCreateManyInput | ExtractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Extraction createManyAndReturn
   */
  export type ExtractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Extractions.
     */
    data: ExtractionCreateManyInput | ExtractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Extraction update
   */
  export type ExtractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * The data needed to update a Extraction.
     */
    data: XOR<ExtractionUpdateInput, ExtractionUncheckedUpdateInput>
    /**
     * Choose, which Extraction to update.
     */
    where: ExtractionWhereUniqueInput
  }

  /**
   * Extraction updateMany
   */
  export type ExtractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Extractions.
     */
    data: XOR<ExtractionUpdateManyMutationInput, ExtractionUncheckedUpdateManyInput>
    /**
     * Filter which Extractions to update
     */
    where?: ExtractionWhereInput
  }

  /**
   * Extraction upsert
   */
  export type ExtractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * The filter to search for the Extraction to update in case it exists.
     */
    where: ExtractionWhereUniqueInput
    /**
     * In case the Extraction found by the `where` argument doesn't exist, create a new Extraction with this data.
     */
    create: XOR<ExtractionCreateInput, ExtractionUncheckedCreateInput>
    /**
     * In case the Extraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExtractionUpdateInput, ExtractionUncheckedUpdateInput>
  }

  /**
   * Extraction delete
   */
  export type ExtractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
    /**
     * Filter which Extraction to delete.
     */
    where: ExtractionWhereUniqueInput
  }

  /**
   * Extraction deleteMany
   */
  export type ExtractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Extractions to delete
     */
    where?: ExtractionWhereInput
  }

  /**
   * Extraction without action
   */
  export type ExtractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Extraction
     */
    select?: ExtractionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExtractionInclude<ExtArgs> | null
  }


  /**
   * Model ActionPreview
   */

  export type AggregateActionPreview = {
    _count: ActionPreviewCountAggregateOutputType | null
    _min: ActionPreviewMinAggregateOutputType | null
    _max: ActionPreviewMaxAggregateOutputType | null
  }

  export type ActionPreviewMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    actionType: $Enums.ActionType | null
    targetType: string | null
    targetId: string | null
    allowed: boolean | null
    humanConfirmationRequired: boolean | null
    previewToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ActionPreviewMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    actionType: $Enums.ActionType | null
    targetType: string | null
    targetId: string | null
    allowed: boolean | null
    humanConfirmationRequired: boolean | null
    previewToken: string | null
    expiresAt: Date | null
    createdAt: Date | null
  }

  export type ActionPreviewCountAggregateOutputType = {
    id: number
    requestId: number
    actionType: number
    targetType: number
    targetId: number
    payload: number
    allowed: number
    missingChecks: number
    impactSummary: number
    humanConfirmationRequired: number
    previewToken: number
    expiresAt: number
    createdAt: number
    _all: number
  }


  export type ActionPreviewMinAggregateInputType = {
    id?: true
    requestId?: true
    actionType?: true
    targetType?: true
    targetId?: true
    allowed?: true
    humanConfirmationRequired?: true
    previewToken?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ActionPreviewMaxAggregateInputType = {
    id?: true
    requestId?: true
    actionType?: true
    targetType?: true
    targetId?: true
    allowed?: true
    humanConfirmationRequired?: true
    previewToken?: true
    expiresAt?: true
    createdAt?: true
  }

  export type ActionPreviewCountAggregateInputType = {
    id?: true
    requestId?: true
    actionType?: true
    targetType?: true
    targetId?: true
    payload?: true
    allowed?: true
    missingChecks?: true
    impactSummary?: true
    humanConfirmationRequired?: true
    previewToken?: true
    expiresAt?: true
    createdAt?: true
    _all?: true
  }

  export type ActionPreviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionPreview to aggregate.
     */
    where?: ActionPreviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionPreviews to fetch.
     */
    orderBy?: ActionPreviewOrderByWithRelationInput | ActionPreviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionPreviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionPreviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionPreviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionPreviews
    **/
    _count?: true | ActionPreviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionPreviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionPreviewMaxAggregateInputType
  }

  export type GetActionPreviewAggregateType<T extends ActionPreviewAggregateArgs> = {
        [P in keyof T & keyof AggregateActionPreview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionPreview[P]>
      : GetScalarType<T[P], AggregateActionPreview[P]>
  }




  export type ActionPreviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionPreviewWhereInput
    orderBy?: ActionPreviewOrderByWithAggregationInput | ActionPreviewOrderByWithAggregationInput[]
    by: ActionPreviewScalarFieldEnum[] | ActionPreviewScalarFieldEnum
    having?: ActionPreviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionPreviewCountAggregateInputType | true
    _min?: ActionPreviewMinAggregateInputType
    _max?: ActionPreviewMaxAggregateInputType
  }

  export type ActionPreviewGroupByOutputType = {
    id: string
    requestId: string
    actionType: $Enums.ActionType
    targetType: string
    targetId: string | null
    payload: JsonValue
    allowed: boolean
    missingChecks: JsonValue
    impactSummary: JsonValue
    humanConfirmationRequired: boolean
    previewToken: string | null
    expiresAt: Date | null
    createdAt: Date
    _count: ActionPreviewCountAggregateOutputType | null
    _min: ActionPreviewMinAggregateOutputType | null
    _max: ActionPreviewMaxAggregateOutputType | null
  }

  type GetActionPreviewGroupByPayload<T extends ActionPreviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionPreviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionPreviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionPreviewGroupByOutputType[P]>
            : GetScalarType<T[P], ActionPreviewGroupByOutputType[P]>
        }
      >
    >


  export type ActionPreviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    actionType?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    allowed?: boolean
    missingChecks?: boolean
    impactSummary?: boolean
    humanConfirmationRequired?: boolean
    previewToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
    executions?: boolean | ActionPreview$executionsArgs<ExtArgs>
    _count?: boolean | ActionPreviewCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionPreview"]>

  export type ActionPreviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    actionType?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    allowed?: boolean
    missingChecks?: boolean
    impactSummary?: boolean
    humanConfirmationRequired?: boolean
    previewToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionPreview"]>

  export type ActionPreviewSelectScalar = {
    id?: boolean
    requestId?: boolean
    actionType?: boolean
    targetType?: boolean
    targetId?: boolean
    payload?: boolean
    allowed?: boolean
    missingChecks?: boolean
    impactSummary?: boolean
    humanConfirmationRequired?: boolean
    previewToken?: boolean
    expiresAt?: boolean
    createdAt?: boolean
  }

  export type ActionPreviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
    executions?: boolean | ActionPreview$executionsArgs<ExtArgs>
    _count?: boolean | ActionPreviewCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActionPreviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }

  export type $ActionPreviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionPreview"
    objects: {
      requestLog: Prisma.$RequestLogPayload<ExtArgs>
      executions: Prisma.$ActionExecutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      actionType: $Enums.ActionType
      targetType: string
      targetId: string | null
      payload: Prisma.JsonValue
      allowed: boolean
      missingChecks: Prisma.JsonValue
      impactSummary: Prisma.JsonValue
      humanConfirmationRequired: boolean
      previewToken: string | null
      expiresAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["actionPreview"]>
    composites: {}
  }

  type ActionPreviewGetPayload<S extends boolean | null | undefined | ActionPreviewDefaultArgs> = $Result.GetResult<Prisma.$ActionPreviewPayload, S>

  type ActionPreviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActionPreviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActionPreviewCountAggregateInputType | true
    }

  export interface ActionPreviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionPreview'], meta: { name: 'ActionPreview' } }
    /**
     * Find zero or one ActionPreview that matches the filter.
     * @param {ActionPreviewFindUniqueArgs} args - Arguments to find a ActionPreview
     * @example
     * // Get one ActionPreview
     * const actionPreview = await prisma.actionPreview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionPreviewFindUniqueArgs>(args: SelectSubset<T, ActionPreviewFindUniqueArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActionPreview that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActionPreviewFindUniqueOrThrowArgs} args - Arguments to find a ActionPreview
     * @example
     * // Get one ActionPreview
     * const actionPreview = await prisma.actionPreview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionPreviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionPreviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActionPreview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewFindFirstArgs} args - Arguments to find a ActionPreview
     * @example
     * // Get one ActionPreview
     * const actionPreview = await prisma.actionPreview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionPreviewFindFirstArgs>(args?: SelectSubset<T, ActionPreviewFindFirstArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActionPreview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewFindFirstOrThrowArgs} args - Arguments to find a ActionPreview
     * @example
     * // Get one ActionPreview
     * const actionPreview = await prisma.actionPreview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionPreviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionPreviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActionPreviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionPreviews
     * const actionPreviews = await prisma.actionPreview.findMany()
     * 
     * // Get first 10 ActionPreviews
     * const actionPreviews = await prisma.actionPreview.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionPreviewWithIdOnly = await prisma.actionPreview.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionPreviewFindManyArgs>(args?: SelectSubset<T, ActionPreviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActionPreview.
     * @param {ActionPreviewCreateArgs} args - Arguments to create a ActionPreview.
     * @example
     * // Create one ActionPreview
     * const ActionPreview = await prisma.actionPreview.create({
     *   data: {
     *     // ... data to create a ActionPreview
     *   }
     * })
     * 
     */
    create<T extends ActionPreviewCreateArgs>(args: SelectSubset<T, ActionPreviewCreateArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActionPreviews.
     * @param {ActionPreviewCreateManyArgs} args - Arguments to create many ActionPreviews.
     * @example
     * // Create many ActionPreviews
     * const actionPreview = await prisma.actionPreview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionPreviewCreateManyArgs>(args?: SelectSubset<T, ActionPreviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionPreviews and returns the data saved in the database.
     * @param {ActionPreviewCreateManyAndReturnArgs} args - Arguments to create many ActionPreviews.
     * @example
     * // Create many ActionPreviews
     * const actionPreview = await prisma.actionPreview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionPreviews and only return the `id`
     * const actionPreviewWithIdOnly = await prisma.actionPreview.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionPreviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionPreviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActionPreview.
     * @param {ActionPreviewDeleteArgs} args - Arguments to delete one ActionPreview.
     * @example
     * // Delete one ActionPreview
     * const ActionPreview = await prisma.actionPreview.delete({
     *   where: {
     *     // ... filter to delete one ActionPreview
     *   }
     * })
     * 
     */
    delete<T extends ActionPreviewDeleteArgs>(args: SelectSubset<T, ActionPreviewDeleteArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActionPreview.
     * @param {ActionPreviewUpdateArgs} args - Arguments to update one ActionPreview.
     * @example
     * // Update one ActionPreview
     * const actionPreview = await prisma.actionPreview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionPreviewUpdateArgs>(args: SelectSubset<T, ActionPreviewUpdateArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActionPreviews.
     * @param {ActionPreviewDeleteManyArgs} args - Arguments to filter ActionPreviews to delete.
     * @example
     * // Delete a few ActionPreviews
     * const { count } = await prisma.actionPreview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionPreviewDeleteManyArgs>(args?: SelectSubset<T, ActionPreviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionPreviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionPreviews
     * const actionPreview = await prisma.actionPreview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionPreviewUpdateManyArgs>(args: SelectSubset<T, ActionPreviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActionPreview.
     * @param {ActionPreviewUpsertArgs} args - Arguments to update or create a ActionPreview.
     * @example
     * // Update or create a ActionPreview
     * const actionPreview = await prisma.actionPreview.upsert({
     *   create: {
     *     // ... data to create a ActionPreview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionPreview we want to update
     *   }
     * })
     */
    upsert<T extends ActionPreviewUpsertArgs>(args: SelectSubset<T, ActionPreviewUpsertArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActionPreviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewCountArgs} args - Arguments to filter ActionPreviews to count.
     * @example
     * // Count the number of ActionPreviews
     * const count = await prisma.actionPreview.count({
     *   where: {
     *     // ... the filter for the ActionPreviews we want to count
     *   }
     * })
    **/
    count<T extends ActionPreviewCountArgs>(
      args?: Subset<T, ActionPreviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionPreviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionPreview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionPreviewAggregateArgs>(args: Subset<T, ActionPreviewAggregateArgs>): Prisma.PrismaPromise<GetActionPreviewAggregateType<T>>

    /**
     * Group by ActionPreview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionPreviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionPreviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionPreviewGroupByArgs['orderBy'] }
        : { orderBy?: ActionPreviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionPreviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionPreviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionPreview model
   */
  readonly fields: ActionPreviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionPreview.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionPreviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requestLog<T extends RequestLogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RequestLogDefaultArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    executions<T extends ActionPreview$executionsArgs<ExtArgs> = {}>(args?: Subset<T, ActionPreview$executionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionPreview model
   */ 
  interface ActionPreviewFieldRefs {
    readonly id: FieldRef<"ActionPreview", 'String'>
    readonly requestId: FieldRef<"ActionPreview", 'String'>
    readonly actionType: FieldRef<"ActionPreview", 'ActionType'>
    readonly targetType: FieldRef<"ActionPreview", 'String'>
    readonly targetId: FieldRef<"ActionPreview", 'String'>
    readonly payload: FieldRef<"ActionPreview", 'Json'>
    readonly allowed: FieldRef<"ActionPreview", 'Boolean'>
    readonly missingChecks: FieldRef<"ActionPreview", 'Json'>
    readonly impactSummary: FieldRef<"ActionPreview", 'Json'>
    readonly humanConfirmationRequired: FieldRef<"ActionPreview", 'Boolean'>
    readonly previewToken: FieldRef<"ActionPreview", 'String'>
    readonly expiresAt: FieldRef<"ActionPreview", 'DateTime'>
    readonly createdAt: FieldRef<"ActionPreview", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActionPreview findUnique
   */
  export type ActionPreviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter, which ActionPreview to fetch.
     */
    where: ActionPreviewWhereUniqueInput
  }

  /**
   * ActionPreview findUniqueOrThrow
   */
  export type ActionPreviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter, which ActionPreview to fetch.
     */
    where: ActionPreviewWhereUniqueInput
  }

  /**
   * ActionPreview findFirst
   */
  export type ActionPreviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter, which ActionPreview to fetch.
     */
    where?: ActionPreviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionPreviews to fetch.
     */
    orderBy?: ActionPreviewOrderByWithRelationInput | ActionPreviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionPreviews.
     */
    cursor?: ActionPreviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionPreviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionPreviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionPreviews.
     */
    distinct?: ActionPreviewScalarFieldEnum | ActionPreviewScalarFieldEnum[]
  }

  /**
   * ActionPreview findFirstOrThrow
   */
  export type ActionPreviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter, which ActionPreview to fetch.
     */
    where?: ActionPreviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionPreviews to fetch.
     */
    orderBy?: ActionPreviewOrderByWithRelationInput | ActionPreviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionPreviews.
     */
    cursor?: ActionPreviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionPreviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionPreviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionPreviews.
     */
    distinct?: ActionPreviewScalarFieldEnum | ActionPreviewScalarFieldEnum[]
  }

  /**
   * ActionPreview findMany
   */
  export type ActionPreviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter, which ActionPreviews to fetch.
     */
    where?: ActionPreviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionPreviews to fetch.
     */
    orderBy?: ActionPreviewOrderByWithRelationInput | ActionPreviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionPreviews.
     */
    cursor?: ActionPreviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionPreviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionPreviews.
     */
    skip?: number
    distinct?: ActionPreviewScalarFieldEnum | ActionPreviewScalarFieldEnum[]
  }

  /**
   * ActionPreview create
   */
  export type ActionPreviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionPreview.
     */
    data: XOR<ActionPreviewCreateInput, ActionPreviewUncheckedCreateInput>
  }

  /**
   * ActionPreview createMany
   */
  export type ActionPreviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionPreviews.
     */
    data: ActionPreviewCreateManyInput | ActionPreviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionPreview createManyAndReturn
   */
  export type ActionPreviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActionPreviews.
     */
    data: ActionPreviewCreateManyInput | ActionPreviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionPreview update
   */
  export type ActionPreviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionPreview.
     */
    data: XOR<ActionPreviewUpdateInput, ActionPreviewUncheckedUpdateInput>
    /**
     * Choose, which ActionPreview to update.
     */
    where: ActionPreviewWhereUniqueInput
  }

  /**
   * ActionPreview updateMany
   */
  export type ActionPreviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionPreviews.
     */
    data: XOR<ActionPreviewUpdateManyMutationInput, ActionPreviewUncheckedUpdateManyInput>
    /**
     * Filter which ActionPreviews to update
     */
    where?: ActionPreviewWhereInput
  }

  /**
   * ActionPreview upsert
   */
  export type ActionPreviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionPreview to update in case it exists.
     */
    where: ActionPreviewWhereUniqueInput
    /**
     * In case the ActionPreview found by the `where` argument doesn't exist, create a new ActionPreview with this data.
     */
    create: XOR<ActionPreviewCreateInput, ActionPreviewUncheckedCreateInput>
    /**
     * In case the ActionPreview was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionPreviewUpdateInput, ActionPreviewUncheckedUpdateInput>
  }

  /**
   * ActionPreview delete
   */
  export type ActionPreviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
    /**
     * Filter which ActionPreview to delete.
     */
    where: ActionPreviewWhereUniqueInput
  }

  /**
   * ActionPreview deleteMany
   */
  export type ActionPreviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionPreviews to delete
     */
    where?: ActionPreviewWhereInput
  }

  /**
   * ActionPreview.executions
   */
  export type ActionPreview$executionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    where?: ActionExecutionWhereInput
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    cursor?: ActionExecutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionExecutionScalarFieldEnum | ActionExecutionScalarFieldEnum[]
  }

  /**
   * ActionPreview without action
   */
  export type ActionPreviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionPreview
     */
    select?: ActionPreviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionPreviewInclude<ExtArgs> | null
  }


  /**
   * Model ActionExecution
   */

  export type AggregateActionExecution = {
    _count: ActionExecutionCountAggregateOutputType | null
    _min: ActionExecutionMinAggregateOutputType | null
    _max: ActionExecutionMaxAggregateOutputType | null
  }

  export type ActionExecutionMinAggregateOutputType = {
    id: string | null
    previewId: string | null
    executedBy: string | null
    executedAt: Date | null
    confirmationMethod: $Enums.ConfirmationMethod | null
  }

  export type ActionExecutionMaxAggregateOutputType = {
    id: string | null
    previewId: string | null
    executedBy: string | null
    executedAt: Date | null
    confirmationMethod: $Enums.ConfirmationMethod | null
  }

  export type ActionExecutionCountAggregateOutputType = {
    id: number
    previewId: number
    executedBy: number
    executedAt: number
    confirmationMethod: number
    result: number
    auditTrail: number
    _all: number
  }


  export type ActionExecutionMinAggregateInputType = {
    id?: true
    previewId?: true
    executedBy?: true
    executedAt?: true
    confirmationMethod?: true
  }

  export type ActionExecutionMaxAggregateInputType = {
    id?: true
    previewId?: true
    executedBy?: true
    executedAt?: true
    confirmationMethod?: true
  }

  export type ActionExecutionCountAggregateInputType = {
    id?: true
    previewId?: true
    executedBy?: true
    executedAt?: true
    confirmationMethod?: true
    result?: true
    auditTrail?: true
    _all?: true
  }

  export type ActionExecutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionExecution to aggregate.
     */
    where?: ActionExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionExecutions to fetch.
     */
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionExecutions
    **/
    _count?: true | ActionExecutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionExecutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionExecutionMaxAggregateInputType
  }

  export type GetActionExecutionAggregateType<T extends ActionExecutionAggregateArgs> = {
        [P in keyof T & keyof AggregateActionExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionExecution[P]>
      : GetScalarType<T[P], AggregateActionExecution[P]>
  }




  export type ActionExecutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionExecutionWhereInput
    orderBy?: ActionExecutionOrderByWithAggregationInput | ActionExecutionOrderByWithAggregationInput[]
    by: ActionExecutionScalarFieldEnum[] | ActionExecutionScalarFieldEnum
    having?: ActionExecutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionExecutionCountAggregateInputType | true
    _min?: ActionExecutionMinAggregateInputType
    _max?: ActionExecutionMaxAggregateInputType
  }

  export type ActionExecutionGroupByOutputType = {
    id: string
    previewId: string
    executedBy: string
    executedAt: Date
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonValue
    auditTrail: JsonValue
    _count: ActionExecutionCountAggregateOutputType | null
    _min: ActionExecutionMinAggregateOutputType | null
    _max: ActionExecutionMaxAggregateOutputType | null
  }

  type GetActionExecutionGroupByPayload<T extends ActionExecutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionExecutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionExecutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], ActionExecutionGroupByOutputType[P]>
        }
      >
    >


  export type ActionExecutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    previewId?: boolean
    executedBy?: boolean
    executedAt?: boolean
    confirmationMethod?: boolean
    result?: boolean
    auditTrail?: boolean
    preview?: boolean | ActionPreviewDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionExecution"]>

  export type ActionExecutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    previewId?: boolean
    executedBy?: boolean
    executedAt?: boolean
    confirmationMethod?: boolean
    result?: boolean
    auditTrail?: boolean
    preview?: boolean | ActionPreviewDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionExecution"]>

  export type ActionExecutionSelectScalar = {
    id?: boolean
    previewId?: boolean
    executedBy?: boolean
    executedAt?: boolean
    confirmationMethod?: boolean
    result?: boolean
    auditTrail?: boolean
  }

  export type ActionExecutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preview?: boolean | ActionPreviewDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActionExecutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    preview?: boolean | ActionPreviewDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActionExecutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionExecution"
    objects: {
      preview: Prisma.$ActionPreviewPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      previewId: string
      executedBy: string
      executedAt: Date
      confirmationMethod: $Enums.ConfirmationMethod
      result: Prisma.JsonValue
      auditTrail: Prisma.JsonValue
    }, ExtArgs["result"]["actionExecution"]>
    composites: {}
  }

  type ActionExecutionGetPayload<S extends boolean | null | undefined | ActionExecutionDefaultArgs> = $Result.GetResult<Prisma.$ActionExecutionPayload, S>

  type ActionExecutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActionExecutionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActionExecutionCountAggregateInputType | true
    }

  export interface ActionExecutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionExecution'], meta: { name: 'ActionExecution' } }
    /**
     * Find zero or one ActionExecution that matches the filter.
     * @param {ActionExecutionFindUniqueArgs} args - Arguments to find a ActionExecution
     * @example
     * // Get one ActionExecution
     * const actionExecution = await prisma.actionExecution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionExecutionFindUniqueArgs>(args: SelectSubset<T, ActionExecutionFindUniqueArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActionExecution that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActionExecutionFindUniqueOrThrowArgs} args - Arguments to find a ActionExecution
     * @example
     * // Get one ActionExecution
     * const actionExecution = await prisma.actionExecution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionExecutionFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActionExecution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionFindFirstArgs} args - Arguments to find a ActionExecution
     * @example
     * // Get one ActionExecution
     * const actionExecution = await prisma.actionExecution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionExecutionFindFirstArgs>(args?: SelectSubset<T, ActionExecutionFindFirstArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActionExecution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionFindFirstOrThrowArgs} args - Arguments to find a ActionExecution
     * @example
     * // Get one ActionExecution
     * const actionExecution = await prisma.actionExecution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionExecutionFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActionExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionExecutions
     * const actionExecutions = await prisma.actionExecution.findMany()
     * 
     * // Get first 10 ActionExecutions
     * const actionExecutions = await prisma.actionExecution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionExecutionWithIdOnly = await prisma.actionExecution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionExecutionFindManyArgs>(args?: SelectSubset<T, ActionExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActionExecution.
     * @param {ActionExecutionCreateArgs} args - Arguments to create a ActionExecution.
     * @example
     * // Create one ActionExecution
     * const ActionExecution = await prisma.actionExecution.create({
     *   data: {
     *     // ... data to create a ActionExecution
     *   }
     * })
     * 
     */
    create<T extends ActionExecutionCreateArgs>(args: SelectSubset<T, ActionExecutionCreateArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActionExecutions.
     * @param {ActionExecutionCreateManyArgs} args - Arguments to create many ActionExecutions.
     * @example
     * // Create many ActionExecutions
     * const actionExecution = await prisma.actionExecution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionExecutionCreateManyArgs>(args?: SelectSubset<T, ActionExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionExecutions and returns the data saved in the database.
     * @param {ActionExecutionCreateManyAndReturnArgs} args - Arguments to create many ActionExecutions.
     * @example
     * // Create many ActionExecutions
     * const actionExecution = await prisma.actionExecution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionExecutions and only return the `id`
     * const actionExecutionWithIdOnly = await prisma.actionExecution.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionExecutionCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActionExecution.
     * @param {ActionExecutionDeleteArgs} args - Arguments to delete one ActionExecution.
     * @example
     * // Delete one ActionExecution
     * const ActionExecution = await prisma.actionExecution.delete({
     *   where: {
     *     // ... filter to delete one ActionExecution
     *   }
     * })
     * 
     */
    delete<T extends ActionExecutionDeleteArgs>(args: SelectSubset<T, ActionExecutionDeleteArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActionExecution.
     * @param {ActionExecutionUpdateArgs} args - Arguments to update one ActionExecution.
     * @example
     * // Update one ActionExecution
     * const actionExecution = await prisma.actionExecution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionExecutionUpdateArgs>(args: SelectSubset<T, ActionExecutionUpdateArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActionExecutions.
     * @param {ActionExecutionDeleteManyArgs} args - Arguments to filter ActionExecutions to delete.
     * @example
     * // Delete a few ActionExecutions
     * const { count } = await prisma.actionExecution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionExecutionDeleteManyArgs>(args?: SelectSubset<T, ActionExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionExecutions
     * const actionExecution = await prisma.actionExecution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionExecutionUpdateManyArgs>(args: SelectSubset<T, ActionExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActionExecution.
     * @param {ActionExecutionUpsertArgs} args - Arguments to update or create a ActionExecution.
     * @example
     * // Update or create a ActionExecution
     * const actionExecution = await prisma.actionExecution.upsert({
     *   create: {
     *     // ... data to create a ActionExecution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionExecution we want to update
     *   }
     * })
     */
    upsert<T extends ActionExecutionUpsertArgs>(args: SelectSubset<T, ActionExecutionUpsertArgs<ExtArgs>>): Prisma__ActionExecutionClient<$Result.GetResult<Prisma.$ActionExecutionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActionExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionCountArgs} args - Arguments to filter ActionExecutions to count.
     * @example
     * // Count the number of ActionExecutions
     * const count = await prisma.actionExecution.count({
     *   where: {
     *     // ... the filter for the ActionExecutions we want to count
     *   }
     * })
    **/
    count<T extends ActionExecutionCountArgs>(
      args?: Subset<T, ActionExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionExecutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActionExecutionAggregateArgs>(args: Subset<T, ActionExecutionAggregateArgs>): Prisma.PrismaPromise<GetActionExecutionAggregateType<T>>

    /**
     * Group by ActionExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionExecutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActionExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionExecutionGroupByArgs['orderBy'] }
        : { orderBy?: ActionExecutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActionExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionExecution model
   */
  readonly fields: ActionExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionExecution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionExecutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    preview<T extends ActionPreviewDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ActionPreviewDefaultArgs<ExtArgs>>): Prisma__ActionPreviewClient<$Result.GetResult<Prisma.$ActionPreviewPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActionExecution model
   */ 
  interface ActionExecutionFieldRefs {
    readonly id: FieldRef<"ActionExecution", 'String'>
    readonly previewId: FieldRef<"ActionExecution", 'String'>
    readonly executedBy: FieldRef<"ActionExecution", 'String'>
    readonly executedAt: FieldRef<"ActionExecution", 'DateTime'>
    readonly confirmationMethod: FieldRef<"ActionExecution", 'ConfirmationMethod'>
    readonly result: FieldRef<"ActionExecution", 'Json'>
    readonly auditTrail: FieldRef<"ActionExecution", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * ActionExecution findUnique
   */
  export type ActionExecutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter, which ActionExecution to fetch.
     */
    where: ActionExecutionWhereUniqueInput
  }

  /**
   * ActionExecution findUniqueOrThrow
   */
  export type ActionExecutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter, which ActionExecution to fetch.
     */
    where: ActionExecutionWhereUniqueInput
  }

  /**
   * ActionExecution findFirst
   */
  export type ActionExecutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter, which ActionExecution to fetch.
     */
    where?: ActionExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionExecutions to fetch.
     */
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionExecutions.
     */
    cursor?: ActionExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionExecutions.
     */
    distinct?: ActionExecutionScalarFieldEnum | ActionExecutionScalarFieldEnum[]
  }

  /**
   * ActionExecution findFirstOrThrow
   */
  export type ActionExecutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter, which ActionExecution to fetch.
     */
    where?: ActionExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionExecutions to fetch.
     */
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionExecutions.
     */
    cursor?: ActionExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionExecutions.
     */
    distinct?: ActionExecutionScalarFieldEnum | ActionExecutionScalarFieldEnum[]
  }

  /**
   * ActionExecution findMany
   */
  export type ActionExecutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter, which ActionExecutions to fetch.
     */
    where?: ActionExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionExecutions to fetch.
     */
    orderBy?: ActionExecutionOrderByWithRelationInput | ActionExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionExecutions.
     */
    cursor?: ActionExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionExecutions.
     */
    skip?: number
    distinct?: ActionExecutionScalarFieldEnum | ActionExecutionScalarFieldEnum[]
  }

  /**
   * ActionExecution create
   */
  export type ActionExecutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionExecution.
     */
    data: XOR<ActionExecutionCreateInput, ActionExecutionUncheckedCreateInput>
  }

  /**
   * ActionExecution createMany
   */
  export type ActionExecutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionExecutions.
     */
    data: ActionExecutionCreateManyInput | ActionExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionExecution createManyAndReturn
   */
  export type ActionExecutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActionExecutions.
     */
    data: ActionExecutionCreateManyInput | ActionExecutionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionExecution update
   */
  export type ActionExecutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionExecution.
     */
    data: XOR<ActionExecutionUpdateInput, ActionExecutionUncheckedUpdateInput>
    /**
     * Choose, which ActionExecution to update.
     */
    where: ActionExecutionWhereUniqueInput
  }

  /**
   * ActionExecution updateMany
   */
  export type ActionExecutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionExecutions.
     */
    data: XOR<ActionExecutionUpdateManyMutationInput, ActionExecutionUncheckedUpdateManyInput>
    /**
     * Filter which ActionExecutions to update
     */
    where?: ActionExecutionWhereInput
  }

  /**
   * ActionExecution upsert
   */
  export type ActionExecutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionExecution to update in case it exists.
     */
    where: ActionExecutionWhereUniqueInput
    /**
     * In case the ActionExecution found by the `where` argument doesn't exist, create a new ActionExecution with this data.
     */
    create: XOR<ActionExecutionCreateInput, ActionExecutionUncheckedCreateInput>
    /**
     * In case the ActionExecution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionExecutionUpdateInput, ActionExecutionUncheckedUpdateInput>
  }

  /**
   * ActionExecution delete
   */
  export type ActionExecutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
    /**
     * Filter which ActionExecution to delete.
     */
    where: ActionExecutionWhereUniqueInput
  }

  /**
   * ActionExecution deleteMany
   */
  export type ActionExecutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionExecutions to delete
     */
    where?: ActionExecutionWhereInput
  }

  /**
   * ActionExecution without action
   */
  export type ActionExecutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionExecution
     */
    select?: ActionExecutionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionExecutionInclude<ExtArgs> | null
  }


  /**
   * Model Badcase
   */

  export type AggregateBadcase = {
    _count: BadcaseCountAggregateOutputType | null
    _min: BadcaseMinAggregateOutputType | null
    _max: BadcaseMaxAggregateOutputType | null
  }

  export type BadcaseMinAggregateOutputType = {
    id: string | null
    requestId: string | null
    category: $Enums.BadcaseCategory | null
    severity: $Enums.Severity | null
    description: string | null
    rootCauseAnalysis: string | null
    fixStatus: $Enums.FixStatus | null
    fixedBy: string | null
    fixedAt: Date | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type BadcaseMaxAggregateOutputType = {
    id: string | null
    requestId: string | null
    category: $Enums.BadcaseCategory | null
    severity: $Enums.Severity | null
    description: string | null
    rootCauseAnalysis: string | null
    fixStatus: $Enums.FixStatus | null
    fixedBy: string | null
    fixedAt: Date | null
    createdAt: Date | null
    resolvedAt: Date | null
  }

  export type BadcaseCountAggregateOutputType = {
    id: number
    requestId: number
    category: number
    severity: number
    description: number
    inputSnapshot: number
    expectedOutput: number
    actualOutput: number
    rootCauseAnalysis: number
    fixStatus: number
    fixedBy: number
    fixedAt: number
    createdAt: number
    resolvedAt: number
    _all: number
  }


  export type BadcaseMinAggregateInputType = {
    id?: true
    requestId?: true
    category?: true
    severity?: true
    description?: true
    rootCauseAnalysis?: true
    fixStatus?: true
    fixedBy?: true
    fixedAt?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type BadcaseMaxAggregateInputType = {
    id?: true
    requestId?: true
    category?: true
    severity?: true
    description?: true
    rootCauseAnalysis?: true
    fixStatus?: true
    fixedBy?: true
    fixedAt?: true
    createdAt?: true
    resolvedAt?: true
  }

  export type BadcaseCountAggregateInputType = {
    id?: true
    requestId?: true
    category?: true
    severity?: true
    description?: true
    inputSnapshot?: true
    expectedOutput?: true
    actualOutput?: true
    rootCauseAnalysis?: true
    fixStatus?: true
    fixedBy?: true
    fixedAt?: true
    createdAt?: true
    resolvedAt?: true
    _all?: true
  }

  export type BadcaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badcase to aggregate.
     */
    where?: BadcaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badcases to fetch.
     */
    orderBy?: BadcaseOrderByWithRelationInput | BadcaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadcaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badcases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badcases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Badcases
    **/
    _count?: true | BadcaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadcaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadcaseMaxAggregateInputType
  }

  export type GetBadcaseAggregateType<T extends BadcaseAggregateArgs> = {
        [P in keyof T & keyof AggregateBadcase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadcase[P]>
      : GetScalarType<T[P], AggregateBadcase[P]>
  }




  export type BadcaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadcaseWhereInput
    orderBy?: BadcaseOrderByWithAggregationInput | BadcaseOrderByWithAggregationInput[]
    by: BadcaseScalarFieldEnum[] | BadcaseScalarFieldEnum
    having?: BadcaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadcaseCountAggregateInputType | true
    _min?: BadcaseMinAggregateInputType
    _max?: BadcaseMaxAggregateInputType
  }

  export type BadcaseGroupByOutputType = {
    id: string
    requestId: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonValue
    expectedOutput: JsonValue | null
    actualOutput: JsonValue | null
    rootCauseAnalysis: string | null
    fixStatus: $Enums.FixStatus
    fixedBy: string | null
    fixedAt: Date | null
    createdAt: Date
    resolvedAt: Date | null
    _count: BadcaseCountAggregateOutputType | null
    _min: BadcaseMinAggregateOutputType | null
    _max: BadcaseMaxAggregateOutputType | null
  }

  type GetBadcaseGroupByPayload<T extends BadcaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadcaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadcaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadcaseGroupByOutputType[P]>
            : GetScalarType<T[P], BadcaseGroupByOutputType[P]>
        }
      >
    >


  export type BadcaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    category?: boolean
    severity?: boolean
    description?: boolean
    inputSnapshot?: boolean
    expectedOutput?: boolean
    actualOutput?: boolean
    rootCauseAnalysis?: boolean
    fixStatus?: boolean
    fixedBy?: boolean
    fixedAt?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badcase"]>

  export type BadcaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    category?: boolean
    severity?: boolean
    description?: boolean
    inputSnapshot?: boolean
    expectedOutput?: boolean
    actualOutput?: boolean
    rootCauseAnalysis?: boolean
    fixStatus?: boolean
    fixedBy?: boolean
    fixedAt?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badcase"]>

  export type BadcaseSelectScalar = {
    id?: boolean
    requestId?: boolean
    category?: boolean
    severity?: boolean
    description?: boolean
    inputSnapshot?: boolean
    expectedOutput?: boolean
    actualOutput?: boolean
    rootCauseAnalysis?: boolean
    fixStatus?: boolean
    fixedBy?: boolean
    fixedAt?: boolean
    createdAt?: boolean
    resolvedAt?: boolean
  }

  export type BadcaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }
  export type BadcaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    requestLog?: boolean | RequestLogDefaultArgs<ExtArgs>
  }

  export type $BadcasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Badcase"
    objects: {
      requestLog: Prisma.$RequestLogPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      requestId: string
      category: $Enums.BadcaseCategory
      severity: $Enums.Severity
      description: string
      inputSnapshot: Prisma.JsonValue
      expectedOutput: Prisma.JsonValue | null
      actualOutput: Prisma.JsonValue | null
      rootCauseAnalysis: string | null
      fixStatus: $Enums.FixStatus
      fixedBy: string | null
      fixedAt: Date | null
      createdAt: Date
      resolvedAt: Date | null
    }, ExtArgs["result"]["badcase"]>
    composites: {}
  }

  type BadcaseGetPayload<S extends boolean | null | undefined | BadcaseDefaultArgs> = $Result.GetResult<Prisma.$BadcasePayload, S>

  type BadcaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BadcaseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BadcaseCountAggregateInputType | true
    }

  export interface BadcaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Badcase'], meta: { name: 'Badcase' } }
    /**
     * Find zero or one Badcase that matches the filter.
     * @param {BadcaseFindUniqueArgs} args - Arguments to find a Badcase
     * @example
     * // Get one Badcase
     * const badcase = await prisma.badcase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadcaseFindUniqueArgs>(args: SelectSubset<T, BadcaseFindUniqueArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Badcase that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BadcaseFindUniqueOrThrowArgs} args - Arguments to find a Badcase
     * @example
     * // Get one Badcase
     * const badcase = await prisma.badcase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadcaseFindUniqueOrThrowArgs>(args: SelectSubset<T, BadcaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Badcase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseFindFirstArgs} args - Arguments to find a Badcase
     * @example
     * // Get one Badcase
     * const badcase = await prisma.badcase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadcaseFindFirstArgs>(args?: SelectSubset<T, BadcaseFindFirstArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Badcase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseFindFirstOrThrowArgs} args - Arguments to find a Badcase
     * @example
     * // Get one Badcase
     * const badcase = await prisma.badcase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadcaseFindFirstOrThrowArgs>(args?: SelectSubset<T, BadcaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Badcases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Badcases
     * const badcases = await prisma.badcase.findMany()
     * 
     * // Get first 10 Badcases
     * const badcases = await prisma.badcase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badcaseWithIdOnly = await prisma.badcase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadcaseFindManyArgs>(args?: SelectSubset<T, BadcaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Badcase.
     * @param {BadcaseCreateArgs} args - Arguments to create a Badcase.
     * @example
     * // Create one Badcase
     * const Badcase = await prisma.badcase.create({
     *   data: {
     *     // ... data to create a Badcase
     *   }
     * })
     * 
     */
    create<T extends BadcaseCreateArgs>(args: SelectSubset<T, BadcaseCreateArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Badcases.
     * @param {BadcaseCreateManyArgs} args - Arguments to create many Badcases.
     * @example
     * // Create many Badcases
     * const badcase = await prisma.badcase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadcaseCreateManyArgs>(args?: SelectSubset<T, BadcaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Badcases and returns the data saved in the database.
     * @param {BadcaseCreateManyAndReturnArgs} args - Arguments to create many Badcases.
     * @example
     * // Create many Badcases
     * const badcase = await prisma.badcase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Badcases and only return the `id`
     * const badcaseWithIdOnly = await prisma.badcase.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadcaseCreateManyAndReturnArgs>(args?: SelectSubset<T, BadcaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Badcase.
     * @param {BadcaseDeleteArgs} args - Arguments to delete one Badcase.
     * @example
     * // Delete one Badcase
     * const Badcase = await prisma.badcase.delete({
     *   where: {
     *     // ... filter to delete one Badcase
     *   }
     * })
     * 
     */
    delete<T extends BadcaseDeleteArgs>(args: SelectSubset<T, BadcaseDeleteArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Badcase.
     * @param {BadcaseUpdateArgs} args - Arguments to update one Badcase.
     * @example
     * // Update one Badcase
     * const badcase = await prisma.badcase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadcaseUpdateArgs>(args: SelectSubset<T, BadcaseUpdateArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Badcases.
     * @param {BadcaseDeleteManyArgs} args - Arguments to filter Badcases to delete.
     * @example
     * // Delete a few Badcases
     * const { count } = await prisma.badcase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadcaseDeleteManyArgs>(args?: SelectSubset<T, BadcaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Badcases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Badcases
     * const badcase = await prisma.badcase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadcaseUpdateManyArgs>(args: SelectSubset<T, BadcaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Badcase.
     * @param {BadcaseUpsertArgs} args - Arguments to update or create a Badcase.
     * @example
     * // Update or create a Badcase
     * const badcase = await prisma.badcase.upsert({
     *   create: {
     *     // ... data to create a Badcase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Badcase we want to update
     *   }
     * })
     */
    upsert<T extends BadcaseUpsertArgs>(args: SelectSubset<T, BadcaseUpsertArgs<ExtArgs>>): Prisma__BadcaseClient<$Result.GetResult<Prisma.$BadcasePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Badcases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseCountArgs} args - Arguments to filter Badcases to count.
     * @example
     * // Count the number of Badcases
     * const count = await prisma.badcase.count({
     *   where: {
     *     // ... the filter for the Badcases we want to count
     *   }
     * })
    **/
    count<T extends BadcaseCountArgs>(
      args?: Subset<T, BadcaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadcaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Badcase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BadcaseAggregateArgs>(args: Subset<T, BadcaseAggregateArgs>): Prisma.PrismaPromise<GetBadcaseAggregateType<T>>

    /**
     * Group by Badcase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadcaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BadcaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadcaseGroupByArgs['orderBy'] }
        : { orderBy?: BadcaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BadcaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadcaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Badcase model
   */
  readonly fields: BadcaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Badcase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadcaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    requestLog<T extends RequestLogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RequestLogDefaultArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Badcase model
   */ 
  interface BadcaseFieldRefs {
    readonly id: FieldRef<"Badcase", 'String'>
    readonly requestId: FieldRef<"Badcase", 'String'>
    readonly category: FieldRef<"Badcase", 'BadcaseCategory'>
    readonly severity: FieldRef<"Badcase", 'Severity'>
    readonly description: FieldRef<"Badcase", 'String'>
    readonly inputSnapshot: FieldRef<"Badcase", 'Json'>
    readonly expectedOutput: FieldRef<"Badcase", 'Json'>
    readonly actualOutput: FieldRef<"Badcase", 'Json'>
    readonly rootCauseAnalysis: FieldRef<"Badcase", 'String'>
    readonly fixStatus: FieldRef<"Badcase", 'FixStatus'>
    readonly fixedBy: FieldRef<"Badcase", 'String'>
    readonly fixedAt: FieldRef<"Badcase", 'DateTime'>
    readonly createdAt: FieldRef<"Badcase", 'DateTime'>
    readonly resolvedAt: FieldRef<"Badcase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Badcase findUnique
   */
  export type BadcaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter, which Badcase to fetch.
     */
    where: BadcaseWhereUniqueInput
  }

  /**
   * Badcase findUniqueOrThrow
   */
  export type BadcaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter, which Badcase to fetch.
     */
    where: BadcaseWhereUniqueInput
  }

  /**
   * Badcase findFirst
   */
  export type BadcaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter, which Badcase to fetch.
     */
    where?: BadcaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badcases to fetch.
     */
    orderBy?: BadcaseOrderByWithRelationInput | BadcaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badcases.
     */
    cursor?: BadcaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badcases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badcases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badcases.
     */
    distinct?: BadcaseScalarFieldEnum | BadcaseScalarFieldEnum[]
  }

  /**
   * Badcase findFirstOrThrow
   */
  export type BadcaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter, which Badcase to fetch.
     */
    where?: BadcaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badcases to fetch.
     */
    orderBy?: BadcaseOrderByWithRelationInput | BadcaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Badcases.
     */
    cursor?: BadcaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badcases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badcases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Badcases.
     */
    distinct?: BadcaseScalarFieldEnum | BadcaseScalarFieldEnum[]
  }

  /**
   * Badcase findMany
   */
  export type BadcaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter, which Badcases to fetch.
     */
    where?: BadcaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Badcases to fetch.
     */
    orderBy?: BadcaseOrderByWithRelationInput | BadcaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Badcases.
     */
    cursor?: BadcaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Badcases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Badcases.
     */
    skip?: number
    distinct?: BadcaseScalarFieldEnum | BadcaseScalarFieldEnum[]
  }

  /**
   * Badcase create
   */
  export type BadcaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Badcase.
     */
    data: XOR<BadcaseCreateInput, BadcaseUncheckedCreateInput>
  }

  /**
   * Badcase createMany
   */
  export type BadcaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Badcases.
     */
    data: BadcaseCreateManyInput | BadcaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Badcase createManyAndReturn
   */
  export type BadcaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Badcases.
     */
    data: BadcaseCreateManyInput | BadcaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Badcase update
   */
  export type BadcaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Badcase.
     */
    data: XOR<BadcaseUpdateInput, BadcaseUncheckedUpdateInput>
    /**
     * Choose, which Badcase to update.
     */
    where: BadcaseWhereUniqueInput
  }

  /**
   * Badcase updateMany
   */
  export type BadcaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Badcases.
     */
    data: XOR<BadcaseUpdateManyMutationInput, BadcaseUncheckedUpdateManyInput>
    /**
     * Filter which Badcases to update
     */
    where?: BadcaseWhereInput
  }

  /**
   * Badcase upsert
   */
  export type BadcaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Badcase to update in case it exists.
     */
    where: BadcaseWhereUniqueInput
    /**
     * In case the Badcase found by the `where` argument doesn't exist, create a new Badcase with this data.
     */
    create: XOR<BadcaseCreateInput, BadcaseUncheckedCreateInput>
    /**
     * In case the Badcase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadcaseUpdateInput, BadcaseUncheckedUpdateInput>
  }

  /**
   * Badcase delete
   */
  export type BadcaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
    /**
     * Filter which Badcase to delete.
     */
    where: BadcaseWhereUniqueInput
  }

  /**
   * Badcase deleteMany
   */
  export type BadcaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Badcases to delete
     */
    where?: BadcaseWhereInput
  }

  /**
   * Badcase without action
   */
  export type BadcaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Badcase
     */
    select?: BadcaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadcaseInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    sizeBytes: number | null
  }

  export type DocumentSumAggregateOutputType = {
    sizeBytes: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    fileName: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedBy: string | null
    purpose: $Enums.DocumentPurpose | null
    storagePath: string | null
    extractedText: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    fileName: string | null
    mimeType: string | null
    sizeBytes: number | null
    uploadedBy: string | null
    purpose: $Enums.DocumentPurpose | null
    storagePath: string | null
    extractedText: string | null
    createdAt: Date | null
    expiresAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    orgId: number
    fileName: number
    mimeType: number
    sizeBytes: number
    uploadedBy: number
    purpose: number
    storagePath: number
    extractedText: number
    createdAt: number
    expiresAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    sizeBytes?: true
  }

  export type DocumentSumAggregateInputType = {
    sizeBytes?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    orgId?: true
    fileName?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    purpose?: true
    storagePath?: true
    extractedText?: true
    createdAt?: true
    expiresAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    orgId?: true
    fileName?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    purpose?: true
    storagePath?: true
    extractedText?: true
    createdAt?: true
    expiresAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    orgId?: true
    fileName?: true
    mimeType?: true
    sizeBytes?: true
    uploadedBy?: true
    purpose?: true
    storagePath?: true
    extractedText?: true
    createdAt?: true
    expiresAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    orgId: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy: string | null
    purpose: $Enums.DocumentPurpose
    storagePath: string
    extractedText: string | null
    createdAt: Date
    expiresAt: Date | null
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    fileName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    purpose?: boolean
    storagePath?: boolean
    extractedText?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    embeddings?: boolean | Document$embeddingsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    fileName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    purpose?: boolean
    storagePath?: boolean
    extractedText?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    orgId?: boolean
    fileName?: boolean
    mimeType?: boolean
    sizeBytes?: boolean
    uploadedBy?: boolean
    purpose?: boolean
    storagePath?: boolean
    extractedText?: boolean
    createdAt?: boolean
    expiresAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    embeddings?: boolean | Document$embeddingsArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      org: Prisma.$OrganizationPayload<ExtArgs>
      embeddings: Prisma.$DocumentEmbeddingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      fileName: string
      mimeType: string
      sizeBytes: number
      uploadedBy: string | null
      purpose: $Enums.DocumentPurpose
      storagePath: string
      extractedText: string | null
      createdAt: Date
      expiresAt: Date | null
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    org<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    embeddings<T extends Document$embeddingsArgs<ExtArgs> = {}>(args?: Subset<T, Document$embeddingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly orgId: FieldRef<"Document", 'String'>
    readonly fileName: FieldRef<"Document", 'String'>
    readonly mimeType: FieldRef<"Document", 'String'>
    readonly sizeBytes: FieldRef<"Document", 'Int'>
    readonly uploadedBy: FieldRef<"Document", 'String'>
    readonly purpose: FieldRef<"Document", 'DocumentPurpose'>
    readonly storagePath: FieldRef<"Document", 'String'>
    readonly extractedText: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly expiresAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document.embeddings
   */
  export type Document$embeddingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    where?: DocumentEmbeddingWhereInput
    orderBy?: DocumentEmbeddingOrderByWithRelationInput | DocumentEmbeddingOrderByWithRelationInput[]
    cursor?: DocumentEmbeddingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentEmbeddingScalarFieldEnum | DocumentEmbeddingScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentEmbedding
   */

  export type AggregateDocumentEmbedding = {
    _count: DocumentEmbeddingCountAggregateOutputType | null
    _min: DocumentEmbeddingMinAggregateOutputType | null
    _max: DocumentEmbeddingMaxAggregateOutputType | null
  }

  export type DocumentEmbeddingMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type DocumentEmbeddingMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    createdAt: Date | null
  }

  export type DocumentEmbeddingCountAggregateOutputType = {
    id: number
    documentId: number
    content: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type DocumentEmbeddingMinAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    createdAt?: true
  }

  export type DocumentEmbeddingMaxAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    createdAt?: true
  }

  export type DocumentEmbeddingCountAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentEmbeddingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentEmbedding to aggregate.
     */
    where?: DocumentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEmbeddings to fetch.
     */
    orderBy?: DocumentEmbeddingOrderByWithRelationInput | DocumentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentEmbeddings
    **/
    _count?: true | DocumentEmbeddingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentEmbeddingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentEmbeddingMaxAggregateInputType
  }

  export type GetDocumentEmbeddingAggregateType<T extends DocumentEmbeddingAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentEmbedding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentEmbedding[P]>
      : GetScalarType<T[P], AggregateDocumentEmbedding[P]>
  }




  export type DocumentEmbeddingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentEmbeddingWhereInput
    orderBy?: DocumentEmbeddingOrderByWithAggregationInput | DocumentEmbeddingOrderByWithAggregationInput[]
    by: DocumentEmbeddingScalarFieldEnum[] | DocumentEmbeddingScalarFieldEnum
    having?: DocumentEmbeddingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentEmbeddingCountAggregateInputType | true
    _min?: DocumentEmbeddingMinAggregateInputType
    _max?: DocumentEmbeddingMaxAggregateInputType
  }

  export type DocumentEmbeddingGroupByOutputType = {
    id: string
    documentId: string
    content: string
    metadata: JsonValue
    createdAt: Date
    _count: DocumentEmbeddingCountAggregateOutputType | null
    _min: DocumentEmbeddingMinAggregateOutputType | null
    _max: DocumentEmbeddingMaxAggregateOutputType | null
  }

  type GetDocumentEmbeddingGroupByPayload<T extends DocumentEmbeddingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentEmbeddingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentEmbeddingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentEmbeddingGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentEmbeddingGroupByOutputType[P]>
        }
      >
    >


  export type DocumentEmbeddingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentEmbedding"]>


  export type DocumentEmbeddingSelectScalar = {
    id?: boolean
    documentId?: boolean
    content?: boolean
    metadata?: boolean
    createdAt?: boolean
  }

  export type DocumentEmbeddingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentEmbeddingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentEmbedding"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      content: string
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["documentEmbedding"]>
    composites: {}
  }

  type DocumentEmbeddingGetPayload<S extends boolean | null | undefined | DocumentEmbeddingDefaultArgs> = $Result.GetResult<Prisma.$DocumentEmbeddingPayload, S>

  type DocumentEmbeddingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentEmbeddingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentEmbeddingCountAggregateInputType | true
    }

  export interface DocumentEmbeddingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentEmbedding'], meta: { name: 'DocumentEmbedding' } }
    /**
     * Find zero or one DocumentEmbedding that matches the filter.
     * @param {DocumentEmbeddingFindUniqueArgs} args - Arguments to find a DocumentEmbedding
     * @example
     * // Get one DocumentEmbedding
     * const documentEmbedding = await prisma.documentEmbedding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentEmbeddingFindUniqueArgs>(args: SelectSubset<T, DocumentEmbeddingFindUniqueArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DocumentEmbedding that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentEmbeddingFindUniqueOrThrowArgs} args - Arguments to find a DocumentEmbedding
     * @example
     * // Get one DocumentEmbedding
     * const documentEmbedding = await prisma.documentEmbedding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentEmbeddingFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentEmbeddingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DocumentEmbedding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingFindFirstArgs} args - Arguments to find a DocumentEmbedding
     * @example
     * // Get one DocumentEmbedding
     * const documentEmbedding = await prisma.documentEmbedding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentEmbeddingFindFirstArgs>(args?: SelectSubset<T, DocumentEmbeddingFindFirstArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DocumentEmbedding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingFindFirstOrThrowArgs} args - Arguments to find a DocumentEmbedding
     * @example
     * // Get one DocumentEmbedding
     * const documentEmbedding = await prisma.documentEmbedding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentEmbeddingFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentEmbeddingFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DocumentEmbeddings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentEmbeddings
     * const documentEmbeddings = await prisma.documentEmbedding.findMany()
     * 
     * // Get first 10 DocumentEmbeddings
     * const documentEmbeddings = await prisma.documentEmbedding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentEmbeddingWithIdOnly = await prisma.documentEmbedding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentEmbeddingFindManyArgs>(args?: SelectSubset<T, DocumentEmbeddingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "findMany">>

    /**
     * Delete a DocumentEmbedding.
     * @param {DocumentEmbeddingDeleteArgs} args - Arguments to delete one DocumentEmbedding.
     * @example
     * // Delete one DocumentEmbedding
     * const DocumentEmbedding = await prisma.documentEmbedding.delete({
     *   where: {
     *     // ... filter to delete one DocumentEmbedding
     *   }
     * })
     * 
     */
    delete<T extends DocumentEmbeddingDeleteArgs>(args: SelectSubset<T, DocumentEmbeddingDeleteArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DocumentEmbedding.
     * @param {DocumentEmbeddingUpdateArgs} args - Arguments to update one DocumentEmbedding.
     * @example
     * // Update one DocumentEmbedding
     * const documentEmbedding = await prisma.documentEmbedding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentEmbeddingUpdateArgs>(args: SelectSubset<T, DocumentEmbeddingUpdateArgs<ExtArgs>>): Prisma__DocumentEmbeddingClient<$Result.GetResult<Prisma.$DocumentEmbeddingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DocumentEmbeddings.
     * @param {DocumentEmbeddingDeleteManyArgs} args - Arguments to filter DocumentEmbeddings to delete.
     * @example
     * // Delete a few DocumentEmbeddings
     * const { count } = await prisma.documentEmbedding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentEmbeddingDeleteManyArgs>(args?: SelectSubset<T, DocumentEmbeddingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentEmbeddings
     * const documentEmbedding = await prisma.documentEmbedding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentEmbeddingUpdateManyArgs>(args: SelectSubset<T, DocumentEmbeddingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>


    /**
     * Count the number of DocumentEmbeddings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingCountArgs} args - Arguments to filter DocumentEmbeddings to count.
     * @example
     * // Count the number of DocumentEmbeddings
     * const count = await prisma.documentEmbedding.count({
     *   where: {
     *     // ... the filter for the DocumentEmbeddings we want to count
     *   }
     * })
    **/
    count<T extends DocumentEmbeddingCountArgs>(
      args?: Subset<T, DocumentEmbeddingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentEmbeddingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentEmbeddingAggregateArgs>(args: Subset<T, DocumentEmbeddingAggregateArgs>): Prisma.PrismaPromise<GetDocumentEmbeddingAggregateType<T>>

    /**
     * Group by DocumentEmbedding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentEmbeddingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentEmbeddingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentEmbeddingGroupByArgs['orderBy'] }
        : { orderBy?: DocumentEmbeddingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentEmbeddingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentEmbeddingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentEmbedding model
   */
  readonly fields: DocumentEmbeddingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentEmbedding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentEmbeddingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentEmbedding model
   */ 
  interface DocumentEmbeddingFieldRefs {
    readonly id: FieldRef<"DocumentEmbedding", 'String'>
    readonly documentId: FieldRef<"DocumentEmbedding", 'String'>
    readonly content: FieldRef<"DocumentEmbedding", 'String'>
    readonly metadata: FieldRef<"DocumentEmbedding", 'Json'>
    readonly createdAt: FieldRef<"DocumentEmbedding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentEmbedding findUnique
   */
  export type DocumentEmbeddingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which DocumentEmbedding to fetch.
     */
    where: DocumentEmbeddingWhereUniqueInput
  }

  /**
   * DocumentEmbedding findUniqueOrThrow
   */
  export type DocumentEmbeddingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which DocumentEmbedding to fetch.
     */
    where: DocumentEmbeddingWhereUniqueInput
  }

  /**
   * DocumentEmbedding findFirst
   */
  export type DocumentEmbeddingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which DocumentEmbedding to fetch.
     */
    where?: DocumentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEmbeddings to fetch.
     */
    orderBy?: DocumentEmbeddingOrderByWithRelationInput | DocumentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentEmbeddings.
     */
    cursor?: DocumentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentEmbeddings.
     */
    distinct?: DocumentEmbeddingScalarFieldEnum | DocumentEmbeddingScalarFieldEnum[]
  }

  /**
   * DocumentEmbedding findFirstOrThrow
   */
  export type DocumentEmbeddingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which DocumentEmbedding to fetch.
     */
    where?: DocumentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEmbeddings to fetch.
     */
    orderBy?: DocumentEmbeddingOrderByWithRelationInput | DocumentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentEmbeddings.
     */
    cursor?: DocumentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEmbeddings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentEmbeddings.
     */
    distinct?: DocumentEmbeddingScalarFieldEnum | DocumentEmbeddingScalarFieldEnum[]
  }

  /**
   * DocumentEmbedding findMany
   */
  export type DocumentEmbeddingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter, which DocumentEmbeddings to fetch.
     */
    where?: DocumentEmbeddingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentEmbeddings to fetch.
     */
    orderBy?: DocumentEmbeddingOrderByWithRelationInput | DocumentEmbeddingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentEmbeddings.
     */
    cursor?: DocumentEmbeddingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentEmbeddings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentEmbeddings.
     */
    skip?: number
    distinct?: DocumentEmbeddingScalarFieldEnum | DocumentEmbeddingScalarFieldEnum[]
  }

  /**
   * DocumentEmbedding update
   */
  export type DocumentEmbeddingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentEmbedding.
     */
    data: XOR<DocumentEmbeddingUpdateInput, DocumentEmbeddingUncheckedUpdateInput>
    /**
     * Choose, which DocumentEmbedding to update.
     */
    where: DocumentEmbeddingWhereUniqueInput
  }

  /**
   * DocumentEmbedding updateMany
   */
  export type DocumentEmbeddingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentEmbeddings.
     */
    data: XOR<DocumentEmbeddingUpdateManyMutationInput, DocumentEmbeddingUncheckedUpdateManyInput>
    /**
     * Filter which DocumentEmbeddings to update
     */
    where?: DocumentEmbeddingWhereInput
  }

  /**
   * DocumentEmbedding delete
   */
  export type DocumentEmbeddingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
    /**
     * Filter which DocumentEmbedding to delete.
     */
    where: DocumentEmbeddingWhereUniqueInput
  }

  /**
   * DocumentEmbedding deleteMany
   */
  export type DocumentEmbeddingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentEmbeddings to delete
     */
    where?: DocumentEmbeddingWhereInput
  }

  /**
   * DocumentEmbedding without action
   */
  export type DocumentEmbeddingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentEmbedding
     */
    select?: DocumentEmbeddingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentEmbeddingInclude<ExtArgs> | null
  }


  /**
   * Model FundingProgram
   */

  export type AggregateFundingProgram = {
    _count: FundingProgramCountAggregateOutputType | null
    _avg: FundingProgramAvgAggregateOutputType | null
    _sum: FundingProgramSumAggregateOutputType | null
    _min: FundingProgramMinAggregateOutputType | null
    _max: FundingProgramMaxAggregateOutputType | null
  }

  export type FundingProgramAvgAggregateOutputType = {
    maxAmount: number | null
    minAmount: number | null
  }

  export type FundingProgramSumAggregateOutputType = {
    maxAmount: number | null
    minAmount: number | null
  }

  export type FundingProgramMinAggregateOutputType = {
    id: string | null
    programName: string | null
    agency: string | null
    maxAmount: number | null
    minAmount: number | null
    applicationStart: Date | null
    applicationEnd: Date | null
    description: string | null
    sourceUrl: string | null
    status: $Enums.FundingProgramStatus | null
    lastScrapedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingProgramMaxAggregateOutputType = {
    id: string | null
    programName: string | null
    agency: string | null
    maxAmount: number | null
    minAmount: number | null
    applicationStart: Date | null
    applicationEnd: Date | null
    description: string | null
    sourceUrl: string | null
    status: $Enums.FundingProgramStatus | null
    lastScrapedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingProgramCountAggregateOutputType = {
    id: number
    programName: number
    agency: number
    maxAmount: number
    minAmount: number
    targetIndustries: number
    targetCompanySizes: number
    applicationStart: number
    applicationEnd: number
    eligibility: number
    description: number
    sourceUrl: number
    status: number
    lastScrapedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FundingProgramAvgAggregateInputType = {
    maxAmount?: true
    minAmount?: true
  }

  export type FundingProgramSumAggregateInputType = {
    maxAmount?: true
    minAmount?: true
  }

  export type FundingProgramMinAggregateInputType = {
    id?: true
    programName?: true
    agency?: true
    maxAmount?: true
    minAmount?: true
    applicationStart?: true
    applicationEnd?: true
    description?: true
    sourceUrl?: true
    status?: true
    lastScrapedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingProgramMaxAggregateInputType = {
    id?: true
    programName?: true
    agency?: true
    maxAmount?: true
    minAmount?: true
    applicationStart?: true
    applicationEnd?: true
    description?: true
    sourceUrl?: true
    status?: true
    lastScrapedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingProgramCountAggregateInputType = {
    id?: true
    programName?: true
    agency?: true
    maxAmount?: true
    minAmount?: true
    targetIndustries?: true
    targetCompanySizes?: true
    applicationStart?: true
    applicationEnd?: true
    eligibility?: true
    description?: true
    sourceUrl?: true
    status?: true
    lastScrapedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FundingProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingProgram to aggregate.
     */
    where?: FundingProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPrograms to fetch.
     */
    orderBy?: FundingProgramOrderByWithRelationInput | FundingProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingPrograms
    **/
    _count?: true | FundingProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FundingProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FundingProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingProgramMaxAggregateInputType
  }

  export type GetFundingProgramAggregateType<T extends FundingProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingProgram[P]>
      : GetScalarType<T[P], AggregateFundingProgram[P]>
  }




  export type FundingProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingProgramWhereInput
    orderBy?: FundingProgramOrderByWithAggregationInput | FundingProgramOrderByWithAggregationInput[]
    by: FundingProgramScalarFieldEnum[] | FundingProgramScalarFieldEnum
    having?: FundingProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingProgramCountAggregateInputType | true
    _avg?: FundingProgramAvgAggregateInputType
    _sum?: FundingProgramSumAggregateInputType
    _min?: FundingProgramMinAggregateInputType
    _max?: FundingProgramMaxAggregateInputType
  }

  export type FundingProgramGroupByOutputType = {
    id: string
    programName: string
    agency: string
    maxAmount: number | null
    minAmount: number | null
    targetIndustries: string[]
    targetCompanySizes: string[]
    applicationStart: Date | null
    applicationEnd: Date | null
    eligibility: JsonValue
    description: string | null
    sourceUrl: string | null
    status: $Enums.FundingProgramStatus
    lastScrapedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: FundingProgramCountAggregateOutputType | null
    _avg: FundingProgramAvgAggregateOutputType | null
    _sum: FundingProgramSumAggregateOutputType | null
    _min: FundingProgramMinAggregateOutputType | null
    _max: FundingProgramMaxAggregateOutputType | null
  }

  type GetFundingProgramGroupByPayload<T extends FundingProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingProgramGroupByOutputType[P]>
            : GetScalarType<T[P], FundingProgramGroupByOutputType[P]>
        }
      >
    >


  export type FundingProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programName?: boolean
    agency?: boolean
    maxAmount?: boolean
    minAmount?: boolean
    targetIndustries?: boolean
    targetCompanySizes?: boolean
    applicationStart?: boolean
    applicationEnd?: boolean
    eligibility?: boolean
    description?: boolean
    sourceUrl?: boolean
    status?: boolean
    lastScrapedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    applications?: boolean | FundingProgram$applicationsArgs<ExtArgs>
    _count?: boolean | FundingProgramCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingProgram"]>

  export type FundingProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    programName?: boolean
    agency?: boolean
    maxAmount?: boolean
    minAmount?: boolean
    targetIndustries?: boolean
    targetCompanySizes?: boolean
    applicationStart?: boolean
    applicationEnd?: boolean
    eligibility?: boolean
    description?: boolean
    sourceUrl?: boolean
    status?: boolean
    lastScrapedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["fundingProgram"]>

  export type FundingProgramSelectScalar = {
    id?: boolean
    programName?: boolean
    agency?: boolean
    maxAmount?: boolean
    minAmount?: boolean
    targetIndustries?: boolean
    targetCompanySizes?: boolean
    applicationStart?: boolean
    applicationEnd?: boolean
    eligibility?: boolean
    description?: boolean
    sourceUrl?: boolean
    status?: boolean
    lastScrapedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FundingProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | FundingProgram$applicationsArgs<ExtArgs>
    _count?: boolean | FundingProgramCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FundingProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FundingProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingProgram"
    objects: {
      applications: Prisma.$FundingApplicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      programName: string
      agency: string
      maxAmount: number | null
      minAmount: number | null
      targetIndustries: string[]
      targetCompanySizes: string[]
      applicationStart: Date | null
      applicationEnd: Date | null
      eligibility: Prisma.JsonValue
      description: string | null
      sourceUrl: string | null
      status: $Enums.FundingProgramStatus
      lastScrapedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fundingProgram"]>
    composites: {}
  }

  type FundingProgramGetPayload<S extends boolean | null | undefined | FundingProgramDefaultArgs> = $Result.GetResult<Prisma.$FundingProgramPayload, S>

  type FundingProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FundingProgramFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FundingProgramCountAggregateInputType | true
    }

  export interface FundingProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingProgram'], meta: { name: 'FundingProgram' } }
    /**
     * Find zero or one FundingProgram that matches the filter.
     * @param {FundingProgramFindUniqueArgs} args - Arguments to find a FundingProgram
     * @example
     * // Get one FundingProgram
     * const fundingProgram = await prisma.fundingProgram.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingProgramFindUniqueArgs>(args: SelectSubset<T, FundingProgramFindUniqueArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FundingProgram that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FundingProgramFindUniqueOrThrowArgs} args - Arguments to find a FundingProgram
     * @example
     * // Get one FundingProgram
     * const fundingProgram = await prisma.fundingProgram.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FundingProgram that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramFindFirstArgs} args - Arguments to find a FundingProgram
     * @example
     * // Get one FundingProgram
     * const fundingProgram = await prisma.fundingProgram.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingProgramFindFirstArgs>(args?: SelectSubset<T, FundingProgramFindFirstArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FundingProgram that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramFindFirstOrThrowArgs} args - Arguments to find a FundingProgram
     * @example
     * // Get one FundingProgram
     * const fundingProgram = await prisma.fundingProgram.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FundingPrograms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingPrograms
     * const fundingPrograms = await prisma.fundingProgram.findMany()
     * 
     * // Get first 10 FundingPrograms
     * const fundingPrograms = await prisma.fundingProgram.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingProgramWithIdOnly = await prisma.fundingProgram.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingProgramFindManyArgs>(args?: SelectSubset<T, FundingProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FundingProgram.
     * @param {FundingProgramCreateArgs} args - Arguments to create a FundingProgram.
     * @example
     * // Create one FundingProgram
     * const FundingProgram = await prisma.fundingProgram.create({
     *   data: {
     *     // ... data to create a FundingProgram
     *   }
     * })
     * 
     */
    create<T extends FundingProgramCreateArgs>(args: SelectSubset<T, FundingProgramCreateArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FundingPrograms.
     * @param {FundingProgramCreateManyArgs} args - Arguments to create many FundingPrograms.
     * @example
     * // Create many FundingPrograms
     * const fundingProgram = await prisma.fundingProgram.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingProgramCreateManyArgs>(args?: SelectSubset<T, FundingProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingPrograms and returns the data saved in the database.
     * @param {FundingProgramCreateManyAndReturnArgs} args - Arguments to create many FundingPrograms.
     * @example
     * // Create many FundingPrograms
     * const fundingProgram = await prisma.fundingProgram.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingPrograms and only return the `id`
     * const fundingProgramWithIdOnly = await prisma.fundingProgram.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FundingProgram.
     * @param {FundingProgramDeleteArgs} args - Arguments to delete one FundingProgram.
     * @example
     * // Delete one FundingProgram
     * const FundingProgram = await prisma.fundingProgram.delete({
     *   where: {
     *     // ... filter to delete one FundingProgram
     *   }
     * })
     * 
     */
    delete<T extends FundingProgramDeleteArgs>(args: SelectSubset<T, FundingProgramDeleteArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FundingProgram.
     * @param {FundingProgramUpdateArgs} args - Arguments to update one FundingProgram.
     * @example
     * // Update one FundingProgram
     * const fundingProgram = await prisma.fundingProgram.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingProgramUpdateArgs>(args: SelectSubset<T, FundingProgramUpdateArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FundingPrograms.
     * @param {FundingProgramDeleteManyArgs} args - Arguments to filter FundingPrograms to delete.
     * @example
     * // Delete a few FundingPrograms
     * const { count } = await prisma.fundingProgram.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingProgramDeleteManyArgs>(args?: SelectSubset<T, FundingProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingPrograms
     * const fundingProgram = await prisma.fundingProgram.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingProgramUpdateManyArgs>(args: SelectSubset<T, FundingProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FundingProgram.
     * @param {FundingProgramUpsertArgs} args - Arguments to update or create a FundingProgram.
     * @example
     * // Update or create a FundingProgram
     * const fundingProgram = await prisma.fundingProgram.upsert({
     *   create: {
     *     // ... data to create a FundingProgram
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingProgram we want to update
     *   }
     * })
     */
    upsert<T extends FundingProgramUpsertArgs>(args: SelectSubset<T, FundingProgramUpsertArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FundingPrograms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramCountArgs} args - Arguments to filter FundingPrograms to count.
     * @example
     * // Count the number of FundingPrograms
     * const count = await prisma.fundingProgram.count({
     *   where: {
     *     // ... the filter for the FundingPrograms we want to count
     *   }
     * })
    **/
    count<T extends FundingProgramCountArgs>(
      args?: Subset<T, FundingProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingProgramAggregateArgs>(args: Subset<T, FundingProgramAggregateArgs>): Prisma.PrismaPromise<GetFundingProgramAggregateType<T>>

    /**
     * Group by FundingProgram.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingProgramGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingProgramGroupByArgs['orderBy'] }
        : { orderBy?: FundingProgramGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingProgram model
   */
  readonly fields: FundingProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingProgram.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends FundingProgram$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, FundingProgram$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingProgram model
   */ 
  interface FundingProgramFieldRefs {
    readonly id: FieldRef<"FundingProgram", 'String'>
    readonly programName: FieldRef<"FundingProgram", 'String'>
    readonly agency: FieldRef<"FundingProgram", 'String'>
    readonly maxAmount: FieldRef<"FundingProgram", 'Int'>
    readonly minAmount: FieldRef<"FundingProgram", 'Int'>
    readonly targetIndustries: FieldRef<"FundingProgram", 'String[]'>
    readonly targetCompanySizes: FieldRef<"FundingProgram", 'String[]'>
    readonly applicationStart: FieldRef<"FundingProgram", 'DateTime'>
    readonly applicationEnd: FieldRef<"FundingProgram", 'DateTime'>
    readonly eligibility: FieldRef<"FundingProgram", 'Json'>
    readonly description: FieldRef<"FundingProgram", 'String'>
    readonly sourceUrl: FieldRef<"FundingProgram", 'String'>
    readonly status: FieldRef<"FundingProgram", 'FundingProgramStatus'>
    readonly lastScrapedAt: FieldRef<"FundingProgram", 'DateTime'>
    readonly createdAt: FieldRef<"FundingProgram", 'DateTime'>
    readonly updatedAt: FieldRef<"FundingProgram", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FundingProgram findUnique
   */
  export type FundingProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter, which FundingProgram to fetch.
     */
    where: FundingProgramWhereUniqueInput
  }

  /**
   * FundingProgram findUniqueOrThrow
   */
  export type FundingProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter, which FundingProgram to fetch.
     */
    where: FundingProgramWhereUniqueInput
  }

  /**
   * FundingProgram findFirst
   */
  export type FundingProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter, which FundingProgram to fetch.
     */
    where?: FundingProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPrograms to fetch.
     */
    orderBy?: FundingProgramOrderByWithRelationInput | FundingProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPrograms.
     */
    cursor?: FundingProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPrograms.
     */
    distinct?: FundingProgramScalarFieldEnum | FundingProgramScalarFieldEnum[]
  }

  /**
   * FundingProgram findFirstOrThrow
   */
  export type FundingProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter, which FundingProgram to fetch.
     */
    where?: FundingProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPrograms to fetch.
     */
    orderBy?: FundingProgramOrderByWithRelationInput | FundingProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingPrograms.
     */
    cursor?: FundingProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPrograms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingPrograms.
     */
    distinct?: FundingProgramScalarFieldEnum | FundingProgramScalarFieldEnum[]
  }

  /**
   * FundingProgram findMany
   */
  export type FundingProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter, which FundingPrograms to fetch.
     */
    where?: FundingProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingPrograms to fetch.
     */
    orderBy?: FundingProgramOrderByWithRelationInput | FundingProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingPrograms.
     */
    cursor?: FundingProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingPrograms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingPrograms.
     */
    skip?: number
    distinct?: FundingProgramScalarFieldEnum | FundingProgramScalarFieldEnum[]
  }

  /**
   * FundingProgram create
   */
  export type FundingProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingProgram.
     */
    data: XOR<FundingProgramCreateInput, FundingProgramUncheckedCreateInput>
  }

  /**
   * FundingProgram createMany
   */
  export type FundingProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingPrograms.
     */
    data: FundingProgramCreateManyInput | FundingProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingProgram createManyAndReturn
   */
  export type FundingProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FundingPrograms.
     */
    data: FundingProgramCreateManyInput | FundingProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingProgram update
   */
  export type FundingProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingProgram.
     */
    data: XOR<FundingProgramUpdateInput, FundingProgramUncheckedUpdateInput>
    /**
     * Choose, which FundingProgram to update.
     */
    where: FundingProgramWhereUniqueInput
  }

  /**
   * FundingProgram updateMany
   */
  export type FundingProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingPrograms.
     */
    data: XOR<FundingProgramUpdateManyMutationInput, FundingProgramUncheckedUpdateManyInput>
    /**
     * Filter which FundingPrograms to update
     */
    where?: FundingProgramWhereInput
  }

  /**
   * FundingProgram upsert
   */
  export type FundingProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingProgram to update in case it exists.
     */
    where: FundingProgramWhereUniqueInput
    /**
     * In case the FundingProgram found by the `where` argument doesn't exist, create a new FundingProgram with this data.
     */
    create: XOR<FundingProgramCreateInput, FundingProgramUncheckedCreateInput>
    /**
     * In case the FundingProgram was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingProgramUpdateInput, FundingProgramUncheckedUpdateInput>
  }

  /**
   * FundingProgram delete
   */
  export type FundingProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
    /**
     * Filter which FundingProgram to delete.
     */
    where: FundingProgramWhereUniqueInput
  }

  /**
   * FundingProgram deleteMany
   */
  export type FundingProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingPrograms to delete
     */
    where?: FundingProgramWhereInput
  }

  /**
   * FundingProgram.applications
   */
  export type FundingProgram$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    where?: FundingApplicationWhereInput
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    cursor?: FundingApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FundingApplicationScalarFieldEnum | FundingApplicationScalarFieldEnum[]
  }

  /**
   * FundingProgram without action
   */
  export type FundingProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingProgram
     */
    select?: FundingProgramSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingProgramInclude<ExtArgs> | null
  }


  /**
   * Model FundingApplication
   */

  export type AggregateFundingApplication = {
    _count: FundingApplicationCountAggregateOutputType | null
    _min: FundingApplicationMinAggregateOutputType | null
    _max: FundingApplicationMaxAggregateOutputType | null
  }

  export type FundingApplicationMinAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    status: $Enums.ApplicationStatus | null
    submittedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingApplicationMaxAggregateOutputType = {
    id: string | null
    orgId: string | null
    programId: string | null
    status: $Enums.ApplicationStatus | null
    submittedAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FundingApplicationCountAggregateOutputType = {
    id: number
    orgId: number
    programId: number
    status: number
    submittedAt: number
    documents: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FundingApplicationMinAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    status?: true
    submittedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingApplicationMaxAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    status?: true
    submittedAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FundingApplicationCountAggregateInputType = {
    id?: true
    orgId?: true
    programId?: true
    status?: true
    submittedAt?: true
    documents?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FundingApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingApplication to aggregate.
     */
    where?: FundingApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingApplications to fetch.
     */
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FundingApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FundingApplications
    **/
    _count?: true | FundingApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FundingApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FundingApplicationMaxAggregateInputType
  }

  export type GetFundingApplicationAggregateType<T extends FundingApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateFundingApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFundingApplication[P]>
      : GetScalarType<T[P], AggregateFundingApplication[P]>
  }




  export type FundingApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FundingApplicationWhereInput
    orderBy?: FundingApplicationOrderByWithAggregationInput | FundingApplicationOrderByWithAggregationInput[]
    by: FundingApplicationScalarFieldEnum[] | FundingApplicationScalarFieldEnum
    having?: FundingApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FundingApplicationCountAggregateInputType | true
    _min?: FundingApplicationMinAggregateInputType
    _max?: FundingApplicationMaxAggregateInputType
  }

  export type FundingApplicationGroupByOutputType = {
    id: string
    orgId: string
    programId: string
    status: $Enums.ApplicationStatus
    submittedAt: Date | null
    documents: JsonValue
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: FundingApplicationCountAggregateOutputType | null
    _min: FundingApplicationMinAggregateOutputType | null
    _max: FundingApplicationMaxAggregateOutputType | null
  }

  type GetFundingApplicationGroupByPayload<T extends FundingApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FundingApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FundingApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FundingApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], FundingApplicationGroupByOutputType[P]>
        }
      >
    >


  export type FundingApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    status?: boolean
    submittedAt?: boolean
    documents?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    program?: boolean | FundingProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingApplication"]>

  export type FundingApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orgId?: boolean
    programId?: boolean
    status?: boolean
    submittedAt?: boolean
    documents?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    program?: boolean | FundingProgramDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fundingApplication"]>

  export type FundingApplicationSelectScalar = {
    id?: boolean
    orgId?: boolean
    programId?: boolean
    status?: boolean
    submittedAt?: boolean
    documents?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FundingApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    program?: boolean | FundingProgramDefaultArgs<ExtArgs>
  }
  export type FundingApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    org?: boolean | OrganizationDefaultArgs<ExtArgs>
    program?: boolean | FundingProgramDefaultArgs<ExtArgs>
  }

  export type $FundingApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FundingApplication"
    objects: {
      org: Prisma.$OrganizationPayload<ExtArgs>
      program: Prisma.$FundingProgramPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orgId: string
      programId: string
      status: $Enums.ApplicationStatus
      submittedAt: Date | null
      documents: Prisma.JsonValue
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fundingApplication"]>
    composites: {}
  }

  type FundingApplicationGetPayload<S extends boolean | null | undefined | FundingApplicationDefaultArgs> = $Result.GetResult<Prisma.$FundingApplicationPayload, S>

  type FundingApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FundingApplicationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FundingApplicationCountAggregateInputType | true
    }

  export interface FundingApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FundingApplication'], meta: { name: 'FundingApplication' } }
    /**
     * Find zero or one FundingApplication that matches the filter.
     * @param {FundingApplicationFindUniqueArgs} args - Arguments to find a FundingApplication
     * @example
     * // Get one FundingApplication
     * const fundingApplication = await prisma.fundingApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FundingApplicationFindUniqueArgs>(args: SelectSubset<T, FundingApplicationFindUniqueArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FundingApplication that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FundingApplicationFindUniqueOrThrowArgs} args - Arguments to find a FundingApplication
     * @example
     * // Get one FundingApplication
     * const fundingApplication = await prisma.fundingApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FundingApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, FundingApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FundingApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationFindFirstArgs} args - Arguments to find a FundingApplication
     * @example
     * // Get one FundingApplication
     * const fundingApplication = await prisma.fundingApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FundingApplicationFindFirstArgs>(args?: SelectSubset<T, FundingApplicationFindFirstArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FundingApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationFindFirstOrThrowArgs} args - Arguments to find a FundingApplication
     * @example
     * // Get one FundingApplication
     * const fundingApplication = await prisma.fundingApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FundingApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, FundingApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FundingApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FundingApplications
     * const fundingApplications = await prisma.fundingApplication.findMany()
     * 
     * // Get first 10 FundingApplications
     * const fundingApplications = await prisma.fundingApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fundingApplicationWithIdOnly = await prisma.fundingApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FundingApplicationFindManyArgs>(args?: SelectSubset<T, FundingApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FundingApplication.
     * @param {FundingApplicationCreateArgs} args - Arguments to create a FundingApplication.
     * @example
     * // Create one FundingApplication
     * const FundingApplication = await prisma.fundingApplication.create({
     *   data: {
     *     // ... data to create a FundingApplication
     *   }
     * })
     * 
     */
    create<T extends FundingApplicationCreateArgs>(args: SelectSubset<T, FundingApplicationCreateArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FundingApplications.
     * @param {FundingApplicationCreateManyArgs} args - Arguments to create many FundingApplications.
     * @example
     * // Create many FundingApplications
     * const fundingApplication = await prisma.fundingApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FundingApplicationCreateManyArgs>(args?: SelectSubset<T, FundingApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FundingApplications and returns the data saved in the database.
     * @param {FundingApplicationCreateManyAndReturnArgs} args - Arguments to create many FundingApplications.
     * @example
     * // Create many FundingApplications
     * const fundingApplication = await prisma.fundingApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FundingApplications and only return the `id`
     * const fundingApplicationWithIdOnly = await prisma.fundingApplication.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FundingApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, FundingApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FundingApplication.
     * @param {FundingApplicationDeleteArgs} args - Arguments to delete one FundingApplication.
     * @example
     * // Delete one FundingApplication
     * const FundingApplication = await prisma.fundingApplication.delete({
     *   where: {
     *     // ... filter to delete one FundingApplication
     *   }
     * })
     * 
     */
    delete<T extends FundingApplicationDeleteArgs>(args: SelectSubset<T, FundingApplicationDeleteArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FundingApplication.
     * @param {FundingApplicationUpdateArgs} args - Arguments to update one FundingApplication.
     * @example
     * // Update one FundingApplication
     * const fundingApplication = await prisma.fundingApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FundingApplicationUpdateArgs>(args: SelectSubset<T, FundingApplicationUpdateArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FundingApplications.
     * @param {FundingApplicationDeleteManyArgs} args - Arguments to filter FundingApplications to delete.
     * @example
     * // Delete a few FundingApplications
     * const { count } = await prisma.fundingApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FundingApplicationDeleteManyArgs>(args?: SelectSubset<T, FundingApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FundingApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FundingApplications
     * const fundingApplication = await prisma.fundingApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FundingApplicationUpdateManyArgs>(args: SelectSubset<T, FundingApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FundingApplication.
     * @param {FundingApplicationUpsertArgs} args - Arguments to update or create a FundingApplication.
     * @example
     * // Update or create a FundingApplication
     * const fundingApplication = await prisma.fundingApplication.upsert({
     *   create: {
     *     // ... data to create a FundingApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FundingApplication we want to update
     *   }
     * })
     */
    upsert<T extends FundingApplicationUpsertArgs>(args: SelectSubset<T, FundingApplicationUpsertArgs<ExtArgs>>): Prisma__FundingApplicationClient<$Result.GetResult<Prisma.$FundingApplicationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FundingApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationCountArgs} args - Arguments to filter FundingApplications to count.
     * @example
     * // Count the number of FundingApplications
     * const count = await prisma.fundingApplication.count({
     *   where: {
     *     // ... the filter for the FundingApplications we want to count
     *   }
     * })
    **/
    count<T extends FundingApplicationCountArgs>(
      args?: Subset<T, FundingApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FundingApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FundingApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FundingApplicationAggregateArgs>(args: Subset<T, FundingApplicationAggregateArgs>): Prisma.PrismaPromise<GetFundingApplicationAggregateType<T>>

    /**
     * Group by FundingApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FundingApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FundingApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FundingApplicationGroupByArgs['orderBy'] }
        : { orderBy?: FundingApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FundingApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFundingApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FundingApplication model
   */
  readonly fields: FundingApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FundingApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FundingApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    org<T extends OrganizationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrganizationDefaultArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    program<T extends FundingProgramDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FundingProgramDefaultArgs<ExtArgs>>): Prisma__FundingProgramClient<$Result.GetResult<Prisma.$FundingProgramPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FundingApplication model
   */ 
  interface FundingApplicationFieldRefs {
    readonly id: FieldRef<"FundingApplication", 'String'>
    readonly orgId: FieldRef<"FundingApplication", 'String'>
    readonly programId: FieldRef<"FundingApplication", 'String'>
    readonly status: FieldRef<"FundingApplication", 'ApplicationStatus'>
    readonly submittedAt: FieldRef<"FundingApplication", 'DateTime'>
    readonly documents: FieldRef<"FundingApplication", 'Json'>
    readonly notes: FieldRef<"FundingApplication", 'String'>
    readonly createdAt: FieldRef<"FundingApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"FundingApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FundingApplication findUnique
   */
  export type FundingApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter, which FundingApplication to fetch.
     */
    where: FundingApplicationWhereUniqueInput
  }

  /**
   * FundingApplication findUniqueOrThrow
   */
  export type FundingApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter, which FundingApplication to fetch.
     */
    where: FundingApplicationWhereUniqueInput
  }

  /**
   * FundingApplication findFirst
   */
  export type FundingApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter, which FundingApplication to fetch.
     */
    where?: FundingApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingApplications to fetch.
     */
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingApplications.
     */
    cursor?: FundingApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingApplications.
     */
    distinct?: FundingApplicationScalarFieldEnum | FundingApplicationScalarFieldEnum[]
  }

  /**
   * FundingApplication findFirstOrThrow
   */
  export type FundingApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter, which FundingApplication to fetch.
     */
    where?: FundingApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingApplications to fetch.
     */
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FundingApplications.
     */
    cursor?: FundingApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FundingApplications.
     */
    distinct?: FundingApplicationScalarFieldEnum | FundingApplicationScalarFieldEnum[]
  }

  /**
   * FundingApplication findMany
   */
  export type FundingApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter, which FundingApplications to fetch.
     */
    where?: FundingApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FundingApplications to fetch.
     */
    orderBy?: FundingApplicationOrderByWithRelationInput | FundingApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FundingApplications.
     */
    cursor?: FundingApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FundingApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FundingApplications.
     */
    skip?: number
    distinct?: FundingApplicationScalarFieldEnum | FundingApplicationScalarFieldEnum[]
  }

  /**
   * FundingApplication create
   */
  export type FundingApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a FundingApplication.
     */
    data: XOR<FundingApplicationCreateInput, FundingApplicationUncheckedCreateInput>
  }

  /**
   * FundingApplication createMany
   */
  export type FundingApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FundingApplications.
     */
    data: FundingApplicationCreateManyInput | FundingApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FundingApplication createManyAndReturn
   */
  export type FundingApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FundingApplications.
     */
    data: FundingApplicationCreateManyInput | FundingApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FundingApplication update
   */
  export type FundingApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a FundingApplication.
     */
    data: XOR<FundingApplicationUpdateInput, FundingApplicationUncheckedUpdateInput>
    /**
     * Choose, which FundingApplication to update.
     */
    where: FundingApplicationWhereUniqueInput
  }

  /**
   * FundingApplication updateMany
   */
  export type FundingApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FundingApplications.
     */
    data: XOR<FundingApplicationUpdateManyMutationInput, FundingApplicationUncheckedUpdateManyInput>
    /**
     * Filter which FundingApplications to update
     */
    where?: FundingApplicationWhereInput
  }

  /**
   * FundingApplication upsert
   */
  export type FundingApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the FundingApplication to update in case it exists.
     */
    where: FundingApplicationWhereUniqueInput
    /**
     * In case the FundingApplication found by the `where` argument doesn't exist, create a new FundingApplication with this data.
     */
    create: XOR<FundingApplicationCreateInput, FundingApplicationUncheckedCreateInput>
    /**
     * In case the FundingApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FundingApplicationUpdateInput, FundingApplicationUncheckedUpdateInput>
  }

  /**
   * FundingApplication delete
   */
  export type FundingApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
    /**
     * Filter which FundingApplication to delete.
     */
    where: FundingApplicationWhereUniqueInput
  }

  /**
   * FundingApplication deleteMany
   */
  export type FundingApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FundingApplications to delete
     */
    where?: FundingApplicationWhereInput
  }

  /**
   * FundingApplication without action
   */
  export type FundingApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FundingApplication
     */
    select?: FundingApplicationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FundingApplicationInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    orgId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    orgId: string | null
    action: string | null
    entityType: string | null
    entityId: string | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    orgId: number
    action: number
    entityType: number
    entityId: number
    oldValue: number
    newValue: number
    ipAddress: number
    userAgent: number
    metadata: number
    createdAt: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    action?: true
    entityType?: true
    entityId?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    orgId?: true
    action?: true
    entityType?: true
    entityId?: true
    oldValue?: true
    newValue?: true
    ipAddress?: true
    userAgent?: true
    metadata?: true
    createdAt?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    orgId: string | null
    action: string
    entityType: string
    entityId: string | null
    oldValue: JsonValue | null
    newValue: JsonValue | null
    ipAddress: string | null
    userAgent: string | null
    metadata: JsonValue
    createdAt: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    orgId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    orgId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    orgId?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    oldValue?: boolean
    newValue?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    metadata?: boolean
    createdAt?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      orgId: string | null
      action: string
      entityType: string
      entityId: string | null
      oldValue: Prisma.JsonValue | null
      newValue: Prisma.JsonValue | null
      ipAddress: string | null
      userAgent: string | null
      metadata: Prisma.JsonValue
      createdAt: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly orgId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly entityType: FieldRef<"AuditLog", 'String'>
    readonly entityId: FieldRef<"AuditLog", 'String'>
    readonly oldValue: FieldRef<"AuditLog", 'Json'>
    readonly newValue: FieldRef<"AuditLog", 'Json'>
    readonly ipAddress: FieldRef<"AuditLog", 'String'>
    readonly userAgent: FieldRef<"AuditLog", 'String'>
    readonly metadata: FieldRef<"AuditLog", 'Json'>
    readonly createdAt: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    orgId: string | null
    isActive: boolean | null
    expiresAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    key: string | null
    orgId: string | null
    isActive: boolean | null
    expiresAt: Date | null
    lastUsedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    name: number
    key: number
    orgId: number
    isActive: number
    expiresAt: number
    lastUsedAt: number
    scopes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    name?: true
    key?: true
    orgId?: true
    isActive?: true
    expiresAt?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    name?: true
    key?: true
    orgId?: true
    isActive?: true
    expiresAt?: true
    lastUsedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    name?: true
    key?: true
    orgId?: true
    isActive?: true
    expiresAt?: true
    lastUsedAt?: true
    scopes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    name: string
    key: string
    orgId: string | null
    isActive: boolean
    expiresAt: Date | null
    lastUsedAt: Date | null
    scopes: string[]
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    orgId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    key?: boolean
    orgId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    name?: boolean
    key?: boolean
    orgId?: boolean
    isActive?: boolean
    expiresAt?: boolean
    lastUsedAt?: boolean
    scopes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      key: string
      orgId: string | null
      isActive: boolean
      expiresAt: Date | null
      lastUsedAt: Date | null
      scopes: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ApiKey model
   */ 
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly orgId: FieldRef<"ApiKey", 'String'>
    readonly isActive: FieldRef<"ApiKey", 'Boolean'>
    readonly expiresAt: FieldRef<"ApiKey", 'DateTime'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly scopes: FieldRef<"ApiKey", 'String[]'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const OrganizationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    plan: 'plan',
    settings: 'settings',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    orgId: 'orgId',
    status: 'status',
    contextTokens: 'contextTokens',
    metadata: 'metadata',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const RequestLogScalarFieldEnum: {
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

  export type RequestLogScalarFieldEnum = (typeof RequestLogScalarFieldEnum)[keyof typeof RequestLogScalarFieldEnum]


  export const ExtractionScalarFieldEnum: {
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

  export type ExtractionScalarFieldEnum = (typeof ExtractionScalarFieldEnum)[keyof typeof ExtractionScalarFieldEnum]


  export const ActionPreviewScalarFieldEnum: {
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

  export type ActionPreviewScalarFieldEnum = (typeof ActionPreviewScalarFieldEnum)[keyof typeof ActionPreviewScalarFieldEnum]


  export const ActionExecutionScalarFieldEnum: {
    id: 'id',
    previewId: 'previewId',
    executedBy: 'executedBy',
    executedAt: 'executedAt',
    confirmationMethod: 'confirmationMethod',
    result: 'result',
    auditTrail: 'auditTrail'
  };

  export type ActionExecutionScalarFieldEnum = (typeof ActionExecutionScalarFieldEnum)[keyof typeof ActionExecutionScalarFieldEnum]


  export const BadcaseScalarFieldEnum: {
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

  export type BadcaseScalarFieldEnum = (typeof BadcaseScalarFieldEnum)[keyof typeof BadcaseScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
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

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentEmbeddingScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    content: 'content',
    metadata: 'metadata',
    createdAt: 'createdAt'
  };

  export type DocumentEmbeddingScalarFieldEnum = (typeof DocumentEmbeddingScalarFieldEnum)[keyof typeof DocumentEmbeddingScalarFieldEnum]


  export const FundingProgramScalarFieldEnum: {
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

  export type FundingProgramScalarFieldEnum = (typeof FundingProgramScalarFieldEnum)[keyof typeof FundingProgramScalarFieldEnum]


  export const FundingApplicationScalarFieldEnum: {
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

  export type FundingApplicationScalarFieldEnum = (typeof FundingApplicationScalarFieldEnum)[keyof typeof FundingApplicationScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
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

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
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

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'PlanTier'
   */
  export type EnumPlanTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTier'>
    


  /**
   * Reference to a field of type 'PlanTier[]'
   */
  export type ListEnumPlanTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTier[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'SessionStatus[]'
   */
  export type ListEnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'EndpointType'
   */
  export type EnumEndpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EndpointType'>
    


  /**
   * Reference to a field of type 'EndpointType[]'
   */
  export type ListEnumEndpointTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EndpointType[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ExtractionDocType'
   */
  export type EnumExtractionDocTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionDocType'>
    


  /**
   * Reference to a field of type 'ExtractionDocType[]'
   */
  export type ListEnumExtractionDocTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExtractionDocType[]'>
    


  /**
   * Reference to a field of type 'ReviewStatus'
   */
  export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>
    


  /**
   * Reference to a field of type 'ReviewStatus[]'
   */
  export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>
    


  /**
   * Reference to a field of type 'ActionType'
   */
  export type EnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType'>
    


  /**
   * Reference to a field of type 'ActionType[]'
   */
  export type ListEnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType[]'>
    


  /**
   * Reference to a field of type 'ConfirmationMethod'
   */
  export type EnumConfirmationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationMethod'>
    


  /**
   * Reference to a field of type 'ConfirmationMethod[]'
   */
  export type ListEnumConfirmationMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConfirmationMethod[]'>
    


  /**
   * Reference to a field of type 'BadcaseCategory'
   */
  export type EnumBadcaseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadcaseCategory'>
    


  /**
   * Reference to a field of type 'BadcaseCategory[]'
   */
  export type ListEnumBadcaseCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BadcaseCategory[]'>
    


  /**
   * Reference to a field of type 'Severity'
   */
  export type EnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity'>
    


  /**
   * Reference to a field of type 'Severity[]'
   */
  export type ListEnumSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Severity[]'>
    


  /**
   * Reference to a field of type 'FixStatus'
   */
  export type EnumFixStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FixStatus'>
    


  /**
   * Reference to a field of type 'FixStatus[]'
   */
  export type ListEnumFixStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FixStatus[]'>
    


  /**
   * Reference to a field of type 'DocumentPurpose'
   */
  export type EnumDocumentPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentPurpose'>
    


  /**
   * Reference to a field of type 'DocumentPurpose[]'
   */
  export type ListEnumDocumentPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentPurpose[]'>
    


  /**
   * Reference to a field of type 'FundingProgramStatus'
   */
  export type EnumFundingProgramStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FundingProgramStatus'>
    


  /**
   * Reference to a field of type 'FundingProgramStatus[]'
   */
  export type ListEnumFundingProgramStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FundingProgramStatus[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    plan?: EnumPlanTierFilter<"Organization"> | $Enums.PlanTier
    settings?: JsonFilter<"Organization">
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    documents?: DocumentListRelationFilter
    fundingApplications?: FundingApplicationListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
    fundingApplications?: FundingApplicationOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    plan?: EnumPlanTierFilter<"Organization"> | $Enums.PlanTier
    settings?: JsonFilter<"Organization">
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
    documents?: DocumentListRelationFilter
    fundingApplications?: FundingApplicationListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    plan?: EnumPlanTierWithAggregatesFilter<"Organization"> | $Enums.PlanTier
    settings?: JsonWithAggregatesFilter<"Organization">
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    orgId?: StringFilter<"User"> | string
    preferences?: JsonFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    sessions?: SessionListRelationFilter
    requestLogs?: RequestLogListRelationFilter
    actionExecutions?: ActionExecutionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgId?: SortOrder
    preferences?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    org?: OrganizationOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    requestLogs?: RequestLogOrderByRelationAggregateInput
    actionExecutions?: ActionExecutionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    orgId?: StringFilter<"User"> | string
    preferences?: JsonFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    sessions?: SessionListRelationFilter
    requestLogs?: RequestLogListRelationFilter
    actionExecutions?: ActionExecutionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgId?: SortOrder
    preferences?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    orgId?: StringWithAggregatesFilter<"User"> | string
    preferences?: JsonWithAggregatesFilter<"User">
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    orgId?: StringFilter<"Session"> | string
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    contextTokens?: IntFilter<"Session"> | number
    metadata?: JsonFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    requestLogs?: RequestLogListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    status?: SortOrder
    contextTokens?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    user?: UserOrderByWithRelationInput
    requestLogs?: RequestLogOrderByRelationAggregateInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    orgId?: StringFilter<"Session"> | string
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    contextTokens?: IntFilter<"Session"> | number
    metadata?: JsonFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    requestLogs?: RequestLogListRelationFilter
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    status?: SortOrder
    contextTokens?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    orgId?: StringWithAggregatesFilter<"Session"> | string
    status?: EnumSessionStatusWithAggregatesFilter<"Session"> | $Enums.SessionStatus
    contextTokens?: IntWithAggregatesFilter<"Session"> | number
    metadata?: JsonWithAggregatesFilter<"Session">
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type RequestLogWhereInput = {
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    id?: StringFilter<"RequestLog"> | string
    requestId?: StringFilter<"RequestLog"> | string
    sessionId?: StringNullableFilter<"RequestLog"> | string | null
    userId?: StringNullableFilter<"RequestLog"> | string | null
    orgId?: StringNullableFilter<"RequestLog"> | string | null
    endpoint?: EnumEndpointTypeFilter<"RequestLog"> | $Enums.EndpointType
    modelUsed?: StringFilter<"RequestLog"> | string
    promptTokens?: IntFilter<"RequestLog"> | number
    completionTokens?: IntFilter<"RequestLog"> | number
    latencyMs?: IntFilter<"RequestLog"> | number
    fallbackUsed?: BoolFilter<"RequestLog"> | boolean
    schemaValid?: BoolFilter<"RequestLog"> | boolean
    toolCount?: IntFilter<"RequestLog"> | number
    estimatedCostUsd?: DecimalFilter<"RequestLog"> | Decimal | DecimalJsLike | number | string
    traceId?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    extractions?: ExtractionListRelationFilter
    actionPreviews?: ActionPreviewListRelationFilter
    badcases?: BadcaseListRelationFilter
  }

  export type RequestLogOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    endpoint?: SortOrder
    modelUsed?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    fallbackUsed?: SortOrder
    schemaValid?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
    traceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    extractions?: ExtractionOrderByRelationAggregateInput
    actionPreviews?: ActionPreviewOrderByRelationAggregateInput
    badcases?: BadcaseOrderByRelationAggregateInput
  }

  export type RequestLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    requestId?: string
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    sessionId?: StringNullableFilter<"RequestLog"> | string | null
    userId?: StringNullableFilter<"RequestLog"> | string | null
    orgId?: StringNullableFilter<"RequestLog"> | string | null
    endpoint?: EnumEndpointTypeFilter<"RequestLog"> | $Enums.EndpointType
    modelUsed?: StringFilter<"RequestLog"> | string
    promptTokens?: IntFilter<"RequestLog"> | number
    completionTokens?: IntFilter<"RequestLog"> | number
    latencyMs?: IntFilter<"RequestLog"> | number
    fallbackUsed?: BoolFilter<"RequestLog"> | boolean
    schemaValid?: BoolFilter<"RequestLog"> | boolean
    toolCount?: IntFilter<"RequestLog"> | number
    estimatedCostUsd?: DecimalFilter<"RequestLog"> | Decimal | DecimalJsLike | number | string
    traceId?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
    session?: XOR<SessionNullableRelationFilter, SessionWhereInput> | null
    user?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    extractions?: ExtractionListRelationFilter
    actionPreviews?: ActionPreviewListRelationFilter
    badcases?: BadcaseListRelationFilter
  }, "id" | "requestId">

  export type RequestLogOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    sessionId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    endpoint?: SortOrder
    modelUsed?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    fallbackUsed?: SortOrder
    schemaValid?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
    traceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestLogCountOrderByAggregateInput
    _avg?: RequestLogAvgOrderByAggregateInput
    _max?: RequestLogMaxOrderByAggregateInput
    _min?: RequestLogMinOrderByAggregateInput
    _sum?: RequestLogSumOrderByAggregateInput
  }

  export type RequestLogScalarWhereWithAggregatesInput = {
    AND?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    OR?: RequestLogScalarWhereWithAggregatesInput[]
    NOT?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RequestLog"> | string
    requestId?: StringWithAggregatesFilter<"RequestLog"> | string
    sessionId?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    userId?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    orgId?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    endpoint?: EnumEndpointTypeWithAggregatesFilter<"RequestLog"> | $Enums.EndpointType
    modelUsed?: StringWithAggregatesFilter<"RequestLog"> | string
    promptTokens?: IntWithAggregatesFilter<"RequestLog"> | number
    completionTokens?: IntWithAggregatesFilter<"RequestLog"> | number
    latencyMs?: IntWithAggregatesFilter<"RequestLog"> | number
    fallbackUsed?: BoolWithAggregatesFilter<"RequestLog"> | boolean
    schemaValid?: BoolWithAggregatesFilter<"RequestLog"> | boolean
    toolCount?: IntWithAggregatesFilter<"RequestLog"> | number
    estimatedCostUsd?: DecimalWithAggregatesFilter<"RequestLog"> | Decimal | DecimalJsLike | number | string
    traceId?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestLog"> | Date | string
  }

  export type ExtractionWhereInput = {
    AND?: ExtractionWhereInput | ExtractionWhereInput[]
    OR?: ExtractionWhereInput[]
    NOT?: ExtractionWhereInput | ExtractionWhereInput[]
    id?: StringFilter<"Extraction"> | string
    requestId?: StringFilter<"Extraction"> | string
    fileId?: StringNullableFilter<"Extraction"> | string | null
    docType?: EnumExtractionDocTypeFilter<"Extraction"> | $Enums.ExtractionDocType
    fields?: JsonFilter<"Extraction">
    confidenceScores?: JsonFilter<"Extraction">
    warnings?: JsonFilter<"Extraction">
    needsReview?: BoolFilter<"Extraction"> | boolean
    reviewStatus?: EnumReviewStatusFilter<"Extraction"> | $Enums.ReviewStatus
    reviewedBy?: StringNullableFilter<"Extraction"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Extraction"> | Date | string | null
    createdAt?: DateTimeFilter<"Extraction"> | Date | string
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
  }

  export type ExtractionOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    fileId?: SortOrderInput | SortOrder
    docType?: SortOrder
    fields?: SortOrder
    confidenceScores?: SortOrder
    warnings?: SortOrder
    needsReview?: SortOrder
    reviewStatus?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    requestLog?: RequestLogOrderByWithRelationInput
  }

  export type ExtractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExtractionWhereInput | ExtractionWhereInput[]
    OR?: ExtractionWhereInput[]
    NOT?: ExtractionWhereInput | ExtractionWhereInput[]
    requestId?: StringFilter<"Extraction"> | string
    fileId?: StringNullableFilter<"Extraction"> | string | null
    docType?: EnumExtractionDocTypeFilter<"Extraction"> | $Enums.ExtractionDocType
    fields?: JsonFilter<"Extraction">
    confidenceScores?: JsonFilter<"Extraction">
    warnings?: JsonFilter<"Extraction">
    needsReview?: BoolFilter<"Extraction"> | boolean
    reviewStatus?: EnumReviewStatusFilter<"Extraction"> | $Enums.ReviewStatus
    reviewedBy?: StringNullableFilter<"Extraction"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Extraction"> | Date | string | null
    createdAt?: DateTimeFilter<"Extraction"> | Date | string
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
  }, "id">

  export type ExtractionOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    fileId?: SortOrderInput | SortOrder
    docType?: SortOrder
    fields?: SortOrder
    confidenceScores?: SortOrder
    warnings?: SortOrder
    needsReview?: SortOrder
    reviewStatus?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    reviewedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ExtractionCountOrderByAggregateInput
    _max?: ExtractionMaxOrderByAggregateInput
    _min?: ExtractionMinOrderByAggregateInput
  }

  export type ExtractionScalarWhereWithAggregatesInput = {
    AND?: ExtractionScalarWhereWithAggregatesInput | ExtractionScalarWhereWithAggregatesInput[]
    OR?: ExtractionScalarWhereWithAggregatesInput[]
    NOT?: ExtractionScalarWhereWithAggregatesInput | ExtractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Extraction"> | string
    requestId?: StringWithAggregatesFilter<"Extraction"> | string
    fileId?: StringNullableWithAggregatesFilter<"Extraction"> | string | null
    docType?: EnumExtractionDocTypeWithAggregatesFilter<"Extraction"> | $Enums.ExtractionDocType
    fields?: JsonWithAggregatesFilter<"Extraction">
    confidenceScores?: JsonWithAggregatesFilter<"Extraction">
    warnings?: JsonWithAggregatesFilter<"Extraction">
    needsReview?: BoolWithAggregatesFilter<"Extraction"> | boolean
    reviewStatus?: EnumReviewStatusWithAggregatesFilter<"Extraction"> | $Enums.ReviewStatus
    reviewedBy?: StringNullableWithAggregatesFilter<"Extraction"> | string | null
    reviewedAt?: DateTimeNullableWithAggregatesFilter<"Extraction"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Extraction"> | Date | string
  }

  export type ActionPreviewWhereInput = {
    AND?: ActionPreviewWhereInput | ActionPreviewWhereInput[]
    OR?: ActionPreviewWhereInput[]
    NOT?: ActionPreviewWhereInput | ActionPreviewWhereInput[]
    id?: StringFilter<"ActionPreview"> | string
    requestId?: StringFilter<"ActionPreview"> | string
    actionType?: EnumActionTypeFilter<"ActionPreview"> | $Enums.ActionType
    targetType?: StringFilter<"ActionPreview"> | string
    targetId?: StringNullableFilter<"ActionPreview"> | string | null
    payload?: JsonFilter<"ActionPreview">
    allowed?: BoolFilter<"ActionPreview"> | boolean
    missingChecks?: JsonFilter<"ActionPreview">
    impactSummary?: JsonFilter<"ActionPreview">
    humanConfirmationRequired?: BoolFilter<"ActionPreview"> | boolean
    previewToken?: StringNullableFilter<"ActionPreview"> | string | null
    expiresAt?: DateTimeNullableFilter<"ActionPreview"> | Date | string | null
    createdAt?: DateTimeFilter<"ActionPreview"> | Date | string
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
    executions?: ActionExecutionListRelationFilter
  }

  export type ActionPreviewOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    actionType?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    payload?: SortOrder
    allowed?: SortOrder
    missingChecks?: SortOrder
    impactSummary?: SortOrder
    humanConfirmationRequired?: SortOrder
    previewToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    requestLog?: RequestLogOrderByWithRelationInput
    executions?: ActionExecutionOrderByRelationAggregateInput
  }

  export type ActionPreviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    previewToken?: string
    AND?: ActionPreviewWhereInput | ActionPreviewWhereInput[]
    OR?: ActionPreviewWhereInput[]
    NOT?: ActionPreviewWhereInput | ActionPreviewWhereInput[]
    requestId?: StringFilter<"ActionPreview"> | string
    actionType?: EnumActionTypeFilter<"ActionPreview"> | $Enums.ActionType
    targetType?: StringFilter<"ActionPreview"> | string
    targetId?: StringNullableFilter<"ActionPreview"> | string | null
    payload?: JsonFilter<"ActionPreview">
    allowed?: BoolFilter<"ActionPreview"> | boolean
    missingChecks?: JsonFilter<"ActionPreview">
    impactSummary?: JsonFilter<"ActionPreview">
    humanConfirmationRequired?: BoolFilter<"ActionPreview"> | boolean
    expiresAt?: DateTimeNullableFilter<"ActionPreview"> | Date | string | null
    createdAt?: DateTimeFilter<"ActionPreview"> | Date | string
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
    executions?: ActionExecutionListRelationFilter
  }, "id" | "previewToken">

  export type ActionPreviewOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    actionType?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrderInput | SortOrder
    payload?: SortOrder
    allowed?: SortOrder
    missingChecks?: SortOrder
    impactSummary?: SortOrder
    humanConfirmationRequired?: SortOrder
    previewToken?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActionPreviewCountOrderByAggregateInput
    _max?: ActionPreviewMaxOrderByAggregateInput
    _min?: ActionPreviewMinOrderByAggregateInput
  }

  export type ActionPreviewScalarWhereWithAggregatesInput = {
    AND?: ActionPreviewScalarWhereWithAggregatesInput | ActionPreviewScalarWhereWithAggregatesInput[]
    OR?: ActionPreviewScalarWhereWithAggregatesInput[]
    NOT?: ActionPreviewScalarWhereWithAggregatesInput | ActionPreviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionPreview"> | string
    requestId?: StringWithAggregatesFilter<"ActionPreview"> | string
    actionType?: EnumActionTypeWithAggregatesFilter<"ActionPreview"> | $Enums.ActionType
    targetType?: StringWithAggregatesFilter<"ActionPreview"> | string
    targetId?: StringNullableWithAggregatesFilter<"ActionPreview"> | string | null
    payload?: JsonWithAggregatesFilter<"ActionPreview">
    allowed?: BoolWithAggregatesFilter<"ActionPreview"> | boolean
    missingChecks?: JsonWithAggregatesFilter<"ActionPreview">
    impactSummary?: JsonWithAggregatesFilter<"ActionPreview">
    humanConfirmationRequired?: BoolWithAggregatesFilter<"ActionPreview"> | boolean
    previewToken?: StringNullableWithAggregatesFilter<"ActionPreview"> | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ActionPreview"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActionPreview"> | Date | string
  }

  export type ActionExecutionWhereInput = {
    AND?: ActionExecutionWhereInput | ActionExecutionWhereInput[]
    OR?: ActionExecutionWhereInput[]
    NOT?: ActionExecutionWhereInput | ActionExecutionWhereInput[]
    id?: StringFilter<"ActionExecution"> | string
    previewId?: StringFilter<"ActionExecution"> | string
    executedBy?: StringFilter<"ActionExecution"> | string
    executedAt?: DateTimeFilter<"ActionExecution"> | Date | string
    confirmationMethod?: EnumConfirmationMethodFilter<"ActionExecution"> | $Enums.ConfirmationMethod
    result?: JsonFilter<"ActionExecution">
    auditTrail?: JsonFilter<"ActionExecution">
    preview?: XOR<ActionPreviewRelationFilter, ActionPreviewWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActionExecutionOrderByWithRelationInput = {
    id?: SortOrder
    previewId?: SortOrder
    executedBy?: SortOrder
    executedAt?: SortOrder
    confirmationMethod?: SortOrder
    result?: SortOrder
    auditTrail?: SortOrder
    preview?: ActionPreviewOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ActionExecutionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionExecutionWhereInput | ActionExecutionWhereInput[]
    OR?: ActionExecutionWhereInput[]
    NOT?: ActionExecutionWhereInput | ActionExecutionWhereInput[]
    previewId?: StringFilter<"ActionExecution"> | string
    executedBy?: StringFilter<"ActionExecution"> | string
    executedAt?: DateTimeFilter<"ActionExecution"> | Date | string
    confirmationMethod?: EnumConfirmationMethodFilter<"ActionExecution"> | $Enums.ConfirmationMethod
    result?: JsonFilter<"ActionExecution">
    auditTrail?: JsonFilter<"ActionExecution">
    preview?: XOR<ActionPreviewRelationFilter, ActionPreviewWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ActionExecutionOrderByWithAggregationInput = {
    id?: SortOrder
    previewId?: SortOrder
    executedBy?: SortOrder
    executedAt?: SortOrder
    confirmationMethod?: SortOrder
    result?: SortOrder
    auditTrail?: SortOrder
    _count?: ActionExecutionCountOrderByAggregateInput
    _max?: ActionExecutionMaxOrderByAggregateInput
    _min?: ActionExecutionMinOrderByAggregateInput
  }

  export type ActionExecutionScalarWhereWithAggregatesInput = {
    AND?: ActionExecutionScalarWhereWithAggregatesInput | ActionExecutionScalarWhereWithAggregatesInput[]
    OR?: ActionExecutionScalarWhereWithAggregatesInput[]
    NOT?: ActionExecutionScalarWhereWithAggregatesInput | ActionExecutionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActionExecution"> | string
    previewId?: StringWithAggregatesFilter<"ActionExecution"> | string
    executedBy?: StringWithAggregatesFilter<"ActionExecution"> | string
    executedAt?: DateTimeWithAggregatesFilter<"ActionExecution"> | Date | string
    confirmationMethod?: EnumConfirmationMethodWithAggregatesFilter<"ActionExecution"> | $Enums.ConfirmationMethod
    result?: JsonWithAggregatesFilter<"ActionExecution">
    auditTrail?: JsonWithAggregatesFilter<"ActionExecution">
  }

  export type BadcaseWhereInput = {
    AND?: BadcaseWhereInput | BadcaseWhereInput[]
    OR?: BadcaseWhereInput[]
    NOT?: BadcaseWhereInput | BadcaseWhereInput[]
    id?: StringFilter<"Badcase"> | string
    requestId?: StringFilter<"Badcase"> | string
    category?: EnumBadcaseCategoryFilter<"Badcase"> | $Enums.BadcaseCategory
    severity?: EnumSeverityFilter<"Badcase"> | $Enums.Severity
    description?: StringFilter<"Badcase"> | string
    inputSnapshot?: JsonFilter<"Badcase">
    expectedOutput?: JsonNullableFilter<"Badcase">
    actualOutput?: JsonNullableFilter<"Badcase">
    rootCauseAnalysis?: StringNullableFilter<"Badcase"> | string | null
    fixStatus?: EnumFixStatusFilter<"Badcase"> | $Enums.FixStatus
    fixedBy?: StringNullableFilter<"Badcase"> | string | null
    fixedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
    createdAt?: DateTimeFilter<"Badcase"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
  }

  export type BadcaseOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    inputSnapshot?: SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    actualOutput?: SortOrderInput | SortOrder
    rootCauseAnalysis?: SortOrderInput | SortOrder
    fixStatus?: SortOrder
    fixedBy?: SortOrderInput | SortOrder
    fixedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    requestLog?: RequestLogOrderByWithRelationInput
  }

  export type BadcaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BadcaseWhereInput | BadcaseWhereInput[]
    OR?: BadcaseWhereInput[]
    NOT?: BadcaseWhereInput | BadcaseWhereInput[]
    requestId?: StringFilter<"Badcase"> | string
    category?: EnumBadcaseCategoryFilter<"Badcase"> | $Enums.BadcaseCategory
    severity?: EnumSeverityFilter<"Badcase"> | $Enums.Severity
    description?: StringFilter<"Badcase"> | string
    inputSnapshot?: JsonFilter<"Badcase">
    expectedOutput?: JsonNullableFilter<"Badcase">
    actualOutput?: JsonNullableFilter<"Badcase">
    rootCauseAnalysis?: StringNullableFilter<"Badcase"> | string | null
    fixStatus?: EnumFixStatusFilter<"Badcase"> | $Enums.FixStatus
    fixedBy?: StringNullableFilter<"Badcase"> | string | null
    fixedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
    createdAt?: DateTimeFilter<"Badcase"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
    requestLog?: XOR<RequestLogRelationFilter, RequestLogWhereInput>
  }, "id">

  export type BadcaseOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    inputSnapshot?: SortOrder
    expectedOutput?: SortOrderInput | SortOrder
    actualOutput?: SortOrderInput | SortOrder
    rootCauseAnalysis?: SortOrderInput | SortOrder
    fixStatus?: SortOrder
    fixedBy?: SortOrderInput | SortOrder
    fixedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    _count?: BadcaseCountOrderByAggregateInput
    _max?: BadcaseMaxOrderByAggregateInput
    _min?: BadcaseMinOrderByAggregateInput
  }

  export type BadcaseScalarWhereWithAggregatesInput = {
    AND?: BadcaseScalarWhereWithAggregatesInput | BadcaseScalarWhereWithAggregatesInput[]
    OR?: BadcaseScalarWhereWithAggregatesInput[]
    NOT?: BadcaseScalarWhereWithAggregatesInput | BadcaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Badcase"> | string
    requestId?: StringWithAggregatesFilter<"Badcase"> | string
    category?: EnumBadcaseCategoryWithAggregatesFilter<"Badcase"> | $Enums.BadcaseCategory
    severity?: EnumSeverityWithAggregatesFilter<"Badcase"> | $Enums.Severity
    description?: StringWithAggregatesFilter<"Badcase"> | string
    inputSnapshot?: JsonWithAggregatesFilter<"Badcase">
    expectedOutput?: JsonNullableWithAggregatesFilter<"Badcase">
    actualOutput?: JsonNullableWithAggregatesFilter<"Badcase">
    rootCauseAnalysis?: StringNullableWithAggregatesFilter<"Badcase"> | string | null
    fixStatus?: EnumFixStatusWithAggregatesFilter<"Badcase"> | $Enums.FixStatus
    fixedBy?: StringNullableWithAggregatesFilter<"Badcase"> | string | null
    fixedAt?: DateTimeNullableWithAggregatesFilter<"Badcase"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Badcase"> | Date | string
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Badcase"> | Date | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    orgId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringNullableFilter<"Document"> | string | null
    purpose?: EnumDocumentPurposeFilter<"Document"> | $Enums.DocumentPurpose
    storagePath?: StringFilter<"Document"> | string
    extractedText?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    embeddings?: DocumentEmbeddingListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrderInput | SortOrder
    purpose?: SortOrder
    storagePath?: SortOrder
    extractedText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    org?: OrganizationOrderByWithRelationInput
    embeddings?: DocumentEmbeddingOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    orgId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringNullableFilter<"Document"> | string | null
    purpose?: EnumDocumentPurposeFilter<"Document"> | $Enums.DocumentPurpose
    storagePath?: StringFilter<"Document"> | string
    extractedText?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    embeddings?: DocumentEmbeddingListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrderInput | SortOrder
    purpose?: SortOrder
    storagePath?: SortOrder
    extractedText?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    orgId?: StringWithAggregatesFilter<"Document"> | string
    fileName?: StringWithAggregatesFilter<"Document"> | string
    mimeType?: StringWithAggregatesFilter<"Document"> | string
    sizeBytes?: IntWithAggregatesFilter<"Document"> | number
    uploadedBy?: StringNullableWithAggregatesFilter<"Document"> | string | null
    purpose?: EnumDocumentPurposeWithAggregatesFilter<"Document"> | $Enums.DocumentPurpose
    storagePath?: StringWithAggregatesFilter<"Document"> | string
    extractedText?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
  }

  export type DocumentEmbeddingWhereInput = {
    AND?: DocumentEmbeddingWhereInput | DocumentEmbeddingWhereInput[]
    OR?: DocumentEmbeddingWhereInput[]
    NOT?: DocumentEmbeddingWhereInput | DocumentEmbeddingWhereInput[]
    id?: StringFilter<"DocumentEmbedding"> | string
    documentId?: StringFilter<"DocumentEmbedding"> | string
    content?: StringFilter<"DocumentEmbedding"> | string
    metadata?: JsonFilter<"DocumentEmbedding">
    createdAt?: DateTimeFilter<"DocumentEmbedding"> | Date | string
    document?: XOR<DocumentRelationFilter, DocumentWhereInput>
  }

  export type DocumentEmbeddingOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentEmbeddingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentEmbeddingWhereInput | DocumentEmbeddingWhereInput[]
    OR?: DocumentEmbeddingWhereInput[]
    NOT?: DocumentEmbeddingWhereInput | DocumentEmbeddingWhereInput[]
    documentId?: StringFilter<"DocumentEmbedding"> | string
    content?: StringFilter<"DocumentEmbedding"> | string
    metadata?: JsonFilter<"DocumentEmbedding">
    createdAt?: DateTimeFilter<"DocumentEmbedding"> | Date | string
    document?: XOR<DocumentRelationFilter, DocumentWhereInput>
  }, "id">

  export type DocumentEmbeddingOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: DocumentEmbeddingCountOrderByAggregateInput
    _max?: DocumentEmbeddingMaxOrderByAggregateInput
    _min?: DocumentEmbeddingMinOrderByAggregateInput
  }

  export type DocumentEmbeddingScalarWhereWithAggregatesInput = {
    AND?: DocumentEmbeddingScalarWhereWithAggregatesInput | DocumentEmbeddingScalarWhereWithAggregatesInput[]
    OR?: DocumentEmbeddingScalarWhereWithAggregatesInput[]
    NOT?: DocumentEmbeddingScalarWhereWithAggregatesInput | DocumentEmbeddingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentEmbedding"> | string
    documentId?: StringWithAggregatesFilter<"DocumentEmbedding"> | string
    content?: StringWithAggregatesFilter<"DocumentEmbedding"> | string
    metadata?: JsonWithAggregatesFilter<"DocumentEmbedding">
    createdAt?: DateTimeWithAggregatesFilter<"DocumentEmbedding"> | Date | string
  }

  export type FundingProgramWhereInput = {
    AND?: FundingProgramWhereInput | FundingProgramWhereInput[]
    OR?: FundingProgramWhereInput[]
    NOT?: FundingProgramWhereInput | FundingProgramWhereInput[]
    id?: StringFilter<"FundingProgram"> | string
    programName?: StringFilter<"FundingProgram"> | string
    agency?: StringFilter<"FundingProgram"> | string
    maxAmount?: IntNullableFilter<"FundingProgram"> | number | null
    minAmount?: IntNullableFilter<"FundingProgram"> | number | null
    targetIndustries?: StringNullableListFilter<"FundingProgram">
    targetCompanySizes?: StringNullableListFilter<"FundingProgram">
    applicationStart?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    applicationEnd?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    eligibility?: JsonFilter<"FundingProgram">
    description?: StringNullableFilter<"FundingProgram"> | string | null
    sourceUrl?: StringNullableFilter<"FundingProgram"> | string | null
    status?: EnumFundingProgramStatusFilter<"FundingProgram"> | $Enums.FundingProgramStatus
    lastScrapedAt?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    createdAt?: DateTimeFilter<"FundingProgram"> | Date | string
    updatedAt?: DateTimeFilter<"FundingProgram"> | Date | string
    applications?: FundingApplicationListRelationFilter
  }

  export type FundingProgramOrderByWithRelationInput = {
    id?: SortOrder
    programName?: SortOrder
    agency?: SortOrder
    maxAmount?: SortOrderInput | SortOrder
    minAmount?: SortOrderInput | SortOrder
    targetIndustries?: SortOrder
    targetCompanySizes?: SortOrder
    applicationStart?: SortOrderInput | SortOrder
    applicationEnd?: SortOrderInput | SortOrder
    eligibility?: SortOrder
    description?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    lastScrapedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    applications?: FundingApplicationOrderByRelationAggregateInput
  }

  export type FundingProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FundingProgramWhereInput | FundingProgramWhereInput[]
    OR?: FundingProgramWhereInput[]
    NOT?: FundingProgramWhereInput | FundingProgramWhereInput[]
    programName?: StringFilter<"FundingProgram"> | string
    agency?: StringFilter<"FundingProgram"> | string
    maxAmount?: IntNullableFilter<"FundingProgram"> | number | null
    minAmount?: IntNullableFilter<"FundingProgram"> | number | null
    targetIndustries?: StringNullableListFilter<"FundingProgram">
    targetCompanySizes?: StringNullableListFilter<"FundingProgram">
    applicationStart?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    applicationEnd?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    eligibility?: JsonFilter<"FundingProgram">
    description?: StringNullableFilter<"FundingProgram"> | string | null
    sourceUrl?: StringNullableFilter<"FundingProgram"> | string | null
    status?: EnumFundingProgramStatusFilter<"FundingProgram"> | $Enums.FundingProgramStatus
    lastScrapedAt?: DateTimeNullableFilter<"FundingProgram"> | Date | string | null
    createdAt?: DateTimeFilter<"FundingProgram"> | Date | string
    updatedAt?: DateTimeFilter<"FundingProgram"> | Date | string
    applications?: FundingApplicationListRelationFilter
  }, "id">

  export type FundingProgramOrderByWithAggregationInput = {
    id?: SortOrder
    programName?: SortOrder
    agency?: SortOrder
    maxAmount?: SortOrderInput | SortOrder
    minAmount?: SortOrderInput | SortOrder
    targetIndustries?: SortOrder
    targetCompanySizes?: SortOrder
    applicationStart?: SortOrderInput | SortOrder
    applicationEnd?: SortOrderInput | SortOrder
    eligibility?: SortOrder
    description?: SortOrderInput | SortOrder
    sourceUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    lastScrapedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FundingProgramCountOrderByAggregateInput
    _avg?: FundingProgramAvgOrderByAggregateInput
    _max?: FundingProgramMaxOrderByAggregateInput
    _min?: FundingProgramMinOrderByAggregateInput
    _sum?: FundingProgramSumOrderByAggregateInput
  }

  export type FundingProgramScalarWhereWithAggregatesInput = {
    AND?: FundingProgramScalarWhereWithAggregatesInput | FundingProgramScalarWhereWithAggregatesInput[]
    OR?: FundingProgramScalarWhereWithAggregatesInput[]
    NOT?: FundingProgramScalarWhereWithAggregatesInput | FundingProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingProgram"> | string
    programName?: StringWithAggregatesFilter<"FundingProgram"> | string
    agency?: StringWithAggregatesFilter<"FundingProgram"> | string
    maxAmount?: IntNullableWithAggregatesFilter<"FundingProgram"> | number | null
    minAmount?: IntNullableWithAggregatesFilter<"FundingProgram"> | number | null
    targetIndustries?: StringNullableListFilter<"FundingProgram">
    targetCompanySizes?: StringNullableListFilter<"FundingProgram">
    applicationStart?: DateTimeNullableWithAggregatesFilter<"FundingProgram"> | Date | string | null
    applicationEnd?: DateTimeNullableWithAggregatesFilter<"FundingProgram"> | Date | string | null
    eligibility?: JsonWithAggregatesFilter<"FundingProgram">
    description?: StringNullableWithAggregatesFilter<"FundingProgram"> | string | null
    sourceUrl?: StringNullableWithAggregatesFilter<"FundingProgram"> | string | null
    status?: EnumFundingProgramStatusWithAggregatesFilter<"FundingProgram"> | $Enums.FundingProgramStatus
    lastScrapedAt?: DateTimeNullableWithAggregatesFilter<"FundingProgram"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FundingProgram"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FundingProgram"> | Date | string
  }

  export type FundingApplicationWhereInput = {
    AND?: FundingApplicationWhereInput | FundingApplicationWhereInput[]
    OR?: FundingApplicationWhereInput[]
    NOT?: FundingApplicationWhereInput | FundingApplicationWhereInput[]
    id?: StringFilter<"FundingApplication"> | string
    orgId?: StringFilter<"FundingApplication"> | string
    programId?: StringFilter<"FundingApplication"> | string
    status?: EnumApplicationStatusFilter<"FundingApplication"> | $Enums.ApplicationStatus
    submittedAt?: DateTimeNullableFilter<"FundingApplication"> | Date | string | null
    documents?: JsonFilter<"FundingApplication">
    notes?: StringNullableFilter<"FundingApplication"> | string | null
    createdAt?: DateTimeFilter<"FundingApplication"> | Date | string
    updatedAt?: DateTimeFilter<"FundingApplication"> | Date | string
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    program?: XOR<FundingProgramRelationFilter, FundingProgramWhereInput>
  }

  export type FundingApplicationOrderByWithRelationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    documents?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    org?: OrganizationOrderByWithRelationInput
    program?: FundingProgramOrderByWithRelationInput
  }

  export type FundingApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FundingApplicationWhereInput | FundingApplicationWhereInput[]
    OR?: FundingApplicationWhereInput[]
    NOT?: FundingApplicationWhereInput | FundingApplicationWhereInput[]
    orgId?: StringFilter<"FundingApplication"> | string
    programId?: StringFilter<"FundingApplication"> | string
    status?: EnumApplicationStatusFilter<"FundingApplication"> | $Enums.ApplicationStatus
    submittedAt?: DateTimeNullableFilter<"FundingApplication"> | Date | string | null
    documents?: JsonFilter<"FundingApplication">
    notes?: StringNullableFilter<"FundingApplication"> | string | null
    createdAt?: DateTimeFilter<"FundingApplication"> | Date | string
    updatedAt?: DateTimeFilter<"FundingApplication"> | Date | string
    org?: XOR<OrganizationRelationFilter, OrganizationWhereInput>
    program?: XOR<FundingProgramRelationFilter, FundingProgramWhereInput>
  }, "id">

  export type FundingApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    documents?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FundingApplicationCountOrderByAggregateInput
    _max?: FundingApplicationMaxOrderByAggregateInput
    _min?: FundingApplicationMinOrderByAggregateInput
  }

  export type FundingApplicationScalarWhereWithAggregatesInput = {
    AND?: FundingApplicationScalarWhereWithAggregatesInput | FundingApplicationScalarWhereWithAggregatesInput[]
    OR?: FundingApplicationScalarWhereWithAggregatesInput[]
    NOT?: FundingApplicationScalarWhereWithAggregatesInput | FundingApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FundingApplication"> | string
    orgId?: StringWithAggregatesFilter<"FundingApplication"> | string
    programId?: StringWithAggregatesFilter<"FundingApplication"> | string
    status?: EnumApplicationStatusWithAggregatesFilter<"FundingApplication"> | $Enums.ApplicationStatus
    submittedAt?: DateTimeNullableWithAggregatesFilter<"FundingApplication"> | Date | string | null
    documents?: JsonWithAggregatesFilter<"FundingApplication">
    notes?: StringNullableWithAggregatesFilter<"FundingApplication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FundingApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FundingApplication"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    orgId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    orgId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    entityType?: StringFilter<"AuditLog"> | string
    entityId?: StringNullableFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableFilter<"AuditLog">
    newValue?: JsonNullableFilter<"AuditLog">
    ipAddress?: StringNullableFilter<"AuditLog"> | string | null
    userAgent?: StringNullableFilter<"AuditLog"> | string | null
    metadata?: JsonFilter<"AuditLog">
    createdAt?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    orgId?: SortOrderInput | SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrderInput | SortOrder
    oldValue?: SortOrderInput | SortOrder
    newValue?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    orgId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    entityType?: StringWithAggregatesFilter<"AuditLog"> | string
    entityId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    oldValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    newValue?: JsonNullableWithAggregatesFilter<"AuditLog">
    ipAddress?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    metadata?: JsonWithAggregatesFilter<"AuditLog">
    createdAt?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    orgId?: StringNullableFilter<"ApiKey"> | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    orgId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    name?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    orgId?: StringNullableFilter<"ApiKey"> | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
  }, "id">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    orgId?: SortOrderInput | SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    orgId?: StringNullableWithAggregatesFilter<"ApiKey"> | string | null
    isActive?: BoolWithAggregatesFilter<"ApiKey"> | boolean
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    scopes?: StringNullableListFilter<"ApiKey">
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrgInput
    documents?: DocumentCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrgInput
    documents?: DocumentUncheckedCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationUncheckedCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrgNestedInput
    documents?: DocumentUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrgNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUncheckedUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    orgId: string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    orgId?: StringFieldUpdateOperationsInput | string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUncheckedUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    orgId: string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    orgId?: StringFieldUpdateOperationsInput | string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateInput = {
    id?: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
    requestLogs?: RequestLogCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
    requestLogs?: RequestLogUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLogs?: RequestLogUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogCreateInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    session?: SessionCreateNestedOneWithoutRequestLogsInput
    user?: UserCreateNestedOneWithoutRequestLogsInput
    extractions?: ExtractionCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    extractions?: ExtractionUncheckedCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneWithoutRequestLogsNestedInput
    user?: UserUpdateOneWithoutRequestLogsNestedInput
    extractions?: ExtractionUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogCreateManyInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionCreateInput = {
    id?: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
    requestLog: RequestLogCreateNestedOneWithoutExtractionsInput
  }

  export type ExtractionUncheckedCreateInput = {
    id?: string
    requestId: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ExtractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLog?: RequestLogUpdateOneRequiredWithoutExtractionsNestedInput
  }

  export type ExtractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionCreateManyInput = {
    id?: string
    requestId: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ExtractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionPreviewCreateInput = {
    id?: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    requestLog: RequestLogCreateNestedOneWithoutActionPreviewsInput
    executions?: ActionExecutionCreateNestedManyWithoutPreviewInput
  }

  export type ActionPreviewUncheckedCreateInput = {
    id?: string
    requestId: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    executions?: ActionExecutionUncheckedCreateNestedManyWithoutPreviewInput
  }

  export type ActionPreviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLog?: RequestLogUpdateOneRequiredWithoutActionPreviewsNestedInput
    executions?: ActionExecutionUpdateManyWithoutPreviewNestedInput
  }

  export type ActionPreviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ActionExecutionUncheckedUpdateManyWithoutPreviewNestedInput
  }

  export type ActionPreviewCreateManyInput = {
    id?: string
    requestId: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ActionPreviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionPreviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionExecutionCreateInput = {
    id?: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    preview: ActionPreviewCreateNestedOneWithoutExecutionsInput
    user: UserCreateNestedOneWithoutActionExecutionsInput
  }

  export type ActionExecutionUncheckedCreateInput = {
    id?: string
    previewId: string
    executedBy: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    preview?: ActionPreviewUpdateOneRequiredWithoutExecutionsNestedInput
    user?: UserUpdateOneRequiredWithoutActionExecutionsNestedInput
  }

  export type ActionExecutionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    previewId?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionCreateManyInput = {
    id?: string
    previewId: string
    executedBy: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    previewId?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type BadcaseCreateInput = {
    id?: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
    requestLog: RequestLogCreateNestedOneWithoutBadcasesInput
  }

  export type BadcaseUncheckedCreateInput = {
    id?: string
    requestId: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type BadcaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestLog?: RequestLogUpdateOneRequiredWithoutBadcasesNestedInput
  }

  export type BadcaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BadcaseCreateManyInput = {
    id?: string
    requestId: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type BadcaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BadcaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutDocumentsInput
    embeddings?: DocumentEmbeddingCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    orgId: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    embeddings?: DocumentEmbeddingUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutDocumentsNestedInput
    embeddings?: DocumentEmbeddingUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    embeddings?: DocumentEmbeddingUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    orgId: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentEmbeddingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: DocumentUpdateOneRequiredWithoutEmbeddingsNestedInput
  }

  export type DocumentEmbeddingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentEmbeddingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentEmbeddingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingProgramCreateInput = {
    id?: string
    programName: string
    agency: string
    maxAmount?: number | null
    minAmount?: number | null
    targetIndustries?: FundingProgramCreatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramCreatetargetCompanySizesInput | string[]
    applicationStart?: Date | string | null
    applicationEnd?: Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: string | null
    sourceUrl?: string | null
    status?: $Enums.FundingProgramStatus
    lastScrapedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: FundingApplicationCreateNestedManyWithoutProgramInput
  }

  export type FundingProgramUncheckedCreateInput = {
    id?: string
    programName: string
    agency: string
    maxAmount?: number | null
    minAmount?: number | null
    targetIndustries?: FundingProgramCreatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramCreatetargetCompanySizesInput | string[]
    applicationStart?: Date | string | null
    applicationEnd?: Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: string | null
    sourceUrl?: string | null
    status?: $Enums.FundingProgramStatus
    lastScrapedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    applications?: FundingApplicationUncheckedCreateNestedManyWithoutProgramInput
  }

  export type FundingProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: FundingApplicationUpdateManyWithoutProgramNestedInput
  }

  export type FundingProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    applications?: FundingApplicationUncheckedUpdateManyWithoutProgramNestedInput
  }

  export type FundingProgramCreateManyInput = {
    id?: string
    programName: string
    agency: string
    maxAmount?: number | null
    minAmount?: number | null
    targetIndustries?: FundingProgramCreatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramCreatetargetCompanySizesInput | string[]
    applicationStart?: Date | string | null
    applicationEnd?: Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: string | null
    sourceUrl?: string | null
    status?: $Enums.FundingProgramStatus
    lastScrapedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationCreateInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    org: OrganizationCreateNestedOneWithoutFundingApplicationsInput
    program: FundingProgramCreateNestedOneWithoutApplicationsInput
  }

  export type FundingApplicationUncheckedCreateInput = {
    id?: string
    orgId: string
    programId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    org?: OrganizationUpdateOneRequiredWithoutFundingApplicationsNestedInput
    program?: FundingProgramUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type FundingApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationCreateManyInput = {
    id?: string
    orgId: string
    programId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    userId?: string | null
    orgId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    orgId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    orgId?: string | null
    action: string
    entityType: string
    entityId?: string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: string | null
    userAgent?: string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    entityType?: StringFieldUpdateOperationsInput | string
    entityId?: NullableStringFieldUpdateOperationsInput | string | null
    oldValue?: NullableJsonNullValueInput | InputJsonValue
    newValue?: NullableJsonNullValueInput | InputJsonValue
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    key: string
    orgId?: string | null
    isActive?: boolean
    expiresAt?: Date | string | null
    lastUsedAt?: Date | string | null
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    name: string
    key: string
    orgId?: string | null
    isActive?: boolean
    expiresAt?: Date | string | null
    lastUsedAt?: Date | string | null
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    name: string
    key: string
    orgId?: string | null
    isActive?: boolean
    expiresAt?: Date | string | null
    lastUsedAt?: Date | string | null
    scopes?: ApiKeyCreatescopesInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scopes?: ApiKeyUpdatescopesInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumPlanTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | EnumPlanTierFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTierFilter<$PrismaModel> | $Enums.PlanTier
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type FundingApplicationListRelationFilter = {
    every?: FundingApplicationWhereInput
    some?: FundingApplicationWhereInput
    none?: FundingApplicationWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FundingApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    settings?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    plan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumPlanTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | EnumPlanTierFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTierWithAggregatesFilter<$PrismaModel> | $Enums.PlanTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTierFilter<$PrismaModel>
    _max?: NestedEnumPlanTierFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrganizationRelationFilter = {
    is?: OrganizationWhereInput
    isNot?: OrganizationWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type RequestLogListRelationFilter = {
    every?: RequestLogWhereInput
    some?: RequestLogWhereInput
    none?: RequestLogWhereInput
  }

  export type ActionExecutionListRelationFilter = {
    every?: ActionExecutionWhereInput
    some?: ActionExecutionWhereInput
    none?: ActionExecutionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionExecutionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgId?: SortOrder
    preferences?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    orgId?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLoginAt?: SortOrder
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    status?: SortOrder
    contextTokens?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    contextTokens?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    status?: SortOrder
    contextTokens?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    status?: SortOrder
    contextTokens?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    contextTokens?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumEndpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EndpointType | EnumEndpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEndpointTypeFilter<$PrismaModel> | $Enums.EndpointType
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type SessionNullableRelationFilter = {
    is?: SessionWhereInput | null
    isNot?: SessionWhereInput | null
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ExtractionListRelationFilter = {
    every?: ExtractionWhereInput
    some?: ExtractionWhereInput
    none?: ExtractionWhereInput
  }

  export type ActionPreviewListRelationFilter = {
    every?: ActionPreviewWhereInput
    some?: ActionPreviewWhereInput
    none?: ActionPreviewWhereInput
  }

  export type BadcaseListRelationFilter = {
    every?: BadcaseWhereInput
    some?: BadcaseWhereInput
    none?: BadcaseWhereInput
  }

  export type ExtractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionPreviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BadcaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestLogCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    endpoint?: SortOrder
    modelUsed?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    fallbackUsed?: SortOrder
    schemaValid?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogAvgOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
  }

  export type RequestLogMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    endpoint?: SortOrder
    modelUsed?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    fallbackUsed?: SortOrder
    schemaValid?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    sessionId?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    endpoint?: SortOrder
    modelUsed?: SortOrder
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    fallbackUsed?: SortOrder
    schemaValid?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
    traceId?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogSumOrderByAggregateInput = {
    promptTokens?: SortOrder
    completionTokens?: SortOrder
    latencyMs?: SortOrder
    toolCount?: SortOrder
    estimatedCostUsd?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumEndpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EndpointType | EnumEndpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEndpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.EndpointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEndpointTypeFilter<$PrismaModel>
    _max?: NestedEnumEndpointTypeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumExtractionDocTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionDocType | EnumExtractionDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionDocTypeFilter<$PrismaModel> | $Enums.ExtractionDocType
  }

  export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type RequestLogRelationFilter = {
    is?: RequestLogWhereInput
    isNot?: RequestLogWhereInput
  }

  export type ExtractionCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    fileId?: SortOrder
    docType?: SortOrder
    fields?: SortOrder
    confidenceScores?: SortOrder
    warnings?: SortOrder
    needsReview?: SortOrder
    reviewStatus?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtractionMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    fileId?: SortOrder
    docType?: SortOrder
    needsReview?: SortOrder
    reviewStatus?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ExtractionMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    fileId?: SortOrder
    docType?: SortOrder
    needsReview?: SortOrder
    reviewStatus?: SortOrder
    reviewedBy?: SortOrder
    reviewedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumExtractionDocTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionDocType | EnumExtractionDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionDocTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionDocType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExtractionDocTypeFilter<$PrismaModel>
    _max?: NestedEnumExtractionDocTypeFilter<$PrismaModel>
  }

  export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type EnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type ActionPreviewCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actionType?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    payload?: SortOrder
    allowed?: SortOrder
    missingChecks?: SortOrder
    impactSummary?: SortOrder
    humanConfirmationRequired?: SortOrder
    previewToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionPreviewMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actionType?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    allowed?: SortOrder
    humanConfirmationRequired?: SortOrder
    previewToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type ActionPreviewMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actionType?: SortOrder
    targetType?: SortOrder
    targetId?: SortOrder
    allowed?: SortOrder
    humanConfirmationRequired?: SortOrder
    previewToken?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type EnumConfirmationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationMethod | EnumConfirmationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationMethodFilter<$PrismaModel> | $Enums.ConfirmationMethod
  }

  export type ActionPreviewRelationFilter = {
    is?: ActionPreviewWhereInput
    isNot?: ActionPreviewWhereInput
  }

  export type ActionExecutionCountOrderByAggregateInput = {
    id?: SortOrder
    previewId?: SortOrder
    executedBy?: SortOrder
    executedAt?: SortOrder
    confirmationMethod?: SortOrder
    result?: SortOrder
    auditTrail?: SortOrder
  }

  export type ActionExecutionMaxOrderByAggregateInput = {
    id?: SortOrder
    previewId?: SortOrder
    executedBy?: SortOrder
    executedAt?: SortOrder
    confirmationMethod?: SortOrder
  }

  export type ActionExecutionMinOrderByAggregateInput = {
    id?: SortOrder
    previewId?: SortOrder
    executedBy?: SortOrder
    executedAt?: SortOrder
    confirmationMethod?: SortOrder
  }

  export type EnumConfirmationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationMethod | EnumConfirmationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationMethodWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationMethodFilter<$PrismaModel>
    _max?: NestedEnumConfirmationMethodFilter<$PrismaModel>
  }

  export type EnumBadcaseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BadcaseCategory | EnumBadcaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadcaseCategoryFilter<$PrismaModel> | $Enums.BadcaseCategory
  }

  export type EnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumFixStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FixStatus | EnumFixStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFixStatusFilter<$PrismaModel> | $Enums.FixStatus
  }

  export type BadcaseCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    inputSnapshot?: SortOrder
    expectedOutput?: SortOrder
    actualOutput?: SortOrder
    rootCauseAnalysis?: SortOrder
    fixStatus?: SortOrder
    fixedBy?: SortOrder
    fixedAt?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type BadcaseMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    rootCauseAnalysis?: SortOrder
    fixStatus?: SortOrder
    fixedBy?: SortOrder
    fixedAt?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type BadcaseMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    description?: SortOrder
    rootCauseAnalysis?: SortOrder
    fixStatus?: SortOrder
    fixedBy?: SortOrder
    fixedAt?: SortOrder
    createdAt?: SortOrder
    resolvedAt?: SortOrder
  }

  export type EnumBadcaseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadcaseCategory | EnumBadcaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadcaseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BadcaseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadcaseCategoryFilter<$PrismaModel>
    _max?: NestedEnumBadcaseCategoryFilter<$PrismaModel>
  }

  export type EnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumFixStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FixStatus | EnumFixStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFixStatusWithAggregatesFilter<$PrismaModel> | $Enums.FixStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFixStatusFilter<$PrismaModel>
    _max?: NestedEnumFixStatusFilter<$PrismaModel>
  }

  export type EnumDocumentPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentPurpose | EnumDocumentPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentPurposeFilter<$PrismaModel> | $Enums.DocumentPurpose
  }

  export type DocumentEmbeddingListRelationFilter = {
    every?: DocumentEmbeddingWhereInput
    some?: DocumentEmbeddingWhereInput
    none?: DocumentEmbeddingWhereInput
  }

  export type DocumentEmbeddingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    purpose?: SortOrder
    storagePath?: SortOrder
    extractedText?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    purpose?: SortOrder
    storagePath?: SortOrder
    extractedText?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    fileName?: SortOrder
    mimeType?: SortOrder
    sizeBytes?: SortOrder
    uploadedBy?: SortOrder
    purpose?: SortOrder
    storagePath?: SortOrder
    extractedText?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    sizeBytes?: SortOrder
  }

  export type EnumDocumentPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentPurpose | EnumDocumentPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentPurposeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentPurposeFilter<$PrismaModel>
    _max?: NestedEnumDocumentPurposeFilter<$PrismaModel>
  }

  export type DocumentRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentEmbeddingCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentEmbeddingMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentEmbeddingMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumFundingProgramStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FundingProgramStatus | EnumFundingProgramStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFundingProgramStatusFilter<$PrismaModel> | $Enums.FundingProgramStatus
  }

  export type FundingProgramCountOrderByAggregateInput = {
    id?: SortOrder
    programName?: SortOrder
    agency?: SortOrder
    maxAmount?: SortOrder
    minAmount?: SortOrder
    targetIndustries?: SortOrder
    targetCompanySizes?: SortOrder
    applicationStart?: SortOrder
    applicationEnd?: SortOrder
    eligibility?: SortOrder
    description?: SortOrder
    sourceUrl?: SortOrder
    status?: SortOrder
    lastScrapedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingProgramAvgOrderByAggregateInput = {
    maxAmount?: SortOrder
    minAmount?: SortOrder
  }

  export type FundingProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    programName?: SortOrder
    agency?: SortOrder
    maxAmount?: SortOrder
    minAmount?: SortOrder
    applicationStart?: SortOrder
    applicationEnd?: SortOrder
    description?: SortOrder
    sourceUrl?: SortOrder
    status?: SortOrder
    lastScrapedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingProgramMinOrderByAggregateInput = {
    id?: SortOrder
    programName?: SortOrder
    agency?: SortOrder
    maxAmount?: SortOrder
    minAmount?: SortOrder
    applicationStart?: SortOrder
    applicationEnd?: SortOrder
    description?: SortOrder
    sourceUrl?: SortOrder
    status?: SortOrder
    lastScrapedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingProgramSumOrderByAggregateInput = {
    maxAmount?: SortOrder
    minAmount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumFundingProgramStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FundingProgramStatus | EnumFundingProgramStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFundingProgramStatusWithAggregatesFilter<$PrismaModel> | $Enums.FundingProgramStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFundingProgramStatusFilter<$PrismaModel>
    _max?: NestedEnumFundingProgramStatusFilter<$PrismaModel>
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type FundingProgramRelationFilter = {
    is?: FundingProgramWhereInput
    isNot?: FundingProgramWhereInput
  }

  export type FundingApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    documents?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FundingApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    orgId?: SortOrder
    programId?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    oldValue?: SortOrder
    newValue?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    orgId?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    orgId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    scopes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    orgId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    key?: SortOrder
    orgId?: SortOrder
    isActive?: SortOrder
    expiresAt?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedManyWithoutOrgInput = {
    create?: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput> | UserCreateWithoutOrgInput[] | UserUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrgInput | UserCreateOrConnectWithoutOrgInput[]
    createMany?: UserCreateManyOrgInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutOrgInput = {
    create?: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput> | DocumentCreateWithoutOrgInput[] | DocumentUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutOrgInput | DocumentCreateOrConnectWithoutOrgInput[]
    createMany?: DocumentCreateManyOrgInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FundingApplicationCreateNestedManyWithoutOrgInput = {
    create?: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput> | FundingApplicationCreateWithoutOrgInput[] | FundingApplicationUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutOrgInput | FundingApplicationCreateOrConnectWithoutOrgInput[]
    createMany?: FundingApplicationCreateManyOrgInputEnvelope
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrgInput = {
    create?: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput> | UserCreateWithoutOrgInput[] | UserUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrgInput | UserCreateOrConnectWithoutOrgInput[]
    createMany?: UserCreateManyOrgInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutOrgInput = {
    create?: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput> | DocumentCreateWithoutOrgInput[] | DocumentUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutOrgInput | DocumentCreateOrConnectWithoutOrgInput[]
    createMany?: DocumentCreateManyOrgInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type FundingApplicationUncheckedCreateNestedManyWithoutOrgInput = {
    create?: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput> | FundingApplicationCreateWithoutOrgInput[] | FundingApplicationUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutOrgInput | FundingApplicationCreateOrConnectWithoutOrgInput[]
    createMany?: FundingApplicationCreateManyOrgInputEnvelope
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumPlanTierFieldUpdateOperationsInput = {
    set?: $Enums.PlanTier
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateManyWithoutOrgNestedInput = {
    create?: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput> | UserCreateWithoutOrgInput[] | UserUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrgInput | UserCreateOrConnectWithoutOrgInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrgInput | UserUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: UserCreateManyOrgInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrgInput | UserUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrgInput | UserUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutOrgNestedInput = {
    create?: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput> | DocumentCreateWithoutOrgInput[] | DocumentUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutOrgInput | DocumentCreateOrConnectWithoutOrgInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutOrgInput | DocumentUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: DocumentCreateManyOrgInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutOrgInput | DocumentUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutOrgInput | DocumentUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FundingApplicationUpdateManyWithoutOrgNestedInput = {
    create?: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput> | FundingApplicationCreateWithoutOrgInput[] | FundingApplicationUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutOrgInput | FundingApplicationCreateOrConnectWithoutOrgInput[]
    upsert?: FundingApplicationUpsertWithWhereUniqueWithoutOrgInput | FundingApplicationUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: FundingApplicationCreateManyOrgInputEnvelope
    set?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    disconnect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    delete?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    update?: FundingApplicationUpdateWithWhereUniqueWithoutOrgInput | FundingApplicationUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: FundingApplicationUpdateManyWithWhereWithoutOrgInput | FundingApplicationUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrgNestedInput = {
    create?: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput> | UserCreateWithoutOrgInput[] | UserUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrgInput | UserCreateOrConnectWithoutOrgInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrgInput | UserUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: UserCreateManyOrgInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrgInput | UserUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrgInput | UserUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutOrgNestedInput = {
    create?: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput> | DocumentCreateWithoutOrgInput[] | DocumentUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutOrgInput | DocumentCreateOrConnectWithoutOrgInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutOrgInput | DocumentUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: DocumentCreateManyOrgInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutOrgInput | DocumentUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutOrgInput | DocumentUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type FundingApplicationUncheckedUpdateManyWithoutOrgNestedInput = {
    create?: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput> | FundingApplicationCreateWithoutOrgInput[] | FundingApplicationUncheckedCreateWithoutOrgInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutOrgInput | FundingApplicationCreateOrConnectWithoutOrgInput[]
    upsert?: FundingApplicationUpsertWithWhereUniqueWithoutOrgInput | FundingApplicationUpsertWithWhereUniqueWithoutOrgInput[]
    createMany?: FundingApplicationCreateManyOrgInputEnvelope
    set?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    disconnect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    delete?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    update?: FundingApplicationUpdateWithWhereUniqueWithoutOrgInput | FundingApplicationUpdateWithWhereUniqueWithoutOrgInput[]
    updateMany?: FundingApplicationUpdateManyWithWhereWithoutOrgInput | FundingApplicationUpdateManyWithWhereWithoutOrgInput[]
    deleteMany?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RequestLogCreateNestedManyWithoutUserInput = {
    create?: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput> | RequestLogCreateWithoutUserInput[] | RequestLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutUserInput | RequestLogCreateOrConnectWithoutUserInput[]
    createMany?: RequestLogCreateManyUserInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type ActionExecutionCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput> | ActionExecutionCreateWithoutUserInput[] | ActionExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutUserInput | ActionExecutionCreateOrConnectWithoutUserInput[]
    createMany?: ActionExecutionCreateManyUserInputEnvelope
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RequestLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput> | RequestLogCreateWithoutUserInput[] | RequestLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutUserInput | RequestLogCreateOrConnectWithoutUserInput[]
    createMany?: RequestLogCreateManyUserInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type ActionExecutionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput> | ActionExecutionCreateWithoutUserInput[] | ActionExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutUserInput | ActionExecutionCreateOrConnectWithoutUserInput[]
    createMany?: ActionExecutionCreateManyUserInputEnvelope
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RequestLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput> | RequestLogCreateWithoutUserInput[] | RequestLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutUserInput | RequestLogCreateOrConnectWithoutUserInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutUserInput | RequestLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RequestLogCreateManyUserInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutUserInput | RequestLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutUserInput | RequestLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type ActionExecutionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput> | ActionExecutionCreateWithoutUserInput[] | ActionExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutUserInput | ActionExecutionCreateOrConnectWithoutUserInput[]
    upsert?: ActionExecutionUpsertWithWhereUniqueWithoutUserInput | ActionExecutionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionExecutionCreateManyUserInputEnvelope
    set?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    disconnect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    delete?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    update?: ActionExecutionUpdateWithWhereUniqueWithoutUserInput | ActionExecutionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionExecutionUpdateManyWithWhereWithoutUserInput | ActionExecutionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RequestLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput> | RequestLogCreateWithoutUserInput[] | RequestLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutUserInput | RequestLogCreateOrConnectWithoutUserInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutUserInput | RequestLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RequestLogCreateManyUserInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutUserInput | RequestLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutUserInput | RequestLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type ActionExecutionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput> | ActionExecutionCreateWithoutUserInput[] | ActionExecutionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutUserInput | ActionExecutionCreateOrConnectWithoutUserInput[]
    upsert?: ActionExecutionUpsertWithWhereUniqueWithoutUserInput | ActionExecutionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionExecutionCreateManyUserInputEnvelope
    set?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    disconnect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    delete?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    update?: ActionExecutionUpdateWithWhereUniqueWithoutUserInput | ActionExecutionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionExecutionUpdateManyWithWhereWithoutUserInput | ActionExecutionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type RequestLogCreateNestedManyWithoutSessionInput = {
    create?: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput> | RequestLogCreateWithoutSessionInput[] | RequestLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutSessionInput | RequestLogCreateOrConnectWithoutSessionInput[]
    createMany?: RequestLogCreateManySessionInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type RequestLogUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput> | RequestLogCreateWithoutSessionInput[] | RequestLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutSessionInput | RequestLogCreateOrConnectWithoutSessionInput[]
    createMany?: RequestLogCreateManySessionInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type RequestLogUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput> | RequestLogCreateWithoutSessionInput[] | RequestLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutSessionInput | RequestLogCreateOrConnectWithoutSessionInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutSessionInput | RequestLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RequestLogCreateManySessionInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutSessionInput | RequestLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutSessionInput | RequestLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type RequestLogUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput> | RequestLogCreateWithoutSessionInput[] | RequestLogUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutSessionInput | RequestLogCreateOrConnectWithoutSessionInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutSessionInput | RequestLogUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RequestLogCreateManySessionInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutSessionInput | RequestLogUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutSessionInput | RequestLogUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutRequestLogsInput = {
    create?: XOR<SessionCreateWithoutRequestLogsInput, SessionUncheckedCreateWithoutRequestLogsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRequestLogsInput
    connect?: SessionWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRequestLogsInput = {
    create?: XOR<UserCreateWithoutRequestLogsInput, UserUncheckedCreateWithoutRequestLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestLogsInput
    connect?: UserWhereUniqueInput
  }

  export type ExtractionCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput> | ExtractionCreateWithoutRequestLogInput[] | ExtractionUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ExtractionCreateOrConnectWithoutRequestLogInput | ExtractionCreateOrConnectWithoutRequestLogInput[]
    createMany?: ExtractionCreateManyRequestLogInputEnvelope
    connect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
  }

  export type ActionPreviewCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput> | ActionPreviewCreateWithoutRequestLogInput[] | ActionPreviewUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutRequestLogInput | ActionPreviewCreateOrConnectWithoutRequestLogInput[]
    createMany?: ActionPreviewCreateManyRequestLogInputEnvelope
    connect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
  }

  export type BadcaseCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput> | BadcaseCreateWithoutRequestLogInput[] | BadcaseUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: BadcaseCreateOrConnectWithoutRequestLogInput | BadcaseCreateOrConnectWithoutRequestLogInput[]
    createMany?: BadcaseCreateManyRequestLogInputEnvelope
    connect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
  }

  export type ExtractionUncheckedCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput> | ExtractionCreateWithoutRequestLogInput[] | ExtractionUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ExtractionCreateOrConnectWithoutRequestLogInput | ExtractionCreateOrConnectWithoutRequestLogInput[]
    createMany?: ExtractionCreateManyRequestLogInputEnvelope
    connect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
  }

  export type ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput> | ActionPreviewCreateWithoutRequestLogInput[] | ActionPreviewUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutRequestLogInput | ActionPreviewCreateOrConnectWithoutRequestLogInput[]
    createMany?: ActionPreviewCreateManyRequestLogInputEnvelope
    connect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
  }

  export type BadcaseUncheckedCreateNestedManyWithoutRequestLogInput = {
    create?: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput> | BadcaseCreateWithoutRequestLogInput[] | BadcaseUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: BadcaseCreateOrConnectWithoutRequestLogInput | BadcaseCreateOrConnectWithoutRequestLogInput[]
    createMany?: BadcaseCreateManyRequestLogInputEnvelope
    connect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumEndpointTypeFieldUpdateOperationsInput = {
    set?: $Enums.EndpointType
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type SessionUpdateOneWithoutRequestLogsNestedInput = {
    create?: XOR<SessionCreateWithoutRequestLogsInput, SessionUncheckedCreateWithoutRequestLogsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRequestLogsInput
    upsert?: SessionUpsertWithoutRequestLogsInput
    disconnect?: SessionWhereInput | boolean
    delete?: SessionWhereInput | boolean
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRequestLogsInput, SessionUpdateWithoutRequestLogsInput>, SessionUncheckedUpdateWithoutRequestLogsInput>
  }

  export type UserUpdateOneWithoutRequestLogsNestedInput = {
    create?: XOR<UserCreateWithoutRequestLogsInput, UserUncheckedCreateWithoutRequestLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRequestLogsInput
    upsert?: UserUpsertWithoutRequestLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRequestLogsInput, UserUpdateWithoutRequestLogsInput>, UserUncheckedUpdateWithoutRequestLogsInput>
  }

  export type ExtractionUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput> | ExtractionCreateWithoutRequestLogInput[] | ExtractionUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ExtractionCreateOrConnectWithoutRequestLogInput | ExtractionCreateOrConnectWithoutRequestLogInput[]
    upsert?: ExtractionUpsertWithWhereUniqueWithoutRequestLogInput | ExtractionUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: ExtractionCreateManyRequestLogInputEnvelope
    set?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    disconnect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    delete?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    connect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    update?: ExtractionUpdateWithWhereUniqueWithoutRequestLogInput | ExtractionUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: ExtractionUpdateManyWithWhereWithoutRequestLogInput | ExtractionUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: ExtractionScalarWhereInput | ExtractionScalarWhereInput[]
  }

  export type ActionPreviewUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput> | ActionPreviewCreateWithoutRequestLogInput[] | ActionPreviewUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutRequestLogInput | ActionPreviewCreateOrConnectWithoutRequestLogInput[]
    upsert?: ActionPreviewUpsertWithWhereUniqueWithoutRequestLogInput | ActionPreviewUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: ActionPreviewCreateManyRequestLogInputEnvelope
    set?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    disconnect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    delete?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    connect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    update?: ActionPreviewUpdateWithWhereUniqueWithoutRequestLogInput | ActionPreviewUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: ActionPreviewUpdateManyWithWhereWithoutRequestLogInput | ActionPreviewUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: ActionPreviewScalarWhereInput | ActionPreviewScalarWhereInput[]
  }

  export type BadcaseUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput> | BadcaseCreateWithoutRequestLogInput[] | BadcaseUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: BadcaseCreateOrConnectWithoutRequestLogInput | BadcaseCreateOrConnectWithoutRequestLogInput[]
    upsert?: BadcaseUpsertWithWhereUniqueWithoutRequestLogInput | BadcaseUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: BadcaseCreateManyRequestLogInputEnvelope
    set?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    disconnect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    delete?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    connect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    update?: BadcaseUpdateWithWhereUniqueWithoutRequestLogInput | BadcaseUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: BadcaseUpdateManyWithWhereWithoutRequestLogInput | BadcaseUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: BadcaseScalarWhereInput | BadcaseScalarWhereInput[]
  }

  export type ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput> | ExtractionCreateWithoutRequestLogInput[] | ExtractionUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ExtractionCreateOrConnectWithoutRequestLogInput | ExtractionCreateOrConnectWithoutRequestLogInput[]
    upsert?: ExtractionUpsertWithWhereUniqueWithoutRequestLogInput | ExtractionUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: ExtractionCreateManyRequestLogInputEnvelope
    set?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    disconnect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    delete?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    connect?: ExtractionWhereUniqueInput | ExtractionWhereUniqueInput[]
    update?: ExtractionUpdateWithWhereUniqueWithoutRequestLogInput | ExtractionUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: ExtractionUpdateManyWithWhereWithoutRequestLogInput | ExtractionUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: ExtractionScalarWhereInput | ExtractionScalarWhereInput[]
  }

  export type ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput> | ActionPreviewCreateWithoutRequestLogInput[] | ActionPreviewUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutRequestLogInput | ActionPreviewCreateOrConnectWithoutRequestLogInput[]
    upsert?: ActionPreviewUpsertWithWhereUniqueWithoutRequestLogInput | ActionPreviewUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: ActionPreviewCreateManyRequestLogInputEnvelope
    set?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    disconnect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    delete?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    connect?: ActionPreviewWhereUniqueInput | ActionPreviewWhereUniqueInput[]
    update?: ActionPreviewUpdateWithWhereUniqueWithoutRequestLogInput | ActionPreviewUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: ActionPreviewUpdateManyWithWhereWithoutRequestLogInput | ActionPreviewUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: ActionPreviewScalarWhereInput | ActionPreviewScalarWhereInput[]
  }

  export type BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput = {
    create?: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput> | BadcaseCreateWithoutRequestLogInput[] | BadcaseUncheckedCreateWithoutRequestLogInput[]
    connectOrCreate?: BadcaseCreateOrConnectWithoutRequestLogInput | BadcaseCreateOrConnectWithoutRequestLogInput[]
    upsert?: BadcaseUpsertWithWhereUniqueWithoutRequestLogInput | BadcaseUpsertWithWhereUniqueWithoutRequestLogInput[]
    createMany?: BadcaseCreateManyRequestLogInputEnvelope
    set?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    disconnect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    delete?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    connect?: BadcaseWhereUniqueInput | BadcaseWhereUniqueInput[]
    update?: BadcaseUpdateWithWhereUniqueWithoutRequestLogInput | BadcaseUpdateWithWhereUniqueWithoutRequestLogInput[]
    updateMany?: BadcaseUpdateManyWithWhereWithoutRequestLogInput | BadcaseUpdateManyWithWhereWithoutRequestLogInput[]
    deleteMany?: BadcaseScalarWhereInput | BadcaseScalarWhereInput[]
  }

  export type RequestLogCreateNestedOneWithoutExtractionsInput = {
    create?: XOR<RequestLogCreateWithoutExtractionsInput, RequestLogUncheckedCreateWithoutExtractionsInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutExtractionsInput
    connect?: RequestLogWhereUniqueInput
  }

  export type EnumExtractionDocTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExtractionDocType
  }

  export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewStatus
  }

  export type RequestLogUpdateOneRequiredWithoutExtractionsNestedInput = {
    create?: XOR<RequestLogCreateWithoutExtractionsInput, RequestLogUncheckedCreateWithoutExtractionsInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutExtractionsInput
    upsert?: RequestLogUpsertWithoutExtractionsInput
    connect?: RequestLogWhereUniqueInput
    update?: XOR<XOR<RequestLogUpdateToOneWithWhereWithoutExtractionsInput, RequestLogUpdateWithoutExtractionsInput>, RequestLogUncheckedUpdateWithoutExtractionsInput>
  }

  export type RequestLogCreateNestedOneWithoutActionPreviewsInput = {
    create?: XOR<RequestLogCreateWithoutActionPreviewsInput, RequestLogUncheckedCreateWithoutActionPreviewsInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutActionPreviewsInput
    connect?: RequestLogWhereUniqueInput
  }

  export type ActionExecutionCreateNestedManyWithoutPreviewInput = {
    create?: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput> | ActionExecutionCreateWithoutPreviewInput[] | ActionExecutionUncheckedCreateWithoutPreviewInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutPreviewInput | ActionExecutionCreateOrConnectWithoutPreviewInput[]
    createMany?: ActionExecutionCreateManyPreviewInputEnvelope
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
  }

  export type ActionExecutionUncheckedCreateNestedManyWithoutPreviewInput = {
    create?: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput> | ActionExecutionCreateWithoutPreviewInput[] | ActionExecutionUncheckedCreateWithoutPreviewInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutPreviewInput | ActionExecutionCreateOrConnectWithoutPreviewInput[]
    createMany?: ActionExecutionCreateManyPreviewInputEnvelope
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
  }

  export type EnumActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActionType
  }

  export type RequestLogUpdateOneRequiredWithoutActionPreviewsNestedInput = {
    create?: XOR<RequestLogCreateWithoutActionPreviewsInput, RequestLogUncheckedCreateWithoutActionPreviewsInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutActionPreviewsInput
    upsert?: RequestLogUpsertWithoutActionPreviewsInput
    connect?: RequestLogWhereUniqueInput
    update?: XOR<XOR<RequestLogUpdateToOneWithWhereWithoutActionPreviewsInput, RequestLogUpdateWithoutActionPreviewsInput>, RequestLogUncheckedUpdateWithoutActionPreviewsInput>
  }

  export type ActionExecutionUpdateManyWithoutPreviewNestedInput = {
    create?: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput> | ActionExecutionCreateWithoutPreviewInput[] | ActionExecutionUncheckedCreateWithoutPreviewInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutPreviewInput | ActionExecutionCreateOrConnectWithoutPreviewInput[]
    upsert?: ActionExecutionUpsertWithWhereUniqueWithoutPreviewInput | ActionExecutionUpsertWithWhereUniqueWithoutPreviewInput[]
    createMany?: ActionExecutionCreateManyPreviewInputEnvelope
    set?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    disconnect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    delete?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    update?: ActionExecutionUpdateWithWhereUniqueWithoutPreviewInput | ActionExecutionUpdateWithWhereUniqueWithoutPreviewInput[]
    updateMany?: ActionExecutionUpdateManyWithWhereWithoutPreviewInput | ActionExecutionUpdateManyWithWhereWithoutPreviewInput[]
    deleteMany?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
  }

  export type ActionExecutionUncheckedUpdateManyWithoutPreviewNestedInput = {
    create?: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput> | ActionExecutionCreateWithoutPreviewInput[] | ActionExecutionUncheckedCreateWithoutPreviewInput[]
    connectOrCreate?: ActionExecutionCreateOrConnectWithoutPreviewInput | ActionExecutionCreateOrConnectWithoutPreviewInput[]
    upsert?: ActionExecutionUpsertWithWhereUniqueWithoutPreviewInput | ActionExecutionUpsertWithWhereUniqueWithoutPreviewInput[]
    createMany?: ActionExecutionCreateManyPreviewInputEnvelope
    set?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    disconnect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    delete?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    connect?: ActionExecutionWhereUniqueInput | ActionExecutionWhereUniqueInput[]
    update?: ActionExecutionUpdateWithWhereUniqueWithoutPreviewInput | ActionExecutionUpdateWithWhereUniqueWithoutPreviewInput[]
    updateMany?: ActionExecutionUpdateManyWithWhereWithoutPreviewInput | ActionExecutionUpdateManyWithWhereWithoutPreviewInput[]
    deleteMany?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
  }

  export type ActionPreviewCreateNestedOneWithoutExecutionsInput = {
    create?: XOR<ActionPreviewCreateWithoutExecutionsInput, ActionPreviewUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutExecutionsInput
    connect?: ActionPreviewWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutActionExecutionsInput = {
    create?: XOR<UserCreateWithoutActionExecutionsInput, UserUncheckedCreateWithoutActionExecutionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionExecutionsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumConfirmationMethodFieldUpdateOperationsInput = {
    set?: $Enums.ConfirmationMethod
  }

  export type ActionPreviewUpdateOneRequiredWithoutExecutionsNestedInput = {
    create?: XOR<ActionPreviewCreateWithoutExecutionsInput, ActionPreviewUncheckedCreateWithoutExecutionsInput>
    connectOrCreate?: ActionPreviewCreateOrConnectWithoutExecutionsInput
    upsert?: ActionPreviewUpsertWithoutExecutionsInput
    connect?: ActionPreviewWhereUniqueInput
    update?: XOR<XOR<ActionPreviewUpdateToOneWithWhereWithoutExecutionsInput, ActionPreviewUpdateWithoutExecutionsInput>, ActionPreviewUncheckedUpdateWithoutExecutionsInput>
  }

  export type UserUpdateOneRequiredWithoutActionExecutionsNestedInput = {
    create?: XOR<UserCreateWithoutActionExecutionsInput, UserUncheckedCreateWithoutActionExecutionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionExecutionsInput
    upsert?: UserUpsertWithoutActionExecutionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionExecutionsInput, UserUpdateWithoutActionExecutionsInput>, UserUncheckedUpdateWithoutActionExecutionsInput>
  }

  export type RequestLogCreateNestedOneWithoutBadcasesInput = {
    create?: XOR<RequestLogCreateWithoutBadcasesInput, RequestLogUncheckedCreateWithoutBadcasesInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutBadcasesInput
    connect?: RequestLogWhereUniqueInput
  }

  export type EnumBadcaseCategoryFieldUpdateOperationsInput = {
    set?: $Enums.BadcaseCategory
  }

  export type EnumSeverityFieldUpdateOperationsInput = {
    set?: $Enums.Severity
  }

  export type EnumFixStatusFieldUpdateOperationsInput = {
    set?: $Enums.FixStatus
  }

  export type RequestLogUpdateOneRequiredWithoutBadcasesNestedInput = {
    create?: XOR<RequestLogCreateWithoutBadcasesInput, RequestLogUncheckedCreateWithoutBadcasesInput>
    connectOrCreate?: RequestLogCreateOrConnectWithoutBadcasesInput
    upsert?: RequestLogUpsertWithoutBadcasesInput
    connect?: RequestLogWhereUniqueInput
    update?: XOR<XOR<RequestLogUpdateToOneWithWhereWithoutBadcasesInput, RequestLogUpdateWithoutBadcasesInput>, RequestLogUncheckedUpdateWithoutBadcasesInput>
  }

  export type OrganizationCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<OrganizationCreateWithoutDocumentsInput, OrganizationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDocumentsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type DocumentEmbeddingCreateNestedManyWithoutDocumentInput = {
    connect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
  }

  export type DocumentEmbeddingUncheckedCreateNestedManyWithoutDocumentInput = {
    connect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
  }

  export type EnumDocumentPurposeFieldUpdateOperationsInput = {
    set?: $Enums.DocumentPurpose
  }

  export type OrganizationUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<OrganizationCreateWithoutDocumentsInput, OrganizationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutDocumentsInput
    upsert?: OrganizationUpsertWithoutDocumentsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutDocumentsInput, OrganizationUpdateWithoutDocumentsInput>, OrganizationUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentEmbeddingUpdateManyWithoutDocumentNestedInput = {
    set?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    disconnect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    delete?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    connect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    update?: DocumentEmbeddingUpdateWithWhereUniqueWithoutDocumentInput | DocumentEmbeddingUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentEmbeddingUpdateManyWithWhereWithoutDocumentInput | DocumentEmbeddingUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentEmbeddingScalarWhereInput | DocumentEmbeddingScalarWhereInput[]
  }

  export type DocumentEmbeddingUncheckedUpdateManyWithoutDocumentNestedInput = {
    set?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    disconnect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    delete?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    connect?: DocumentEmbeddingWhereUniqueInput | DocumentEmbeddingWhereUniqueInput[]
    update?: DocumentEmbeddingUpdateWithWhereUniqueWithoutDocumentInput | DocumentEmbeddingUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentEmbeddingUpdateManyWithWhereWithoutDocumentInput | DocumentEmbeddingUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentEmbeddingScalarWhereInput | DocumentEmbeddingScalarWhereInput[]
  }

  export type DocumentUpdateOneRequiredWithoutEmbeddingsNestedInput = {
    create?: XOR<DocumentCreateWithoutEmbeddingsInput, DocumentUncheckedCreateWithoutEmbeddingsInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutEmbeddingsInput
    upsert?: DocumentUpsertWithoutEmbeddingsInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutEmbeddingsInput, DocumentUpdateWithoutEmbeddingsInput>, DocumentUncheckedUpdateWithoutEmbeddingsInput>
  }

  export type FundingProgramCreatetargetIndustriesInput = {
    set: string[]
  }

  export type FundingProgramCreatetargetCompanySizesInput = {
    set: string[]
  }

  export type FundingApplicationCreateNestedManyWithoutProgramInput = {
    create?: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput> | FundingApplicationCreateWithoutProgramInput[] | FundingApplicationUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutProgramInput | FundingApplicationCreateOrConnectWithoutProgramInput[]
    createMany?: FundingApplicationCreateManyProgramInputEnvelope
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
  }

  export type FundingApplicationUncheckedCreateNestedManyWithoutProgramInput = {
    create?: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput> | FundingApplicationCreateWithoutProgramInput[] | FundingApplicationUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutProgramInput | FundingApplicationCreateOrConnectWithoutProgramInput[]
    createMany?: FundingApplicationCreateManyProgramInputEnvelope
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FundingProgramUpdatetargetIndustriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type FundingProgramUpdatetargetCompanySizesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumFundingProgramStatusFieldUpdateOperationsInput = {
    set?: $Enums.FundingProgramStatus
  }

  export type FundingApplicationUpdateManyWithoutProgramNestedInput = {
    create?: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput> | FundingApplicationCreateWithoutProgramInput[] | FundingApplicationUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutProgramInput | FundingApplicationCreateOrConnectWithoutProgramInput[]
    upsert?: FundingApplicationUpsertWithWhereUniqueWithoutProgramInput | FundingApplicationUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: FundingApplicationCreateManyProgramInputEnvelope
    set?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    disconnect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    delete?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    update?: FundingApplicationUpdateWithWhereUniqueWithoutProgramInput | FundingApplicationUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: FundingApplicationUpdateManyWithWhereWithoutProgramInput | FundingApplicationUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
  }

  export type FundingApplicationUncheckedUpdateManyWithoutProgramNestedInput = {
    create?: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput> | FundingApplicationCreateWithoutProgramInput[] | FundingApplicationUncheckedCreateWithoutProgramInput[]
    connectOrCreate?: FundingApplicationCreateOrConnectWithoutProgramInput | FundingApplicationCreateOrConnectWithoutProgramInput[]
    upsert?: FundingApplicationUpsertWithWhereUniqueWithoutProgramInput | FundingApplicationUpsertWithWhereUniqueWithoutProgramInput[]
    createMany?: FundingApplicationCreateManyProgramInputEnvelope
    set?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    disconnect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    delete?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    connect?: FundingApplicationWhereUniqueInput | FundingApplicationWhereUniqueInput[]
    update?: FundingApplicationUpdateWithWhereUniqueWithoutProgramInput | FundingApplicationUpdateWithWhereUniqueWithoutProgramInput[]
    updateMany?: FundingApplicationUpdateManyWithWhereWithoutProgramInput | FundingApplicationUpdateManyWithWhereWithoutProgramInput[]
    deleteMany?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutFundingApplicationsInput = {
    create?: XOR<OrganizationCreateWithoutFundingApplicationsInput, OrganizationUncheckedCreateWithoutFundingApplicationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFundingApplicationsInput
    connect?: OrganizationWhereUniqueInput
  }

  export type FundingProgramCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<FundingProgramCreateWithoutApplicationsInput, FundingProgramUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: FundingProgramCreateOrConnectWithoutApplicationsInput
    connect?: FundingProgramWhereUniqueInput
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type OrganizationUpdateOneRequiredWithoutFundingApplicationsNestedInput = {
    create?: XOR<OrganizationCreateWithoutFundingApplicationsInput, OrganizationUncheckedCreateWithoutFundingApplicationsInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutFundingApplicationsInput
    upsert?: OrganizationUpsertWithoutFundingApplicationsInput
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutFundingApplicationsInput, OrganizationUpdateWithoutFundingApplicationsInput>, OrganizationUncheckedUpdateWithoutFundingApplicationsInput>
  }

  export type FundingProgramUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<FundingProgramCreateWithoutApplicationsInput, FundingProgramUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: FundingProgramCreateOrConnectWithoutApplicationsInput
    upsert?: FundingProgramUpsertWithoutApplicationsInput
    connect?: FundingProgramWhereUniqueInput
    update?: XOR<XOR<FundingProgramUpdateToOneWithWhereWithoutApplicationsInput, FundingProgramUpdateWithoutApplicationsInput>, FundingProgramUncheckedUpdateWithoutApplicationsInput>
  }

  export type ApiKeyCreatescopesInput = {
    set: string[]
  }

  export type ApiKeyUpdatescopesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumPlanTierFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | EnumPlanTierFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTierFilter<$PrismaModel> | $Enums.PlanTier
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumPlanTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PlanTier | EnumPlanTierFieldRefInput<$PrismaModel>
    in?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.PlanTier[] | ListEnumPlanTierFieldRefInput<$PrismaModel>
    not?: NestedEnumPlanTierWithAggregatesFilter<$PrismaModel> | $Enums.PlanTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPlanTierFilter<$PrismaModel>
    _max?: NestedEnumPlanTierFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SessionStatus[] | ListEnumSessionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumEndpointTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EndpointType | EnumEndpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEndpointTypeFilter<$PrismaModel> | $Enums.EndpointType
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumEndpointTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EndpointType | EnumEndpointTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EndpointType[] | ListEnumEndpointTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEndpointTypeWithAggregatesFilter<$PrismaModel> | $Enums.EndpointType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEndpointTypeFilter<$PrismaModel>
    _max?: NestedEnumEndpointTypeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumExtractionDocTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionDocType | EnumExtractionDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionDocTypeFilter<$PrismaModel> | $Enums.ExtractionDocType
  }

  export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type NestedEnumExtractionDocTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExtractionDocType | EnumExtractionDocTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExtractionDocType[] | ListEnumExtractionDocTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExtractionDocTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExtractionDocType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExtractionDocTypeFilter<$PrismaModel>
    _max?: NestedEnumExtractionDocTypeFilter<$PrismaModel>
  }

  export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type NestedEnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type NestedEnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type NestedEnumConfirmationMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationMethod | EnumConfirmationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationMethodFilter<$PrismaModel> | $Enums.ConfirmationMethod
  }

  export type NestedEnumConfirmationMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ConfirmationMethod | EnumConfirmationMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ConfirmationMethod[] | ListEnumConfirmationMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumConfirmationMethodWithAggregatesFilter<$PrismaModel> | $Enums.ConfirmationMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumConfirmationMethodFilter<$PrismaModel>
    _max?: NestedEnumConfirmationMethodFilter<$PrismaModel>
  }

  export type NestedEnumBadcaseCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.BadcaseCategory | EnumBadcaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadcaseCategoryFilter<$PrismaModel> | $Enums.BadcaseCategory
  }

  export type NestedEnumSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityFilter<$PrismaModel> | $Enums.Severity
  }

  export type NestedEnumFixStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FixStatus | EnumFixStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFixStatusFilter<$PrismaModel> | $Enums.FixStatus
  }

  export type NestedEnumBadcaseCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BadcaseCategory | EnumBadcaseCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.BadcaseCategory[] | ListEnumBadcaseCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumBadcaseCategoryWithAggregatesFilter<$PrismaModel> | $Enums.BadcaseCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBadcaseCategoryFilter<$PrismaModel>
    _max?: NestedEnumBadcaseCategoryFilter<$PrismaModel>
  }

  export type NestedEnumSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Severity | EnumSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.Severity[] | ListEnumSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumSeverityWithAggregatesFilter<$PrismaModel> | $Enums.Severity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSeverityFilter<$PrismaModel>
    _max?: NestedEnumSeverityFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumFixStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FixStatus | EnumFixStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FixStatus[] | ListEnumFixStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFixStatusWithAggregatesFilter<$PrismaModel> | $Enums.FixStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFixStatusFilter<$PrismaModel>
    _max?: NestedEnumFixStatusFilter<$PrismaModel>
  }

  export type NestedEnumDocumentPurposeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentPurpose | EnumDocumentPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentPurposeFilter<$PrismaModel> | $Enums.DocumentPurpose
  }

  export type NestedEnumDocumentPurposeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentPurpose | EnumDocumentPurposeFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    notIn?: $Enums.DocumentPurpose[] | ListEnumDocumentPurposeFieldRefInput<$PrismaModel>
    not?: NestedEnumDocumentPurposeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentPurpose
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentPurposeFilter<$PrismaModel>
    _max?: NestedEnumDocumentPurposeFilter<$PrismaModel>
  }

  export type NestedEnumFundingProgramStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FundingProgramStatus | EnumFundingProgramStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFundingProgramStatusFilter<$PrismaModel> | $Enums.FundingProgramStatus
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumFundingProgramStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FundingProgramStatus | EnumFundingProgramStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FundingProgramStatus[] | ListEnumFundingProgramStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFundingProgramStatusWithAggregatesFilter<$PrismaModel> | $Enums.FundingProgramStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFundingProgramStatusFilter<$PrismaModel>
    _max?: NestedEnumFundingProgramStatusFilter<$PrismaModel>
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutOrgInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrgInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrgInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput>
  }

  export type UserCreateManyOrgInputEnvelope = {
    data: UserCreateManyOrgInput | UserCreateManyOrgInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutOrgInput = {
    id?: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    embeddings?: DocumentEmbeddingCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutOrgInput = {
    id?: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    embeddings?: DocumentEmbeddingUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutOrgInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput>
  }

  export type DocumentCreateManyOrgInputEnvelope = {
    data: DocumentCreateManyOrgInput | DocumentCreateManyOrgInput[]
    skipDuplicates?: boolean
  }

  export type FundingApplicationCreateWithoutOrgInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    program: FundingProgramCreateNestedOneWithoutApplicationsInput
  }

  export type FundingApplicationUncheckedCreateWithoutOrgInput = {
    id?: string
    programId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingApplicationCreateOrConnectWithoutOrgInput = {
    where: FundingApplicationWhereUniqueInput
    create: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput>
  }

  export type FundingApplicationCreateManyOrgInputEnvelope = {
    data: FundingApplicationCreateManyOrgInput | FundingApplicationCreateManyOrgInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutOrgInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrgInput, UserUncheckedUpdateWithoutOrgInput>
    create: XOR<UserCreateWithoutOrgInput, UserUncheckedCreateWithoutOrgInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrgInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrgInput, UserUncheckedUpdateWithoutOrgInput>
  }

  export type UserUpdateManyWithWhereWithoutOrgInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrgInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    orgId?: StringFilter<"User"> | string
    preferences?: JsonFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLoginAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type DocumentUpsertWithWhereUniqueWithoutOrgInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutOrgInput, DocumentUncheckedUpdateWithoutOrgInput>
    create: XOR<DocumentCreateWithoutOrgInput, DocumentUncheckedCreateWithoutOrgInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutOrgInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutOrgInput, DocumentUncheckedUpdateWithoutOrgInput>
  }

  export type DocumentUpdateManyWithWhereWithoutOrgInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutOrgInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    orgId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    mimeType?: StringFilter<"Document"> | string
    sizeBytes?: IntFilter<"Document"> | number
    uploadedBy?: StringNullableFilter<"Document"> | string | null
    purpose?: EnumDocumentPurposeFilter<"Document"> | $Enums.DocumentPurpose
    storagePath?: StringFilter<"Document"> | string
    extractedText?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    expiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
  }

  export type FundingApplicationUpsertWithWhereUniqueWithoutOrgInput = {
    where: FundingApplicationWhereUniqueInput
    update: XOR<FundingApplicationUpdateWithoutOrgInput, FundingApplicationUncheckedUpdateWithoutOrgInput>
    create: XOR<FundingApplicationCreateWithoutOrgInput, FundingApplicationUncheckedCreateWithoutOrgInput>
  }

  export type FundingApplicationUpdateWithWhereUniqueWithoutOrgInput = {
    where: FundingApplicationWhereUniqueInput
    data: XOR<FundingApplicationUpdateWithoutOrgInput, FundingApplicationUncheckedUpdateWithoutOrgInput>
  }

  export type FundingApplicationUpdateManyWithWhereWithoutOrgInput = {
    where: FundingApplicationScalarWhereInput
    data: XOR<FundingApplicationUpdateManyMutationInput, FundingApplicationUncheckedUpdateManyWithoutOrgInput>
  }

  export type FundingApplicationScalarWhereInput = {
    AND?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
    OR?: FundingApplicationScalarWhereInput[]
    NOT?: FundingApplicationScalarWhereInput | FundingApplicationScalarWhereInput[]
    id?: StringFilter<"FundingApplication"> | string
    orgId?: StringFilter<"FundingApplication"> | string
    programId?: StringFilter<"FundingApplication"> | string
    status?: EnumApplicationStatusFilter<"FundingApplication"> | $Enums.ApplicationStatus
    submittedAt?: DateTimeNullableFilter<"FundingApplication"> | Date | string | null
    documents?: JsonFilter<"FundingApplication">
    notes?: StringNullableFilter<"FundingApplication"> | string | null
    createdAt?: DateTimeFilter<"FundingApplication"> | Date | string
    updatedAt?: DateTimeFilter<"FundingApplication"> | Date | string
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: DocumentUncheckedCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationUncheckedCreateNestedManyWithoutOrgInput
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
    requestLogs?: RequestLogCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RequestLogCreateWithoutUserInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    session?: SessionCreateNestedOneWithoutRequestLogsInput
    extractions?: ExtractionCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateWithoutUserInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    extractions?: ExtractionUncheckedCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogCreateOrConnectWithoutUserInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput>
  }

  export type RequestLogCreateManyUserInputEnvelope = {
    data: RequestLogCreateManyUserInput | RequestLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionExecutionCreateWithoutUserInput = {
    id?: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    preview: ActionPreviewCreateNestedOneWithoutExecutionsInput
  }

  export type ActionExecutionUncheckedCreateWithoutUserInput = {
    id?: string
    previewId: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionCreateOrConnectWithoutUserInput = {
    where: ActionExecutionWhereUniqueInput
    create: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput>
  }

  export type ActionExecutionCreateManyUserInputEnvelope = {
    data: ActionExecutionCreateManyUserInput | ActionExecutionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: DocumentUncheckedUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUncheckedUpdateManyWithoutOrgNestedInput
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    orgId?: StringFilter<"Session"> | string
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    contextTokens?: IntFilter<"Session"> | number
    metadata?: JsonFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type RequestLogUpsertWithWhereUniqueWithoutUserInput = {
    where: RequestLogWhereUniqueInput
    update: XOR<RequestLogUpdateWithoutUserInput, RequestLogUncheckedUpdateWithoutUserInput>
    create: XOR<RequestLogCreateWithoutUserInput, RequestLogUncheckedCreateWithoutUserInput>
  }

  export type RequestLogUpdateWithWhereUniqueWithoutUserInput = {
    where: RequestLogWhereUniqueInput
    data: XOR<RequestLogUpdateWithoutUserInput, RequestLogUncheckedUpdateWithoutUserInput>
  }

  export type RequestLogUpdateManyWithWhereWithoutUserInput = {
    where: RequestLogScalarWhereInput
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyWithoutUserInput>
  }

  export type RequestLogScalarWhereInput = {
    AND?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
    OR?: RequestLogScalarWhereInput[]
    NOT?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
    id?: StringFilter<"RequestLog"> | string
    requestId?: StringFilter<"RequestLog"> | string
    sessionId?: StringNullableFilter<"RequestLog"> | string | null
    userId?: StringNullableFilter<"RequestLog"> | string | null
    orgId?: StringNullableFilter<"RequestLog"> | string | null
    endpoint?: EnumEndpointTypeFilter<"RequestLog"> | $Enums.EndpointType
    modelUsed?: StringFilter<"RequestLog"> | string
    promptTokens?: IntFilter<"RequestLog"> | number
    completionTokens?: IntFilter<"RequestLog"> | number
    latencyMs?: IntFilter<"RequestLog"> | number
    fallbackUsed?: BoolFilter<"RequestLog"> | boolean
    schemaValid?: BoolFilter<"RequestLog"> | boolean
    toolCount?: IntFilter<"RequestLog"> | number
    estimatedCostUsd?: DecimalFilter<"RequestLog"> | Decimal | DecimalJsLike | number | string
    traceId?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
  }

  export type ActionExecutionUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionExecutionWhereUniqueInput
    update: XOR<ActionExecutionUpdateWithoutUserInput, ActionExecutionUncheckedUpdateWithoutUserInput>
    create: XOR<ActionExecutionCreateWithoutUserInput, ActionExecutionUncheckedCreateWithoutUserInput>
  }

  export type ActionExecutionUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionExecutionWhereUniqueInput
    data: XOR<ActionExecutionUpdateWithoutUserInput, ActionExecutionUncheckedUpdateWithoutUserInput>
  }

  export type ActionExecutionUpdateManyWithWhereWithoutUserInput = {
    where: ActionExecutionScalarWhereInput
    data: XOR<ActionExecutionUpdateManyMutationInput, ActionExecutionUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionExecutionScalarWhereInput = {
    AND?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
    OR?: ActionExecutionScalarWhereInput[]
    NOT?: ActionExecutionScalarWhereInput | ActionExecutionScalarWhereInput[]
    id?: StringFilter<"ActionExecution"> | string
    previewId?: StringFilter<"ActionExecution"> | string
    executedBy?: StringFilter<"ActionExecution"> | string
    executedAt?: DateTimeFilter<"ActionExecution"> | Date | string
    confirmationMethod?: EnumConfirmationMethodFilter<"ActionExecution"> | $Enums.ConfirmationMethod
    result?: JsonFilter<"ActionExecution">
    auditTrail?: JsonFilter<"ActionExecution">
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutUsersInput
    requestLogs?: RequestLogCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    orgId: string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type RequestLogCreateWithoutSessionInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutRequestLogsInput
    extractions?: ExtractionCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateWithoutSessionInput = {
    id?: string
    requestId: string
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    extractions?: ExtractionUncheckedCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogCreateOrConnectWithoutSessionInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput>
  }

  export type RequestLogCreateManySessionInputEnvelope = {
    data: RequestLogCreateManySessionInput | RequestLogCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    requestLogs?: RequestLogUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    orgId?: StringFieldUpdateOperationsInput | string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    requestLogs?: RequestLogUncheckedUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RequestLogUpsertWithWhereUniqueWithoutSessionInput = {
    where: RequestLogWhereUniqueInput
    update: XOR<RequestLogUpdateWithoutSessionInput, RequestLogUncheckedUpdateWithoutSessionInput>
    create: XOR<RequestLogCreateWithoutSessionInput, RequestLogUncheckedCreateWithoutSessionInput>
  }

  export type RequestLogUpdateWithWhereUniqueWithoutSessionInput = {
    where: RequestLogWhereUniqueInput
    data: XOR<RequestLogUpdateWithoutSessionInput, RequestLogUncheckedUpdateWithoutSessionInput>
  }

  export type RequestLogUpdateManyWithWhereWithoutSessionInput = {
    where: RequestLogScalarWhereInput
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyWithoutSessionInput>
  }

  export type SessionCreateWithoutRequestLogsInput = {
    id?: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutRequestLogsInput = {
    id?: string
    userId: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type SessionCreateOrConnectWithoutRequestLogsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRequestLogsInput, SessionUncheckedCreateWithoutRequestLogsInput>
  }

  export type UserCreateWithoutRequestLogsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRequestLogsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    orgId: string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    actionExecutions?: ActionExecutionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRequestLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRequestLogsInput, UserUncheckedCreateWithoutRequestLogsInput>
  }

  export type ExtractionCreateWithoutRequestLogInput = {
    id?: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ExtractionUncheckedCreateWithoutRequestLogInput = {
    id?: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ExtractionCreateOrConnectWithoutRequestLogInput = {
    where: ExtractionWhereUniqueInput
    create: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput>
  }

  export type ExtractionCreateManyRequestLogInputEnvelope = {
    data: ExtractionCreateManyRequestLogInput | ExtractionCreateManyRequestLogInput[]
    skipDuplicates?: boolean
  }

  export type ActionPreviewCreateWithoutRequestLogInput = {
    id?: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    executions?: ActionExecutionCreateNestedManyWithoutPreviewInput
  }

  export type ActionPreviewUncheckedCreateWithoutRequestLogInput = {
    id?: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    executions?: ActionExecutionUncheckedCreateNestedManyWithoutPreviewInput
  }

  export type ActionPreviewCreateOrConnectWithoutRequestLogInput = {
    where: ActionPreviewWhereUniqueInput
    create: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput>
  }

  export type ActionPreviewCreateManyRequestLogInputEnvelope = {
    data: ActionPreviewCreateManyRequestLogInput | ActionPreviewCreateManyRequestLogInput[]
    skipDuplicates?: boolean
  }

  export type BadcaseCreateWithoutRequestLogInput = {
    id?: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type BadcaseUncheckedCreateWithoutRequestLogInput = {
    id?: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type BadcaseCreateOrConnectWithoutRequestLogInput = {
    where: BadcaseWhereUniqueInput
    create: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput>
  }

  export type BadcaseCreateManyRequestLogInputEnvelope = {
    data: BadcaseCreateManyRequestLogInput | BadcaseCreateManyRequestLogInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithoutRequestLogsInput = {
    update: XOR<SessionUpdateWithoutRequestLogsInput, SessionUncheckedUpdateWithoutRequestLogsInput>
    create: XOR<SessionCreateWithoutRequestLogsInput, SessionUncheckedCreateWithoutRequestLogsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRequestLogsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRequestLogsInput, SessionUncheckedUpdateWithoutRequestLogsInput>
  }

  export type SessionUpdateWithoutRequestLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutRequestLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutRequestLogsInput = {
    update: XOR<UserUpdateWithoutRequestLogsInput, UserUncheckedUpdateWithoutRequestLogsInput>
    create: XOR<UserCreateWithoutRequestLogsInput, UserUncheckedCreateWithoutRequestLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRequestLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRequestLogsInput, UserUncheckedUpdateWithoutRequestLogsInput>
  }

  export type UserUpdateWithoutRequestLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRequestLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    orgId?: StringFieldUpdateOperationsInput | string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExtractionUpsertWithWhereUniqueWithoutRequestLogInput = {
    where: ExtractionWhereUniqueInput
    update: XOR<ExtractionUpdateWithoutRequestLogInput, ExtractionUncheckedUpdateWithoutRequestLogInput>
    create: XOR<ExtractionCreateWithoutRequestLogInput, ExtractionUncheckedCreateWithoutRequestLogInput>
  }

  export type ExtractionUpdateWithWhereUniqueWithoutRequestLogInput = {
    where: ExtractionWhereUniqueInput
    data: XOR<ExtractionUpdateWithoutRequestLogInput, ExtractionUncheckedUpdateWithoutRequestLogInput>
  }

  export type ExtractionUpdateManyWithWhereWithoutRequestLogInput = {
    where: ExtractionScalarWhereInput
    data: XOR<ExtractionUpdateManyMutationInput, ExtractionUncheckedUpdateManyWithoutRequestLogInput>
  }

  export type ExtractionScalarWhereInput = {
    AND?: ExtractionScalarWhereInput | ExtractionScalarWhereInput[]
    OR?: ExtractionScalarWhereInput[]
    NOT?: ExtractionScalarWhereInput | ExtractionScalarWhereInput[]
    id?: StringFilter<"Extraction"> | string
    requestId?: StringFilter<"Extraction"> | string
    fileId?: StringNullableFilter<"Extraction"> | string | null
    docType?: EnumExtractionDocTypeFilter<"Extraction"> | $Enums.ExtractionDocType
    fields?: JsonFilter<"Extraction">
    confidenceScores?: JsonFilter<"Extraction">
    warnings?: JsonFilter<"Extraction">
    needsReview?: BoolFilter<"Extraction"> | boolean
    reviewStatus?: EnumReviewStatusFilter<"Extraction"> | $Enums.ReviewStatus
    reviewedBy?: StringNullableFilter<"Extraction"> | string | null
    reviewedAt?: DateTimeNullableFilter<"Extraction"> | Date | string | null
    createdAt?: DateTimeFilter<"Extraction"> | Date | string
  }

  export type ActionPreviewUpsertWithWhereUniqueWithoutRequestLogInput = {
    where: ActionPreviewWhereUniqueInput
    update: XOR<ActionPreviewUpdateWithoutRequestLogInput, ActionPreviewUncheckedUpdateWithoutRequestLogInput>
    create: XOR<ActionPreviewCreateWithoutRequestLogInput, ActionPreviewUncheckedCreateWithoutRequestLogInput>
  }

  export type ActionPreviewUpdateWithWhereUniqueWithoutRequestLogInput = {
    where: ActionPreviewWhereUniqueInput
    data: XOR<ActionPreviewUpdateWithoutRequestLogInput, ActionPreviewUncheckedUpdateWithoutRequestLogInput>
  }

  export type ActionPreviewUpdateManyWithWhereWithoutRequestLogInput = {
    where: ActionPreviewScalarWhereInput
    data: XOR<ActionPreviewUpdateManyMutationInput, ActionPreviewUncheckedUpdateManyWithoutRequestLogInput>
  }

  export type ActionPreviewScalarWhereInput = {
    AND?: ActionPreviewScalarWhereInput | ActionPreviewScalarWhereInput[]
    OR?: ActionPreviewScalarWhereInput[]
    NOT?: ActionPreviewScalarWhereInput | ActionPreviewScalarWhereInput[]
    id?: StringFilter<"ActionPreview"> | string
    requestId?: StringFilter<"ActionPreview"> | string
    actionType?: EnumActionTypeFilter<"ActionPreview"> | $Enums.ActionType
    targetType?: StringFilter<"ActionPreview"> | string
    targetId?: StringNullableFilter<"ActionPreview"> | string | null
    payload?: JsonFilter<"ActionPreview">
    allowed?: BoolFilter<"ActionPreview"> | boolean
    missingChecks?: JsonFilter<"ActionPreview">
    impactSummary?: JsonFilter<"ActionPreview">
    humanConfirmationRequired?: BoolFilter<"ActionPreview"> | boolean
    previewToken?: StringNullableFilter<"ActionPreview"> | string | null
    expiresAt?: DateTimeNullableFilter<"ActionPreview"> | Date | string | null
    createdAt?: DateTimeFilter<"ActionPreview"> | Date | string
  }

  export type BadcaseUpsertWithWhereUniqueWithoutRequestLogInput = {
    where: BadcaseWhereUniqueInput
    update: XOR<BadcaseUpdateWithoutRequestLogInput, BadcaseUncheckedUpdateWithoutRequestLogInput>
    create: XOR<BadcaseCreateWithoutRequestLogInput, BadcaseUncheckedCreateWithoutRequestLogInput>
  }

  export type BadcaseUpdateWithWhereUniqueWithoutRequestLogInput = {
    where: BadcaseWhereUniqueInput
    data: XOR<BadcaseUpdateWithoutRequestLogInput, BadcaseUncheckedUpdateWithoutRequestLogInput>
  }

  export type BadcaseUpdateManyWithWhereWithoutRequestLogInput = {
    where: BadcaseScalarWhereInput
    data: XOR<BadcaseUpdateManyMutationInput, BadcaseUncheckedUpdateManyWithoutRequestLogInput>
  }

  export type BadcaseScalarWhereInput = {
    AND?: BadcaseScalarWhereInput | BadcaseScalarWhereInput[]
    OR?: BadcaseScalarWhereInput[]
    NOT?: BadcaseScalarWhereInput | BadcaseScalarWhereInput[]
    id?: StringFilter<"Badcase"> | string
    requestId?: StringFilter<"Badcase"> | string
    category?: EnumBadcaseCategoryFilter<"Badcase"> | $Enums.BadcaseCategory
    severity?: EnumSeverityFilter<"Badcase"> | $Enums.Severity
    description?: StringFilter<"Badcase"> | string
    inputSnapshot?: JsonFilter<"Badcase">
    expectedOutput?: JsonNullableFilter<"Badcase">
    actualOutput?: JsonNullableFilter<"Badcase">
    rootCauseAnalysis?: StringNullableFilter<"Badcase"> | string | null
    fixStatus?: EnumFixStatusFilter<"Badcase"> | $Enums.FixStatus
    fixedBy?: StringNullableFilter<"Badcase"> | string | null
    fixedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
    createdAt?: DateTimeFilter<"Badcase"> | Date | string
    resolvedAt?: DateTimeNullableFilter<"Badcase"> | Date | string | null
  }

  export type RequestLogCreateWithoutExtractionsInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    session?: SessionCreateNestedOneWithoutRequestLogsInput
    user?: UserCreateNestedOneWithoutRequestLogsInput
    actionPreviews?: ActionPreviewCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateWithoutExtractionsInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    actionPreviews?: ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogCreateOrConnectWithoutExtractionsInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutExtractionsInput, RequestLogUncheckedCreateWithoutExtractionsInput>
  }

  export type RequestLogUpsertWithoutExtractionsInput = {
    update: XOR<RequestLogUpdateWithoutExtractionsInput, RequestLogUncheckedUpdateWithoutExtractionsInput>
    create: XOR<RequestLogCreateWithoutExtractionsInput, RequestLogUncheckedCreateWithoutExtractionsInput>
    where?: RequestLogWhereInput
  }

  export type RequestLogUpdateToOneWithWhereWithoutExtractionsInput = {
    where?: RequestLogWhereInput
    data: XOR<RequestLogUpdateWithoutExtractionsInput, RequestLogUncheckedUpdateWithoutExtractionsInput>
  }

  export type RequestLogUpdateWithoutExtractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneWithoutRequestLogsNestedInput
    user?: UserUpdateOneWithoutRequestLogsNestedInput
    actionPreviews?: ActionPreviewUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateWithoutExtractionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionPreviews?: ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogCreateWithoutActionPreviewsInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    session?: SessionCreateNestedOneWithoutRequestLogsInput
    user?: UserCreateNestedOneWithoutRequestLogsInput
    extractions?: ExtractionCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateWithoutActionPreviewsInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    extractions?: ExtractionUncheckedCreateNestedManyWithoutRequestLogInput
    badcases?: BadcaseUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogCreateOrConnectWithoutActionPreviewsInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutActionPreviewsInput, RequestLogUncheckedCreateWithoutActionPreviewsInput>
  }

  export type ActionExecutionCreateWithoutPreviewInput = {
    id?: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutActionExecutionsInput
  }

  export type ActionExecutionUncheckedCreateWithoutPreviewInput = {
    id?: string
    executedBy: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionCreateOrConnectWithoutPreviewInput = {
    where: ActionExecutionWhereUniqueInput
    create: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput>
  }

  export type ActionExecutionCreateManyPreviewInputEnvelope = {
    data: ActionExecutionCreateManyPreviewInput | ActionExecutionCreateManyPreviewInput[]
    skipDuplicates?: boolean
  }

  export type RequestLogUpsertWithoutActionPreviewsInput = {
    update: XOR<RequestLogUpdateWithoutActionPreviewsInput, RequestLogUncheckedUpdateWithoutActionPreviewsInput>
    create: XOR<RequestLogCreateWithoutActionPreviewsInput, RequestLogUncheckedCreateWithoutActionPreviewsInput>
    where?: RequestLogWhereInput
  }

  export type RequestLogUpdateToOneWithWhereWithoutActionPreviewsInput = {
    where?: RequestLogWhereInput
    data: XOR<RequestLogUpdateWithoutActionPreviewsInput, RequestLogUncheckedUpdateWithoutActionPreviewsInput>
  }

  export type RequestLogUpdateWithoutActionPreviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneWithoutRequestLogsNestedInput
    user?: UserUpdateOneWithoutRequestLogsNestedInput
    extractions?: ExtractionUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateWithoutActionPreviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type ActionExecutionUpsertWithWhereUniqueWithoutPreviewInput = {
    where: ActionExecutionWhereUniqueInput
    update: XOR<ActionExecutionUpdateWithoutPreviewInput, ActionExecutionUncheckedUpdateWithoutPreviewInput>
    create: XOR<ActionExecutionCreateWithoutPreviewInput, ActionExecutionUncheckedCreateWithoutPreviewInput>
  }

  export type ActionExecutionUpdateWithWhereUniqueWithoutPreviewInput = {
    where: ActionExecutionWhereUniqueInput
    data: XOR<ActionExecutionUpdateWithoutPreviewInput, ActionExecutionUncheckedUpdateWithoutPreviewInput>
  }

  export type ActionExecutionUpdateManyWithWhereWithoutPreviewInput = {
    where: ActionExecutionScalarWhereInput
    data: XOR<ActionExecutionUpdateManyMutationInput, ActionExecutionUncheckedUpdateManyWithoutPreviewInput>
  }

  export type ActionPreviewCreateWithoutExecutionsInput = {
    id?: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
    requestLog: RequestLogCreateNestedOneWithoutActionPreviewsInput
  }

  export type ActionPreviewUncheckedCreateWithoutExecutionsInput = {
    id?: string
    requestId: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ActionPreviewCreateOrConnectWithoutExecutionsInput = {
    where: ActionPreviewWhereUniqueInput
    create: XOR<ActionPreviewCreateWithoutExecutionsInput, ActionPreviewUncheckedCreateWithoutExecutionsInput>
  }

  export type UserCreateWithoutActionExecutionsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutUsersInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActionExecutionsInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    orgId: string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    requestLogs?: RequestLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActionExecutionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionExecutionsInput, UserUncheckedCreateWithoutActionExecutionsInput>
  }

  export type ActionPreviewUpsertWithoutExecutionsInput = {
    update: XOR<ActionPreviewUpdateWithoutExecutionsInput, ActionPreviewUncheckedUpdateWithoutExecutionsInput>
    create: XOR<ActionPreviewCreateWithoutExecutionsInput, ActionPreviewUncheckedCreateWithoutExecutionsInput>
    where?: ActionPreviewWhereInput
  }

  export type ActionPreviewUpdateToOneWithWhereWithoutExecutionsInput = {
    where?: ActionPreviewWhereInput
    data: XOR<ActionPreviewUpdateWithoutExecutionsInput, ActionPreviewUncheckedUpdateWithoutExecutionsInput>
  }

  export type ActionPreviewUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLog?: RequestLogUpdateOneRequiredWithoutActionPreviewsNestedInput
  }

  export type ActionPreviewUncheckedUpdateWithoutExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutActionExecutionsInput = {
    update: XOR<UserUpdateWithoutActionExecutionsInput, UserUncheckedUpdateWithoutActionExecutionsInput>
    create: XOR<UserCreateWithoutActionExecutionsInput, UserUncheckedCreateWithoutActionExecutionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionExecutionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionExecutionsInput, UserUncheckedUpdateWithoutActionExecutionsInput>
  }

  export type UserUpdateWithoutActionExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutUsersNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActionExecutionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    orgId?: StringFieldUpdateOperationsInput | string
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type RequestLogCreateWithoutBadcasesInput = {
    id?: string
    requestId: string
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    session?: SessionCreateNestedOneWithoutRequestLogsInput
    user?: UserCreateNestedOneWithoutRequestLogsInput
    extractions?: ExtractionCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogUncheckedCreateWithoutBadcasesInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
    extractions?: ExtractionUncheckedCreateNestedManyWithoutRequestLogInput
    actionPreviews?: ActionPreviewUncheckedCreateNestedManyWithoutRequestLogInput
  }

  export type RequestLogCreateOrConnectWithoutBadcasesInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutBadcasesInput, RequestLogUncheckedCreateWithoutBadcasesInput>
  }

  export type RequestLogUpsertWithoutBadcasesInput = {
    update: XOR<RequestLogUpdateWithoutBadcasesInput, RequestLogUncheckedUpdateWithoutBadcasesInput>
    create: XOR<RequestLogCreateWithoutBadcasesInput, RequestLogUncheckedCreateWithoutBadcasesInput>
    where?: RequestLogWhereInput
  }

  export type RequestLogUpdateToOneWithWhereWithoutBadcasesInput = {
    where?: RequestLogWhereInput
    data: XOR<RequestLogUpdateWithoutBadcasesInput, RequestLogUncheckedUpdateWithoutBadcasesInput>
  }

  export type RequestLogUpdateWithoutBadcasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneWithoutRequestLogsNestedInput
    user?: UserUpdateOneWithoutRequestLogsNestedInput
    extractions?: ExtractionUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateWithoutBadcasesInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type OrganizationCreateWithoutDocumentsInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrgInput
    fundingApplications?: FundingApplicationUncheckedCreateNestedManyWithoutOrgInput
  }

  export type OrganizationCreateOrConnectWithoutDocumentsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutDocumentsInput, OrganizationUncheckedCreateWithoutDocumentsInput>
  }

  export type OrganizationUpsertWithoutDocumentsInput = {
    update: XOR<OrganizationUpdateWithoutDocumentsInput, OrganizationUncheckedUpdateWithoutDocumentsInput>
    create: XOR<OrganizationCreateWithoutDocumentsInput, OrganizationUncheckedCreateWithoutDocumentsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutDocumentsInput, OrganizationUncheckedUpdateWithoutDocumentsInput>
  }

  export type OrganizationUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrgNestedInput
    fundingApplications?: FundingApplicationUncheckedUpdateManyWithoutOrgNestedInput
  }

  export type DocumentEmbeddingUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentEmbeddingWhereUniqueInput
    data: XOR<DocumentEmbeddingUpdateWithoutDocumentInput, DocumentEmbeddingUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentEmbeddingUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentEmbeddingScalarWhereInput
    data: XOR<DocumentEmbeddingUpdateManyMutationInput, DocumentEmbeddingUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentEmbeddingScalarWhereInput = {
    AND?: DocumentEmbeddingScalarWhereInput | DocumentEmbeddingScalarWhereInput[]
    OR?: DocumentEmbeddingScalarWhereInput[]
    NOT?: DocumentEmbeddingScalarWhereInput | DocumentEmbeddingScalarWhereInput[]
    id?: StringFilter<"DocumentEmbedding"> | string
    documentId?: StringFilter<"DocumentEmbedding"> | string
    content?: StringFilter<"DocumentEmbedding"> | string
    metadata?: JsonFilter<"DocumentEmbedding">
    createdAt?: DateTimeFilter<"DocumentEmbedding"> | Date | string
  }

  export type DocumentCreateWithoutEmbeddingsInput = {
    id?: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
    org: OrganizationCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutEmbeddingsInput = {
    id?: string
    orgId: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type DocumentCreateOrConnectWithoutEmbeddingsInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutEmbeddingsInput, DocumentUncheckedCreateWithoutEmbeddingsInput>
  }

  export type DocumentUpsertWithoutEmbeddingsInput = {
    update: XOR<DocumentUpdateWithoutEmbeddingsInput, DocumentUncheckedUpdateWithoutEmbeddingsInput>
    create: XOR<DocumentCreateWithoutEmbeddingsInput, DocumentUncheckedCreateWithoutEmbeddingsInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutEmbeddingsInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutEmbeddingsInput, DocumentUncheckedUpdateWithoutEmbeddingsInput>
  }

  export type DocumentUpdateWithoutEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    org?: OrganizationUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutEmbeddingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FundingApplicationCreateWithoutProgramInput = {
    id?: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    org: OrganizationCreateNestedOneWithoutFundingApplicationsInput
  }

  export type FundingApplicationUncheckedCreateWithoutProgramInput = {
    id?: string
    orgId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingApplicationCreateOrConnectWithoutProgramInput = {
    where: FundingApplicationWhereUniqueInput
    create: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput>
  }

  export type FundingApplicationCreateManyProgramInputEnvelope = {
    data: FundingApplicationCreateManyProgramInput | FundingApplicationCreateManyProgramInput[]
    skipDuplicates?: boolean
  }

  export type FundingApplicationUpsertWithWhereUniqueWithoutProgramInput = {
    where: FundingApplicationWhereUniqueInput
    update: XOR<FundingApplicationUpdateWithoutProgramInput, FundingApplicationUncheckedUpdateWithoutProgramInput>
    create: XOR<FundingApplicationCreateWithoutProgramInput, FundingApplicationUncheckedCreateWithoutProgramInput>
  }

  export type FundingApplicationUpdateWithWhereUniqueWithoutProgramInput = {
    where: FundingApplicationWhereUniqueInput
    data: XOR<FundingApplicationUpdateWithoutProgramInput, FundingApplicationUncheckedUpdateWithoutProgramInput>
  }

  export type FundingApplicationUpdateManyWithWhereWithoutProgramInput = {
    where: FundingApplicationScalarWhereInput
    data: XOR<FundingApplicationUpdateManyMutationInput, FundingApplicationUncheckedUpdateManyWithoutProgramInput>
  }

  export type OrganizationCreateWithoutFundingApplicationsInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrgInput
    documents?: DocumentCreateNestedManyWithoutOrgInput
  }

  export type OrganizationUncheckedCreateWithoutFundingApplicationsInput = {
    id?: string
    name: string
    plan?: $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrgInput
    documents?: DocumentUncheckedCreateNestedManyWithoutOrgInput
  }

  export type OrganizationCreateOrConnectWithoutFundingApplicationsInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutFundingApplicationsInput, OrganizationUncheckedCreateWithoutFundingApplicationsInput>
  }

  export type FundingProgramCreateWithoutApplicationsInput = {
    id?: string
    programName: string
    agency: string
    maxAmount?: number | null
    minAmount?: number | null
    targetIndustries?: FundingProgramCreatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramCreatetargetCompanySizesInput | string[]
    applicationStart?: Date | string | null
    applicationEnd?: Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: string | null
    sourceUrl?: string | null
    status?: $Enums.FundingProgramStatus
    lastScrapedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingProgramUncheckedCreateWithoutApplicationsInput = {
    id?: string
    programName: string
    agency: string
    maxAmount?: number | null
    minAmount?: number | null
    targetIndustries?: FundingProgramCreatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramCreatetargetCompanySizesInput | string[]
    applicationStart?: Date | string | null
    applicationEnd?: Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: string | null
    sourceUrl?: string | null
    status?: $Enums.FundingProgramStatus
    lastScrapedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingProgramCreateOrConnectWithoutApplicationsInput = {
    where: FundingProgramWhereUniqueInput
    create: XOR<FundingProgramCreateWithoutApplicationsInput, FundingProgramUncheckedCreateWithoutApplicationsInput>
  }

  export type OrganizationUpsertWithoutFundingApplicationsInput = {
    update: XOR<OrganizationUpdateWithoutFundingApplicationsInput, OrganizationUncheckedUpdateWithoutFundingApplicationsInput>
    create: XOR<OrganizationCreateWithoutFundingApplicationsInput, OrganizationUncheckedCreateWithoutFundingApplicationsInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutFundingApplicationsInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutFundingApplicationsInput, OrganizationUncheckedUpdateWithoutFundingApplicationsInput>
  }

  export type OrganizationUpdateWithoutFundingApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrgNestedInput
    documents?: DocumentUpdateManyWithoutOrgNestedInput
  }

  export type OrganizationUncheckedUpdateWithoutFundingApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    plan?: EnumPlanTierFieldUpdateOperationsInput | $Enums.PlanTier
    settings?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrgNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutOrgNestedInput
  }

  export type FundingProgramUpsertWithoutApplicationsInput = {
    update: XOR<FundingProgramUpdateWithoutApplicationsInput, FundingProgramUncheckedUpdateWithoutApplicationsInput>
    create: XOR<FundingProgramCreateWithoutApplicationsInput, FundingProgramUncheckedCreateWithoutApplicationsInput>
    where?: FundingProgramWhereInput
  }

  export type FundingProgramUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: FundingProgramWhereInput
    data: XOR<FundingProgramUpdateWithoutApplicationsInput, FundingProgramUncheckedUpdateWithoutApplicationsInput>
  }

  export type FundingProgramUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingProgramUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    programName?: StringFieldUpdateOperationsInput | string
    agency?: StringFieldUpdateOperationsInput | string
    maxAmount?: NullableIntFieldUpdateOperationsInput | number | null
    minAmount?: NullableIntFieldUpdateOperationsInput | number | null
    targetIndustries?: FundingProgramUpdatetargetIndustriesInput | string[]
    targetCompanySizes?: FundingProgramUpdatetargetCompanySizesInput | string[]
    applicationStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicationEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    eligibility?: JsonNullValueInput | InputJsonValue
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sourceUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumFundingProgramStatusFieldUpdateOperationsInput | $Enums.FundingProgramStatus
    lastScrapedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyOrgInput = {
    id?: string
    email: string
    name: string
    role?: $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash: string
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLoginAt?: Date | string | null
  }

  export type DocumentCreateManyOrgInput = {
    id?: string
    fileName: string
    mimeType: string
    sizeBytes: number
    uploadedBy?: string | null
    purpose?: $Enums.DocumentPurpose
    storagePath: string
    extractedText?: string | null
    createdAt?: Date | string
    expiresAt?: Date | string | null
  }

  export type FundingApplicationCreateManyOrgInput = {
    id?: string
    programId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    requestLogs?: RequestLogUncheckedUpdateManyWithoutUserNestedInput
    actionExecutions?: ActionExecutionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    preferences?: JsonNullValueInput | InputJsonValue
    passwordHash?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLoginAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    embeddings?: DocumentEmbeddingUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    embeddings?: DocumentEmbeddingUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    mimeType?: StringFieldUpdateOperationsInput | string
    sizeBytes?: IntFieldUpdateOperationsInput | number
    uploadedBy?: NullableStringFieldUpdateOperationsInput | string | null
    purpose?: EnumDocumentPurposeFieldUpdateOperationsInput | $Enums.DocumentPurpose
    storagePath?: StringFieldUpdateOperationsInput | string
    extractedText?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FundingApplicationUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    program?: FundingProgramUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type FundingApplicationUncheckedUpdateWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationUncheckedUpdateManyWithoutOrgInput = {
    id?: StringFieldUpdateOperationsInput | string
    programId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id?: string
    orgId: string
    status?: $Enums.SessionStatus
    contextTokens?: number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    expiresAt: Date | string
  }

  export type RequestLogCreateManyUserInput = {
    id?: string
    requestId: string
    sessionId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
  }

  export type ActionExecutionCreateManyUserInput = {
    id?: string
    previewId: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLogs?: RequestLogUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requestLogs?: RequestLogUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    contextTokens?: IntFieldUpdateOperationsInput | number
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneWithoutRequestLogsNestedInput
    extractions?: ExtractionUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    sessionId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionExecutionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    preview?: ActionPreviewUpdateOneRequiredWithoutExecutionsNestedInput
  }

  export type ActionExecutionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    previewId?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    previewId?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type RequestLogCreateManySessionInput = {
    id?: string
    requestId: string
    userId?: string | null
    orgId?: string | null
    endpoint: $Enums.EndpointType
    modelUsed: string
    promptTokens: number
    completionTokens: number
    latencyMs: number
    fallbackUsed?: boolean
    schemaValid?: boolean
    toolCount?: number
    estimatedCostUsd: Decimal | DecimalJsLike | number | string
    traceId?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutRequestLogsNestedInput
    extractions?: ExtractionUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    extractions?: ExtractionUncheckedUpdateManyWithoutRequestLogNestedInput
    actionPreviews?: ActionPreviewUncheckedUpdateManyWithoutRequestLogNestedInput
    badcases?: BadcaseUncheckedUpdateManyWithoutRequestLogNestedInput
  }

  export type RequestLogUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    requestId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orgId?: NullableStringFieldUpdateOperationsInput | string | null
    endpoint?: EnumEndpointTypeFieldUpdateOperationsInput | $Enums.EndpointType
    modelUsed?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    completionTokens?: IntFieldUpdateOperationsInput | number
    latencyMs?: IntFieldUpdateOperationsInput | number
    fallbackUsed?: BoolFieldUpdateOperationsInput | boolean
    schemaValid?: BoolFieldUpdateOperationsInput | boolean
    toolCount?: IntFieldUpdateOperationsInput | number
    estimatedCostUsd?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    traceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionCreateManyRequestLogInput = {
    id?: string
    fileId?: string | null
    docType?: $Enums.ExtractionDocType
    fields: JsonNullValueInput | InputJsonValue
    confidenceScores: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: boolean
    reviewStatus?: $Enums.ReviewStatus
    reviewedBy?: string | null
    reviewedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type ActionPreviewCreateManyRequestLogInput = {
    id?: string
    actionType: $Enums.ActionType
    targetType: string
    targetId?: string | null
    payload: JsonNullValueInput | InputJsonValue
    allowed: boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: boolean
    previewToken?: string | null
    expiresAt?: Date | string | null
    createdAt?: Date | string
  }

  export type BadcaseCreateManyRequestLogInput = {
    id?: string
    category: $Enums.BadcaseCategory
    severity: $Enums.Severity
    description: string
    inputSnapshot: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: string | null
    fixStatus?: $Enums.FixStatus
    fixedBy?: string | null
    fixedAt?: Date | string | null
    createdAt?: Date | string
    resolvedAt?: Date | string | null
  }

  export type ExtractionUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionUncheckedUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExtractionUncheckedUpdateManyWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileId?: NullableStringFieldUpdateOperationsInput | string | null
    docType?: EnumExtractionDocTypeFieldUpdateOperationsInput | $Enums.ExtractionDocType
    fields?: JsonNullValueInput | InputJsonValue
    confidenceScores?: JsonNullValueInput | InputJsonValue
    warnings?: JsonNullValueInput | InputJsonValue
    needsReview?: BoolFieldUpdateOperationsInput | boolean
    reviewStatus?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    reviewedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActionPreviewUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ActionExecutionUpdateManyWithoutPreviewNestedInput
  }

  export type ActionPreviewUncheckedUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    executions?: ActionExecutionUncheckedUpdateManyWithoutPreviewNestedInput
  }

  export type ActionPreviewUncheckedUpdateManyWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    targetType?: StringFieldUpdateOperationsInput | string
    targetId?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    allowed?: BoolFieldUpdateOperationsInput | boolean
    missingChecks?: JsonNullValueInput | InputJsonValue
    impactSummary?: JsonNullValueInput | InputJsonValue
    humanConfirmationRequired?: BoolFieldUpdateOperationsInput | boolean
    previewToken?: NullableStringFieldUpdateOperationsInput | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadcaseUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BadcaseUncheckedUpdateWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BadcaseUncheckedUpdateManyWithoutRequestLogInput = {
    id?: StringFieldUpdateOperationsInput | string
    category?: EnumBadcaseCategoryFieldUpdateOperationsInput | $Enums.BadcaseCategory
    severity?: EnumSeverityFieldUpdateOperationsInput | $Enums.Severity
    description?: StringFieldUpdateOperationsInput | string
    inputSnapshot?: JsonNullValueInput | InputJsonValue
    expectedOutput?: NullableJsonNullValueInput | InputJsonValue
    actualOutput?: NullableJsonNullValueInput | InputJsonValue
    rootCauseAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    fixStatus?: EnumFixStatusFieldUpdateOperationsInput | $Enums.FixStatus
    fixedBy?: NullableStringFieldUpdateOperationsInput | string | null
    fixedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActionExecutionCreateManyPreviewInput = {
    id?: string
    executedBy: string
    executedAt?: Date | string
    confirmationMethod: $Enums.ConfirmationMethod
    result: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUpdateWithoutPreviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutActionExecutionsNestedInput
  }

  export type ActionExecutionUncheckedUpdateWithoutPreviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type ActionExecutionUncheckedUpdateManyWithoutPreviewInput = {
    id?: StringFieldUpdateOperationsInput | string
    executedBy?: StringFieldUpdateOperationsInput | string
    executedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    confirmationMethod?: EnumConfirmationMethodFieldUpdateOperationsInput | $Enums.ConfirmationMethod
    result?: JsonNullValueInput | InputJsonValue
    auditTrail?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentEmbeddingUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentEmbeddingUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentEmbeddingUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    metadata?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationCreateManyProgramInput = {
    id?: string
    orgId: string
    status?: $Enums.ApplicationStatus
    submittedAt?: Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FundingApplicationUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    org?: OrganizationUpdateOneRequiredWithoutFundingApplicationsNestedInput
  }

  export type FundingApplicationUncheckedUpdateWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FundingApplicationUncheckedUpdateManyWithoutProgramInput = {
    id?: StringFieldUpdateOperationsInput | string
    orgId?: StringFieldUpdateOperationsInput | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    documents?: JsonNullValueInput | InputJsonValue
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionCountOutputTypeDefaultArgs instead
     */
    export type SessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RequestLogCountOutputTypeDefaultArgs instead
     */
    export type RequestLogCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RequestLogCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActionPreviewCountOutputTypeDefaultArgs instead
     */
    export type ActionPreviewCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActionPreviewCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentCountOutputTypeDefaultArgs instead
     */
    export type DocumentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingProgramCountOutputTypeDefaultArgs instead
     */
    export type FundingProgramCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingProgramCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RequestLogDefaultArgs instead
     */
    export type RequestLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RequestLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExtractionDefaultArgs instead
     */
    export type ExtractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExtractionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActionPreviewDefaultArgs instead
     */
    export type ActionPreviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActionPreviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActionExecutionDefaultArgs instead
     */
    export type ActionExecutionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActionExecutionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BadcaseDefaultArgs instead
     */
    export type BadcaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BadcaseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentDefaultArgs instead
     */
    export type DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentEmbeddingDefaultArgs instead
     */
    export type DocumentEmbeddingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentEmbeddingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingProgramDefaultArgs instead
     */
    export type FundingProgramArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingProgramDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FundingApplicationDefaultArgs instead
     */
    export type FundingApplicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FundingApplicationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ApiKeyDefaultArgs instead
     */
    export type ApiKeyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ApiKeyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}