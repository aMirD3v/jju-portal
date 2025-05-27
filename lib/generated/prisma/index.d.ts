
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
 * Model StudentApplication
 * 
 */
export type StudentApplication = $Result.DefaultSelection<Prisma.$StudentApplicationPayload>
/**
 * Model PostSecondaryEducation
 * 
 */
export type PostSecondaryEducation = $Result.DefaultSelection<Prisma.$PostSecondaryEducationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StudentApplications
 * const studentApplications = await prisma.studentApplication.findMany()
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
   * // Fetch zero or more StudentApplications
   * const studentApplications = await prisma.studentApplication.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.studentApplication`: Exposes CRUD operations for the **StudentApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentApplications
    * const studentApplications = await prisma.studentApplication.findMany()
    * ```
    */
  get studentApplication(): Prisma.StudentApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postSecondaryEducation`: Exposes CRUD operations for the **PostSecondaryEducation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostSecondaryEducations
    * const postSecondaryEducations = await prisma.postSecondaryEducation.findMany()
    * ```
    */
  get postSecondaryEducation(): Prisma.PostSecondaryEducationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    StudentApplication: 'StudentApplication',
    PostSecondaryEducation: 'PostSecondaryEducation',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "studentApplication" | "postSecondaryEducation" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StudentApplication: {
        payload: Prisma.$StudentApplicationPayload<ExtArgs>
        fields: Prisma.StudentApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          findFirst: {
            args: Prisma.StudentApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          findMany: {
            args: Prisma.StudentApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>[]
          }
          create: {
            args: Prisma.StudentApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          createMany: {
            args: Prisma.StudentApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>[]
          }
          delete: {
            args: Prisma.StudentApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          update: {
            args: Prisma.StudentApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          deleteMany: {
            args: Prisma.StudentApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>[]
          }
          upsert: {
            args: Prisma.StudentApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentApplicationPayload>
          }
          aggregate: {
            args: Prisma.StudentApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentApplication>
          }
          groupBy: {
            args: Prisma.StudentApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<StudentApplicationCountAggregateOutputType> | number
          }
        }
      }
      PostSecondaryEducation: {
        payload: Prisma.$PostSecondaryEducationPayload<ExtArgs>
        fields: Prisma.PostSecondaryEducationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostSecondaryEducationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostSecondaryEducationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          findFirst: {
            args: Prisma.PostSecondaryEducationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostSecondaryEducationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          findMany: {
            args: Prisma.PostSecondaryEducationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>[]
          }
          create: {
            args: Prisma.PostSecondaryEducationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          createMany: {
            args: Prisma.PostSecondaryEducationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostSecondaryEducationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>[]
          }
          delete: {
            args: Prisma.PostSecondaryEducationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          update: {
            args: Prisma.PostSecondaryEducationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          deleteMany: {
            args: Prisma.PostSecondaryEducationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostSecondaryEducationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostSecondaryEducationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>[]
          }
          upsert: {
            args: Prisma.PostSecondaryEducationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostSecondaryEducationPayload>
          }
          aggregate: {
            args: Prisma.PostSecondaryEducationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostSecondaryEducation>
          }
          groupBy: {
            args: Prisma.PostSecondaryEducationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostSecondaryEducationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostSecondaryEducationCountArgs<ExtArgs>
            result: $Utils.Optional<PostSecondaryEducationCountAggregateOutputType> | number
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
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    studentApplication?: StudentApplicationOmit
    postSecondaryEducation?: PostSecondaryEducationOmit
    user?: UserOmit
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
    | 'updateManyAndReturn'
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
   * Count Type StudentApplicationCountOutputType
   */

  export type StudentApplicationCountOutputType = {
    postSecondary: number
  }

  export type StudentApplicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postSecondary?: boolean | StudentApplicationCountOutputTypeCountPostSecondaryArgs
  }

  // Custom InputTypes
  /**
   * StudentApplicationCountOutputType without action
   */
  export type StudentApplicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplicationCountOutputType
     */
    select?: StudentApplicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentApplicationCountOutputType without action
   */
  export type StudentApplicationCountOutputTypeCountPostSecondaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostSecondaryEducationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model StudentApplication
   */

  export type AggregateStudentApplication = {
    _count: StudentApplicationCountAggregateOutputType | null
    _min: StudentApplicationMinAggregateOutputType | null
    _max: StudentApplicationMaxAggregateOutputType | null
  }

  export type StudentApplicationMinAggregateOutputType = {
    id: string | null
    studentID: string | null
    institute: string | null
    department: string | null
    admission: string | null
    studyLevel: string | null
    firstName: string | null
    fatherName: string | null
    gFatherName: string | null
    sex: string | null
    dob: Date | null
    region: string | null
    zone: string | null
    woreda: string | null
    studentPhone: string | null
    studentEmail: string | null
    isHandicapped: string | null
    handicapType: string | null
    enrolledBefore: string | null
    sponsor: string | null
    sponsorName: string | null
    sponsorRegion: string | null
    sponsorZone: string | null
    sponsorWoreda: string | null
    sponsorEmail: string | null
    sponsorURL: string | null
    signed: boolean | null
    studentPhotoUrl: string | null
    diplomaUrl: string | null
    highSchoolUrl: string | null
    grade12Url: string | null
    grade10Url: string | null
    grade8Url: string | null
    status: string | null
    createdAt: Date | null
  }

  export type StudentApplicationMaxAggregateOutputType = {
    id: string | null
    studentID: string | null
    institute: string | null
    department: string | null
    admission: string | null
    studyLevel: string | null
    firstName: string | null
    fatherName: string | null
    gFatherName: string | null
    sex: string | null
    dob: Date | null
    region: string | null
    zone: string | null
    woreda: string | null
    studentPhone: string | null
    studentEmail: string | null
    isHandicapped: string | null
    handicapType: string | null
    enrolledBefore: string | null
    sponsor: string | null
    sponsorName: string | null
    sponsorRegion: string | null
    sponsorZone: string | null
    sponsorWoreda: string | null
    sponsorEmail: string | null
    sponsorURL: string | null
    signed: boolean | null
    studentPhotoUrl: string | null
    diplomaUrl: string | null
    highSchoolUrl: string | null
    grade12Url: string | null
    grade10Url: string | null
    grade8Url: string | null
    status: string | null
    createdAt: Date | null
  }

  export type StudentApplicationCountAggregateOutputType = {
    id: number
    studentID: number
    institute: number
    department: number
    admission: number
    studyLevel: number
    firstName: number
    fatherName: number
    gFatherName: number
    sex: number
    dob: number
    region: number
    zone: number
    woreda: number
    studentPhone: number
    studentEmail: number
    isHandicapped: number
    handicapType: number
    enrolledBefore: number
    sponsor: number
    sponsorName: number
    sponsorRegion: number
    sponsorZone: number
    sponsorWoreda: number
    sponsorEmail: number
    sponsorURL: number
    signed: number
    studentPhotoUrl: number
    diplomaUrl: number
    highSchoolUrl: number
    grade12Url: number
    grade10Url: number
    grade8Url: number
    status: number
    createdAt: number
    _all: number
  }


  export type StudentApplicationMinAggregateInputType = {
    id?: true
    studentID?: true
    institute?: true
    department?: true
    admission?: true
    studyLevel?: true
    firstName?: true
    fatherName?: true
    gFatherName?: true
    sex?: true
    dob?: true
    region?: true
    zone?: true
    woreda?: true
    studentPhone?: true
    studentEmail?: true
    isHandicapped?: true
    handicapType?: true
    enrolledBefore?: true
    sponsor?: true
    sponsorName?: true
    sponsorRegion?: true
    sponsorZone?: true
    sponsorWoreda?: true
    sponsorEmail?: true
    sponsorURL?: true
    signed?: true
    studentPhotoUrl?: true
    diplomaUrl?: true
    highSchoolUrl?: true
    grade12Url?: true
    grade10Url?: true
    grade8Url?: true
    status?: true
    createdAt?: true
  }

  export type StudentApplicationMaxAggregateInputType = {
    id?: true
    studentID?: true
    institute?: true
    department?: true
    admission?: true
    studyLevel?: true
    firstName?: true
    fatherName?: true
    gFatherName?: true
    sex?: true
    dob?: true
    region?: true
    zone?: true
    woreda?: true
    studentPhone?: true
    studentEmail?: true
    isHandicapped?: true
    handicapType?: true
    enrolledBefore?: true
    sponsor?: true
    sponsorName?: true
    sponsorRegion?: true
    sponsorZone?: true
    sponsorWoreda?: true
    sponsorEmail?: true
    sponsorURL?: true
    signed?: true
    studentPhotoUrl?: true
    diplomaUrl?: true
    highSchoolUrl?: true
    grade12Url?: true
    grade10Url?: true
    grade8Url?: true
    status?: true
    createdAt?: true
  }

  export type StudentApplicationCountAggregateInputType = {
    id?: true
    studentID?: true
    institute?: true
    department?: true
    admission?: true
    studyLevel?: true
    firstName?: true
    fatherName?: true
    gFatherName?: true
    sex?: true
    dob?: true
    region?: true
    zone?: true
    woreda?: true
    studentPhone?: true
    studentEmail?: true
    isHandicapped?: true
    handicapType?: true
    enrolledBefore?: true
    sponsor?: true
    sponsorName?: true
    sponsorRegion?: true
    sponsorZone?: true
    sponsorWoreda?: true
    sponsorEmail?: true
    sponsorURL?: true
    signed?: true
    studentPhotoUrl?: true
    diplomaUrl?: true
    highSchoolUrl?: true
    grade12Url?: true
    grade10Url?: true
    grade8Url?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type StudentApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentApplication to aggregate.
     */
    where?: StudentApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentApplications to fetch.
     */
    orderBy?: StudentApplicationOrderByWithRelationInput | StudentApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentApplications
    **/
    _count?: true | StudentApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentApplicationMaxAggregateInputType
  }

  export type GetStudentApplicationAggregateType<T extends StudentApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentApplication[P]>
      : GetScalarType<T[P], AggregateStudentApplication[P]>
  }




  export type StudentApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentApplicationWhereInput
    orderBy?: StudentApplicationOrderByWithAggregationInput | StudentApplicationOrderByWithAggregationInput[]
    by: StudentApplicationScalarFieldEnum[] | StudentApplicationScalarFieldEnum
    having?: StudentApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentApplicationCountAggregateInputType | true
    _min?: StudentApplicationMinAggregateInputType
    _max?: StudentApplicationMaxAggregateInputType
  }

  export type StudentApplicationGroupByOutputType = {
    id: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob: Date | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType: string | null
    enrolledBefore: string
    sponsor: string | null
    sponsorName: string | null
    sponsorRegion: string | null
    sponsorZone: string | null
    sponsorWoreda: string | null
    sponsorEmail: string | null
    sponsorURL: string | null
    signed: boolean
    studentPhotoUrl: string | null
    diplomaUrl: string | null
    highSchoolUrl: string | null
    grade12Url: string | null
    grade10Url: string | null
    grade8Url: string | null
    status: string
    createdAt: Date
    _count: StudentApplicationCountAggregateOutputType | null
    _min: StudentApplicationMinAggregateOutputType | null
    _max: StudentApplicationMaxAggregateOutputType | null
  }

  type GetStudentApplicationGroupByPayload<T extends StudentApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], StudentApplicationGroupByOutputType[P]>
        }
      >
    >


  export type StudentApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    admission?: boolean
    studyLevel?: boolean
    firstName?: boolean
    fatherName?: boolean
    gFatherName?: boolean
    sex?: boolean
    dob?: boolean
    region?: boolean
    zone?: boolean
    woreda?: boolean
    studentPhone?: boolean
    studentEmail?: boolean
    isHandicapped?: boolean
    handicapType?: boolean
    enrolledBefore?: boolean
    sponsor?: boolean
    sponsorName?: boolean
    sponsorRegion?: boolean
    sponsorZone?: boolean
    sponsorWoreda?: boolean
    sponsorEmail?: boolean
    sponsorURL?: boolean
    signed?: boolean
    studentPhotoUrl?: boolean
    diplomaUrl?: boolean
    highSchoolUrl?: boolean
    grade12Url?: boolean
    grade10Url?: boolean
    grade8Url?: boolean
    status?: boolean
    createdAt?: boolean
    postSecondary?: boolean | StudentApplication$postSecondaryArgs<ExtArgs>
    _count?: boolean | StudentApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentApplication"]>

  export type StudentApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    admission?: boolean
    studyLevel?: boolean
    firstName?: boolean
    fatherName?: boolean
    gFatherName?: boolean
    sex?: boolean
    dob?: boolean
    region?: boolean
    zone?: boolean
    woreda?: boolean
    studentPhone?: boolean
    studentEmail?: boolean
    isHandicapped?: boolean
    handicapType?: boolean
    enrolledBefore?: boolean
    sponsor?: boolean
    sponsorName?: boolean
    sponsorRegion?: boolean
    sponsorZone?: boolean
    sponsorWoreda?: boolean
    sponsorEmail?: boolean
    sponsorURL?: boolean
    signed?: boolean
    studentPhotoUrl?: boolean
    diplomaUrl?: boolean
    highSchoolUrl?: boolean
    grade12Url?: boolean
    grade10Url?: boolean
    grade8Url?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["studentApplication"]>

  export type StudentApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    admission?: boolean
    studyLevel?: boolean
    firstName?: boolean
    fatherName?: boolean
    gFatherName?: boolean
    sex?: boolean
    dob?: boolean
    region?: boolean
    zone?: boolean
    woreda?: boolean
    studentPhone?: boolean
    studentEmail?: boolean
    isHandicapped?: boolean
    handicapType?: boolean
    enrolledBefore?: boolean
    sponsor?: boolean
    sponsorName?: boolean
    sponsorRegion?: boolean
    sponsorZone?: boolean
    sponsorWoreda?: boolean
    sponsorEmail?: boolean
    sponsorURL?: boolean
    signed?: boolean
    studentPhotoUrl?: boolean
    diplomaUrl?: boolean
    highSchoolUrl?: boolean
    grade12Url?: boolean
    grade10Url?: boolean
    grade8Url?: boolean
    status?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["studentApplication"]>

  export type StudentApplicationSelectScalar = {
    id?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    admission?: boolean
    studyLevel?: boolean
    firstName?: boolean
    fatherName?: boolean
    gFatherName?: boolean
    sex?: boolean
    dob?: boolean
    region?: boolean
    zone?: boolean
    woreda?: boolean
    studentPhone?: boolean
    studentEmail?: boolean
    isHandicapped?: boolean
    handicapType?: boolean
    enrolledBefore?: boolean
    sponsor?: boolean
    sponsorName?: boolean
    sponsorRegion?: boolean
    sponsorZone?: boolean
    sponsorWoreda?: boolean
    sponsorEmail?: boolean
    sponsorURL?: boolean
    signed?: boolean
    studentPhotoUrl?: boolean
    diplomaUrl?: boolean
    highSchoolUrl?: boolean
    grade12Url?: boolean
    grade10Url?: boolean
    grade8Url?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type StudentApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentID" | "institute" | "department" | "admission" | "studyLevel" | "firstName" | "fatherName" | "gFatherName" | "sex" | "dob" | "region" | "zone" | "woreda" | "studentPhone" | "studentEmail" | "isHandicapped" | "handicapType" | "enrolledBefore" | "sponsor" | "sponsorName" | "sponsorRegion" | "sponsorZone" | "sponsorWoreda" | "sponsorEmail" | "sponsorURL" | "signed" | "studentPhotoUrl" | "diplomaUrl" | "highSchoolUrl" | "grade12Url" | "grade10Url" | "grade8Url" | "status" | "createdAt", ExtArgs["result"]["studentApplication"]>
  export type StudentApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postSecondary?: boolean | StudentApplication$postSecondaryArgs<ExtArgs>
    _count?: boolean | StudentApplicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StudentApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentApplication"
    objects: {
      postSecondary: Prisma.$PostSecondaryEducationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studentID: string
      institute: string
      department: string
      admission: string
      studyLevel: string
      firstName: string
      fatherName: string
      gFatherName: string
      sex: string
      dob: Date | null
      region: string
      zone: string
      woreda: string
      studentPhone: string
      studentEmail: string
      isHandicapped: string
      handicapType: string | null
      enrolledBefore: string
      sponsor: string | null
      sponsorName: string | null
      sponsorRegion: string | null
      sponsorZone: string | null
      sponsorWoreda: string | null
      sponsorEmail: string | null
      sponsorURL: string | null
      signed: boolean
      studentPhotoUrl: string | null
      diplomaUrl: string | null
      highSchoolUrl: string | null
      grade12Url: string | null
      grade10Url: string | null
      grade8Url: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["studentApplication"]>
    composites: {}
  }

  type StudentApplicationGetPayload<S extends boolean | null | undefined | StudentApplicationDefaultArgs> = $Result.GetResult<Prisma.$StudentApplicationPayload, S>

  type StudentApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentApplicationCountAggregateInputType | true
    }

  export interface StudentApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentApplication'], meta: { name: 'StudentApplication' } }
    /**
     * Find zero or one StudentApplication that matches the filter.
     * @param {StudentApplicationFindUniqueArgs} args - Arguments to find a StudentApplication
     * @example
     * // Get one StudentApplication
     * const studentApplication = await prisma.studentApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentApplicationFindUniqueArgs>(args: SelectSubset<T, StudentApplicationFindUniqueArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudentApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentApplicationFindUniqueOrThrowArgs} args - Arguments to find a StudentApplication
     * @example
     * // Get one StudentApplication
     * const studentApplication = await prisma.studentApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationFindFirstArgs} args - Arguments to find a StudentApplication
     * @example
     * // Get one StudentApplication
     * const studentApplication = await prisma.studentApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentApplicationFindFirstArgs>(args?: SelectSubset<T, StudentApplicationFindFirstArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudentApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationFindFirstOrThrowArgs} args - Arguments to find a StudentApplication
     * @example
     * // Get one StudentApplication
     * const studentApplication = await prisma.studentApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudentApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentApplications
     * const studentApplications = await prisma.studentApplication.findMany()
     * 
     * // Get first 10 StudentApplications
     * const studentApplications = await prisma.studentApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentApplicationWithIdOnly = await prisma.studentApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentApplicationFindManyArgs>(args?: SelectSubset<T, StudentApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudentApplication.
     * @param {StudentApplicationCreateArgs} args - Arguments to create a StudentApplication.
     * @example
     * // Create one StudentApplication
     * const StudentApplication = await prisma.studentApplication.create({
     *   data: {
     *     // ... data to create a StudentApplication
     *   }
     * })
     * 
     */
    create<T extends StudentApplicationCreateArgs>(args: SelectSubset<T, StudentApplicationCreateArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudentApplications.
     * @param {StudentApplicationCreateManyArgs} args - Arguments to create many StudentApplications.
     * @example
     * // Create many StudentApplications
     * const studentApplication = await prisma.studentApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentApplicationCreateManyArgs>(args?: SelectSubset<T, StudentApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentApplications and returns the data saved in the database.
     * @param {StudentApplicationCreateManyAndReturnArgs} args - Arguments to create many StudentApplications.
     * @example
     * // Create many StudentApplications
     * const studentApplication = await prisma.studentApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentApplications and only return the `id`
     * const studentApplicationWithIdOnly = await prisma.studentApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudentApplication.
     * @param {StudentApplicationDeleteArgs} args - Arguments to delete one StudentApplication.
     * @example
     * // Delete one StudentApplication
     * const StudentApplication = await prisma.studentApplication.delete({
     *   where: {
     *     // ... filter to delete one StudentApplication
     *   }
     * })
     * 
     */
    delete<T extends StudentApplicationDeleteArgs>(args: SelectSubset<T, StudentApplicationDeleteArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudentApplication.
     * @param {StudentApplicationUpdateArgs} args - Arguments to update one StudentApplication.
     * @example
     * // Update one StudentApplication
     * const studentApplication = await prisma.studentApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentApplicationUpdateArgs>(args: SelectSubset<T, StudentApplicationUpdateArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudentApplications.
     * @param {StudentApplicationDeleteManyArgs} args - Arguments to filter StudentApplications to delete.
     * @example
     * // Delete a few StudentApplications
     * const { count } = await prisma.studentApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentApplicationDeleteManyArgs>(args?: SelectSubset<T, StudentApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentApplications
     * const studentApplication = await prisma.studentApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentApplicationUpdateManyArgs>(args: SelectSubset<T, StudentApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentApplications and returns the data updated in the database.
     * @param {StudentApplicationUpdateManyAndReturnArgs} args - Arguments to update many StudentApplications.
     * @example
     * // Update many StudentApplications
     * const studentApplication = await prisma.studentApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudentApplications and only return the `id`
     * const studentApplicationWithIdOnly = await prisma.studentApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudentApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudentApplication.
     * @param {StudentApplicationUpsertArgs} args - Arguments to update or create a StudentApplication.
     * @example
     * // Update or create a StudentApplication
     * const studentApplication = await prisma.studentApplication.upsert({
     *   create: {
     *     // ... data to create a StudentApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentApplication we want to update
     *   }
     * })
     */
    upsert<T extends StudentApplicationUpsertArgs>(args: SelectSubset<T, StudentApplicationUpsertArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudentApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationCountArgs} args - Arguments to filter StudentApplications to count.
     * @example
     * // Count the number of StudentApplications
     * const count = await prisma.studentApplication.count({
     *   where: {
     *     // ... the filter for the StudentApplications we want to count
     *   }
     * })
    **/
    count<T extends StudentApplicationCountArgs>(
      args?: Subset<T, StudentApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentApplicationAggregateArgs>(args: Subset<T, StudentApplicationAggregateArgs>): Prisma.PrismaPromise<GetStudentApplicationAggregateType<T>>

    /**
     * Group by StudentApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentApplicationGroupByArgs} args - Group by arguments.
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
      T extends StudentApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentApplicationGroupByArgs['orderBy'] }
        : { orderBy?: StudentApplicationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentApplication model
   */
  readonly fields: StudentApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    postSecondary<T extends StudentApplication$postSecondaryArgs<ExtArgs> = {}>(args?: Subset<T, StudentApplication$postSecondaryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the StudentApplication model
   */
  interface StudentApplicationFieldRefs {
    readonly id: FieldRef<"StudentApplication", 'String'>
    readonly studentID: FieldRef<"StudentApplication", 'String'>
    readonly institute: FieldRef<"StudentApplication", 'String'>
    readonly department: FieldRef<"StudentApplication", 'String'>
    readonly admission: FieldRef<"StudentApplication", 'String'>
    readonly studyLevel: FieldRef<"StudentApplication", 'String'>
    readonly firstName: FieldRef<"StudentApplication", 'String'>
    readonly fatherName: FieldRef<"StudentApplication", 'String'>
    readonly gFatherName: FieldRef<"StudentApplication", 'String'>
    readonly sex: FieldRef<"StudentApplication", 'String'>
    readonly dob: FieldRef<"StudentApplication", 'DateTime'>
    readonly region: FieldRef<"StudentApplication", 'String'>
    readonly zone: FieldRef<"StudentApplication", 'String'>
    readonly woreda: FieldRef<"StudentApplication", 'String'>
    readonly studentPhone: FieldRef<"StudentApplication", 'String'>
    readonly studentEmail: FieldRef<"StudentApplication", 'String'>
    readonly isHandicapped: FieldRef<"StudentApplication", 'String'>
    readonly handicapType: FieldRef<"StudentApplication", 'String'>
    readonly enrolledBefore: FieldRef<"StudentApplication", 'String'>
    readonly sponsor: FieldRef<"StudentApplication", 'String'>
    readonly sponsorName: FieldRef<"StudentApplication", 'String'>
    readonly sponsorRegion: FieldRef<"StudentApplication", 'String'>
    readonly sponsorZone: FieldRef<"StudentApplication", 'String'>
    readonly sponsorWoreda: FieldRef<"StudentApplication", 'String'>
    readonly sponsorEmail: FieldRef<"StudentApplication", 'String'>
    readonly sponsorURL: FieldRef<"StudentApplication", 'String'>
    readonly signed: FieldRef<"StudentApplication", 'Boolean'>
    readonly studentPhotoUrl: FieldRef<"StudentApplication", 'String'>
    readonly diplomaUrl: FieldRef<"StudentApplication", 'String'>
    readonly highSchoolUrl: FieldRef<"StudentApplication", 'String'>
    readonly grade12Url: FieldRef<"StudentApplication", 'String'>
    readonly grade10Url: FieldRef<"StudentApplication", 'String'>
    readonly grade8Url: FieldRef<"StudentApplication", 'String'>
    readonly status: FieldRef<"StudentApplication", 'String'>
    readonly createdAt: FieldRef<"StudentApplication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentApplication findUnique
   */
  export type StudentApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter, which StudentApplication to fetch.
     */
    where: StudentApplicationWhereUniqueInput
  }

  /**
   * StudentApplication findUniqueOrThrow
   */
  export type StudentApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter, which StudentApplication to fetch.
     */
    where: StudentApplicationWhereUniqueInput
  }

  /**
   * StudentApplication findFirst
   */
  export type StudentApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter, which StudentApplication to fetch.
     */
    where?: StudentApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentApplications to fetch.
     */
    orderBy?: StudentApplicationOrderByWithRelationInput | StudentApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentApplications.
     */
    cursor?: StudentApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentApplications.
     */
    distinct?: StudentApplicationScalarFieldEnum | StudentApplicationScalarFieldEnum[]
  }

  /**
   * StudentApplication findFirstOrThrow
   */
  export type StudentApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter, which StudentApplication to fetch.
     */
    where?: StudentApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentApplications to fetch.
     */
    orderBy?: StudentApplicationOrderByWithRelationInput | StudentApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentApplications.
     */
    cursor?: StudentApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentApplications.
     */
    distinct?: StudentApplicationScalarFieldEnum | StudentApplicationScalarFieldEnum[]
  }

  /**
   * StudentApplication findMany
   */
  export type StudentApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter, which StudentApplications to fetch.
     */
    where?: StudentApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentApplications to fetch.
     */
    orderBy?: StudentApplicationOrderByWithRelationInput | StudentApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentApplications.
     */
    cursor?: StudentApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentApplications.
     */
    skip?: number
    distinct?: StudentApplicationScalarFieldEnum | StudentApplicationScalarFieldEnum[]
  }

  /**
   * StudentApplication create
   */
  export type StudentApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentApplication.
     */
    data: XOR<StudentApplicationCreateInput, StudentApplicationUncheckedCreateInput>
  }

  /**
   * StudentApplication createMany
   */
  export type StudentApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentApplications.
     */
    data: StudentApplicationCreateManyInput | StudentApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentApplication createManyAndReturn
   */
  export type StudentApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many StudentApplications.
     */
    data: StudentApplicationCreateManyInput | StudentApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentApplication update
   */
  export type StudentApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentApplication.
     */
    data: XOR<StudentApplicationUpdateInput, StudentApplicationUncheckedUpdateInput>
    /**
     * Choose, which StudentApplication to update.
     */
    where: StudentApplicationWhereUniqueInput
  }

  /**
   * StudentApplication updateMany
   */
  export type StudentApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentApplications.
     */
    data: XOR<StudentApplicationUpdateManyMutationInput, StudentApplicationUncheckedUpdateManyInput>
    /**
     * Filter which StudentApplications to update
     */
    where?: StudentApplicationWhereInput
    /**
     * Limit how many StudentApplications to update.
     */
    limit?: number
  }

  /**
   * StudentApplication updateManyAndReturn
   */
  export type StudentApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * The data used to update StudentApplications.
     */
    data: XOR<StudentApplicationUpdateManyMutationInput, StudentApplicationUncheckedUpdateManyInput>
    /**
     * Filter which StudentApplications to update
     */
    where?: StudentApplicationWhereInput
    /**
     * Limit how many StudentApplications to update.
     */
    limit?: number
  }

  /**
   * StudentApplication upsert
   */
  export type StudentApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentApplication to update in case it exists.
     */
    where: StudentApplicationWhereUniqueInput
    /**
     * In case the StudentApplication found by the `where` argument doesn't exist, create a new StudentApplication with this data.
     */
    create: XOR<StudentApplicationCreateInput, StudentApplicationUncheckedCreateInput>
    /**
     * In case the StudentApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentApplicationUpdateInput, StudentApplicationUncheckedUpdateInput>
  }

  /**
   * StudentApplication delete
   */
  export type StudentApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
    /**
     * Filter which StudentApplication to delete.
     */
    where: StudentApplicationWhereUniqueInput
  }

  /**
   * StudentApplication deleteMany
   */
  export type StudentApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentApplications to delete
     */
    where?: StudentApplicationWhereInput
    /**
     * Limit how many StudentApplications to delete.
     */
    limit?: number
  }

  /**
   * StudentApplication.postSecondary
   */
  export type StudentApplication$postSecondaryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    where?: PostSecondaryEducationWhereInput
    orderBy?: PostSecondaryEducationOrderByWithRelationInput | PostSecondaryEducationOrderByWithRelationInput[]
    cursor?: PostSecondaryEducationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostSecondaryEducationScalarFieldEnum | PostSecondaryEducationScalarFieldEnum[]
  }

  /**
   * StudentApplication without action
   */
  export type StudentApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentApplication
     */
    select?: StudentApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudentApplication
     */
    omit?: StudentApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentApplicationInclude<ExtArgs> | null
  }


  /**
   * Model PostSecondaryEducation
   */

  export type AggregatePostSecondaryEducation = {
    _count: PostSecondaryEducationCountAggregateOutputType | null
    _min: PostSecondaryEducationMinAggregateOutputType | null
    _max: PostSecondaryEducationMaxAggregateOutputType | null
  }

  export type PostSecondaryEducationMinAggregateOutputType = {
    id: string | null
    applicationId: string | null
    institutionName: string | null
    country: string | null
    cgpaEarned: string | null
  }

  export type PostSecondaryEducationMaxAggregateOutputType = {
    id: string | null
    applicationId: string | null
    institutionName: string | null
    country: string | null
    cgpaEarned: string | null
  }

  export type PostSecondaryEducationCountAggregateOutputType = {
    id: number
    applicationId: number
    institutionName: number
    country: number
    cgpaEarned: number
    _all: number
  }


  export type PostSecondaryEducationMinAggregateInputType = {
    id?: true
    applicationId?: true
    institutionName?: true
    country?: true
    cgpaEarned?: true
  }

  export type PostSecondaryEducationMaxAggregateInputType = {
    id?: true
    applicationId?: true
    institutionName?: true
    country?: true
    cgpaEarned?: true
  }

  export type PostSecondaryEducationCountAggregateInputType = {
    id?: true
    applicationId?: true
    institutionName?: true
    country?: true
    cgpaEarned?: true
    _all?: true
  }

  export type PostSecondaryEducationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostSecondaryEducation to aggregate.
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostSecondaryEducations to fetch.
     */
    orderBy?: PostSecondaryEducationOrderByWithRelationInput | PostSecondaryEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostSecondaryEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostSecondaryEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostSecondaryEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostSecondaryEducations
    **/
    _count?: true | PostSecondaryEducationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostSecondaryEducationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostSecondaryEducationMaxAggregateInputType
  }

  export type GetPostSecondaryEducationAggregateType<T extends PostSecondaryEducationAggregateArgs> = {
        [P in keyof T & keyof AggregatePostSecondaryEducation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostSecondaryEducation[P]>
      : GetScalarType<T[P], AggregatePostSecondaryEducation[P]>
  }




  export type PostSecondaryEducationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostSecondaryEducationWhereInput
    orderBy?: PostSecondaryEducationOrderByWithAggregationInput | PostSecondaryEducationOrderByWithAggregationInput[]
    by: PostSecondaryEducationScalarFieldEnum[] | PostSecondaryEducationScalarFieldEnum
    having?: PostSecondaryEducationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostSecondaryEducationCountAggregateInputType | true
    _min?: PostSecondaryEducationMinAggregateInputType
    _max?: PostSecondaryEducationMaxAggregateInputType
  }

  export type PostSecondaryEducationGroupByOutputType = {
    id: string
    applicationId: string
    institutionName: string
    country: string
    cgpaEarned: string
    _count: PostSecondaryEducationCountAggregateOutputType | null
    _min: PostSecondaryEducationMinAggregateOutputType | null
    _max: PostSecondaryEducationMaxAggregateOutputType | null
  }

  type GetPostSecondaryEducationGroupByPayload<T extends PostSecondaryEducationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostSecondaryEducationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostSecondaryEducationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostSecondaryEducationGroupByOutputType[P]>
            : GetScalarType<T[P], PostSecondaryEducationGroupByOutputType[P]>
        }
      >
    >


  export type PostSecondaryEducationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    institutionName?: boolean
    country?: boolean
    cgpaEarned?: boolean
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postSecondaryEducation"]>

  export type PostSecondaryEducationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    institutionName?: boolean
    country?: boolean
    cgpaEarned?: boolean
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postSecondaryEducation"]>

  export type PostSecondaryEducationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationId?: boolean
    institutionName?: boolean
    country?: boolean
    cgpaEarned?: boolean
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postSecondaryEducation"]>

  export type PostSecondaryEducationSelectScalar = {
    id?: boolean
    applicationId?: boolean
    institutionName?: boolean
    country?: boolean
    cgpaEarned?: boolean
  }

  export type PostSecondaryEducationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationId" | "institutionName" | "country" | "cgpaEarned", ExtArgs["result"]["postSecondaryEducation"]>
  export type PostSecondaryEducationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }
  export type PostSecondaryEducationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }
  export type PostSecondaryEducationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    application?: boolean | StudentApplicationDefaultArgs<ExtArgs>
  }

  export type $PostSecondaryEducationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostSecondaryEducation"
    objects: {
      application: Prisma.$StudentApplicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      applicationId: string
      institutionName: string
      country: string
      cgpaEarned: string
    }, ExtArgs["result"]["postSecondaryEducation"]>
    composites: {}
  }

  type PostSecondaryEducationGetPayload<S extends boolean | null | undefined | PostSecondaryEducationDefaultArgs> = $Result.GetResult<Prisma.$PostSecondaryEducationPayload, S>

  type PostSecondaryEducationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostSecondaryEducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostSecondaryEducationCountAggregateInputType | true
    }

  export interface PostSecondaryEducationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostSecondaryEducation'], meta: { name: 'PostSecondaryEducation' } }
    /**
     * Find zero or one PostSecondaryEducation that matches the filter.
     * @param {PostSecondaryEducationFindUniqueArgs} args - Arguments to find a PostSecondaryEducation
     * @example
     * // Get one PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostSecondaryEducationFindUniqueArgs>(args: SelectSubset<T, PostSecondaryEducationFindUniqueArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostSecondaryEducation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostSecondaryEducationFindUniqueOrThrowArgs} args - Arguments to find a PostSecondaryEducation
     * @example
     * // Get one PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostSecondaryEducationFindUniqueOrThrowArgs>(args: SelectSubset<T, PostSecondaryEducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostSecondaryEducation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationFindFirstArgs} args - Arguments to find a PostSecondaryEducation
     * @example
     * // Get one PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostSecondaryEducationFindFirstArgs>(args?: SelectSubset<T, PostSecondaryEducationFindFirstArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostSecondaryEducation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationFindFirstOrThrowArgs} args - Arguments to find a PostSecondaryEducation
     * @example
     * // Get one PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostSecondaryEducationFindFirstOrThrowArgs>(args?: SelectSubset<T, PostSecondaryEducationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostSecondaryEducations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostSecondaryEducations
     * const postSecondaryEducations = await prisma.postSecondaryEducation.findMany()
     * 
     * // Get first 10 PostSecondaryEducations
     * const postSecondaryEducations = await prisma.postSecondaryEducation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postSecondaryEducationWithIdOnly = await prisma.postSecondaryEducation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostSecondaryEducationFindManyArgs>(args?: SelectSubset<T, PostSecondaryEducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostSecondaryEducation.
     * @param {PostSecondaryEducationCreateArgs} args - Arguments to create a PostSecondaryEducation.
     * @example
     * // Create one PostSecondaryEducation
     * const PostSecondaryEducation = await prisma.postSecondaryEducation.create({
     *   data: {
     *     // ... data to create a PostSecondaryEducation
     *   }
     * })
     * 
     */
    create<T extends PostSecondaryEducationCreateArgs>(args: SelectSubset<T, PostSecondaryEducationCreateArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostSecondaryEducations.
     * @param {PostSecondaryEducationCreateManyArgs} args - Arguments to create many PostSecondaryEducations.
     * @example
     * // Create many PostSecondaryEducations
     * const postSecondaryEducation = await prisma.postSecondaryEducation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostSecondaryEducationCreateManyArgs>(args?: SelectSubset<T, PostSecondaryEducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostSecondaryEducations and returns the data saved in the database.
     * @param {PostSecondaryEducationCreateManyAndReturnArgs} args - Arguments to create many PostSecondaryEducations.
     * @example
     * // Create many PostSecondaryEducations
     * const postSecondaryEducation = await prisma.postSecondaryEducation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostSecondaryEducations and only return the `id`
     * const postSecondaryEducationWithIdOnly = await prisma.postSecondaryEducation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostSecondaryEducationCreateManyAndReturnArgs>(args?: SelectSubset<T, PostSecondaryEducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostSecondaryEducation.
     * @param {PostSecondaryEducationDeleteArgs} args - Arguments to delete one PostSecondaryEducation.
     * @example
     * // Delete one PostSecondaryEducation
     * const PostSecondaryEducation = await prisma.postSecondaryEducation.delete({
     *   where: {
     *     // ... filter to delete one PostSecondaryEducation
     *   }
     * })
     * 
     */
    delete<T extends PostSecondaryEducationDeleteArgs>(args: SelectSubset<T, PostSecondaryEducationDeleteArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostSecondaryEducation.
     * @param {PostSecondaryEducationUpdateArgs} args - Arguments to update one PostSecondaryEducation.
     * @example
     * // Update one PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostSecondaryEducationUpdateArgs>(args: SelectSubset<T, PostSecondaryEducationUpdateArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostSecondaryEducations.
     * @param {PostSecondaryEducationDeleteManyArgs} args - Arguments to filter PostSecondaryEducations to delete.
     * @example
     * // Delete a few PostSecondaryEducations
     * const { count } = await prisma.postSecondaryEducation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostSecondaryEducationDeleteManyArgs>(args?: SelectSubset<T, PostSecondaryEducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostSecondaryEducations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostSecondaryEducations
     * const postSecondaryEducation = await prisma.postSecondaryEducation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostSecondaryEducationUpdateManyArgs>(args: SelectSubset<T, PostSecondaryEducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostSecondaryEducations and returns the data updated in the database.
     * @param {PostSecondaryEducationUpdateManyAndReturnArgs} args - Arguments to update many PostSecondaryEducations.
     * @example
     * // Update many PostSecondaryEducations
     * const postSecondaryEducation = await prisma.postSecondaryEducation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostSecondaryEducations and only return the `id`
     * const postSecondaryEducationWithIdOnly = await prisma.postSecondaryEducation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostSecondaryEducationUpdateManyAndReturnArgs>(args: SelectSubset<T, PostSecondaryEducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostSecondaryEducation.
     * @param {PostSecondaryEducationUpsertArgs} args - Arguments to update or create a PostSecondaryEducation.
     * @example
     * // Update or create a PostSecondaryEducation
     * const postSecondaryEducation = await prisma.postSecondaryEducation.upsert({
     *   create: {
     *     // ... data to create a PostSecondaryEducation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostSecondaryEducation we want to update
     *   }
     * })
     */
    upsert<T extends PostSecondaryEducationUpsertArgs>(args: SelectSubset<T, PostSecondaryEducationUpsertArgs<ExtArgs>>): Prisma__PostSecondaryEducationClient<$Result.GetResult<Prisma.$PostSecondaryEducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostSecondaryEducations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationCountArgs} args - Arguments to filter PostSecondaryEducations to count.
     * @example
     * // Count the number of PostSecondaryEducations
     * const count = await prisma.postSecondaryEducation.count({
     *   where: {
     *     // ... the filter for the PostSecondaryEducations we want to count
     *   }
     * })
    **/
    count<T extends PostSecondaryEducationCountArgs>(
      args?: Subset<T, PostSecondaryEducationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostSecondaryEducationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostSecondaryEducation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostSecondaryEducationAggregateArgs>(args: Subset<T, PostSecondaryEducationAggregateArgs>): Prisma.PrismaPromise<GetPostSecondaryEducationAggregateType<T>>

    /**
     * Group by PostSecondaryEducation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostSecondaryEducationGroupByArgs} args - Group by arguments.
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
      T extends PostSecondaryEducationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostSecondaryEducationGroupByArgs['orderBy'] }
        : { orderBy?: PostSecondaryEducationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostSecondaryEducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostSecondaryEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostSecondaryEducation model
   */
  readonly fields: PostSecondaryEducationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostSecondaryEducation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostSecondaryEducationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    application<T extends StudentApplicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentApplicationDefaultArgs<ExtArgs>>): Prisma__StudentApplicationClient<$Result.GetResult<Prisma.$StudentApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PostSecondaryEducation model
   */
  interface PostSecondaryEducationFieldRefs {
    readonly id: FieldRef<"PostSecondaryEducation", 'String'>
    readonly applicationId: FieldRef<"PostSecondaryEducation", 'String'>
    readonly institutionName: FieldRef<"PostSecondaryEducation", 'String'>
    readonly country: FieldRef<"PostSecondaryEducation", 'String'>
    readonly cgpaEarned: FieldRef<"PostSecondaryEducation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PostSecondaryEducation findUnique
   */
  export type PostSecondaryEducationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter, which PostSecondaryEducation to fetch.
     */
    where: PostSecondaryEducationWhereUniqueInput
  }

  /**
   * PostSecondaryEducation findUniqueOrThrow
   */
  export type PostSecondaryEducationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter, which PostSecondaryEducation to fetch.
     */
    where: PostSecondaryEducationWhereUniqueInput
  }

  /**
   * PostSecondaryEducation findFirst
   */
  export type PostSecondaryEducationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter, which PostSecondaryEducation to fetch.
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostSecondaryEducations to fetch.
     */
    orderBy?: PostSecondaryEducationOrderByWithRelationInput | PostSecondaryEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostSecondaryEducations.
     */
    cursor?: PostSecondaryEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostSecondaryEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostSecondaryEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostSecondaryEducations.
     */
    distinct?: PostSecondaryEducationScalarFieldEnum | PostSecondaryEducationScalarFieldEnum[]
  }

  /**
   * PostSecondaryEducation findFirstOrThrow
   */
  export type PostSecondaryEducationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter, which PostSecondaryEducation to fetch.
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostSecondaryEducations to fetch.
     */
    orderBy?: PostSecondaryEducationOrderByWithRelationInput | PostSecondaryEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostSecondaryEducations.
     */
    cursor?: PostSecondaryEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostSecondaryEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostSecondaryEducations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostSecondaryEducations.
     */
    distinct?: PostSecondaryEducationScalarFieldEnum | PostSecondaryEducationScalarFieldEnum[]
  }

  /**
   * PostSecondaryEducation findMany
   */
  export type PostSecondaryEducationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter, which PostSecondaryEducations to fetch.
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostSecondaryEducations to fetch.
     */
    orderBy?: PostSecondaryEducationOrderByWithRelationInput | PostSecondaryEducationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostSecondaryEducations.
     */
    cursor?: PostSecondaryEducationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostSecondaryEducations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostSecondaryEducations.
     */
    skip?: number
    distinct?: PostSecondaryEducationScalarFieldEnum | PostSecondaryEducationScalarFieldEnum[]
  }

  /**
   * PostSecondaryEducation create
   */
  export type PostSecondaryEducationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * The data needed to create a PostSecondaryEducation.
     */
    data: XOR<PostSecondaryEducationCreateInput, PostSecondaryEducationUncheckedCreateInput>
  }

  /**
   * PostSecondaryEducation createMany
   */
  export type PostSecondaryEducationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostSecondaryEducations.
     */
    data: PostSecondaryEducationCreateManyInput | PostSecondaryEducationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostSecondaryEducation createManyAndReturn
   */
  export type PostSecondaryEducationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * The data used to create many PostSecondaryEducations.
     */
    data: PostSecondaryEducationCreateManyInput | PostSecondaryEducationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostSecondaryEducation update
   */
  export type PostSecondaryEducationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * The data needed to update a PostSecondaryEducation.
     */
    data: XOR<PostSecondaryEducationUpdateInput, PostSecondaryEducationUncheckedUpdateInput>
    /**
     * Choose, which PostSecondaryEducation to update.
     */
    where: PostSecondaryEducationWhereUniqueInput
  }

  /**
   * PostSecondaryEducation updateMany
   */
  export type PostSecondaryEducationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostSecondaryEducations.
     */
    data: XOR<PostSecondaryEducationUpdateManyMutationInput, PostSecondaryEducationUncheckedUpdateManyInput>
    /**
     * Filter which PostSecondaryEducations to update
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * Limit how many PostSecondaryEducations to update.
     */
    limit?: number
  }

  /**
   * PostSecondaryEducation updateManyAndReturn
   */
  export type PostSecondaryEducationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * The data used to update PostSecondaryEducations.
     */
    data: XOR<PostSecondaryEducationUpdateManyMutationInput, PostSecondaryEducationUncheckedUpdateManyInput>
    /**
     * Filter which PostSecondaryEducations to update
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * Limit how many PostSecondaryEducations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostSecondaryEducation upsert
   */
  export type PostSecondaryEducationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * The filter to search for the PostSecondaryEducation to update in case it exists.
     */
    where: PostSecondaryEducationWhereUniqueInput
    /**
     * In case the PostSecondaryEducation found by the `where` argument doesn't exist, create a new PostSecondaryEducation with this data.
     */
    create: XOR<PostSecondaryEducationCreateInput, PostSecondaryEducationUncheckedCreateInput>
    /**
     * In case the PostSecondaryEducation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostSecondaryEducationUpdateInput, PostSecondaryEducationUncheckedUpdateInput>
  }

  /**
   * PostSecondaryEducation delete
   */
  export type PostSecondaryEducationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
    /**
     * Filter which PostSecondaryEducation to delete.
     */
    where: PostSecondaryEducationWhereUniqueInput
  }

  /**
   * PostSecondaryEducation deleteMany
   */
  export type PostSecondaryEducationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostSecondaryEducations to delete
     */
    where?: PostSecondaryEducationWhereInput
    /**
     * Limit how many PostSecondaryEducations to delete.
     */
    limit?: number
  }

  /**
   * PostSecondaryEducation without action
   */
  export type PostSecondaryEducationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostSecondaryEducation
     */
    select?: PostSecondaryEducationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostSecondaryEducation
     */
    omit?: PostSecondaryEducationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostSecondaryEducationInclude<ExtArgs> | null
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
    username: string | null
    password: string | null
    role: string | null
    email: string | null
    name: string | null
    studentID: string | null
    institute: string | null
    department: string | null
    academicYear: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    role: string | null
    email: string | null
    name: string | null
    studentID: string | null
    institute: string | null
    department: string | null
    academicYear: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    role: number
    email: number
    name: number
    studentID: number
    institute: number
    department: number
    academicYear: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    name?: true
    studentID?: true
    institute?: true
    department?: true
    academicYear?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    name?: true
    studentID?: true
    institute?: true
    department?: true
    academicYear?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    role?: true
    email?: true
    name?: true
    studentID?: true
    institute?: true
    department?: true
    academicYear?: true
    createdAt?: true
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
    username: string
    password: string
    role: string
    email: string
    name: string
    studentID: string
    institute: string
    department: string
    academicYear: string
    createdAt: Date
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
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    name?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    academicYear?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    name?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    academicYear?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    name?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    academicYear?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    email?: boolean
    name?: boolean
    studentID?: boolean
    institute?: boolean
    department?: boolean
    academicYear?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "role" | "email" | "name" | "studentID" | "institute" | "department" | "academicYear" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      role: string
      email: string
      name: string
      studentID: string
      institute: string
      department: string
      academicYear: string
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly studentID: FieldRef<"User", 'String'>
    readonly institute: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly academicYear: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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


  export const StudentApplicationScalarFieldEnum: {
    id: 'id',
    studentID: 'studentID',
    institute: 'institute',
    department: 'department',
    admission: 'admission',
    studyLevel: 'studyLevel',
    firstName: 'firstName',
    fatherName: 'fatherName',
    gFatherName: 'gFatherName',
    sex: 'sex',
    dob: 'dob',
    region: 'region',
    zone: 'zone',
    woreda: 'woreda',
    studentPhone: 'studentPhone',
    studentEmail: 'studentEmail',
    isHandicapped: 'isHandicapped',
    handicapType: 'handicapType',
    enrolledBefore: 'enrolledBefore',
    sponsor: 'sponsor',
    sponsorName: 'sponsorName',
    sponsorRegion: 'sponsorRegion',
    sponsorZone: 'sponsorZone',
    sponsorWoreda: 'sponsorWoreda',
    sponsorEmail: 'sponsorEmail',
    sponsorURL: 'sponsorURL',
    signed: 'signed',
    studentPhotoUrl: 'studentPhotoUrl',
    diplomaUrl: 'diplomaUrl',
    highSchoolUrl: 'highSchoolUrl',
    grade12Url: 'grade12Url',
    grade10Url: 'grade10Url',
    grade8Url: 'grade8Url',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type StudentApplicationScalarFieldEnum = (typeof StudentApplicationScalarFieldEnum)[keyof typeof StudentApplicationScalarFieldEnum]


  export const PostSecondaryEducationScalarFieldEnum: {
    id: 'id',
    applicationId: 'applicationId',
    institutionName: 'institutionName',
    country: 'country',
    cgpaEarned: 'cgpaEarned'
  };

  export type PostSecondaryEducationScalarFieldEnum = (typeof PostSecondaryEducationScalarFieldEnum)[keyof typeof PostSecondaryEducationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    role: 'role',
    email: 'email',
    name: 'name',
    studentID: 'studentID',
    institute: 'institute',
    department: 'department',
    academicYear: 'academicYear',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentApplicationWhereInput = {
    AND?: StudentApplicationWhereInput | StudentApplicationWhereInput[]
    OR?: StudentApplicationWhereInput[]
    NOT?: StudentApplicationWhereInput | StudentApplicationWhereInput[]
    id?: StringFilter<"StudentApplication"> | string
    studentID?: StringFilter<"StudentApplication"> | string
    institute?: StringFilter<"StudentApplication"> | string
    department?: StringFilter<"StudentApplication"> | string
    admission?: StringFilter<"StudentApplication"> | string
    studyLevel?: StringFilter<"StudentApplication"> | string
    firstName?: StringFilter<"StudentApplication"> | string
    fatherName?: StringFilter<"StudentApplication"> | string
    gFatherName?: StringFilter<"StudentApplication"> | string
    sex?: StringFilter<"StudentApplication"> | string
    dob?: DateTimeNullableFilter<"StudentApplication"> | Date | string | null
    region?: StringFilter<"StudentApplication"> | string
    zone?: StringFilter<"StudentApplication"> | string
    woreda?: StringFilter<"StudentApplication"> | string
    studentPhone?: StringFilter<"StudentApplication"> | string
    studentEmail?: StringFilter<"StudentApplication"> | string
    isHandicapped?: StringFilter<"StudentApplication"> | string
    handicapType?: StringNullableFilter<"StudentApplication"> | string | null
    enrolledBefore?: StringFilter<"StudentApplication"> | string
    sponsor?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorName?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorRegion?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorZone?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorWoreda?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorEmail?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorURL?: StringNullableFilter<"StudentApplication"> | string | null
    signed?: BoolFilter<"StudentApplication"> | boolean
    studentPhotoUrl?: StringNullableFilter<"StudentApplication"> | string | null
    diplomaUrl?: StringNullableFilter<"StudentApplication"> | string | null
    highSchoolUrl?: StringNullableFilter<"StudentApplication"> | string | null
    grade12Url?: StringNullableFilter<"StudentApplication"> | string | null
    grade10Url?: StringNullableFilter<"StudentApplication"> | string | null
    grade8Url?: StringNullableFilter<"StudentApplication"> | string | null
    status?: StringFilter<"StudentApplication"> | string
    createdAt?: DateTimeFilter<"StudentApplication"> | Date | string
    postSecondary?: PostSecondaryEducationListRelationFilter
  }

  export type StudentApplicationOrderByWithRelationInput = {
    id?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    admission?: SortOrder
    studyLevel?: SortOrder
    firstName?: SortOrder
    fatherName?: SortOrder
    gFatherName?: SortOrder
    sex?: SortOrder
    dob?: SortOrderInput | SortOrder
    region?: SortOrder
    zone?: SortOrder
    woreda?: SortOrder
    studentPhone?: SortOrder
    studentEmail?: SortOrder
    isHandicapped?: SortOrder
    handicapType?: SortOrderInput | SortOrder
    enrolledBefore?: SortOrder
    sponsor?: SortOrderInput | SortOrder
    sponsorName?: SortOrderInput | SortOrder
    sponsorRegion?: SortOrderInput | SortOrder
    sponsorZone?: SortOrderInput | SortOrder
    sponsorWoreda?: SortOrderInput | SortOrder
    sponsorEmail?: SortOrderInput | SortOrder
    sponsorURL?: SortOrderInput | SortOrder
    signed?: SortOrder
    studentPhotoUrl?: SortOrderInput | SortOrder
    diplomaUrl?: SortOrderInput | SortOrder
    highSchoolUrl?: SortOrderInput | SortOrder
    grade12Url?: SortOrderInput | SortOrder
    grade10Url?: SortOrderInput | SortOrder
    grade8Url?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    postSecondary?: PostSecondaryEducationOrderByRelationAggregateInput
  }

  export type StudentApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    studentID?: string
    AND?: StudentApplicationWhereInput | StudentApplicationWhereInput[]
    OR?: StudentApplicationWhereInput[]
    NOT?: StudentApplicationWhereInput | StudentApplicationWhereInput[]
    institute?: StringFilter<"StudentApplication"> | string
    department?: StringFilter<"StudentApplication"> | string
    admission?: StringFilter<"StudentApplication"> | string
    studyLevel?: StringFilter<"StudentApplication"> | string
    firstName?: StringFilter<"StudentApplication"> | string
    fatherName?: StringFilter<"StudentApplication"> | string
    gFatherName?: StringFilter<"StudentApplication"> | string
    sex?: StringFilter<"StudentApplication"> | string
    dob?: DateTimeNullableFilter<"StudentApplication"> | Date | string | null
    region?: StringFilter<"StudentApplication"> | string
    zone?: StringFilter<"StudentApplication"> | string
    woreda?: StringFilter<"StudentApplication"> | string
    studentPhone?: StringFilter<"StudentApplication"> | string
    studentEmail?: StringFilter<"StudentApplication"> | string
    isHandicapped?: StringFilter<"StudentApplication"> | string
    handicapType?: StringNullableFilter<"StudentApplication"> | string | null
    enrolledBefore?: StringFilter<"StudentApplication"> | string
    sponsor?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorName?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorRegion?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorZone?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorWoreda?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorEmail?: StringNullableFilter<"StudentApplication"> | string | null
    sponsorURL?: StringNullableFilter<"StudentApplication"> | string | null
    signed?: BoolFilter<"StudentApplication"> | boolean
    studentPhotoUrl?: StringNullableFilter<"StudentApplication"> | string | null
    diplomaUrl?: StringNullableFilter<"StudentApplication"> | string | null
    highSchoolUrl?: StringNullableFilter<"StudentApplication"> | string | null
    grade12Url?: StringNullableFilter<"StudentApplication"> | string | null
    grade10Url?: StringNullableFilter<"StudentApplication"> | string | null
    grade8Url?: StringNullableFilter<"StudentApplication"> | string | null
    status?: StringFilter<"StudentApplication"> | string
    createdAt?: DateTimeFilter<"StudentApplication"> | Date | string
    postSecondary?: PostSecondaryEducationListRelationFilter
  }, "id" | "studentID">

  export type StudentApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    admission?: SortOrder
    studyLevel?: SortOrder
    firstName?: SortOrder
    fatherName?: SortOrder
    gFatherName?: SortOrder
    sex?: SortOrder
    dob?: SortOrderInput | SortOrder
    region?: SortOrder
    zone?: SortOrder
    woreda?: SortOrder
    studentPhone?: SortOrder
    studentEmail?: SortOrder
    isHandicapped?: SortOrder
    handicapType?: SortOrderInput | SortOrder
    enrolledBefore?: SortOrder
    sponsor?: SortOrderInput | SortOrder
    sponsorName?: SortOrderInput | SortOrder
    sponsorRegion?: SortOrderInput | SortOrder
    sponsorZone?: SortOrderInput | SortOrder
    sponsorWoreda?: SortOrderInput | SortOrder
    sponsorEmail?: SortOrderInput | SortOrder
    sponsorURL?: SortOrderInput | SortOrder
    signed?: SortOrder
    studentPhotoUrl?: SortOrderInput | SortOrder
    diplomaUrl?: SortOrderInput | SortOrder
    highSchoolUrl?: SortOrderInput | SortOrder
    grade12Url?: SortOrderInput | SortOrder
    grade10Url?: SortOrderInput | SortOrder
    grade8Url?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: StudentApplicationCountOrderByAggregateInput
    _max?: StudentApplicationMaxOrderByAggregateInput
    _min?: StudentApplicationMinOrderByAggregateInput
  }

  export type StudentApplicationScalarWhereWithAggregatesInput = {
    AND?: StudentApplicationScalarWhereWithAggregatesInput | StudentApplicationScalarWhereWithAggregatesInput[]
    OR?: StudentApplicationScalarWhereWithAggregatesInput[]
    NOT?: StudentApplicationScalarWhereWithAggregatesInput | StudentApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudentApplication"> | string
    studentID?: StringWithAggregatesFilter<"StudentApplication"> | string
    institute?: StringWithAggregatesFilter<"StudentApplication"> | string
    department?: StringWithAggregatesFilter<"StudentApplication"> | string
    admission?: StringWithAggregatesFilter<"StudentApplication"> | string
    studyLevel?: StringWithAggregatesFilter<"StudentApplication"> | string
    firstName?: StringWithAggregatesFilter<"StudentApplication"> | string
    fatherName?: StringWithAggregatesFilter<"StudentApplication"> | string
    gFatherName?: StringWithAggregatesFilter<"StudentApplication"> | string
    sex?: StringWithAggregatesFilter<"StudentApplication"> | string
    dob?: DateTimeNullableWithAggregatesFilter<"StudentApplication"> | Date | string | null
    region?: StringWithAggregatesFilter<"StudentApplication"> | string
    zone?: StringWithAggregatesFilter<"StudentApplication"> | string
    woreda?: StringWithAggregatesFilter<"StudentApplication"> | string
    studentPhone?: StringWithAggregatesFilter<"StudentApplication"> | string
    studentEmail?: StringWithAggregatesFilter<"StudentApplication"> | string
    isHandicapped?: StringWithAggregatesFilter<"StudentApplication"> | string
    handicapType?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    enrolledBefore?: StringWithAggregatesFilter<"StudentApplication"> | string
    sponsor?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorName?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorRegion?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorZone?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorWoreda?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorEmail?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    sponsorURL?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    signed?: BoolWithAggregatesFilter<"StudentApplication"> | boolean
    studentPhotoUrl?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    diplomaUrl?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    highSchoolUrl?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    grade12Url?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    grade10Url?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    grade8Url?: StringNullableWithAggregatesFilter<"StudentApplication"> | string | null
    status?: StringWithAggregatesFilter<"StudentApplication"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StudentApplication"> | Date | string
  }

  export type PostSecondaryEducationWhereInput = {
    AND?: PostSecondaryEducationWhereInput | PostSecondaryEducationWhereInput[]
    OR?: PostSecondaryEducationWhereInput[]
    NOT?: PostSecondaryEducationWhereInput | PostSecondaryEducationWhereInput[]
    id?: StringFilter<"PostSecondaryEducation"> | string
    applicationId?: StringFilter<"PostSecondaryEducation"> | string
    institutionName?: StringFilter<"PostSecondaryEducation"> | string
    country?: StringFilter<"PostSecondaryEducation"> | string
    cgpaEarned?: StringFilter<"PostSecondaryEducation"> | string
    application?: XOR<StudentApplicationScalarRelationFilter, StudentApplicationWhereInput>
  }

  export type PostSecondaryEducationOrderByWithRelationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    institutionName?: SortOrder
    country?: SortOrder
    cgpaEarned?: SortOrder
    application?: StudentApplicationOrderByWithRelationInput
  }

  export type PostSecondaryEducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostSecondaryEducationWhereInput | PostSecondaryEducationWhereInput[]
    OR?: PostSecondaryEducationWhereInput[]
    NOT?: PostSecondaryEducationWhereInput | PostSecondaryEducationWhereInput[]
    applicationId?: StringFilter<"PostSecondaryEducation"> | string
    institutionName?: StringFilter<"PostSecondaryEducation"> | string
    country?: StringFilter<"PostSecondaryEducation"> | string
    cgpaEarned?: StringFilter<"PostSecondaryEducation"> | string
    application?: XOR<StudentApplicationScalarRelationFilter, StudentApplicationWhereInput>
  }, "id">

  export type PostSecondaryEducationOrderByWithAggregationInput = {
    id?: SortOrder
    applicationId?: SortOrder
    institutionName?: SortOrder
    country?: SortOrder
    cgpaEarned?: SortOrder
    _count?: PostSecondaryEducationCountOrderByAggregateInput
    _max?: PostSecondaryEducationMaxOrderByAggregateInput
    _min?: PostSecondaryEducationMinOrderByAggregateInput
  }

  export type PostSecondaryEducationScalarWhereWithAggregatesInput = {
    AND?: PostSecondaryEducationScalarWhereWithAggregatesInput | PostSecondaryEducationScalarWhereWithAggregatesInput[]
    OR?: PostSecondaryEducationScalarWhereWithAggregatesInput[]
    NOT?: PostSecondaryEducationScalarWhereWithAggregatesInput | PostSecondaryEducationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostSecondaryEducation"> | string
    applicationId?: StringWithAggregatesFilter<"PostSecondaryEducation"> | string
    institutionName?: StringWithAggregatesFilter<"PostSecondaryEducation"> | string
    country?: StringWithAggregatesFilter<"PostSecondaryEducation"> | string
    cgpaEarned?: StringWithAggregatesFilter<"PostSecondaryEducation"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    studentID?: StringFilter<"User"> | string
    institute?: StringFilter<"User"> | string
    department?: StringFilter<"User"> | string
    academicYear?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    name?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    studentID?: StringFilter<"User"> | string
    institute?: StringFilter<"User"> | string
    department?: StringFilter<"User"> | string
    academicYear?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    name?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    studentID?: StringWithAggregatesFilter<"User"> | string
    institute?: StringWithAggregatesFilter<"User"> | string
    department?: StringWithAggregatesFilter<"User"> | string
    academicYear?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentApplicationCreateInput = {
    id?: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob?: Date | string | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType?: string | null
    enrolledBefore: string
    sponsor?: string | null
    sponsorName?: string | null
    sponsorRegion?: string | null
    sponsorZone?: string | null
    sponsorWoreda?: string | null
    sponsorEmail?: string | null
    sponsorURL?: string | null
    signed: boolean
    studentPhotoUrl?: string | null
    diplomaUrl?: string | null
    highSchoolUrl?: string | null
    grade12Url?: string | null
    grade10Url?: string | null
    grade8Url?: string | null
    status: string
    createdAt?: Date | string
    postSecondary?: PostSecondaryEducationCreateNestedManyWithoutApplicationInput
  }

  export type StudentApplicationUncheckedCreateInput = {
    id?: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob?: Date | string | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType?: string | null
    enrolledBefore: string
    sponsor?: string | null
    sponsorName?: string | null
    sponsorRegion?: string | null
    sponsorZone?: string | null
    sponsorWoreda?: string | null
    sponsorEmail?: string | null
    sponsorURL?: string | null
    signed: boolean
    studentPhotoUrl?: string | null
    diplomaUrl?: string | null
    highSchoolUrl?: string | null
    grade12Url?: string | null
    grade10Url?: string | null
    grade8Url?: string | null
    status: string
    createdAt?: Date | string
    postSecondary?: PostSecondaryEducationUncheckedCreateNestedManyWithoutApplicationInput
  }

  export type StudentApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSecondary?: PostSecondaryEducationUpdateManyWithoutApplicationNestedInput
  }

  export type StudentApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    postSecondary?: PostSecondaryEducationUncheckedUpdateManyWithoutApplicationNestedInput
  }

  export type StudentApplicationCreateManyInput = {
    id?: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob?: Date | string | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType?: string | null
    enrolledBefore: string
    sponsor?: string | null
    sponsorName?: string | null
    sponsorRegion?: string | null
    sponsorZone?: string | null
    sponsorWoreda?: string | null
    sponsorEmail?: string | null
    sponsorURL?: string | null
    signed: boolean
    studentPhotoUrl?: string | null
    diplomaUrl?: string | null
    highSchoolUrl?: string | null
    grade12Url?: string | null
    grade10Url?: string | null
    grade8Url?: string | null
    status: string
    createdAt?: Date | string
  }

  export type StudentApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostSecondaryEducationCreateInput = {
    id?: string
    institutionName: string
    country: string
    cgpaEarned: string
    application: StudentApplicationCreateNestedOneWithoutPostSecondaryInput
  }

  export type PostSecondaryEducationUncheckedCreateInput = {
    id?: string
    applicationId: string
    institutionName: string
    country: string
    cgpaEarned: string
  }

  export type PostSecondaryEducationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
    application?: StudentApplicationUpdateOneRequiredWithoutPostSecondaryNestedInput
  }

  export type PostSecondaryEducationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }

  export type PostSecondaryEducationCreateManyInput = {
    id?: string
    applicationId: string
    institutionName: string
    country: string
    cgpaEarned: string
  }

  export type PostSecondaryEducationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }

  export type PostSecondaryEducationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    role: string
    email: string
    name: string
    studentID: string
    institute: string
    department: string
    academicYear: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    role: string
    email: string
    name: string
    studentID: string
    institute: string
    department: string
    academicYear: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    role: string
    email: string
    name: string
    studentID: string
    institute: string
    department: string
    academicYear: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    academicYear?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type PostSecondaryEducationListRelationFilter = {
    every?: PostSecondaryEducationWhereInput
    some?: PostSecondaryEducationWhereInput
    none?: PostSecondaryEducationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostSecondaryEducationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    admission?: SortOrder
    studyLevel?: SortOrder
    firstName?: SortOrder
    fatherName?: SortOrder
    gFatherName?: SortOrder
    sex?: SortOrder
    dob?: SortOrder
    region?: SortOrder
    zone?: SortOrder
    woreda?: SortOrder
    studentPhone?: SortOrder
    studentEmail?: SortOrder
    isHandicapped?: SortOrder
    handicapType?: SortOrder
    enrolledBefore?: SortOrder
    sponsor?: SortOrder
    sponsorName?: SortOrder
    sponsorRegion?: SortOrder
    sponsorZone?: SortOrder
    sponsorWoreda?: SortOrder
    sponsorEmail?: SortOrder
    sponsorURL?: SortOrder
    signed?: SortOrder
    studentPhotoUrl?: SortOrder
    diplomaUrl?: SortOrder
    highSchoolUrl?: SortOrder
    grade12Url?: SortOrder
    grade10Url?: SortOrder
    grade8Url?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    admission?: SortOrder
    studyLevel?: SortOrder
    firstName?: SortOrder
    fatherName?: SortOrder
    gFatherName?: SortOrder
    sex?: SortOrder
    dob?: SortOrder
    region?: SortOrder
    zone?: SortOrder
    woreda?: SortOrder
    studentPhone?: SortOrder
    studentEmail?: SortOrder
    isHandicapped?: SortOrder
    handicapType?: SortOrder
    enrolledBefore?: SortOrder
    sponsor?: SortOrder
    sponsorName?: SortOrder
    sponsorRegion?: SortOrder
    sponsorZone?: SortOrder
    sponsorWoreda?: SortOrder
    sponsorEmail?: SortOrder
    sponsorURL?: SortOrder
    signed?: SortOrder
    studentPhotoUrl?: SortOrder
    diplomaUrl?: SortOrder
    highSchoolUrl?: SortOrder
    grade12Url?: SortOrder
    grade10Url?: SortOrder
    grade8Url?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    admission?: SortOrder
    studyLevel?: SortOrder
    firstName?: SortOrder
    fatherName?: SortOrder
    gFatherName?: SortOrder
    sex?: SortOrder
    dob?: SortOrder
    region?: SortOrder
    zone?: SortOrder
    woreda?: SortOrder
    studentPhone?: SortOrder
    studentEmail?: SortOrder
    isHandicapped?: SortOrder
    handicapType?: SortOrder
    enrolledBefore?: SortOrder
    sponsor?: SortOrder
    sponsorName?: SortOrder
    sponsorRegion?: SortOrder
    sponsorZone?: SortOrder
    sponsorWoreda?: SortOrder
    sponsorEmail?: SortOrder
    sponsorURL?: SortOrder
    signed?: SortOrder
    studentPhotoUrl?: SortOrder
    diplomaUrl?: SortOrder
    highSchoolUrl?: SortOrder
    grade12Url?: SortOrder
    grade10Url?: SortOrder
    grade8Url?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type StudentApplicationScalarRelationFilter = {
    is?: StudentApplicationWhereInput
    isNot?: StudentApplicationWhereInput
  }

  export type PostSecondaryEducationCountOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    institutionName?: SortOrder
    country?: SortOrder
    cgpaEarned?: SortOrder
  }

  export type PostSecondaryEducationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    institutionName?: SortOrder
    country?: SortOrder
    cgpaEarned?: SortOrder
  }

  export type PostSecondaryEducationMinOrderByAggregateInput = {
    id?: SortOrder
    applicationId?: SortOrder
    institutionName?: SortOrder
    country?: SortOrder
    cgpaEarned?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    name?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    name?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    email?: SortOrder
    name?: SortOrder
    studentID?: SortOrder
    institute?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    createdAt?: SortOrder
  }

  export type PostSecondaryEducationCreateNestedManyWithoutApplicationInput = {
    create?: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput> | PostSecondaryEducationCreateWithoutApplicationInput[] | PostSecondaryEducationUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: PostSecondaryEducationCreateOrConnectWithoutApplicationInput | PostSecondaryEducationCreateOrConnectWithoutApplicationInput[]
    createMany?: PostSecondaryEducationCreateManyApplicationInputEnvelope
    connect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
  }

  export type PostSecondaryEducationUncheckedCreateNestedManyWithoutApplicationInput = {
    create?: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput> | PostSecondaryEducationCreateWithoutApplicationInput[] | PostSecondaryEducationUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: PostSecondaryEducationCreateOrConnectWithoutApplicationInput | PostSecondaryEducationCreateOrConnectWithoutApplicationInput[]
    createMany?: PostSecondaryEducationCreateManyApplicationInputEnvelope
    connect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostSecondaryEducationUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput> | PostSecondaryEducationCreateWithoutApplicationInput[] | PostSecondaryEducationUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: PostSecondaryEducationCreateOrConnectWithoutApplicationInput | PostSecondaryEducationCreateOrConnectWithoutApplicationInput[]
    upsert?: PostSecondaryEducationUpsertWithWhereUniqueWithoutApplicationInput | PostSecondaryEducationUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: PostSecondaryEducationCreateManyApplicationInputEnvelope
    set?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    disconnect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    delete?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    connect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    update?: PostSecondaryEducationUpdateWithWhereUniqueWithoutApplicationInput | PostSecondaryEducationUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: PostSecondaryEducationUpdateManyWithWhereWithoutApplicationInput | PostSecondaryEducationUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: PostSecondaryEducationScalarWhereInput | PostSecondaryEducationScalarWhereInput[]
  }

  export type PostSecondaryEducationUncheckedUpdateManyWithoutApplicationNestedInput = {
    create?: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput> | PostSecondaryEducationCreateWithoutApplicationInput[] | PostSecondaryEducationUncheckedCreateWithoutApplicationInput[]
    connectOrCreate?: PostSecondaryEducationCreateOrConnectWithoutApplicationInput | PostSecondaryEducationCreateOrConnectWithoutApplicationInput[]
    upsert?: PostSecondaryEducationUpsertWithWhereUniqueWithoutApplicationInput | PostSecondaryEducationUpsertWithWhereUniqueWithoutApplicationInput[]
    createMany?: PostSecondaryEducationCreateManyApplicationInputEnvelope
    set?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    disconnect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    delete?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    connect?: PostSecondaryEducationWhereUniqueInput | PostSecondaryEducationWhereUniqueInput[]
    update?: PostSecondaryEducationUpdateWithWhereUniqueWithoutApplicationInput | PostSecondaryEducationUpdateWithWhereUniqueWithoutApplicationInput[]
    updateMany?: PostSecondaryEducationUpdateManyWithWhereWithoutApplicationInput | PostSecondaryEducationUpdateManyWithWhereWithoutApplicationInput[]
    deleteMany?: PostSecondaryEducationScalarWhereInput | PostSecondaryEducationScalarWhereInput[]
  }

  export type StudentApplicationCreateNestedOneWithoutPostSecondaryInput = {
    create?: XOR<StudentApplicationCreateWithoutPostSecondaryInput, StudentApplicationUncheckedCreateWithoutPostSecondaryInput>
    connectOrCreate?: StudentApplicationCreateOrConnectWithoutPostSecondaryInput
    connect?: StudentApplicationWhereUniqueInput
  }

  export type StudentApplicationUpdateOneRequiredWithoutPostSecondaryNestedInput = {
    create?: XOR<StudentApplicationCreateWithoutPostSecondaryInput, StudentApplicationUncheckedCreateWithoutPostSecondaryInput>
    connectOrCreate?: StudentApplicationCreateOrConnectWithoutPostSecondaryInput
    upsert?: StudentApplicationUpsertWithoutPostSecondaryInput
    connect?: StudentApplicationWhereUniqueInput
    update?: XOR<XOR<StudentApplicationUpdateToOneWithWhereWithoutPostSecondaryInput, StudentApplicationUpdateWithoutPostSecondaryInput>, StudentApplicationUncheckedUpdateWithoutPostSecondaryInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PostSecondaryEducationCreateWithoutApplicationInput = {
    id?: string
    institutionName: string
    country: string
    cgpaEarned: string
  }

  export type PostSecondaryEducationUncheckedCreateWithoutApplicationInput = {
    id?: string
    institutionName: string
    country: string
    cgpaEarned: string
  }

  export type PostSecondaryEducationCreateOrConnectWithoutApplicationInput = {
    where: PostSecondaryEducationWhereUniqueInput
    create: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput>
  }

  export type PostSecondaryEducationCreateManyApplicationInputEnvelope = {
    data: PostSecondaryEducationCreateManyApplicationInput | PostSecondaryEducationCreateManyApplicationInput[]
    skipDuplicates?: boolean
  }

  export type PostSecondaryEducationUpsertWithWhereUniqueWithoutApplicationInput = {
    where: PostSecondaryEducationWhereUniqueInput
    update: XOR<PostSecondaryEducationUpdateWithoutApplicationInput, PostSecondaryEducationUncheckedUpdateWithoutApplicationInput>
    create: XOR<PostSecondaryEducationCreateWithoutApplicationInput, PostSecondaryEducationUncheckedCreateWithoutApplicationInput>
  }

  export type PostSecondaryEducationUpdateWithWhereUniqueWithoutApplicationInput = {
    where: PostSecondaryEducationWhereUniqueInput
    data: XOR<PostSecondaryEducationUpdateWithoutApplicationInput, PostSecondaryEducationUncheckedUpdateWithoutApplicationInput>
  }

  export type PostSecondaryEducationUpdateManyWithWhereWithoutApplicationInput = {
    where: PostSecondaryEducationScalarWhereInput
    data: XOR<PostSecondaryEducationUpdateManyMutationInput, PostSecondaryEducationUncheckedUpdateManyWithoutApplicationInput>
  }

  export type PostSecondaryEducationScalarWhereInput = {
    AND?: PostSecondaryEducationScalarWhereInput | PostSecondaryEducationScalarWhereInput[]
    OR?: PostSecondaryEducationScalarWhereInput[]
    NOT?: PostSecondaryEducationScalarWhereInput | PostSecondaryEducationScalarWhereInput[]
    id?: StringFilter<"PostSecondaryEducation"> | string
    applicationId?: StringFilter<"PostSecondaryEducation"> | string
    institutionName?: StringFilter<"PostSecondaryEducation"> | string
    country?: StringFilter<"PostSecondaryEducation"> | string
    cgpaEarned?: StringFilter<"PostSecondaryEducation"> | string
  }

  export type StudentApplicationCreateWithoutPostSecondaryInput = {
    id?: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob?: Date | string | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType?: string | null
    enrolledBefore: string
    sponsor?: string | null
    sponsorName?: string | null
    sponsorRegion?: string | null
    sponsorZone?: string | null
    sponsorWoreda?: string | null
    sponsorEmail?: string | null
    sponsorURL?: string | null
    signed: boolean
    studentPhotoUrl?: string | null
    diplomaUrl?: string | null
    highSchoolUrl?: string | null
    grade12Url?: string | null
    grade10Url?: string | null
    grade8Url?: string | null
    status: string
    createdAt?: Date | string
  }

  export type StudentApplicationUncheckedCreateWithoutPostSecondaryInput = {
    id?: string
    studentID: string
    institute: string
    department: string
    admission: string
    studyLevel: string
    firstName: string
    fatherName: string
    gFatherName: string
    sex: string
    dob?: Date | string | null
    region: string
    zone: string
    woreda: string
    studentPhone: string
    studentEmail: string
    isHandicapped: string
    handicapType?: string | null
    enrolledBefore: string
    sponsor?: string | null
    sponsorName?: string | null
    sponsorRegion?: string | null
    sponsorZone?: string | null
    sponsorWoreda?: string | null
    sponsorEmail?: string | null
    sponsorURL?: string | null
    signed: boolean
    studentPhotoUrl?: string | null
    diplomaUrl?: string | null
    highSchoolUrl?: string | null
    grade12Url?: string | null
    grade10Url?: string | null
    grade8Url?: string | null
    status: string
    createdAt?: Date | string
  }

  export type StudentApplicationCreateOrConnectWithoutPostSecondaryInput = {
    where: StudentApplicationWhereUniqueInput
    create: XOR<StudentApplicationCreateWithoutPostSecondaryInput, StudentApplicationUncheckedCreateWithoutPostSecondaryInput>
  }

  export type StudentApplicationUpsertWithoutPostSecondaryInput = {
    update: XOR<StudentApplicationUpdateWithoutPostSecondaryInput, StudentApplicationUncheckedUpdateWithoutPostSecondaryInput>
    create: XOR<StudentApplicationCreateWithoutPostSecondaryInput, StudentApplicationUncheckedCreateWithoutPostSecondaryInput>
    where?: StudentApplicationWhereInput
  }

  export type StudentApplicationUpdateToOneWithWhereWithoutPostSecondaryInput = {
    where?: StudentApplicationWhereInput
    data: XOR<StudentApplicationUpdateWithoutPostSecondaryInput, StudentApplicationUncheckedUpdateWithoutPostSecondaryInput>
  }

  export type StudentApplicationUpdateWithoutPostSecondaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentApplicationUncheckedUpdateWithoutPostSecondaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentID?: StringFieldUpdateOperationsInput | string
    institute?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    admission?: StringFieldUpdateOperationsInput | string
    studyLevel?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    fatherName?: StringFieldUpdateOperationsInput | string
    gFatherName?: StringFieldUpdateOperationsInput | string
    sex?: StringFieldUpdateOperationsInput | string
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    region?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    woreda?: StringFieldUpdateOperationsInput | string
    studentPhone?: StringFieldUpdateOperationsInput | string
    studentEmail?: StringFieldUpdateOperationsInput | string
    isHandicapped?: StringFieldUpdateOperationsInput | string
    handicapType?: NullableStringFieldUpdateOperationsInput | string | null
    enrolledBefore?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorName?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorRegion?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorZone?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorWoreda?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorEmail?: NullableStringFieldUpdateOperationsInput | string | null
    sponsorURL?: NullableStringFieldUpdateOperationsInput | string | null
    signed?: BoolFieldUpdateOperationsInput | boolean
    studentPhotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diplomaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    highSchoolUrl?: NullableStringFieldUpdateOperationsInput | string | null
    grade12Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade10Url?: NullableStringFieldUpdateOperationsInput | string | null
    grade8Url?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostSecondaryEducationCreateManyApplicationInput = {
    id?: string
    institutionName: string
    country: string
    cgpaEarned: string
  }

  export type PostSecondaryEducationUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }

  export type PostSecondaryEducationUncheckedUpdateWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }

  export type PostSecondaryEducationUncheckedUpdateManyWithoutApplicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    institutionName?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    cgpaEarned?: StringFieldUpdateOperationsInput | string
  }



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