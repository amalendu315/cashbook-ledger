
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Company
 * 
 */
export type Company = $Result.DefaultSelection<Prisma.$CompanyPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model Ledger
 * 
 */
export type Ledger = $Result.DefaultSelection<Prisma.$LedgerPayload>
/**
 * Model PaymentMode
 * 
 */
export type PaymentMode = $Result.DefaultSelection<Prisma.$PaymentModePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model UserCompanyAccess
 * 
 */
export type UserCompanyAccess = $Result.DefaultSelection<Prisma.$UserCompanyAccessPayload>
/**
 * Model CompanyLedgerMapping
 * 
 */
export type CompanyLedgerMapping = $Result.DefaultSelection<Prisma.$CompanyLedgerMappingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **Company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.CompanyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ledger`: Exposes CRUD operations for the **Ledger** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ledgers
    * const ledgers = await prisma.ledger.findMany()
    * ```
    */
  get ledger(): Prisma.LedgerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentMode`: Exposes CRUD operations for the **PaymentMode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentModes
    * const paymentModes = await prisma.paymentMode.findMany()
    * ```
    */
  get paymentMode(): Prisma.PaymentModeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userCompanyAccess`: Exposes CRUD operations for the **UserCompanyAccess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserCompanyAccesses
    * const userCompanyAccesses = await prisma.userCompanyAccess.findMany()
    * ```
    */
  get userCompanyAccess(): Prisma.UserCompanyAccessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.companyLedgerMapping`: Exposes CRUD operations for the **CompanyLedgerMapping** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CompanyLedgerMappings
    * const companyLedgerMappings = await prisma.companyLedgerMapping.findMany()
    * ```
    */
  get companyLedgerMapping(): Prisma.CompanyLedgerMappingDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    User: 'User',
    Company: 'Company',
    Group: 'Group',
    Ledger: 'Ledger',
    PaymentMode: 'PaymentMode',
    Transaction: 'Transaction',
    UserCompanyAccess: 'UserCompanyAccess',
    CompanyLedgerMapping: 'CompanyLedgerMapping'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "company" | "group" | "ledger" | "paymentMode" | "transaction" | "userCompanyAccess" | "companyLedgerMapping"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Company: {
        payload: Prisma.$CompanyPayload<ExtArgs>
        fields: Prisma.CompanyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findFirst: {
            args: Prisma.CompanyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          findMany: {
            args: Prisma.CompanyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>[]
          }
          create: {
            args: Prisma.CompanyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          createMany: {
            args: Prisma.CompanyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          update: {
            args: Prisma.CompanyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          deleteMany: {
            args: Prisma.CompanyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.CompanyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      Ledger: {
        payload: Prisma.$LedgerPayload<ExtArgs>
        fields: Prisma.LedgerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LedgerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LedgerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          findFirst: {
            args: Prisma.LedgerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LedgerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          findMany: {
            args: Prisma.LedgerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>[]
          }
          create: {
            args: Prisma.LedgerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          createMany: {
            args: Prisma.LedgerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.LedgerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          update: {
            args: Prisma.LedgerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          deleteMany: {
            args: Prisma.LedgerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LedgerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LedgerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LedgerPayload>
          }
          aggregate: {
            args: Prisma.LedgerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLedger>
          }
          groupBy: {
            args: Prisma.LedgerGroupByArgs<ExtArgs>
            result: $Utils.Optional<LedgerGroupByOutputType>[]
          }
          count: {
            args: Prisma.LedgerCountArgs<ExtArgs>
            result: $Utils.Optional<LedgerCountAggregateOutputType> | number
          }
        }
      }
      PaymentMode: {
        payload: Prisma.$PaymentModePayload<ExtArgs>
        fields: Prisma.PaymentModeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentModeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentModeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          findFirst: {
            args: Prisma.PaymentModeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentModeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          findMany: {
            args: Prisma.PaymentModeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>[]
          }
          create: {
            args: Prisma.PaymentModeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          createMany: {
            args: Prisma.PaymentModeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PaymentModeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          update: {
            args: Prisma.PaymentModeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          deleteMany: {
            args: Prisma.PaymentModeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentModeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentModeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentModePayload>
          }
          aggregate: {
            args: Prisma.PaymentModeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentMode>
          }
          groupBy: {
            args: Prisma.PaymentModeGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentModeGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentModeCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentModeCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      UserCompanyAccess: {
        payload: Prisma.$UserCompanyAccessPayload<ExtArgs>
        fields: Prisma.UserCompanyAccessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserCompanyAccessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserCompanyAccessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          findFirst: {
            args: Prisma.UserCompanyAccessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserCompanyAccessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          findMany: {
            args: Prisma.UserCompanyAccessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>[]
          }
          create: {
            args: Prisma.UserCompanyAccessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          createMany: {
            args: Prisma.UserCompanyAccessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserCompanyAccessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          update: {
            args: Prisma.UserCompanyAccessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          deleteMany: {
            args: Prisma.UserCompanyAccessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserCompanyAccessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserCompanyAccessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserCompanyAccessPayload>
          }
          aggregate: {
            args: Prisma.UserCompanyAccessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserCompanyAccess>
          }
          groupBy: {
            args: Prisma.UserCompanyAccessGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserCompanyAccessGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCompanyAccessCountArgs<ExtArgs>
            result: $Utils.Optional<UserCompanyAccessCountAggregateOutputType> | number
          }
        }
      }
      CompanyLedgerMapping: {
        payload: Prisma.$CompanyLedgerMappingPayload<ExtArgs>
        fields: Prisma.CompanyLedgerMappingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompanyLedgerMappingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompanyLedgerMappingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          findFirst: {
            args: Prisma.CompanyLedgerMappingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompanyLedgerMappingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          findMany: {
            args: Prisma.CompanyLedgerMappingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>[]
          }
          create: {
            args: Prisma.CompanyLedgerMappingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          createMany: {
            args: Prisma.CompanyLedgerMappingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CompanyLedgerMappingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          update: {
            args: Prisma.CompanyLedgerMappingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          deleteMany: {
            args: Prisma.CompanyLedgerMappingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CompanyLedgerMappingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CompanyLedgerMappingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CompanyLedgerMappingPayload>
          }
          aggregate: {
            args: Prisma.CompanyLedgerMappingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompanyLedgerMapping>
          }
          groupBy: {
            args: Prisma.CompanyLedgerMappingGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyLedgerMappingGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompanyLedgerMappingCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyLedgerMappingCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    company?: CompanyOmit
    group?: GroupOmit
    ledger?: LedgerOmit
    paymentMode?: PaymentModeOmit
    transaction?: TransactionOmit
    userCompanyAccess?: UserCompanyAccessOmit
    companyLedgerMapping?: CompanyLedgerMappingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    companyAccess: number
    transactions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companyAccess?: boolean | UserCountOutputTypeCountCompanyAccessArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
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
  export type UserCountOutputTypeCountCompanyAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCompanyAccessWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    users: number
    ledgers: number
    transactions: number
    incomingTransfers: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | CompanyCountOutputTypeCountUsersArgs
    ledgers?: boolean | CompanyCountOutputTypeCountLedgersArgs
    transactions?: boolean | CompanyCountOutputTypeCountTransactionsArgs
    incomingTransfers?: boolean | CompanyCountOutputTypeCountIncomingTransfersArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCompanyAccessWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountLedgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyLedgerMappingWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountIncomingTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    ledgers: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ledgers?: boolean | GroupCountOutputTypeCountLedgersArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountLedgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerWhereInput
  }


  /**
   * Count Type LedgerCountOutputType
   */

  export type LedgerCountOutputType = {
    companies: number
    transactions: number
  }

  export type LedgerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companies?: boolean | LedgerCountOutputTypeCountCompaniesArgs
    transactions?: boolean | LedgerCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * LedgerCountOutputType without action
   */
  export type LedgerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LedgerCountOutputType
     */
    select?: LedgerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LedgerCountOutputType without action
   */
  export type LedgerCountOutputTypeCountCompaniesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyLedgerMappingWhereInput
  }

  /**
   * LedgerCountOutputType without action
   */
  export type LedgerCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type PaymentModeCountOutputType
   */

  export type PaymentModeCountOutputType = {
    transactions: number
  }

  export type PaymentModeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | PaymentModeCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * PaymentModeCountOutputType without action
   */
  export type PaymentModeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentModeCountOutputType
     */
    select?: PaymentModeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PaymentModeCountOutputType without action
   */
  export type PaymentModeCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

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
    passwordHash: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    role: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
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
    passwordHash: string
    role: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
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
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    companyAccess?: boolean | User$companyAccessArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    companyAccess?: boolean | User$companyAccessArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      companyAccess: Prisma.$UserCompanyAccessPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      role: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
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
    companyAccess<T extends User$companyAccessArgs<ExtArgs> = {}>(args?: Subset<T, User$companyAccessArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.companyAccess
   */
  export type User$companyAccessArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    where?: UserCompanyAccessWhereInput
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    cursor?: UserCompanyAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCompanyAccessScalarFieldEnum | UserCompanyAccessScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    companyCode: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    companyCode: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    companyCode: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    companyCode?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    companyCode?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    companyCode?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Company to aggregate.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type CompanyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyWhereInput
    orderBy?: CompanyOrderByWithAggregationInput | CompanyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: CompanyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    companyCode: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends CompanyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type CompanySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyCode?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Company$usersArgs<ExtArgs>
    ledgers?: boolean | Company$ledgersArgs<ExtArgs>
    transactions?: boolean | Company$transactionsArgs<ExtArgs>
    incomingTransfers?: boolean | Company$incomingTransfersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>



  export type CompanySelectScalar = {
    id?: boolean
    companyCode?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompanyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "companyCode" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["company"]>
  export type CompanyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Company$usersArgs<ExtArgs>
    ledgers?: boolean | Company$ledgersArgs<ExtArgs>
    transactions?: boolean | Company$transactionsArgs<ExtArgs>
    incomingTransfers?: boolean | Company$incomingTransfersArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CompanyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Company"
    objects: {
      users: Prisma.$UserCompanyAccessPayload<ExtArgs>[]
      ledgers: Prisma.$CompanyLedgerMappingPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      incomingTransfers: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      companyCode: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type CompanyGetPayload<S extends boolean | null | undefined | CompanyDefaultArgs> = $Result.GetResult<Prisma.$CompanyPayload, S>

  type CompanyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface CompanyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Company'], meta: { name: 'Company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {CompanyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyFindUniqueArgs>(args: SelectSubset<T, CompanyFindUniqueArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyFindFirstArgs>(args?: SelectSubset<T, CompanyFindFirstArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CompanyFindManyArgs>(args?: SelectSubset<T, CompanyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {CompanyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends CompanyCreateArgs>(args: SelectSubset<T, CompanyCreateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {CompanyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyCreateManyArgs>(args?: SelectSubset<T, CompanyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Company.
     * @param {CompanyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends CompanyDeleteArgs>(args: SelectSubset<T, CompanyDeleteArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {CompanyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyUpdateArgs>(args: SelectSubset<T, CompanyUpdateArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {CompanyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyDeleteManyArgs>(args?: SelectSubset<T, CompanyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyUpdateManyArgs>(args: SelectSubset<T, CompanyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {CompanyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends CompanyUpsertArgs>(args: SelectSubset<T, CompanyUpsertArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompanyCountArgs>(
      args?: Subset<T, CompanyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyGroupByArgs} args - Group by arguments.
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
      T extends CompanyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyGroupByArgs['orderBy'] }
        : { orderBy?: CompanyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Company model
   */
  readonly fields: CompanyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Company$usersArgs<ExtArgs> = {}>(args?: Subset<T, Company$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ledgers<T extends Company$ledgersArgs<ExtArgs> = {}>(args?: Subset<T, Company$ledgersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Company$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Company$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    incomingTransfers<T extends Company$incomingTransfersArgs<ExtArgs> = {}>(args?: Subset<T, Company$incomingTransfersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Company model
   */
  interface CompanyFieldRefs {
    readonly id: FieldRef<"Company", 'String'>
    readonly companyCode: FieldRef<"Company", 'String'>
    readonly name: FieldRef<"Company", 'String'>
    readonly createdAt: FieldRef<"Company", 'DateTime'>
    readonly updatedAt: FieldRef<"Company", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Company findUnique
   */
  export type CompanyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findUniqueOrThrow
   */
  export type CompanyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company findFirst
   */
  export type CompanyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findFirstOrThrow
   */
  export type CompanyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Company to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company findMany
   */
  export type CompanyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompanyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompanyOrderByWithRelationInput | CompanyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompanyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * Company create
   */
  export type CompanyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to create a Company.
     */
    data: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
  }

  /**
   * Company createMany
   */
  export type CompanyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompanyCreateManyInput | CompanyCreateManyInput[]
  }

  /**
   * Company update
   */
  export type CompanyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The data needed to update a Company.
     */
    data: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
    /**
     * Choose, which Company to update.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company updateMany
   */
  export type CompanyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompanyUpdateManyMutationInput, CompanyUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to update.
     */
    limit?: number
  }

  /**
   * Company upsert
   */
  export type CompanyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * The filter to search for the Company to update in case it exists.
     */
    where: CompanyWhereUniqueInput
    /**
     * In case the Company found by the `where` argument doesn't exist, create a new Company with this data.
     */
    create: XOR<CompanyCreateInput, CompanyUncheckedCreateInput>
    /**
     * In case the Company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyUpdateInput, CompanyUncheckedUpdateInput>
  }

  /**
   * Company delete
   */
  export type CompanyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    /**
     * Filter which Company to delete.
     */
    where: CompanyWhereUniqueInput
  }

  /**
   * Company deleteMany
   */
  export type CompanyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompanyWhereInput
    /**
     * Limit how many Companies to delete.
     */
    limit?: number
  }

  /**
   * Company.users
   */
  export type Company$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    where?: UserCompanyAccessWhereInput
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    cursor?: UserCompanyAccessWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserCompanyAccessScalarFieldEnum | UserCompanyAccessScalarFieldEnum[]
  }

  /**
   * Company.ledgers
   */
  export type Company$ledgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    where?: CompanyLedgerMappingWhereInput
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    cursor?: CompanyLedgerMappingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyLedgerMappingScalarFieldEnum | CompanyLedgerMappingScalarFieldEnum[]
  }

  /**
   * Company.transactions
   */
  export type Company$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Company.incomingTransfers
   */
  export type Company$incomingTransfersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Company without action
   */
  export type CompanyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GroupCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GroupCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ledgers?: boolean | Group$ledgersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>



  export type GroupSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ledgers?: boolean | Group$ledgersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      ledgers: Prisma.$LedgerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupWithIdOnly = await prisma.group.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
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
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ledgers<T extends Group$ledgersArgs<ExtArgs> = {}>(args?: Subset<T, Group$ledgersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly id: FieldRef<"Group", 'String'>
    readonly name: FieldRef<"Group", 'String'>
    readonly createdAt: FieldRef<"Group", 'DateTime'>
    readonly updatedAt: FieldRef<"Group", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.ledgers
   */
  export type Group$ledgersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    where?: LedgerWhereInput
    orderBy?: LedgerOrderByWithRelationInput | LedgerOrderByWithRelationInput[]
    cursor?: LedgerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LedgerScalarFieldEnum | LedgerScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model Ledger
   */

  export type AggregateLedger = {
    _count: LedgerCountAggregateOutputType | null
    _avg: LedgerAvgAggregateOutputType | null
    _sum: LedgerSumAggregateOutputType | null
    _min: LedgerMinAggregateOutputType | null
    _max: LedgerMaxAggregateOutputType | null
  }

  export type LedgerAvgAggregateOutputType = {
    openingBalance: number | null
  }

  export type LedgerSumAggregateOutputType = {
    openingBalance: number | null
  }

  export type LedgerMinAggregateOutputType = {
    id: string | null
    ledger_name: string | null
    ledger_details: string | null
    isActive: boolean | null
    openingBalance: number | null
    openingBalanceType: string | null
    groupId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LedgerMaxAggregateOutputType = {
    id: string | null
    ledger_name: string | null
    ledger_details: string | null
    isActive: boolean | null
    openingBalance: number | null
    openingBalanceType: string | null
    groupId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LedgerCountAggregateOutputType = {
    id: number
    ledger_name: number
    ledger_details: number
    isActive: number
    openingBalance: number
    openingBalanceType: number
    groupId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LedgerAvgAggregateInputType = {
    openingBalance?: true
  }

  export type LedgerSumAggregateInputType = {
    openingBalance?: true
  }

  export type LedgerMinAggregateInputType = {
    id?: true
    ledger_name?: true
    ledger_details?: true
    isActive?: true
    openingBalance?: true
    openingBalanceType?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LedgerMaxAggregateInputType = {
    id?: true
    ledger_name?: true
    ledger_details?: true
    isActive?: true
    openingBalance?: true
    openingBalanceType?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LedgerCountAggregateInputType = {
    id?: true
    ledger_name?: true
    ledger_details?: true
    isActive?: true
    openingBalance?: true
    openingBalanceType?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LedgerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ledger to aggregate.
     */
    where?: LedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ledgers to fetch.
     */
    orderBy?: LedgerOrderByWithRelationInput | LedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ledgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ledgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Ledgers
    **/
    _count?: true | LedgerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LedgerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LedgerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LedgerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LedgerMaxAggregateInputType
  }

  export type GetLedgerAggregateType<T extends LedgerAggregateArgs> = {
        [P in keyof T & keyof AggregateLedger]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLedger[P]>
      : GetScalarType<T[P], AggregateLedger[P]>
  }




  export type LedgerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LedgerWhereInput
    orderBy?: LedgerOrderByWithAggregationInput | LedgerOrderByWithAggregationInput[]
    by: LedgerScalarFieldEnum[] | LedgerScalarFieldEnum
    having?: LedgerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LedgerCountAggregateInputType | true
    _avg?: LedgerAvgAggregateInputType
    _sum?: LedgerSumAggregateInputType
    _min?: LedgerMinAggregateInputType
    _max?: LedgerMaxAggregateInputType
  }

  export type LedgerGroupByOutputType = {
    id: string
    ledger_name: string
    ledger_details: string | null
    isActive: boolean
    openingBalance: number
    openingBalanceType: string
    groupId: string
    createdAt: Date
    updatedAt: Date
    _count: LedgerCountAggregateOutputType | null
    _avg: LedgerAvgAggregateOutputType | null
    _sum: LedgerSumAggregateOutputType | null
    _min: LedgerMinAggregateOutputType | null
    _max: LedgerMaxAggregateOutputType | null
  }

  type GetLedgerGroupByPayload<T extends LedgerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LedgerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LedgerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LedgerGroupByOutputType[P]>
            : GetScalarType<T[P], LedgerGroupByOutputType[P]>
        }
      >
    >


  export type LedgerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    ledger_name?: boolean
    ledger_details?: boolean
    isActive?: boolean
    openingBalance?: boolean
    openingBalanceType?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    group?: boolean | GroupDefaultArgs<ExtArgs>
    companies?: boolean | Ledger$companiesArgs<ExtArgs>
    transactions?: boolean | Ledger$transactionsArgs<ExtArgs>
    _count?: boolean | LedgerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ledger"]>



  export type LedgerSelectScalar = {
    id?: boolean
    ledger_name?: boolean
    ledger_details?: boolean
    isActive?: boolean
    openingBalance?: boolean
    openingBalanceType?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LedgerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "ledger_name" | "ledger_details" | "isActive" | "openingBalance" | "openingBalanceType" | "groupId" | "createdAt" | "updatedAt", ExtArgs["result"]["ledger"]>
  export type LedgerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | GroupDefaultArgs<ExtArgs>
    companies?: boolean | Ledger$companiesArgs<ExtArgs>
    transactions?: boolean | Ledger$transactionsArgs<ExtArgs>
    _count?: boolean | LedgerCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $LedgerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ledger"
    objects: {
      group: Prisma.$GroupPayload<ExtArgs>
      companies: Prisma.$CompanyLedgerMappingPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      ledger_name: string
      ledger_details: string | null
      isActive: boolean
      openingBalance: number
      openingBalanceType: string
      groupId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ledger"]>
    composites: {}
  }

  type LedgerGetPayload<S extends boolean | null | undefined | LedgerDefaultArgs> = $Result.GetResult<Prisma.$LedgerPayload, S>

  type LedgerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LedgerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LedgerCountAggregateInputType | true
    }

  export interface LedgerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ledger'], meta: { name: 'Ledger' } }
    /**
     * Find zero or one Ledger that matches the filter.
     * @param {LedgerFindUniqueArgs} args - Arguments to find a Ledger
     * @example
     * // Get one Ledger
     * const ledger = await prisma.ledger.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LedgerFindUniqueArgs>(args: SelectSubset<T, LedgerFindUniqueArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ledger that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LedgerFindUniqueOrThrowArgs} args - Arguments to find a Ledger
     * @example
     * // Get one Ledger
     * const ledger = await prisma.ledger.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LedgerFindUniqueOrThrowArgs>(args: SelectSubset<T, LedgerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ledger that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerFindFirstArgs} args - Arguments to find a Ledger
     * @example
     * // Get one Ledger
     * const ledger = await prisma.ledger.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LedgerFindFirstArgs>(args?: SelectSubset<T, LedgerFindFirstArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ledger that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerFindFirstOrThrowArgs} args - Arguments to find a Ledger
     * @example
     * // Get one Ledger
     * const ledger = await prisma.ledger.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LedgerFindFirstOrThrowArgs>(args?: SelectSubset<T, LedgerFindFirstOrThrowArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Ledgers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ledgers
     * const ledgers = await prisma.ledger.findMany()
     * 
     * // Get first 10 Ledgers
     * const ledgers = await prisma.ledger.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ledgerWithIdOnly = await prisma.ledger.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LedgerFindManyArgs>(args?: SelectSubset<T, LedgerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ledger.
     * @param {LedgerCreateArgs} args - Arguments to create a Ledger.
     * @example
     * // Create one Ledger
     * const Ledger = await prisma.ledger.create({
     *   data: {
     *     // ... data to create a Ledger
     *   }
     * })
     * 
     */
    create<T extends LedgerCreateArgs>(args: SelectSubset<T, LedgerCreateArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Ledgers.
     * @param {LedgerCreateManyArgs} args - Arguments to create many Ledgers.
     * @example
     * // Create many Ledgers
     * const ledger = await prisma.ledger.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LedgerCreateManyArgs>(args?: SelectSubset<T, LedgerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Ledger.
     * @param {LedgerDeleteArgs} args - Arguments to delete one Ledger.
     * @example
     * // Delete one Ledger
     * const Ledger = await prisma.ledger.delete({
     *   where: {
     *     // ... filter to delete one Ledger
     *   }
     * })
     * 
     */
    delete<T extends LedgerDeleteArgs>(args: SelectSubset<T, LedgerDeleteArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ledger.
     * @param {LedgerUpdateArgs} args - Arguments to update one Ledger.
     * @example
     * // Update one Ledger
     * const ledger = await prisma.ledger.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LedgerUpdateArgs>(args: SelectSubset<T, LedgerUpdateArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Ledgers.
     * @param {LedgerDeleteManyArgs} args - Arguments to filter Ledgers to delete.
     * @example
     * // Delete a few Ledgers
     * const { count } = await prisma.ledger.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LedgerDeleteManyArgs>(args?: SelectSubset<T, LedgerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Ledgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ledgers
     * const ledger = await prisma.ledger.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LedgerUpdateManyArgs>(args: SelectSubset<T, LedgerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Ledger.
     * @param {LedgerUpsertArgs} args - Arguments to update or create a Ledger.
     * @example
     * // Update or create a Ledger
     * const ledger = await prisma.ledger.upsert({
     *   create: {
     *     // ... data to create a Ledger
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ledger we want to update
     *   }
     * })
     */
    upsert<T extends LedgerUpsertArgs>(args: SelectSubset<T, LedgerUpsertArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Ledgers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerCountArgs} args - Arguments to filter Ledgers to count.
     * @example
     * // Count the number of Ledgers
     * const count = await prisma.ledger.count({
     *   where: {
     *     // ... the filter for the Ledgers we want to count
     *   }
     * })
    **/
    count<T extends LedgerCountArgs>(
      args?: Subset<T, LedgerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LedgerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ledger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LedgerAggregateArgs>(args: Subset<T, LedgerAggregateArgs>): Prisma.PrismaPromise<GetLedgerAggregateType<T>>

    /**
     * Group by Ledger.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LedgerGroupByArgs} args - Group by arguments.
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
      T extends LedgerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LedgerGroupByArgs['orderBy'] }
        : { orderBy?: LedgerGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LedgerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLedgerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ledger model
   */
  readonly fields: LedgerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ledger.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LedgerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    companies<T extends Ledger$companiesArgs<ExtArgs> = {}>(args?: Subset<T, Ledger$companiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends Ledger$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Ledger$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Ledger model
   */
  interface LedgerFieldRefs {
    readonly id: FieldRef<"Ledger", 'String'>
    readonly ledger_name: FieldRef<"Ledger", 'String'>
    readonly ledger_details: FieldRef<"Ledger", 'String'>
    readonly isActive: FieldRef<"Ledger", 'Boolean'>
    readonly openingBalance: FieldRef<"Ledger", 'Float'>
    readonly openingBalanceType: FieldRef<"Ledger", 'String'>
    readonly groupId: FieldRef<"Ledger", 'String'>
    readonly createdAt: FieldRef<"Ledger", 'DateTime'>
    readonly updatedAt: FieldRef<"Ledger", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ledger findUnique
   */
  export type LedgerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter, which Ledger to fetch.
     */
    where: LedgerWhereUniqueInput
  }

  /**
   * Ledger findUniqueOrThrow
   */
  export type LedgerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter, which Ledger to fetch.
     */
    where: LedgerWhereUniqueInput
  }

  /**
   * Ledger findFirst
   */
  export type LedgerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter, which Ledger to fetch.
     */
    where?: LedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ledgers to fetch.
     */
    orderBy?: LedgerOrderByWithRelationInput | LedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ledgers.
     */
    cursor?: LedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ledgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ledgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ledgers.
     */
    distinct?: LedgerScalarFieldEnum | LedgerScalarFieldEnum[]
  }

  /**
   * Ledger findFirstOrThrow
   */
  export type LedgerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter, which Ledger to fetch.
     */
    where?: LedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ledgers to fetch.
     */
    orderBy?: LedgerOrderByWithRelationInput | LedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Ledgers.
     */
    cursor?: LedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ledgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ledgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ledgers.
     */
    distinct?: LedgerScalarFieldEnum | LedgerScalarFieldEnum[]
  }

  /**
   * Ledger findMany
   */
  export type LedgerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter, which Ledgers to fetch.
     */
    where?: LedgerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Ledgers to fetch.
     */
    orderBy?: LedgerOrderByWithRelationInput | LedgerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Ledgers.
     */
    cursor?: LedgerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Ledgers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Ledgers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Ledgers.
     */
    distinct?: LedgerScalarFieldEnum | LedgerScalarFieldEnum[]
  }

  /**
   * Ledger create
   */
  export type LedgerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * The data needed to create a Ledger.
     */
    data: XOR<LedgerCreateInput, LedgerUncheckedCreateInput>
  }

  /**
   * Ledger createMany
   */
  export type LedgerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Ledgers.
     */
    data: LedgerCreateManyInput | LedgerCreateManyInput[]
  }

  /**
   * Ledger update
   */
  export type LedgerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * The data needed to update a Ledger.
     */
    data: XOR<LedgerUpdateInput, LedgerUncheckedUpdateInput>
    /**
     * Choose, which Ledger to update.
     */
    where: LedgerWhereUniqueInput
  }

  /**
   * Ledger updateMany
   */
  export type LedgerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Ledgers.
     */
    data: XOR<LedgerUpdateManyMutationInput, LedgerUncheckedUpdateManyInput>
    /**
     * Filter which Ledgers to update
     */
    where?: LedgerWhereInput
    /**
     * Limit how many Ledgers to update.
     */
    limit?: number
  }

  /**
   * Ledger upsert
   */
  export type LedgerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * The filter to search for the Ledger to update in case it exists.
     */
    where: LedgerWhereUniqueInput
    /**
     * In case the Ledger found by the `where` argument doesn't exist, create a new Ledger with this data.
     */
    create: XOR<LedgerCreateInput, LedgerUncheckedCreateInput>
    /**
     * In case the Ledger was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LedgerUpdateInput, LedgerUncheckedUpdateInput>
  }

  /**
   * Ledger delete
   */
  export type LedgerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    /**
     * Filter which Ledger to delete.
     */
    where: LedgerWhereUniqueInput
  }

  /**
   * Ledger deleteMany
   */
  export type LedgerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ledgers to delete
     */
    where?: LedgerWhereInput
    /**
     * Limit how many Ledgers to delete.
     */
    limit?: number
  }

  /**
   * Ledger.companies
   */
  export type Ledger$companiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    where?: CompanyLedgerMappingWhereInput
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    cursor?: CompanyLedgerMappingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CompanyLedgerMappingScalarFieldEnum | CompanyLedgerMappingScalarFieldEnum[]
  }

  /**
   * Ledger.transactions
   */
  export type Ledger$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Ledger without action
   */
  export type LedgerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
  }


  /**
   * Model PaymentMode
   */

  export type AggregatePaymentMode = {
    _count: PaymentModeCountAggregateOutputType | null
    _min: PaymentModeMinAggregateOutputType | null
    _max: PaymentModeMaxAggregateOutputType | null
  }

  export type PaymentModeMinAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentModeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    category: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentModeCountAggregateOutputType = {
    id: number
    name: number
    category: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentModeMinAggregateInputType = {
    id?: true
    name?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentModeMaxAggregateInputType = {
    id?: true
    name?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentModeCountAggregateInputType = {
    id?: true
    name?: true
    category?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentModeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentMode to aggregate.
     */
    where?: PaymentModeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentModes to fetch.
     */
    orderBy?: PaymentModeOrderByWithRelationInput | PaymentModeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentModeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentModes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentModes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentModes
    **/
    _count?: true | PaymentModeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentModeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentModeMaxAggregateInputType
  }

  export type GetPaymentModeAggregateType<T extends PaymentModeAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentMode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentMode[P]>
      : GetScalarType<T[P], AggregatePaymentMode[P]>
  }




  export type PaymentModeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentModeWhereInput
    orderBy?: PaymentModeOrderByWithAggregationInput | PaymentModeOrderByWithAggregationInput[]
    by: PaymentModeScalarFieldEnum[] | PaymentModeScalarFieldEnum
    having?: PaymentModeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentModeCountAggregateInputType | true
    _min?: PaymentModeMinAggregateInputType
    _max?: PaymentModeMaxAggregateInputType
  }

  export type PaymentModeGroupByOutputType = {
    id: string
    name: string
    category: string
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PaymentModeCountAggregateOutputType | null
    _min: PaymentModeMinAggregateOutputType | null
    _max: PaymentModeMaxAggregateOutputType | null
  }

  type GetPaymentModeGroupByPayload<T extends PaymentModeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentModeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentModeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentModeGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentModeGroupByOutputType[P]>
        }
      >
    >


  export type PaymentModeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactions?: boolean | PaymentMode$transactionsArgs<ExtArgs>
    _count?: boolean | PaymentModeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["paymentMode"]>



  export type PaymentModeSelectScalar = {
    id?: boolean
    name?: boolean
    category?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentModeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "category" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentMode"]>
  export type PaymentModeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | PaymentMode$transactionsArgs<ExtArgs>
    _count?: boolean | PaymentModeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PaymentModePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentMode"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      category: string
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentMode"]>
    composites: {}
  }

  type PaymentModeGetPayload<S extends boolean | null | undefined | PaymentModeDefaultArgs> = $Result.GetResult<Prisma.$PaymentModePayload, S>

  type PaymentModeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentModeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentModeCountAggregateInputType | true
    }

  export interface PaymentModeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentMode'], meta: { name: 'PaymentMode' } }
    /**
     * Find zero or one PaymentMode that matches the filter.
     * @param {PaymentModeFindUniqueArgs} args - Arguments to find a PaymentMode
     * @example
     * // Get one PaymentMode
     * const paymentMode = await prisma.paymentMode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentModeFindUniqueArgs>(args: SelectSubset<T, PaymentModeFindUniqueArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentMode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentModeFindUniqueOrThrowArgs} args - Arguments to find a PaymentMode
     * @example
     * // Get one PaymentMode
     * const paymentMode = await prisma.paymentMode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentModeFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentModeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentMode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeFindFirstArgs} args - Arguments to find a PaymentMode
     * @example
     * // Get one PaymentMode
     * const paymentMode = await prisma.paymentMode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentModeFindFirstArgs>(args?: SelectSubset<T, PaymentModeFindFirstArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentMode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeFindFirstOrThrowArgs} args - Arguments to find a PaymentMode
     * @example
     * // Get one PaymentMode
     * const paymentMode = await prisma.paymentMode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentModeFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentModeFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentModes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentModes
     * const paymentModes = await prisma.paymentMode.findMany()
     * 
     * // Get first 10 PaymentModes
     * const paymentModes = await prisma.paymentMode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentModeWithIdOnly = await prisma.paymentMode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentModeFindManyArgs>(args?: SelectSubset<T, PaymentModeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentMode.
     * @param {PaymentModeCreateArgs} args - Arguments to create a PaymentMode.
     * @example
     * // Create one PaymentMode
     * const PaymentMode = await prisma.paymentMode.create({
     *   data: {
     *     // ... data to create a PaymentMode
     *   }
     * })
     * 
     */
    create<T extends PaymentModeCreateArgs>(args: SelectSubset<T, PaymentModeCreateArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentModes.
     * @param {PaymentModeCreateManyArgs} args - Arguments to create many PaymentModes.
     * @example
     * // Create many PaymentModes
     * const paymentMode = await prisma.paymentMode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentModeCreateManyArgs>(args?: SelectSubset<T, PaymentModeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PaymentMode.
     * @param {PaymentModeDeleteArgs} args - Arguments to delete one PaymentMode.
     * @example
     * // Delete one PaymentMode
     * const PaymentMode = await prisma.paymentMode.delete({
     *   where: {
     *     // ... filter to delete one PaymentMode
     *   }
     * })
     * 
     */
    delete<T extends PaymentModeDeleteArgs>(args: SelectSubset<T, PaymentModeDeleteArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentMode.
     * @param {PaymentModeUpdateArgs} args - Arguments to update one PaymentMode.
     * @example
     * // Update one PaymentMode
     * const paymentMode = await prisma.paymentMode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentModeUpdateArgs>(args: SelectSubset<T, PaymentModeUpdateArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentModes.
     * @param {PaymentModeDeleteManyArgs} args - Arguments to filter PaymentModes to delete.
     * @example
     * // Delete a few PaymentModes
     * const { count } = await prisma.paymentMode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentModeDeleteManyArgs>(args?: SelectSubset<T, PaymentModeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentModes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentModes
     * const paymentMode = await prisma.paymentMode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentModeUpdateManyArgs>(args: SelectSubset<T, PaymentModeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PaymentMode.
     * @param {PaymentModeUpsertArgs} args - Arguments to update or create a PaymentMode.
     * @example
     * // Update or create a PaymentMode
     * const paymentMode = await prisma.paymentMode.upsert({
     *   create: {
     *     // ... data to create a PaymentMode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentMode we want to update
     *   }
     * })
     */
    upsert<T extends PaymentModeUpsertArgs>(args: SelectSubset<T, PaymentModeUpsertArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentModes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeCountArgs} args - Arguments to filter PaymentModes to count.
     * @example
     * // Count the number of PaymentModes
     * const count = await prisma.paymentMode.count({
     *   where: {
     *     // ... the filter for the PaymentModes we want to count
     *   }
     * })
    **/
    count<T extends PaymentModeCountArgs>(
      args?: Subset<T, PaymentModeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentModeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentMode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentModeAggregateArgs>(args: Subset<T, PaymentModeAggregateArgs>): Prisma.PrismaPromise<GetPaymentModeAggregateType<T>>

    /**
     * Group by PaymentMode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentModeGroupByArgs} args - Group by arguments.
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
      T extends PaymentModeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentModeGroupByArgs['orderBy'] }
        : { orderBy?: PaymentModeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentModeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentModeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentMode model
   */
  readonly fields: PaymentModeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentMode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentModeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends PaymentMode$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, PaymentMode$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PaymentMode model
   */
  interface PaymentModeFieldRefs {
    readonly id: FieldRef<"PaymentMode", 'String'>
    readonly name: FieldRef<"PaymentMode", 'String'>
    readonly category: FieldRef<"PaymentMode", 'String'>
    readonly isActive: FieldRef<"PaymentMode", 'Boolean'>
    readonly createdAt: FieldRef<"PaymentMode", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentMode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentMode findUnique
   */
  export type PaymentModeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMode to fetch.
     */
    where: PaymentModeWhereUniqueInput
  }

  /**
   * PaymentMode findUniqueOrThrow
   */
  export type PaymentModeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMode to fetch.
     */
    where: PaymentModeWhereUniqueInput
  }

  /**
   * PaymentMode findFirst
   */
  export type PaymentModeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMode to fetch.
     */
    where?: PaymentModeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentModes to fetch.
     */
    orderBy?: PaymentModeOrderByWithRelationInput | PaymentModeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentModes.
     */
    cursor?: PaymentModeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentModes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentModes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentModes.
     */
    distinct?: PaymentModeScalarFieldEnum | PaymentModeScalarFieldEnum[]
  }

  /**
   * PaymentMode findFirstOrThrow
   */
  export type PaymentModeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter, which PaymentMode to fetch.
     */
    where?: PaymentModeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentModes to fetch.
     */
    orderBy?: PaymentModeOrderByWithRelationInput | PaymentModeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentModes.
     */
    cursor?: PaymentModeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentModes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentModes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentModes.
     */
    distinct?: PaymentModeScalarFieldEnum | PaymentModeScalarFieldEnum[]
  }

  /**
   * PaymentMode findMany
   */
  export type PaymentModeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter, which PaymentModes to fetch.
     */
    where?: PaymentModeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentModes to fetch.
     */
    orderBy?: PaymentModeOrderByWithRelationInput | PaymentModeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentModes.
     */
    cursor?: PaymentModeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentModes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentModes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentModes.
     */
    distinct?: PaymentModeScalarFieldEnum | PaymentModeScalarFieldEnum[]
  }

  /**
   * PaymentMode create
   */
  export type PaymentModeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentMode.
     */
    data: XOR<PaymentModeCreateInput, PaymentModeUncheckedCreateInput>
  }

  /**
   * PaymentMode createMany
   */
  export type PaymentModeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentModes.
     */
    data: PaymentModeCreateManyInput | PaymentModeCreateManyInput[]
  }

  /**
   * PaymentMode update
   */
  export type PaymentModeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentMode.
     */
    data: XOR<PaymentModeUpdateInput, PaymentModeUncheckedUpdateInput>
    /**
     * Choose, which PaymentMode to update.
     */
    where: PaymentModeWhereUniqueInput
  }

  /**
   * PaymentMode updateMany
   */
  export type PaymentModeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentModes.
     */
    data: XOR<PaymentModeUpdateManyMutationInput, PaymentModeUncheckedUpdateManyInput>
    /**
     * Filter which PaymentModes to update
     */
    where?: PaymentModeWhereInput
    /**
     * Limit how many PaymentModes to update.
     */
    limit?: number
  }

  /**
   * PaymentMode upsert
   */
  export type PaymentModeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentMode to update in case it exists.
     */
    where: PaymentModeWhereUniqueInput
    /**
     * In case the PaymentMode found by the `where` argument doesn't exist, create a new PaymentMode with this data.
     */
    create: XOR<PaymentModeCreateInput, PaymentModeUncheckedCreateInput>
    /**
     * In case the PaymentMode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentModeUpdateInput, PaymentModeUncheckedUpdateInput>
  }

  /**
   * PaymentMode delete
   */
  export type PaymentModeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
    /**
     * Filter which PaymentMode to delete.
     */
    where: PaymentModeWhereUniqueInput
  }

  /**
   * PaymentMode deleteMany
   */
  export type PaymentModeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentModes to delete
     */
    where?: PaymentModeWhereInput
    /**
     * Limit how many PaymentModes to delete.
     */
    limit?: number
  }

  /**
   * PaymentMode.transactions
   */
  export type PaymentMode$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * PaymentMode without action
   */
  export type PaymentModeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentMode
     */
    select?: PaymentModeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentMode
     */
    omit?: PaymentModeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentModeInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    voucherNo: string | null
    type: string | null
    companyId: string | null
    ledgerId: string | null
    destinationCompanyId: string | null
    amount: number | null
    paymentModeId: string | null
    businessDate: Date | null
    particulars: string | null
    remarks: string | null
    approvedBy: string | null
    approvedOver: string | null
    attachmentUrl: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    voucherNo: string | null
    type: string | null
    companyId: string | null
    ledgerId: string | null
    destinationCompanyId: string | null
    amount: number | null
    paymentModeId: string | null
    businessDate: Date | null
    particulars: string | null
    remarks: string | null
    approvedBy: string | null
    approvedOver: string | null
    attachmentUrl: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    voucherNo: number
    type: number
    companyId: number
    ledgerId: number
    destinationCompanyId: number
    amount: number
    paymentModeId: number
    businessDate: number
    particulars: number
    remarks: number
    approvedBy: number
    approvedOver: number
    attachmentUrl: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    voucherNo?: true
    type?: true
    companyId?: true
    ledgerId?: true
    destinationCompanyId?: true
    amount?: true
    paymentModeId?: true
    businessDate?: true
    particulars?: true
    remarks?: true
    approvedBy?: true
    approvedOver?: true
    attachmentUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    voucherNo?: true
    type?: true
    companyId?: true
    ledgerId?: true
    destinationCompanyId?: true
    amount?: true
    paymentModeId?: true
    businessDate?: true
    particulars?: true
    remarks?: true
    approvedBy?: true
    approvedOver?: true
    attachmentUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    voucherNo?: true
    type?: true
    companyId?: true
    ledgerId?: true
    destinationCompanyId?: true
    amount?: true
    paymentModeId?: true
    businessDate?: true
    particulars?: true
    remarks?: true
    approvedBy?: true
    approvedOver?: true
    attachmentUrl?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId: string | null
    destinationCompanyId: string | null
    amount: number
    paymentModeId: string
    businessDate: Date
    particulars: string
    remarks: string | null
    approvedBy: string | null
    approvedOver: string | null
    attachmentUrl: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    voucherNo?: boolean
    type?: boolean
    companyId?: boolean
    ledgerId?: boolean
    destinationCompanyId?: boolean
    amount?: boolean
    paymentModeId?: boolean
    businessDate?: boolean
    particulars?: boolean
    remarks?: boolean
    approvedBy?: boolean
    approvedOver?: boolean
    attachmentUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    ledger?: boolean | Transaction$ledgerArgs<ExtArgs>
    destinationCompany?: boolean | Transaction$destinationCompanyArgs<ExtArgs>
    paymentMode?: boolean | PaymentModeDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>



  export type TransactionSelectScalar = {
    id?: boolean
    voucherNo?: boolean
    type?: boolean
    companyId?: boolean
    ledgerId?: boolean
    destinationCompanyId?: boolean
    amount?: boolean
    paymentModeId?: boolean
    businessDate?: boolean
    particulars?: boolean
    remarks?: boolean
    approvedBy?: boolean
    approvedOver?: boolean
    attachmentUrl?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "voucherNo" | "type" | "companyId" | "ledgerId" | "destinationCompanyId" | "amount" | "paymentModeId" | "businessDate" | "particulars" | "remarks" | "approvedBy" | "approvedOver" | "attachmentUrl" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    ledger?: boolean | Transaction$ledgerArgs<ExtArgs>
    destinationCompany?: boolean | Transaction$destinationCompanyArgs<ExtArgs>
    paymentMode?: boolean | PaymentModeDefaultArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      ledger: Prisma.$LedgerPayload<ExtArgs> | null
      destinationCompany: Prisma.$CompanyPayload<ExtArgs> | null
      paymentMode: Prisma.$PaymentModePayload<ExtArgs>
      createdBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      voucherNo: string
      type: string
      companyId: string
      ledgerId: string | null
      destinationCompanyId: string | null
      amount: number
      paymentModeId: string
      businessDate: Date
      particulars: string
      remarks: string | null
      approvedBy: string | null
      approvedOver: string | null
      attachmentUrl: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ledger<T extends Transaction$ledgerArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$ledgerArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    destinationCompany<T extends Transaction$destinationCompanyArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$destinationCompanyArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    paymentMode<T extends PaymentModeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PaymentModeDefaultArgs<ExtArgs>>): Prisma__PaymentModeClient<$Result.GetResult<Prisma.$PaymentModePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly voucherNo: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly companyId: FieldRef<"Transaction", 'String'>
    readonly ledgerId: FieldRef<"Transaction", 'String'>
    readonly destinationCompanyId: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly paymentModeId: FieldRef<"Transaction", 'String'>
    readonly businessDate: FieldRef<"Transaction", 'DateTime'>
    readonly particulars: FieldRef<"Transaction", 'String'>
    readonly remarks: FieldRef<"Transaction", 'String'>
    readonly approvedBy: FieldRef<"Transaction", 'String'>
    readonly approvedOver: FieldRef<"Transaction", 'String'>
    readonly attachmentUrl: FieldRef<"Transaction", 'String'>
    readonly createdById: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.ledger
   */
  export type Transaction$ledgerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ledger
     */
    select?: LedgerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ledger
     */
    omit?: LedgerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LedgerInclude<ExtArgs> | null
    where?: LedgerWhereInput
  }

  /**
   * Transaction.destinationCompany
   */
  export type Transaction$destinationCompanyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Company
     */
    select?: CompanySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Company
     */
    omit?: CompanyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyInclude<ExtArgs> | null
    where?: CompanyWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model UserCompanyAccess
   */

  export type AggregateUserCompanyAccess = {
    _count: UserCompanyAccessCountAggregateOutputType | null
    _min: UserCompanyAccessMinAggregateOutputType | null
    _max: UserCompanyAccessMaxAggregateOutputType | null
  }

  export type UserCompanyAccessMinAggregateOutputType = {
    userId: string | null
    companyId: string | null
    assignedAt: Date | null
  }

  export type UserCompanyAccessMaxAggregateOutputType = {
    userId: string | null
    companyId: string | null
    assignedAt: Date | null
  }

  export type UserCompanyAccessCountAggregateOutputType = {
    userId: number
    companyId: number
    assignedAt: number
    _all: number
  }


  export type UserCompanyAccessMinAggregateInputType = {
    userId?: true
    companyId?: true
    assignedAt?: true
  }

  export type UserCompanyAccessMaxAggregateInputType = {
    userId?: true
    companyId?: true
    assignedAt?: true
  }

  export type UserCompanyAccessCountAggregateInputType = {
    userId?: true
    companyId?: true
    assignedAt?: true
    _all?: true
  }

  export type UserCompanyAccessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCompanyAccess to aggregate.
     */
    where?: UserCompanyAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCompanyAccesses to fetch.
     */
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserCompanyAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCompanyAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCompanyAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserCompanyAccesses
    **/
    _count?: true | UserCompanyAccessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserCompanyAccessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserCompanyAccessMaxAggregateInputType
  }

  export type GetUserCompanyAccessAggregateType<T extends UserCompanyAccessAggregateArgs> = {
        [P in keyof T & keyof AggregateUserCompanyAccess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserCompanyAccess[P]>
      : GetScalarType<T[P], AggregateUserCompanyAccess[P]>
  }




  export type UserCompanyAccessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserCompanyAccessWhereInput
    orderBy?: UserCompanyAccessOrderByWithAggregationInput | UserCompanyAccessOrderByWithAggregationInput[]
    by: UserCompanyAccessScalarFieldEnum[] | UserCompanyAccessScalarFieldEnum
    having?: UserCompanyAccessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCompanyAccessCountAggregateInputType | true
    _min?: UserCompanyAccessMinAggregateInputType
    _max?: UserCompanyAccessMaxAggregateInputType
  }

  export type UserCompanyAccessGroupByOutputType = {
    userId: string
    companyId: string
    assignedAt: Date
    _count: UserCompanyAccessCountAggregateOutputType | null
    _min: UserCompanyAccessMinAggregateOutputType | null
    _max: UserCompanyAccessMaxAggregateOutputType | null
  }

  type GetUserCompanyAccessGroupByPayload<T extends UserCompanyAccessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserCompanyAccessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserCompanyAccessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserCompanyAccessGroupByOutputType[P]>
            : GetScalarType<T[P], UserCompanyAccessGroupByOutputType[P]>
        }
      >
    >


  export type UserCompanyAccessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    companyId?: boolean
    assignedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userCompanyAccess"]>



  export type UserCompanyAccessSelectScalar = {
    userId?: boolean
    companyId?: boolean
    assignedAt?: boolean
  }

  export type UserCompanyAccessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "companyId" | "assignedAt", ExtArgs["result"]["userCompanyAccess"]>
  export type UserCompanyAccessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    company?: boolean | CompanyDefaultArgs<ExtArgs>
  }

  export type $UserCompanyAccessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserCompanyAccess"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      company: Prisma.$CompanyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      companyId: string
      assignedAt: Date
    }, ExtArgs["result"]["userCompanyAccess"]>
    composites: {}
  }

  type UserCompanyAccessGetPayload<S extends boolean | null | undefined | UserCompanyAccessDefaultArgs> = $Result.GetResult<Prisma.$UserCompanyAccessPayload, S>

  type UserCompanyAccessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserCompanyAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCompanyAccessCountAggregateInputType | true
    }

  export interface UserCompanyAccessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserCompanyAccess'], meta: { name: 'UserCompanyAccess' } }
    /**
     * Find zero or one UserCompanyAccess that matches the filter.
     * @param {UserCompanyAccessFindUniqueArgs} args - Arguments to find a UserCompanyAccess
     * @example
     * // Get one UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserCompanyAccessFindUniqueArgs>(args: SelectSubset<T, UserCompanyAccessFindUniqueArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserCompanyAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserCompanyAccessFindUniqueOrThrowArgs} args - Arguments to find a UserCompanyAccess
     * @example
     * // Get one UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserCompanyAccessFindUniqueOrThrowArgs>(args: SelectSubset<T, UserCompanyAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCompanyAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessFindFirstArgs} args - Arguments to find a UserCompanyAccess
     * @example
     * // Get one UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserCompanyAccessFindFirstArgs>(args?: SelectSubset<T, UserCompanyAccessFindFirstArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserCompanyAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessFindFirstOrThrowArgs} args - Arguments to find a UserCompanyAccess
     * @example
     * // Get one UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserCompanyAccessFindFirstOrThrowArgs>(args?: SelectSubset<T, UserCompanyAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserCompanyAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserCompanyAccesses
     * const userCompanyAccesses = await prisma.userCompanyAccess.findMany()
     * 
     * // Get first 10 UserCompanyAccesses
     * const userCompanyAccesses = await prisma.userCompanyAccess.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userCompanyAccessWithUserIdOnly = await prisma.userCompanyAccess.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserCompanyAccessFindManyArgs>(args?: SelectSubset<T, UserCompanyAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserCompanyAccess.
     * @param {UserCompanyAccessCreateArgs} args - Arguments to create a UserCompanyAccess.
     * @example
     * // Create one UserCompanyAccess
     * const UserCompanyAccess = await prisma.userCompanyAccess.create({
     *   data: {
     *     // ... data to create a UserCompanyAccess
     *   }
     * })
     * 
     */
    create<T extends UserCompanyAccessCreateArgs>(args: SelectSubset<T, UserCompanyAccessCreateArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserCompanyAccesses.
     * @param {UserCompanyAccessCreateManyArgs} args - Arguments to create many UserCompanyAccesses.
     * @example
     * // Create many UserCompanyAccesses
     * const userCompanyAccess = await prisma.userCompanyAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCompanyAccessCreateManyArgs>(args?: SelectSubset<T, UserCompanyAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserCompanyAccess.
     * @param {UserCompanyAccessDeleteArgs} args - Arguments to delete one UserCompanyAccess.
     * @example
     * // Delete one UserCompanyAccess
     * const UserCompanyAccess = await prisma.userCompanyAccess.delete({
     *   where: {
     *     // ... filter to delete one UserCompanyAccess
     *   }
     * })
     * 
     */
    delete<T extends UserCompanyAccessDeleteArgs>(args: SelectSubset<T, UserCompanyAccessDeleteArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserCompanyAccess.
     * @param {UserCompanyAccessUpdateArgs} args - Arguments to update one UserCompanyAccess.
     * @example
     * // Update one UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserCompanyAccessUpdateArgs>(args: SelectSubset<T, UserCompanyAccessUpdateArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserCompanyAccesses.
     * @param {UserCompanyAccessDeleteManyArgs} args - Arguments to filter UserCompanyAccesses to delete.
     * @example
     * // Delete a few UserCompanyAccesses
     * const { count } = await prisma.userCompanyAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserCompanyAccessDeleteManyArgs>(args?: SelectSubset<T, UserCompanyAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserCompanyAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserCompanyAccesses
     * const userCompanyAccess = await prisma.userCompanyAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserCompanyAccessUpdateManyArgs>(args: SelectSubset<T, UserCompanyAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserCompanyAccess.
     * @param {UserCompanyAccessUpsertArgs} args - Arguments to update or create a UserCompanyAccess.
     * @example
     * // Update or create a UserCompanyAccess
     * const userCompanyAccess = await prisma.userCompanyAccess.upsert({
     *   create: {
     *     // ... data to create a UserCompanyAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserCompanyAccess we want to update
     *   }
     * })
     */
    upsert<T extends UserCompanyAccessUpsertArgs>(args: SelectSubset<T, UserCompanyAccessUpsertArgs<ExtArgs>>): Prisma__UserCompanyAccessClient<$Result.GetResult<Prisma.$UserCompanyAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserCompanyAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessCountArgs} args - Arguments to filter UserCompanyAccesses to count.
     * @example
     * // Count the number of UserCompanyAccesses
     * const count = await prisma.userCompanyAccess.count({
     *   where: {
     *     // ... the filter for the UserCompanyAccesses we want to count
     *   }
     * })
    **/
    count<T extends UserCompanyAccessCountArgs>(
      args?: Subset<T, UserCompanyAccessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCompanyAccessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserCompanyAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserCompanyAccessAggregateArgs>(args: Subset<T, UserCompanyAccessAggregateArgs>): Prisma.PrismaPromise<GetUserCompanyAccessAggregateType<T>>

    /**
     * Group by UserCompanyAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCompanyAccessGroupByArgs} args - Group by arguments.
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
      T extends UserCompanyAccessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserCompanyAccessGroupByArgs['orderBy'] }
        : { orderBy?: UserCompanyAccessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserCompanyAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserCompanyAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserCompanyAccess model
   */
  readonly fields: UserCompanyAccessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserCompanyAccess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserCompanyAccessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UserCompanyAccess model
   */
  interface UserCompanyAccessFieldRefs {
    readonly userId: FieldRef<"UserCompanyAccess", 'String'>
    readonly companyId: FieldRef<"UserCompanyAccess", 'String'>
    readonly assignedAt: FieldRef<"UserCompanyAccess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserCompanyAccess findUnique
   */
  export type UserCompanyAccessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserCompanyAccess to fetch.
     */
    where: UserCompanyAccessWhereUniqueInput
  }

  /**
   * UserCompanyAccess findUniqueOrThrow
   */
  export type UserCompanyAccessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserCompanyAccess to fetch.
     */
    where: UserCompanyAccessWhereUniqueInput
  }

  /**
   * UserCompanyAccess findFirst
   */
  export type UserCompanyAccessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserCompanyAccess to fetch.
     */
    where?: UserCompanyAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCompanyAccesses to fetch.
     */
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCompanyAccesses.
     */
    cursor?: UserCompanyAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCompanyAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCompanyAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCompanyAccesses.
     */
    distinct?: UserCompanyAccessScalarFieldEnum | UserCompanyAccessScalarFieldEnum[]
  }

  /**
   * UserCompanyAccess findFirstOrThrow
   */
  export type UserCompanyAccessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserCompanyAccess to fetch.
     */
    where?: UserCompanyAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCompanyAccesses to fetch.
     */
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserCompanyAccesses.
     */
    cursor?: UserCompanyAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCompanyAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCompanyAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCompanyAccesses.
     */
    distinct?: UserCompanyAccessScalarFieldEnum | UserCompanyAccessScalarFieldEnum[]
  }

  /**
   * UserCompanyAccess findMany
   */
  export type UserCompanyAccessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter, which UserCompanyAccesses to fetch.
     */
    where?: UserCompanyAccessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserCompanyAccesses to fetch.
     */
    orderBy?: UserCompanyAccessOrderByWithRelationInput | UserCompanyAccessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserCompanyAccesses.
     */
    cursor?: UserCompanyAccessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserCompanyAccesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserCompanyAccesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserCompanyAccesses.
     */
    distinct?: UserCompanyAccessScalarFieldEnum | UserCompanyAccessScalarFieldEnum[]
  }

  /**
   * UserCompanyAccess create
   */
  export type UserCompanyAccessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * The data needed to create a UserCompanyAccess.
     */
    data: XOR<UserCompanyAccessCreateInput, UserCompanyAccessUncheckedCreateInput>
  }

  /**
   * UserCompanyAccess createMany
   */
  export type UserCompanyAccessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserCompanyAccesses.
     */
    data: UserCompanyAccessCreateManyInput | UserCompanyAccessCreateManyInput[]
  }

  /**
   * UserCompanyAccess update
   */
  export type UserCompanyAccessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * The data needed to update a UserCompanyAccess.
     */
    data: XOR<UserCompanyAccessUpdateInput, UserCompanyAccessUncheckedUpdateInput>
    /**
     * Choose, which UserCompanyAccess to update.
     */
    where: UserCompanyAccessWhereUniqueInput
  }

  /**
   * UserCompanyAccess updateMany
   */
  export type UserCompanyAccessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserCompanyAccesses.
     */
    data: XOR<UserCompanyAccessUpdateManyMutationInput, UserCompanyAccessUncheckedUpdateManyInput>
    /**
     * Filter which UserCompanyAccesses to update
     */
    where?: UserCompanyAccessWhereInput
    /**
     * Limit how many UserCompanyAccesses to update.
     */
    limit?: number
  }

  /**
   * UserCompanyAccess upsert
   */
  export type UserCompanyAccessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * The filter to search for the UserCompanyAccess to update in case it exists.
     */
    where: UserCompanyAccessWhereUniqueInput
    /**
     * In case the UserCompanyAccess found by the `where` argument doesn't exist, create a new UserCompanyAccess with this data.
     */
    create: XOR<UserCompanyAccessCreateInput, UserCompanyAccessUncheckedCreateInput>
    /**
     * In case the UserCompanyAccess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserCompanyAccessUpdateInput, UserCompanyAccessUncheckedUpdateInput>
  }

  /**
   * UserCompanyAccess delete
   */
  export type UserCompanyAccessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
    /**
     * Filter which UserCompanyAccess to delete.
     */
    where: UserCompanyAccessWhereUniqueInput
  }

  /**
   * UserCompanyAccess deleteMany
   */
  export type UserCompanyAccessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserCompanyAccesses to delete
     */
    where?: UserCompanyAccessWhereInput
    /**
     * Limit how many UserCompanyAccesses to delete.
     */
    limit?: number
  }

  /**
   * UserCompanyAccess without action
   */
  export type UserCompanyAccessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCompanyAccess
     */
    select?: UserCompanyAccessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserCompanyAccess
     */
    omit?: UserCompanyAccessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserCompanyAccessInclude<ExtArgs> | null
  }


  /**
   * Model CompanyLedgerMapping
   */

  export type AggregateCompanyLedgerMapping = {
    _count: CompanyLedgerMappingCountAggregateOutputType | null
    _min: CompanyLedgerMappingMinAggregateOutputType | null
    _max: CompanyLedgerMappingMaxAggregateOutputType | null
  }

  export type CompanyLedgerMappingMinAggregateOutputType = {
    companyId: string | null
    ledgerId: string | null
    mappedAt: Date | null
  }

  export type CompanyLedgerMappingMaxAggregateOutputType = {
    companyId: string | null
    ledgerId: string | null
    mappedAt: Date | null
  }

  export type CompanyLedgerMappingCountAggregateOutputType = {
    companyId: number
    ledgerId: number
    mappedAt: number
    _all: number
  }


  export type CompanyLedgerMappingMinAggregateInputType = {
    companyId?: true
    ledgerId?: true
    mappedAt?: true
  }

  export type CompanyLedgerMappingMaxAggregateInputType = {
    companyId?: true
    ledgerId?: true
    mappedAt?: true
  }

  export type CompanyLedgerMappingCountAggregateInputType = {
    companyId?: true
    ledgerId?: true
    mappedAt?: true
    _all?: true
  }

  export type CompanyLedgerMappingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyLedgerMapping to aggregate.
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyLedgerMappings to fetch.
     */
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompanyLedgerMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyLedgerMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyLedgerMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CompanyLedgerMappings
    **/
    _count?: true | CompanyLedgerMappingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyLedgerMappingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyLedgerMappingMaxAggregateInputType
  }

  export type GetCompanyLedgerMappingAggregateType<T extends CompanyLedgerMappingAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanyLedgerMapping]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanyLedgerMapping[P]>
      : GetScalarType<T[P], AggregateCompanyLedgerMapping[P]>
  }




  export type CompanyLedgerMappingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CompanyLedgerMappingWhereInput
    orderBy?: CompanyLedgerMappingOrderByWithAggregationInput | CompanyLedgerMappingOrderByWithAggregationInput[]
    by: CompanyLedgerMappingScalarFieldEnum[] | CompanyLedgerMappingScalarFieldEnum
    having?: CompanyLedgerMappingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyLedgerMappingCountAggregateInputType | true
    _min?: CompanyLedgerMappingMinAggregateInputType
    _max?: CompanyLedgerMappingMaxAggregateInputType
  }

  export type CompanyLedgerMappingGroupByOutputType = {
    companyId: string
    ledgerId: string
    mappedAt: Date
    _count: CompanyLedgerMappingCountAggregateOutputType | null
    _min: CompanyLedgerMappingMinAggregateOutputType | null
    _max: CompanyLedgerMappingMaxAggregateOutputType | null
  }

  type GetCompanyLedgerMappingGroupByPayload<T extends CompanyLedgerMappingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyLedgerMappingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyLedgerMappingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyLedgerMappingGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyLedgerMappingGroupByOutputType[P]>
        }
      >
    >


  export type CompanyLedgerMappingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    companyId?: boolean
    ledgerId?: boolean
    mappedAt?: boolean
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    ledger?: boolean | LedgerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["companyLedgerMapping"]>



  export type CompanyLedgerMappingSelectScalar = {
    companyId?: boolean
    ledgerId?: boolean
    mappedAt?: boolean
  }

  export type CompanyLedgerMappingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"companyId" | "ledgerId" | "mappedAt", ExtArgs["result"]["companyLedgerMapping"]>
  export type CompanyLedgerMappingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | CompanyDefaultArgs<ExtArgs>
    ledger?: boolean | LedgerDefaultArgs<ExtArgs>
  }

  export type $CompanyLedgerMappingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CompanyLedgerMapping"
    objects: {
      company: Prisma.$CompanyPayload<ExtArgs>
      ledger: Prisma.$LedgerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      companyId: string
      ledgerId: string
      mappedAt: Date
    }, ExtArgs["result"]["companyLedgerMapping"]>
    composites: {}
  }

  type CompanyLedgerMappingGetPayload<S extends boolean | null | undefined | CompanyLedgerMappingDefaultArgs> = $Result.GetResult<Prisma.$CompanyLedgerMappingPayload, S>

  type CompanyLedgerMappingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CompanyLedgerMappingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyLedgerMappingCountAggregateInputType | true
    }

  export interface CompanyLedgerMappingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CompanyLedgerMapping'], meta: { name: 'CompanyLedgerMapping' } }
    /**
     * Find zero or one CompanyLedgerMapping that matches the filter.
     * @param {CompanyLedgerMappingFindUniqueArgs} args - Arguments to find a CompanyLedgerMapping
     * @example
     * // Get one CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CompanyLedgerMappingFindUniqueArgs>(args: SelectSubset<T, CompanyLedgerMappingFindUniqueArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CompanyLedgerMapping that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CompanyLedgerMappingFindUniqueOrThrowArgs} args - Arguments to find a CompanyLedgerMapping
     * @example
     * // Get one CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CompanyLedgerMappingFindUniqueOrThrowArgs>(args: SelectSubset<T, CompanyLedgerMappingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyLedgerMapping that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingFindFirstArgs} args - Arguments to find a CompanyLedgerMapping
     * @example
     * // Get one CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CompanyLedgerMappingFindFirstArgs>(args?: SelectSubset<T, CompanyLedgerMappingFindFirstArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CompanyLedgerMapping that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingFindFirstOrThrowArgs} args - Arguments to find a CompanyLedgerMapping
     * @example
     * // Get one CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CompanyLedgerMappingFindFirstOrThrowArgs>(args?: SelectSubset<T, CompanyLedgerMappingFindFirstOrThrowArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CompanyLedgerMappings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CompanyLedgerMappings
     * const companyLedgerMappings = await prisma.companyLedgerMapping.findMany()
     * 
     * // Get first 10 CompanyLedgerMappings
     * const companyLedgerMappings = await prisma.companyLedgerMapping.findMany({ take: 10 })
     * 
     * // Only select the `companyId`
     * const companyLedgerMappingWithCompanyIdOnly = await prisma.companyLedgerMapping.findMany({ select: { companyId: true } })
     * 
     */
    findMany<T extends CompanyLedgerMappingFindManyArgs>(args?: SelectSubset<T, CompanyLedgerMappingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CompanyLedgerMapping.
     * @param {CompanyLedgerMappingCreateArgs} args - Arguments to create a CompanyLedgerMapping.
     * @example
     * // Create one CompanyLedgerMapping
     * const CompanyLedgerMapping = await prisma.companyLedgerMapping.create({
     *   data: {
     *     // ... data to create a CompanyLedgerMapping
     *   }
     * })
     * 
     */
    create<T extends CompanyLedgerMappingCreateArgs>(args: SelectSubset<T, CompanyLedgerMappingCreateArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CompanyLedgerMappings.
     * @param {CompanyLedgerMappingCreateManyArgs} args - Arguments to create many CompanyLedgerMappings.
     * @example
     * // Create many CompanyLedgerMappings
     * const companyLedgerMapping = await prisma.companyLedgerMapping.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CompanyLedgerMappingCreateManyArgs>(args?: SelectSubset<T, CompanyLedgerMappingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CompanyLedgerMapping.
     * @param {CompanyLedgerMappingDeleteArgs} args - Arguments to delete one CompanyLedgerMapping.
     * @example
     * // Delete one CompanyLedgerMapping
     * const CompanyLedgerMapping = await prisma.companyLedgerMapping.delete({
     *   where: {
     *     // ... filter to delete one CompanyLedgerMapping
     *   }
     * })
     * 
     */
    delete<T extends CompanyLedgerMappingDeleteArgs>(args: SelectSubset<T, CompanyLedgerMappingDeleteArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CompanyLedgerMapping.
     * @param {CompanyLedgerMappingUpdateArgs} args - Arguments to update one CompanyLedgerMapping.
     * @example
     * // Update one CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CompanyLedgerMappingUpdateArgs>(args: SelectSubset<T, CompanyLedgerMappingUpdateArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CompanyLedgerMappings.
     * @param {CompanyLedgerMappingDeleteManyArgs} args - Arguments to filter CompanyLedgerMappings to delete.
     * @example
     * // Delete a few CompanyLedgerMappings
     * const { count } = await prisma.companyLedgerMapping.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CompanyLedgerMappingDeleteManyArgs>(args?: SelectSubset<T, CompanyLedgerMappingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CompanyLedgerMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CompanyLedgerMappings
     * const companyLedgerMapping = await prisma.companyLedgerMapping.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CompanyLedgerMappingUpdateManyArgs>(args: SelectSubset<T, CompanyLedgerMappingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CompanyLedgerMapping.
     * @param {CompanyLedgerMappingUpsertArgs} args - Arguments to update or create a CompanyLedgerMapping.
     * @example
     * // Update or create a CompanyLedgerMapping
     * const companyLedgerMapping = await prisma.companyLedgerMapping.upsert({
     *   create: {
     *     // ... data to create a CompanyLedgerMapping
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CompanyLedgerMapping we want to update
     *   }
     * })
     */
    upsert<T extends CompanyLedgerMappingUpsertArgs>(args: SelectSubset<T, CompanyLedgerMappingUpsertArgs<ExtArgs>>): Prisma__CompanyLedgerMappingClient<$Result.GetResult<Prisma.$CompanyLedgerMappingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CompanyLedgerMappings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingCountArgs} args - Arguments to filter CompanyLedgerMappings to count.
     * @example
     * // Count the number of CompanyLedgerMappings
     * const count = await prisma.companyLedgerMapping.count({
     *   where: {
     *     // ... the filter for the CompanyLedgerMappings we want to count
     *   }
     * })
    **/
    count<T extends CompanyLedgerMappingCountArgs>(
      args?: Subset<T, CompanyLedgerMappingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyLedgerMappingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CompanyLedgerMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CompanyLedgerMappingAggregateArgs>(args: Subset<T, CompanyLedgerMappingAggregateArgs>): Prisma.PrismaPromise<GetCompanyLedgerMappingAggregateType<T>>

    /**
     * Group by CompanyLedgerMapping.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyLedgerMappingGroupByArgs} args - Group by arguments.
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
      T extends CompanyLedgerMappingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompanyLedgerMappingGroupByArgs['orderBy'] }
        : { orderBy?: CompanyLedgerMappingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CompanyLedgerMappingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyLedgerMappingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CompanyLedgerMapping model
   */
  readonly fields: CompanyLedgerMappingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CompanyLedgerMapping.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CompanyLedgerMappingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends CompanyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CompanyDefaultArgs<ExtArgs>>): Prisma__CompanyClient<$Result.GetResult<Prisma.$CompanyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    ledger<T extends LedgerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LedgerDefaultArgs<ExtArgs>>): Prisma__LedgerClient<$Result.GetResult<Prisma.$LedgerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the CompanyLedgerMapping model
   */
  interface CompanyLedgerMappingFieldRefs {
    readonly companyId: FieldRef<"CompanyLedgerMapping", 'String'>
    readonly ledgerId: FieldRef<"CompanyLedgerMapping", 'String'>
    readonly mappedAt: FieldRef<"CompanyLedgerMapping", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CompanyLedgerMapping findUnique
   */
  export type CompanyLedgerMappingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter, which CompanyLedgerMapping to fetch.
     */
    where: CompanyLedgerMappingWhereUniqueInput
  }

  /**
   * CompanyLedgerMapping findUniqueOrThrow
   */
  export type CompanyLedgerMappingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter, which CompanyLedgerMapping to fetch.
     */
    where: CompanyLedgerMappingWhereUniqueInput
  }

  /**
   * CompanyLedgerMapping findFirst
   */
  export type CompanyLedgerMappingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter, which CompanyLedgerMapping to fetch.
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyLedgerMappings to fetch.
     */
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyLedgerMappings.
     */
    cursor?: CompanyLedgerMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyLedgerMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyLedgerMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyLedgerMappings.
     */
    distinct?: CompanyLedgerMappingScalarFieldEnum | CompanyLedgerMappingScalarFieldEnum[]
  }

  /**
   * CompanyLedgerMapping findFirstOrThrow
   */
  export type CompanyLedgerMappingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter, which CompanyLedgerMapping to fetch.
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyLedgerMappings to fetch.
     */
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CompanyLedgerMappings.
     */
    cursor?: CompanyLedgerMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyLedgerMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyLedgerMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyLedgerMappings.
     */
    distinct?: CompanyLedgerMappingScalarFieldEnum | CompanyLedgerMappingScalarFieldEnum[]
  }

  /**
   * CompanyLedgerMapping findMany
   */
  export type CompanyLedgerMappingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter, which CompanyLedgerMappings to fetch.
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CompanyLedgerMappings to fetch.
     */
    orderBy?: CompanyLedgerMappingOrderByWithRelationInput | CompanyLedgerMappingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CompanyLedgerMappings.
     */
    cursor?: CompanyLedgerMappingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CompanyLedgerMappings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CompanyLedgerMappings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CompanyLedgerMappings.
     */
    distinct?: CompanyLedgerMappingScalarFieldEnum | CompanyLedgerMappingScalarFieldEnum[]
  }

  /**
   * CompanyLedgerMapping create
   */
  export type CompanyLedgerMappingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * The data needed to create a CompanyLedgerMapping.
     */
    data: XOR<CompanyLedgerMappingCreateInput, CompanyLedgerMappingUncheckedCreateInput>
  }

  /**
   * CompanyLedgerMapping createMany
   */
  export type CompanyLedgerMappingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CompanyLedgerMappings.
     */
    data: CompanyLedgerMappingCreateManyInput | CompanyLedgerMappingCreateManyInput[]
  }

  /**
   * CompanyLedgerMapping update
   */
  export type CompanyLedgerMappingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * The data needed to update a CompanyLedgerMapping.
     */
    data: XOR<CompanyLedgerMappingUpdateInput, CompanyLedgerMappingUncheckedUpdateInput>
    /**
     * Choose, which CompanyLedgerMapping to update.
     */
    where: CompanyLedgerMappingWhereUniqueInput
  }

  /**
   * CompanyLedgerMapping updateMany
   */
  export type CompanyLedgerMappingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CompanyLedgerMappings.
     */
    data: XOR<CompanyLedgerMappingUpdateManyMutationInput, CompanyLedgerMappingUncheckedUpdateManyInput>
    /**
     * Filter which CompanyLedgerMappings to update
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * Limit how many CompanyLedgerMappings to update.
     */
    limit?: number
  }

  /**
   * CompanyLedgerMapping upsert
   */
  export type CompanyLedgerMappingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * The filter to search for the CompanyLedgerMapping to update in case it exists.
     */
    where: CompanyLedgerMappingWhereUniqueInput
    /**
     * In case the CompanyLedgerMapping found by the `where` argument doesn't exist, create a new CompanyLedgerMapping with this data.
     */
    create: XOR<CompanyLedgerMappingCreateInput, CompanyLedgerMappingUncheckedCreateInput>
    /**
     * In case the CompanyLedgerMapping was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompanyLedgerMappingUpdateInput, CompanyLedgerMappingUncheckedUpdateInput>
  }

  /**
   * CompanyLedgerMapping delete
   */
  export type CompanyLedgerMappingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
    /**
     * Filter which CompanyLedgerMapping to delete.
     */
    where: CompanyLedgerMappingWhereUniqueInput
  }

  /**
   * CompanyLedgerMapping deleteMany
   */
  export type CompanyLedgerMappingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CompanyLedgerMappings to delete
     */
    where?: CompanyLedgerMappingWhereInput
    /**
     * Limit how many CompanyLedgerMappings to delete.
     */
    limit?: number
  }

  /**
   * CompanyLedgerMapping without action
   */
  export type CompanyLedgerMappingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyLedgerMapping
     */
    select?: CompanyLedgerMappingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CompanyLedgerMapping
     */
    omit?: CompanyLedgerMappingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CompanyLedgerMappingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable',
    Snapshot: 'Snapshot'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    companyCode: 'companyCode',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const LedgerScalarFieldEnum: {
    id: 'id',
    ledger_name: 'ledger_name',
    ledger_details: 'ledger_details',
    isActive: 'isActive',
    openingBalance: 'openingBalance',
    openingBalanceType: 'openingBalanceType',
    groupId: 'groupId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LedgerScalarFieldEnum = (typeof LedgerScalarFieldEnum)[keyof typeof LedgerScalarFieldEnum]


  export const PaymentModeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    category: 'category',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentModeScalarFieldEnum = (typeof PaymentModeScalarFieldEnum)[keyof typeof PaymentModeScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    voucherNo: 'voucherNo',
    type: 'type',
    companyId: 'companyId',
    ledgerId: 'ledgerId',
    destinationCompanyId: 'destinationCompanyId',
    amount: 'amount',
    paymentModeId: 'paymentModeId',
    businessDate: 'businessDate',
    particulars: 'particulars',
    remarks: 'remarks',
    approvedBy: 'approvedBy',
    approvedOver: 'approvedOver',
    attachmentUrl: 'attachmentUrl',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const UserCompanyAccessScalarFieldEnum: {
    userId: 'userId',
    companyId: 'companyId',
    assignedAt: 'assignedAt'
  };

  export type UserCompanyAccessScalarFieldEnum = (typeof UserCompanyAccessScalarFieldEnum)[keyof typeof UserCompanyAccessScalarFieldEnum]


  export const CompanyLedgerMappingScalarFieldEnum: {
    companyId: 'companyId',
    ledgerId: 'ledgerId',
    mappedAt: 'mappedAt'
  };

  export type CompanyLedgerMappingScalarFieldEnum = (typeof CompanyLedgerMappingScalarFieldEnum)[keyof typeof CompanyLedgerMappingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    companyAccess?: UserCompanyAccessListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    companyAccess?: UserCompanyAccessOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    companyAccess?: UserCompanyAccessListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CompanyWhereInput = {
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    id?: StringFilter<"Company"> | string
    companyCode?: StringFilter<"Company"> | string
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserCompanyAccessListRelationFilter
    ledgers?: CompanyLedgerMappingListRelationFilter
    transactions?: TransactionListRelationFilter
    incomingTransfers?: TransactionListRelationFilter
  }

  export type CompanyOrderByWithRelationInput = {
    id?: SortOrder
    companyCode?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserCompanyAccessOrderByRelationAggregateInput
    ledgers?: CompanyLedgerMappingOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    incomingTransfers?: TransactionOrderByRelationAggregateInput
  }

  export type CompanyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    companyCode?: string
    AND?: CompanyWhereInput | CompanyWhereInput[]
    OR?: CompanyWhereInput[]
    NOT?: CompanyWhereInput | CompanyWhereInput[]
    name?: StringFilter<"Company"> | string
    createdAt?: DateTimeFilter<"Company"> | Date | string
    updatedAt?: DateTimeFilter<"Company"> | Date | string
    users?: UserCompanyAccessListRelationFilter
    ledgers?: CompanyLedgerMappingListRelationFilter
    transactions?: TransactionListRelationFilter
    incomingTransfers?: TransactionListRelationFilter
  }, "id" | "companyCode">

  export type CompanyOrderByWithAggregationInput = {
    id?: SortOrder
    companyCode?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompanyCountOrderByAggregateInput
    _max?: CompanyMaxOrderByAggregateInput
    _min?: CompanyMinOrderByAggregateInput
  }

  export type CompanyScalarWhereWithAggregatesInput = {
    AND?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    OR?: CompanyScalarWhereWithAggregatesInput[]
    NOT?: CompanyScalarWhereWithAggregatesInput | CompanyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Company"> | string
    companyCode?: StringWithAggregatesFilter<"Company"> | string
    name?: StringWithAggregatesFilter<"Company"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Company"> | Date | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    id?: StringFilter<"Group"> | string
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    ledgers?: LedgerListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ledgers?: LedgerOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    name?: StringFilter<"Group"> | string
    createdAt?: DateTimeFilter<"Group"> | Date | string
    updatedAt?: DateTimeFilter<"Group"> | Date | string
    ledgers?: LedgerListRelationFilter
  }, "id">

  export type GroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Group"> | string
    name?: StringWithAggregatesFilter<"Group"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Group"> | Date | string
  }

  export type LedgerWhereInput = {
    AND?: LedgerWhereInput | LedgerWhereInput[]
    OR?: LedgerWhereInput[]
    NOT?: LedgerWhereInput | LedgerWhereInput[]
    id?: StringFilter<"Ledger"> | string
    ledger_name?: StringFilter<"Ledger"> | string
    ledger_details?: StringNullableFilter<"Ledger"> | string | null
    isActive?: BoolFilter<"Ledger"> | boolean
    openingBalance?: FloatFilter<"Ledger"> | number
    openingBalanceType?: StringFilter<"Ledger"> | string
    groupId?: StringFilter<"Ledger"> | string
    createdAt?: DateTimeFilter<"Ledger"> | Date | string
    updatedAt?: DateTimeFilter<"Ledger"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    companies?: CompanyLedgerMappingListRelationFilter
    transactions?: TransactionListRelationFilter
  }

  export type LedgerOrderByWithRelationInput = {
    id?: SortOrder
    ledger_name?: SortOrder
    ledger_details?: SortOrderInput | SortOrder
    isActive?: SortOrder
    openingBalance?: SortOrder
    openingBalanceType?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    group?: GroupOrderByWithRelationInput
    companies?: CompanyLedgerMappingOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type LedgerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LedgerWhereInput | LedgerWhereInput[]
    OR?: LedgerWhereInput[]
    NOT?: LedgerWhereInput | LedgerWhereInput[]
    ledger_name?: StringFilter<"Ledger"> | string
    ledger_details?: StringNullableFilter<"Ledger"> | string | null
    isActive?: BoolFilter<"Ledger"> | boolean
    openingBalance?: FloatFilter<"Ledger"> | number
    openingBalanceType?: StringFilter<"Ledger"> | string
    groupId?: StringFilter<"Ledger"> | string
    createdAt?: DateTimeFilter<"Ledger"> | Date | string
    updatedAt?: DateTimeFilter<"Ledger"> | Date | string
    group?: XOR<GroupScalarRelationFilter, GroupWhereInput>
    companies?: CompanyLedgerMappingListRelationFilter
    transactions?: TransactionListRelationFilter
  }, "id">

  export type LedgerOrderByWithAggregationInput = {
    id?: SortOrder
    ledger_name?: SortOrder
    ledger_details?: SortOrderInput | SortOrder
    isActive?: SortOrder
    openingBalance?: SortOrder
    openingBalanceType?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LedgerCountOrderByAggregateInput
    _avg?: LedgerAvgOrderByAggregateInput
    _max?: LedgerMaxOrderByAggregateInput
    _min?: LedgerMinOrderByAggregateInput
    _sum?: LedgerSumOrderByAggregateInput
  }

  export type LedgerScalarWhereWithAggregatesInput = {
    AND?: LedgerScalarWhereWithAggregatesInput | LedgerScalarWhereWithAggregatesInput[]
    OR?: LedgerScalarWhereWithAggregatesInput[]
    NOT?: LedgerScalarWhereWithAggregatesInput | LedgerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Ledger"> | string
    ledger_name?: StringWithAggregatesFilter<"Ledger"> | string
    ledger_details?: StringNullableWithAggregatesFilter<"Ledger"> | string | null
    isActive?: BoolWithAggregatesFilter<"Ledger"> | boolean
    openingBalance?: FloatWithAggregatesFilter<"Ledger"> | number
    openingBalanceType?: StringWithAggregatesFilter<"Ledger"> | string
    groupId?: StringWithAggregatesFilter<"Ledger"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Ledger"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ledger"> | Date | string
  }

  export type PaymentModeWhereInput = {
    AND?: PaymentModeWhereInput | PaymentModeWhereInput[]
    OR?: PaymentModeWhereInput[]
    NOT?: PaymentModeWhereInput | PaymentModeWhereInput[]
    id?: StringFilter<"PaymentMode"> | string
    name?: StringFilter<"PaymentMode"> | string
    category?: StringFilter<"PaymentMode"> | string
    isActive?: BoolFilter<"PaymentMode"> | boolean
    createdAt?: DateTimeFilter<"PaymentMode"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentMode"> | Date | string
    transactions?: TransactionListRelationFilter
  }

  export type PaymentModeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type PaymentModeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PaymentModeWhereInput | PaymentModeWhereInput[]
    OR?: PaymentModeWhereInput[]
    NOT?: PaymentModeWhereInput | PaymentModeWhereInput[]
    category?: StringFilter<"PaymentMode"> | string
    isActive?: BoolFilter<"PaymentMode"> | boolean
    createdAt?: DateTimeFilter<"PaymentMode"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentMode"> | Date | string
    transactions?: TransactionListRelationFilter
  }, "id" | "name">

  export type PaymentModeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentModeCountOrderByAggregateInput
    _max?: PaymentModeMaxOrderByAggregateInput
    _min?: PaymentModeMinOrderByAggregateInput
  }

  export type PaymentModeScalarWhereWithAggregatesInput = {
    AND?: PaymentModeScalarWhereWithAggregatesInput | PaymentModeScalarWhereWithAggregatesInput[]
    OR?: PaymentModeScalarWhereWithAggregatesInput[]
    NOT?: PaymentModeScalarWhereWithAggregatesInput | PaymentModeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentMode"> | string
    name?: StringWithAggregatesFilter<"PaymentMode"> | string
    category?: StringWithAggregatesFilter<"PaymentMode"> | string
    isActive?: BoolWithAggregatesFilter<"PaymentMode"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PaymentMode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentMode"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    voucherNo?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    companyId?: StringFilter<"Transaction"> | string
    ledgerId?: StringNullableFilter<"Transaction"> | string | null
    destinationCompanyId?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    paymentModeId?: StringFilter<"Transaction"> | string
    businessDate?: DateTimeFilter<"Transaction"> | Date | string
    particulars?: StringFilter<"Transaction"> | string
    remarks?: StringNullableFilter<"Transaction"> | string | null
    approvedBy?: StringNullableFilter<"Transaction"> | string | null
    approvedOver?: StringNullableFilter<"Transaction"> | string | null
    attachmentUrl?: StringNullableFilter<"Transaction"> | string | null
    createdById?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    ledger?: XOR<LedgerNullableScalarRelationFilter, LedgerWhereInput> | null
    destinationCompany?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    paymentMode?: XOR<PaymentModeScalarRelationFilter, PaymentModeWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    type?: SortOrder
    companyId?: SortOrder
    ledgerId?: SortOrderInput | SortOrder
    destinationCompanyId?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentModeId?: SortOrder
    businessDate?: SortOrder
    particulars?: SortOrder
    remarks?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedOver?: SortOrderInput | SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    ledger?: LedgerOrderByWithRelationInput
    destinationCompany?: CompanyOrderByWithRelationInput
    paymentMode?: PaymentModeOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    voucherNo?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    type?: StringFilter<"Transaction"> | string
    companyId?: StringFilter<"Transaction"> | string
    ledgerId?: StringNullableFilter<"Transaction"> | string | null
    destinationCompanyId?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    paymentModeId?: StringFilter<"Transaction"> | string
    businessDate?: DateTimeFilter<"Transaction"> | Date | string
    particulars?: StringFilter<"Transaction"> | string
    remarks?: StringNullableFilter<"Transaction"> | string | null
    approvedBy?: StringNullableFilter<"Transaction"> | string | null
    approvedOver?: StringNullableFilter<"Transaction"> | string | null
    attachmentUrl?: StringNullableFilter<"Transaction"> | string | null
    createdById?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    ledger?: XOR<LedgerNullableScalarRelationFilter, LedgerWhereInput> | null
    destinationCompany?: XOR<CompanyNullableScalarRelationFilter, CompanyWhereInput> | null
    paymentMode?: XOR<PaymentModeScalarRelationFilter, PaymentModeWhereInput>
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "voucherNo">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    type?: SortOrder
    companyId?: SortOrder
    ledgerId?: SortOrderInput | SortOrder
    destinationCompanyId?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentModeId?: SortOrder
    businessDate?: SortOrder
    particulars?: SortOrder
    remarks?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedOver?: SortOrderInput | SortOrder
    attachmentUrl?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    voucherNo?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    companyId?: StringWithAggregatesFilter<"Transaction"> | string
    ledgerId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    destinationCompanyId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    paymentModeId?: StringWithAggregatesFilter<"Transaction"> | string
    businessDate?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    particulars?: StringWithAggregatesFilter<"Transaction"> | string
    remarks?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    approvedOver?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    attachmentUrl?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    createdById?: StringWithAggregatesFilter<"Transaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type UserCompanyAccessWhereInput = {
    AND?: UserCompanyAccessWhereInput | UserCompanyAccessWhereInput[]
    OR?: UserCompanyAccessWhereInput[]
    NOT?: UserCompanyAccessWhereInput | UserCompanyAccessWhereInput[]
    userId?: StringFilter<"UserCompanyAccess"> | string
    companyId?: StringFilter<"UserCompanyAccess"> | string
    assignedAt?: DateTimeFilter<"UserCompanyAccess"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }

  export type UserCompanyAccessOrderByWithRelationInput = {
    userId?: SortOrder
    companyId?: SortOrder
    assignedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    company?: CompanyOrderByWithRelationInput
  }

  export type UserCompanyAccessWhereUniqueInput = Prisma.AtLeast<{
    userId_companyId?: UserCompanyAccessUserIdCompanyIdCompoundUniqueInput
    AND?: UserCompanyAccessWhereInput | UserCompanyAccessWhereInput[]
    OR?: UserCompanyAccessWhereInput[]
    NOT?: UserCompanyAccessWhereInput | UserCompanyAccessWhereInput[]
    userId?: StringFilter<"UserCompanyAccess"> | string
    companyId?: StringFilter<"UserCompanyAccess"> | string
    assignedAt?: DateTimeFilter<"UserCompanyAccess"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
  }, "userId_companyId">

  export type UserCompanyAccessOrderByWithAggregationInput = {
    userId?: SortOrder
    companyId?: SortOrder
    assignedAt?: SortOrder
    _count?: UserCompanyAccessCountOrderByAggregateInput
    _max?: UserCompanyAccessMaxOrderByAggregateInput
    _min?: UserCompanyAccessMinOrderByAggregateInput
  }

  export type UserCompanyAccessScalarWhereWithAggregatesInput = {
    AND?: UserCompanyAccessScalarWhereWithAggregatesInput | UserCompanyAccessScalarWhereWithAggregatesInput[]
    OR?: UserCompanyAccessScalarWhereWithAggregatesInput[]
    NOT?: UserCompanyAccessScalarWhereWithAggregatesInput | UserCompanyAccessScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"UserCompanyAccess"> | string
    companyId?: StringWithAggregatesFilter<"UserCompanyAccess"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"UserCompanyAccess"> | Date | string
  }

  export type CompanyLedgerMappingWhereInput = {
    AND?: CompanyLedgerMappingWhereInput | CompanyLedgerMappingWhereInput[]
    OR?: CompanyLedgerMappingWhereInput[]
    NOT?: CompanyLedgerMappingWhereInput | CompanyLedgerMappingWhereInput[]
    companyId?: StringFilter<"CompanyLedgerMapping"> | string
    ledgerId?: StringFilter<"CompanyLedgerMapping"> | string
    mappedAt?: DateTimeFilter<"CompanyLedgerMapping"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    ledger?: XOR<LedgerScalarRelationFilter, LedgerWhereInput>
  }

  export type CompanyLedgerMappingOrderByWithRelationInput = {
    companyId?: SortOrder
    ledgerId?: SortOrder
    mappedAt?: SortOrder
    company?: CompanyOrderByWithRelationInput
    ledger?: LedgerOrderByWithRelationInput
  }

  export type CompanyLedgerMappingWhereUniqueInput = Prisma.AtLeast<{
    companyId_ledgerId?: CompanyLedgerMappingCompanyIdLedgerIdCompoundUniqueInput
    AND?: CompanyLedgerMappingWhereInput | CompanyLedgerMappingWhereInput[]
    OR?: CompanyLedgerMappingWhereInput[]
    NOT?: CompanyLedgerMappingWhereInput | CompanyLedgerMappingWhereInput[]
    companyId?: StringFilter<"CompanyLedgerMapping"> | string
    ledgerId?: StringFilter<"CompanyLedgerMapping"> | string
    mappedAt?: DateTimeFilter<"CompanyLedgerMapping"> | Date | string
    company?: XOR<CompanyScalarRelationFilter, CompanyWhereInput>
    ledger?: XOR<LedgerScalarRelationFilter, LedgerWhereInput>
  }, "companyId_ledgerId">

  export type CompanyLedgerMappingOrderByWithAggregationInput = {
    companyId?: SortOrder
    ledgerId?: SortOrder
    mappedAt?: SortOrder
    _count?: CompanyLedgerMappingCountOrderByAggregateInput
    _max?: CompanyLedgerMappingMaxOrderByAggregateInput
    _min?: CompanyLedgerMappingMinOrderByAggregateInput
  }

  export type CompanyLedgerMappingScalarWhereWithAggregatesInput = {
    AND?: CompanyLedgerMappingScalarWhereWithAggregatesInput | CompanyLedgerMappingScalarWhereWithAggregatesInput[]
    OR?: CompanyLedgerMappingScalarWhereWithAggregatesInput[]
    NOT?: CompanyLedgerMappingScalarWhereWithAggregatesInput | CompanyLedgerMappingScalarWhereWithAggregatesInput[]
    companyId?: StringWithAggregatesFilter<"CompanyLedgerMapping"> | string
    ledgerId?: StringWithAggregatesFilter<"CompanyLedgerMapping"> | string
    mappedAt?: DateTimeWithAggregatesFilter<"CompanyLedgerMapping"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyAccess?: UserCompanyAccessCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyAccess?: UserCompanyAccessUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyAccess?: UserCompanyAccessUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyAccess?: UserCompanyAccessUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyCreateInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingCreateNestedManyWithoutCompanyInput
    transactions?: TransactionCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyUncheckedCreateInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessUncheckedCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutCompanyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionUncheckedCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUncheckedUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUncheckedUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyCreateManyInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgers?: LedgerCreateNestedManyWithoutGroupInput
  }

  export type GroupUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgers?: LedgerUncheckedCreateNestedManyWithoutGroupInput
  }

  export type GroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgers?: LedgerUpdateManyWithoutGroupNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgers?: LedgerUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type GroupCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerCreateInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutLedgersInput
    companies?: CompanyLedgerMappingCreateNestedManyWithoutLedgerInput
    transactions?: TransactionCreateNestedManyWithoutLedgerInput
  }

  export type LedgerUncheckedCreateInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutLedgerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLedgerInput
  }

  export type LedgerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutLedgersNestedInput
    companies?: CompanyLedgerMappingUpdateManyWithoutLedgerNestedInput
    transactions?: TransactionUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerCreateManyInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LedgerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentModeCreateInput = {
    id?: string
    name: string
    category: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutPaymentModeInput
  }

  export type PaymentModeUncheckedCreateInput = {
    id?: string
    name: string
    category: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutPaymentModeInput
  }

  export type PaymentModeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutPaymentModeNestedInput
  }

  export type PaymentModeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutPaymentModeNestedInput
  }

  export type PaymentModeCreateManyInput = {
    id?: string
    name: string
    category: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentModeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentModeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutTransactionsInput
    ledger?: LedgerCreateNestedOneWithoutTransactionsInput
    destinationCompany?: CompanyCreateNestedOneWithoutIncomingTransfersInput
    paymentMode: PaymentModeCreateNestedOneWithoutTransactionsInput
    createdBy: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTransactionsNestedInput
    ledger?: LedgerUpdateOneWithoutTransactionsNestedInput
    destinationCompany?: CompanyUpdateOneWithoutIncomingTransfersNestedInput
    paymentMode?: PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessCreateInput = {
    assignedAt?: Date | string
    user: UserCreateNestedOneWithoutCompanyAccessInput
    company: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserCompanyAccessUncheckedCreateInput = {
    userId: string
    companyId: string
    assignedAt?: Date | string
  }

  export type UserCompanyAccessUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompanyAccessNestedInput
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserCompanyAccessUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessCreateManyInput = {
    userId: string
    companyId: string
    assignedAt?: Date | string
  }

  export type UserCompanyAccessUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingCreateInput = {
    mappedAt?: Date | string
    company: CompanyCreateNestedOneWithoutLedgersInput
    ledger: LedgerCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyLedgerMappingUncheckedCreateInput = {
    companyId: string
    ledgerId: string
    mappedAt?: Date | string
  }

  export type CompanyLedgerMappingUpdateInput = {
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutLedgersNestedInput
    ledger?: LedgerUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyLedgerMappingUncheckedUpdateInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingCreateManyInput = {
    companyId: string
    ledgerId: string
    mappedAt?: Date | string
  }

  export type CompanyLedgerMappingUpdateManyMutationInput = {
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingUncheckedUpdateManyInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserCompanyAccessListRelationFilter = {
    every?: UserCompanyAccessWhereInput
    some?: UserCompanyAccessWhereInput
    none?: UserCompanyAccessWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type UserCompanyAccessOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CompanyLedgerMappingListRelationFilter = {
    every?: CompanyLedgerMappingWhereInput
    some?: CompanyLedgerMappingWhereInput
    none?: CompanyLedgerMappingWhereInput
  }

  export type CompanyLedgerMappingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompanyCountOrderByAggregateInput = {
    id?: SortOrder
    companyCode?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMaxOrderByAggregateInput = {
    id?: SortOrder
    companyCode?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyMinOrderByAggregateInput = {
    id?: SortOrder
    companyCode?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LedgerListRelationFilter = {
    every?: LedgerWhereInput
    some?: LedgerWhereInput
    none?: LedgerWhereInput
  }

  export type LedgerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LedgerCountOrderByAggregateInput = {
    id?: SortOrder
    ledger_name?: SortOrder
    ledger_details?: SortOrder
    isActive?: SortOrder
    openingBalance?: SortOrder
    openingBalanceType?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LedgerAvgOrderByAggregateInput = {
    openingBalance?: SortOrder
  }

  export type LedgerMaxOrderByAggregateInput = {
    id?: SortOrder
    ledger_name?: SortOrder
    ledger_details?: SortOrder
    isActive?: SortOrder
    openingBalance?: SortOrder
    openingBalanceType?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LedgerMinOrderByAggregateInput = {
    id?: SortOrder
    ledger_name?: SortOrder
    ledger_details?: SortOrder
    isActive?: SortOrder
    openingBalance?: SortOrder
    openingBalanceType?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LedgerSumOrderByAggregateInput = {
    openingBalance?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PaymentModeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentModeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentModeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    category?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompanyScalarRelationFilter = {
    is?: CompanyWhereInput
    isNot?: CompanyWhereInput
  }

  export type LedgerNullableScalarRelationFilter = {
    is?: LedgerWhereInput | null
    isNot?: LedgerWhereInput | null
  }

  export type CompanyNullableScalarRelationFilter = {
    is?: CompanyWhereInput | null
    isNot?: CompanyWhereInput | null
  }

  export type PaymentModeScalarRelationFilter = {
    is?: PaymentModeWhereInput
    isNot?: PaymentModeWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    type?: SortOrder
    companyId?: SortOrder
    ledgerId?: SortOrder
    destinationCompanyId?: SortOrder
    amount?: SortOrder
    paymentModeId?: SortOrder
    businessDate?: SortOrder
    particulars?: SortOrder
    remarks?: SortOrder
    approvedBy?: SortOrder
    approvedOver?: SortOrder
    attachmentUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    type?: SortOrder
    companyId?: SortOrder
    ledgerId?: SortOrder
    destinationCompanyId?: SortOrder
    amount?: SortOrder
    paymentModeId?: SortOrder
    businessDate?: SortOrder
    particulars?: SortOrder
    remarks?: SortOrder
    approvedBy?: SortOrder
    approvedOver?: SortOrder
    attachmentUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    voucherNo?: SortOrder
    type?: SortOrder
    companyId?: SortOrder
    ledgerId?: SortOrder
    destinationCompanyId?: SortOrder
    amount?: SortOrder
    paymentModeId?: SortOrder
    businessDate?: SortOrder
    particulars?: SortOrder
    remarks?: SortOrder
    approvedBy?: SortOrder
    approvedOver?: SortOrder
    attachmentUrl?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type UserCompanyAccessUserIdCompanyIdCompoundUniqueInput = {
    userId: string
    companyId: string
  }

  export type UserCompanyAccessCountOrderByAggregateInput = {
    userId?: SortOrder
    companyId?: SortOrder
    assignedAt?: SortOrder
  }

  export type UserCompanyAccessMaxOrderByAggregateInput = {
    userId?: SortOrder
    companyId?: SortOrder
    assignedAt?: SortOrder
  }

  export type UserCompanyAccessMinOrderByAggregateInput = {
    userId?: SortOrder
    companyId?: SortOrder
    assignedAt?: SortOrder
  }

  export type LedgerScalarRelationFilter = {
    is?: LedgerWhereInput
    isNot?: LedgerWhereInput
  }

  export type CompanyLedgerMappingCompanyIdLedgerIdCompoundUniqueInput = {
    companyId: string
    ledgerId: string
  }

  export type CompanyLedgerMappingCountOrderByAggregateInput = {
    companyId?: SortOrder
    ledgerId?: SortOrder
    mappedAt?: SortOrder
  }

  export type CompanyLedgerMappingMaxOrderByAggregateInput = {
    companyId?: SortOrder
    ledgerId?: SortOrder
    mappedAt?: SortOrder
  }

  export type CompanyLedgerMappingMinOrderByAggregateInput = {
    companyId?: SortOrder
    ledgerId?: SortOrder
    mappedAt?: SortOrder
  }

  export type UserCompanyAccessCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput> | UserCompanyAccessCreateWithoutUserInput[] | UserCompanyAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutUserInput | UserCompanyAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserCompanyAccessCreateManyUserInputEnvelope
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput> | TransactionCreateWithoutCreatedByInput[] | TransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatedByInput | TransactionCreateOrConnectWithoutCreatedByInput[]
    createMany?: TransactionCreateManyCreatedByInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserCompanyAccessUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput> | UserCompanyAccessCreateWithoutUserInput[] | UserCompanyAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutUserInput | UserCompanyAccessCreateOrConnectWithoutUserInput[]
    createMany?: UserCompanyAccessCreateManyUserInputEnvelope
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput> | TransactionCreateWithoutCreatedByInput[] | TransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatedByInput | TransactionCreateOrConnectWithoutCreatedByInput[]
    createMany?: TransactionCreateManyCreatedByInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserCompanyAccessUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput> | UserCompanyAccessCreateWithoutUserInput[] | UserCompanyAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutUserInput | UserCompanyAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserCompanyAccessUpsertWithWhereUniqueWithoutUserInput | UserCompanyAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCompanyAccessCreateManyUserInputEnvelope
    set?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    disconnect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    delete?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    update?: UserCompanyAccessUpdateWithWhereUniqueWithoutUserInput | UserCompanyAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCompanyAccessUpdateManyWithWhereWithoutUserInput | UserCompanyAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput> | TransactionCreateWithoutCreatedByInput[] | TransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatedByInput | TransactionCreateOrConnectWithoutCreatedByInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCreatedByInput | TransactionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TransactionCreateManyCreatedByInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCreatedByInput | TransactionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCreatedByInput | TransactionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCompanyAccessUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput> | UserCompanyAccessCreateWithoutUserInput[] | UserCompanyAccessUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutUserInput | UserCompanyAccessCreateOrConnectWithoutUserInput[]
    upsert?: UserCompanyAccessUpsertWithWhereUniqueWithoutUserInput | UserCompanyAccessUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserCompanyAccessCreateManyUserInputEnvelope
    set?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    disconnect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    delete?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    update?: UserCompanyAccessUpdateWithWhereUniqueWithoutUserInput | UserCompanyAccessUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserCompanyAccessUpdateManyWithWhereWithoutUserInput | UserCompanyAccessUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput> | TransactionCreateWithoutCreatedByInput[] | TransactionUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCreatedByInput | TransactionCreateOrConnectWithoutCreatedByInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCreatedByInput | TransactionUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: TransactionCreateManyCreatedByInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCreatedByInput | TransactionUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCreatedByInput | TransactionUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCompanyAccessCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput> | UserCompanyAccessCreateWithoutCompanyInput[] | UserCompanyAccessUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutCompanyInput | UserCompanyAccessCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCompanyAccessCreateManyCompanyInputEnvelope
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
  }

  export type CompanyLedgerMappingCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput> | CompanyLedgerMappingCreateWithoutCompanyInput[] | CompanyLedgerMappingUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutCompanyInput | CompanyLedgerMappingCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyLedgerMappingCreateManyCompanyInputEnvelope
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput> | TransactionCreateWithoutCompanyInput[] | TransactionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCompanyInput | TransactionCreateOrConnectWithoutCompanyInput[]
    createMany?: TransactionCreateManyCompanyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutDestinationCompanyInput = {
    create?: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput> | TransactionCreateWithoutDestinationCompanyInput[] | TransactionUncheckedCreateWithoutDestinationCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutDestinationCompanyInput | TransactionCreateOrConnectWithoutDestinationCompanyInput[]
    createMany?: TransactionCreateManyDestinationCompanyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserCompanyAccessUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput> | UserCompanyAccessCreateWithoutCompanyInput[] | UserCompanyAccessUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutCompanyInput | UserCompanyAccessCreateOrConnectWithoutCompanyInput[]
    createMany?: UserCompanyAccessCreateManyCompanyInputEnvelope
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
  }

  export type CompanyLedgerMappingUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput> | CompanyLedgerMappingCreateWithoutCompanyInput[] | CompanyLedgerMappingUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutCompanyInput | CompanyLedgerMappingCreateOrConnectWithoutCompanyInput[]
    createMany?: CompanyLedgerMappingCreateManyCompanyInputEnvelope
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput> | TransactionCreateWithoutCompanyInput[] | TransactionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCompanyInput | TransactionCreateOrConnectWithoutCompanyInput[]
    createMany?: TransactionCreateManyCompanyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutDestinationCompanyInput = {
    create?: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput> | TransactionCreateWithoutDestinationCompanyInput[] | TransactionUncheckedCreateWithoutDestinationCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutDestinationCompanyInput | TransactionCreateOrConnectWithoutDestinationCompanyInput[]
    createMany?: TransactionCreateManyDestinationCompanyInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserCompanyAccessUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput> | UserCompanyAccessCreateWithoutCompanyInput[] | UserCompanyAccessUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutCompanyInput | UserCompanyAccessCreateOrConnectWithoutCompanyInput[]
    upsert?: UserCompanyAccessUpsertWithWhereUniqueWithoutCompanyInput | UserCompanyAccessUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCompanyAccessCreateManyCompanyInputEnvelope
    set?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    disconnect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    delete?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    update?: UserCompanyAccessUpdateWithWhereUniqueWithoutCompanyInput | UserCompanyAccessUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserCompanyAccessUpdateManyWithWhereWithoutCompanyInput | UserCompanyAccessUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
  }

  export type CompanyLedgerMappingUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput> | CompanyLedgerMappingCreateWithoutCompanyInput[] | CompanyLedgerMappingUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutCompanyInput | CompanyLedgerMappingCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyLedgerMappingUpsertWithWhereUniqueWithoutCompanyInput | CompanyLedgerMappingUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyLedgerMappingCreateManyCompanyInputEnvelope
    set?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    disconnect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    delete?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    update?: CompanyLedgerMappingUpdateWithWhereUniqueWithoutCompanyInput | CompanyLedgerMappingUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyLedgerMappingUpdateManyWithWhereWithoutCompanyInput | CompanyLedgerMappingUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput> | TransactionCreateWithoutCompanyInput[] | TransactionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCompanyInput | TransactionCreateOrConnectWithoutCompanyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCompanyInput | TransactionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TransactionCreateManyCompanyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCompanyInput | TransactionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCompanyInput | TransactionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutDestinationCompanyNestedInput = {
    create?: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput> | TransactionCreateWithoutDestinationCompanyInput[] | TransactionUncheckedCreateWithoutDestinationCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutDestinationCompanyInput | TransactionCreateOrConnectWithoutDestinationCompanyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutDestinationCompanyInput | TransactionUpsertWithWhereUniqueWithoutDestinationCompanyInput[]
    createMany?: TransactionCreateManyDestinationCompanyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutDestinationCompanyInput | TransactionUpdateWithWhereUniqueWithoutDestinationCompanyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutDestinationCompanyInput | TransactionUpdateManyWithWhereWithoutDestinationCompanyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCompanyAccessUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput> | UserCompanyAccessCreateWithoutCompanyInput[] | UserCompanyAccessUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: UserCompanyAccessCreateOrConnectWithoutCompanyInput | UserCompanyAccessCreateOrConnectWithoutCompanyInput[]
    upsert?: UserCompanyAccessUpsertWithWhereUniqueWithoutCompanyInput | UserCompanyAccessUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: UserCompanyAccessCreateManyCompanyInputEnvelope
    set?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    disconnect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    delete?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    connect?: UserCompanyAccessWhereUniqueInput | UserCompanyAccessWhereUniqueInput[]
    update?: UserCompanyAccessUpdateWithWhereUniqueWithoutCompanyInput | UserCompanyAccessUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: UserCompanyAccessUpdateManyWithWhereWithoutCompanyInput | UserCompanyAccessUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
  }

  export type CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput> | CompanyLedgerMappingCreateWithoutCompanyInput[] | CompanyLedgerMappingUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutCompanyInput | CompanyLedgerMappingCreateOrConnectWithoutCompanyInput[]
    upsert?: CompanyLedgerMappingUpsertWithWhereUniqueWithoutCompanyInput | CompanyLedgerMappingUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: CompanyLedgerMappingCreateManyCompanyInputEnvelope
    set?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    disconnect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    delete?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    update?: CompanyLedgerMappingUpdateWithWhereUniqueWithoutCompanyInput | CompanyLedgerMappingUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: CompanyLedgerMappingUpdateManyWithWhereWithoutCompanyInput | CompanyLedgerMappingUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput> | TransactionCreateWithoutCompanyInput[] | TransactionUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCompanyInput | TransactionCreateOrConnectWithoutCompanyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCompanyInput | TransactionUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: TransactionCreateManyCompanyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCompanyInput | TransactionUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCompanyInput | TransactionUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutDestinationCompanyNestedInput = {
    create?: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput> | TransactionCreateWithoutDestinationCompanyInput[] | TransactionUncheckedCreateWithoutDestinationCompanyInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutDestinationCompanyInput | TransactionCreateOrConnectWithoutDestinationCompanyInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutDestinationCompanyInput | TransactionUpsertWithWhereUniqueWithoutDestinationCompanyInput[]
    createMany?: TransactionCreateManyDestinationCompanyInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutDestinationCompanyInput | TransactionUpdateWithWhereUniqueWithoutDestinationCompanyInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutDestinationCompanyInput | TransactionUpdateManyWithWhereWithoutDestinationCompanyInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type LedgerCreateNestedManyWithoutGroupInput = {
    create?: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput> | LedgerCreateWithoutGroupInput[] | LedgerUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LedgerCreateOrConnectWithoutGroupInput | LedgerCreateOrConnectWithoutGroupInput[]
    createMany?: LedgerCreateManyGroupInputEnvelope
    connect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
  }

  export type LedgerUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput> | LedgerCreateWithoutGroupInput[] | LedgerUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LedgerCreateOrConnectWithoutGroupInput | LedgerCreateOrConnectWithoutGroupInput[]
    createMany?: LedgerCreateManyGroupInputEnvelope
    connect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
  }

  export type LedgerUpdateManyWithoutGroupNestedInput = {
    create?: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput> | LedgerCreateWithoutGroupInput[] | LedgerUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LedgerCreateOrConnectWithoutGroupInput | LedgerCreateOrConnectWithoutGroupInput[]
    upsert?: LedgerUpsertWithWhereUniqueWithoutGroupInput | LedgerUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: LedgerCreateManyGroupInputEnvelope
    set?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    disconnect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    delete?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    connect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    update?: LedgerUpdateWithWhereUniqueWithoutGroupInput | LedgerUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: LedgerUpdateManyWithWhereWithoutGroupInput | LedgerUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: LedgerScalarWhereInput | LedgerScalarWhereInput[]
  }

  export type LedgerUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput> | LedgerCreateWithoutGroupInput[] | LedgerUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: LedgerCreateOrConnectWithoutGroupInput | LedgerCreateOrConnectWithoutGroupInput[]
    upsert?: LedgerUpsertWithWhereUniqueWithoutGroupInput | LedgerUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: LedgerCreateManyGroupInputEnvelope
    set?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    disconnect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    delete?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    connect?: LedgerWhereUniqueInput | LedgerWhereUniqueInput[]
    update?: LedgerUpdateWithWhereUniqueWithoutGroupInput | LedgerUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: LedgerUpdateManyWithWhereWithoutGroupInput | LedgerUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: LedgerScalarWhereInput | LedgerScalarWhereInput[]
  }

  export type GroupCreateNestedOneWithoutLedgersInput = {
    create?: XOR<GroupCreateWithoutLedgersInput, GroupUncheckedCreateWithoutLedgersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutLedgersInput
    connect?: GroupWhereUniqueInput
  }

  export type CompanyLedgerMappingCreateNestedManyWithoutLedgerInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput> | CompanyLedgerMappingCreateWithoutLedgerInput[] | CompanyLedgerMappingUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutLedgerInput | CompanyLedgerMappingCreateOrConnectWithoutLedgerInput[]
    createMany?: CompanyLedgerMappingCreateManyLedgerInputEnvelope
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutLedgerInput = {
    create?: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput> | TransactionCreateWithoutLedgerInput[] | TransactionUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLedgerInput | TransactionCreateOrConnectWithoutLedgerInput[]
    createMany?: TransactionCreateManyLedgerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type CompanyLedgerMappingUncheckedCreateNestedManyWithoutLedgerInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput> | CompanyLedgerMappingCreateWithoutLedgerInput[] | CompanyLedgerMappingUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutLedgerInput | CompanyLedgerMappingCreateOrConnectWithoutLedgerInput[]
    createMany?: CompanyLedgerMappingCreateManyLedgerInputEnvelope
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutLedgerInput = {
    create?: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput> | TransactionCreateWithoutLedgerInput[] | TransactionUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLedgerInput | TransactionCreateOrConnectWithoutLedgerInput[]
    createMany?: TransactionCreateManyLedgerInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GroupUpdateOneRequiredWithoutLedgersNestedInput = {
    create?: XOR<GroupCreateWithoutLedgersInput, GroupUncheckedCreateWithoutLedgersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutLedgersInput
    upsert?: GroupUpsertWithoutLedgersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutLedgersInput, GroupUpdateWithoutLedgersInput>, GroupUncheckedUpdateWithoutLedgersInput>
  }

  export type CompanyLedgerMappingUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput> | CompanyLedgerMappingCreateWithoutLedgerInput[] | CompanyLedgerMappingUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutLedgerInput | CompanyLedgerMappingCreateOrConnectWithoutLedgerInput[]
    upsert?: CompanyLedgerMappingUpsertWithWhereUniqueWithoutLedgerInput | CompanyLedgerMappingUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: CompanyLedgerMappingCreateManyLedgerInputEnvelope
    set?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    disconnect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    delete?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    update?: CompanyLedgerMappingUpdateWithWhereUniqueWithoutLedgerInput | CompanyLedgerMappingUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: CompanyLedgerMappingUpdateManyWithWhereWithoutLedgerInput | CompanyLedgerMappingUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput> | TransactionCreateWithoutLedgerInput[] | TransactionUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLedgerInput | TransactionCreateOrConnectWithoutLedgerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLedgerInput | TransactionUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: TransactionCreateManyLedgerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLedgerInput | TransactionUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLedgerInput | TransactionUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput> | CompanyLedgerMappingCreateWithoutLedgerInput[] | CompanyLedgerMappingUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: CompanyLedgerMappingCreateOrConnectWithoutLedgerInput | CompanyLedgerMappingCreateOrConnectWithoutLedgerInput[]
    upsert?: CompanyLedgerMappingUpsertWithWhereUniqueWithoutLedgerInput | CompanyLedgerMappingUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: CompanyLedgerMappingCreateManyLedgerInputEnvelope
    set?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    disconnect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    delete?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    connect?: CompanyLedgerMappingWhereUniqueInput | CompanyLedgerMappingWhereUniqueInput[]
    update?: CompanyLedgerMappingUpdateWithWhereUniqueWithoutLedgerInput | CompanyLedgerMappingUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: CompanyLedgerMappingUpdateManyWithWhereWithoutLedgerInput | CompanyLedgerMappingUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutLedgerNestedInput = {
    create?: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput> | TransactionCreateWithoutLedgerInput[] | TransactionUncheckedCreateWithoutLedgerInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutLedgerInput | TransactionCreateOrConnectWithoutLedgerInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutLedgerInput | TransactionUpsertWithWhereUniqueWithoutLedgerInput[]
    createMany?: TransactionCreateManyLedgerInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutLedgerInput | TransactionUpdateWithWhereUniqueWithoutLedgerInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutLedgerInput | TransactionUpdateManyWithWhereWithoutLedgerInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionCreateNestedManyWithoutPaymentModeInput = {
    create?: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput> | TransactionCreateWithoutPaymentModeInput[] | TransactionUncheckedCreateWithoutPaymentModeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPaymentModeInput | TransactionCreateOrConnectWithoutPaymentModeInput[]
    createMany?: TransactionCreateManyPaymentModeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutPaymentModeInput = {
    create?: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput> | TransactionCreateWithoutPaymentModeInput[] | TransactionUncheckedCreateWithoutPaymentModeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPaymentModeInput | TransactionCreateOrConnectWithoutPaymentModeInput[]
    createMany?: TransactionCreateManyPaymentModeInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUpdateManyWithoutPaymentModeNestedInput = {
    create?: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput> | TransactionCreateWithoutPaymentModeInput[] | TransactionUncheckedCreateWithoutPaymentModeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPaymentModeInput | TransactionCreateOrConnectWithoutPaymentModeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPaymentModeInput | TransactionUpsertWithWhereUniqueWithoutPaymentModeInput[]
    createMany?: TransactionCreateManyPaymentModeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPaymentModeInput | TransactionUpdateWithWhereUniqueWithoutPaymentModeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPaymentModeInput | TransactionUpdateManyWithWhereWithoutPaymentModeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutPaymentModeNestedInput = {
    create?: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput> | TransactionCreateWithoutPaymentModeInput[] | TransactionUncheckedCreateWithoutPaymentModeInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutPaymentModeInput | TransactionCreateOrConnectWithoutPaymentModeInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutPaymentModeInput | TransactionUpsertWithWhereUniqueWithoutPaymentModeInput[]
    createMany?: TransactionCreateManyPaymentModeInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutPaymentModeInput | TransactionUpdateWithWhereUniqueWithoutPaymentModeInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutPaymentModeInput | TransactionUpdateManyWithWhereWithoutPaymentModeInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type CompanyCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CompanyCreateWithoutTransactionsInput, CompanyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTransactionsInput
    connect?: CompanyWhereUniqueInput
  }

  export type LedgerCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<LedgerCreateWithoutTransactionsInput, LedgerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LedgerCreateOrConnectWithoutTransactionsInput
    connect?: LedgerWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutIncomingTransfersInput = {
    create?: XOR<CompanyCreateWithoutIncomingTransfersInput, CompanyUncheckedCreateWithoutIncomingTransfersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutIncomingTransfersInput
    connect?: CompanyWhereUniqueInput
  }

  export type PaymentModeCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<PaymentModeCreateWithoutTransactionsInput, PaymentModeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PaymentModeCreateOrConnectWithoutTransactionsInput
    connect?: PaymentModeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<CompanyCreateWithoutTransactionsInput, CompanyUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutTransactionsInput
    upsert?: CompanyUpsertWithoutTransactionsInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutTransactionsInput, CompanyUpdateWithoutTransactionsInput>, CompanyUncheckedUpdateWithoutTransactionsInput>
  }

  export type LedgerUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<LedgerCreateWithoutTransactionsInput, LedgerUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: LedgerCreateOrConnectWithoutTransactionsInput
    upsert?: LedgerUpsertWithoutTransactionsInput
    disconnect?: LedgerWhereInput | boolean
    delete?: LedgerWhereInput | boolean
    connect?: LedgerWhereUniqueInput
    update?: XOR<XOR<LedgerUpdateToOneWithWhereWithoutTransactionsInput, LedgerUpdateWithoutTransactionsInput>, LedgerUncheckedUpdateWithoutTransactionsInput>
  }

  export type CompanyUpdateOneWithoutIncomingTransfersNestedInput = {
    create?: XOR<CompanyCreateWithoutIncomingTransfersInput, CompanyUncheckedCreateWithoutIncomingTransfersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutIncomingTransfersInput
    upsert?: CompanyUpsertWithoutIncomingTransfersInput
    disconnect?: CompanyWhereInput | boolean
    delete?: CompanyWhereInput | boolean
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutIncomingTransfersInput, CompanyUpdateWithoutIncomingTransfersInput>, CompanyUncheckedUpdateWithoutIncomingTransfersInput>
  }

  export type PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<PaymentModeCreateWithoutTransactionsInput, PaymentModeUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: PaymentModeCreateOrConnectWithoutTransactionsInput
    upsert?: PaymentModeUpsertWithoutTransactionsInput
    connect?: PaymentModeWhereUniqueInput
    update?: XOR<XOR<PaymentModeUpdateToOneWithWhereWithoutTransactionsInput, PaymentModeUpdateWithoutTransactionsInput>, PaymentModeUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutCompanyAccessInput = {
    create?: XOR<UserCreateWithoutCompanyAccessInput, UserUncheckedCreateWithoutCompanyAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyAccessInput
    connect?: UserWhereUniqueInput
  }

  export type CompanyCreateNestedOneWithoutUsersInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    connect?: CompanyWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCompanyAccessNestedInput = {
    create?: XOR<UserCreateWithoutCompanyAccessInput, UserUncheckedCreateWithoutCompanyAccessInput>
    connectOrCreate?: UserCreateOrConnectWithoutCompanyAccessInput
    upsert?: UserUpsertWithoutCompanyAccessInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCompanyAccessInput, UserUpdateWithoutCompanyAccessInput>, UserUncheckedUpdateWithoutCompanyAccessInput>
  }

  export type CompanyUpdateOneRequiredWithoutUsersNestedInput = {
    create?: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutUsersInput
    upsert?: CompanyUpsertWithoutUsersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutUsersInput, CompanyUpdateWithoutUsersInput>, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyCreateNestedOneWithoutLedgersInput = {
    create?: XOR<CompanyCreateWithoutLedgersInput, CompanyUncheckedCreateWithoutLedgersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutLedgersInput
    connect?: CompanyWhereUniqueInput
  }

  export type LedgerCreateNestedOneWithoutCompaniesInput = {
    create?: XOR<LedgerCreateWithoutCompaniesInput, LedgerUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: LedgerCreateOrConnectWithoutCompaniesInput
    connect?: LedgerWhereUniqueInput
  }

  export type CompanyUpdateOneRequiredWithoutLedgersNestedInput = {
    create?: XOR<CompanyCreateWithoutLedgersInput, CompanyUncheckedCreateWithoutLedgersInput>
    connectOrCreate?: CompanyCreateOrConnectWithoutLedgersInput
    upsert?: CompanyUpsertWithoutLedgersInput
    connect?: CompanyWhereUniqueInput
    update?: XOR<XOR<CompanyUpdateToOneWithWhereWithoutLedgersInput, CompanyUpdateWithoutLedgersInput>, CompanyUncheckedUpdateWithoutLedgersInput>
  }

  export type LedgerUpdateOneRequiredWithoutCompaniesNestedInput = {
    create?: XOR<LedgerCreateWithoutCompaniesInput, LedgerUncheckedCreateWithoutCompaniesInput>
    connectOrCreate?: LedgerCreateOrConnectWithoutCompaniesInput
    upsert?: LedgerUpsertWithoutCompaniesInput
    connect?: LedgerWhereUniqueInput
    update?: XOR<XOR<LedgerUpdateToOneWithWhereWithoutCompaniesInput, LedgerUpdateWithoutCompaniesInput>, LedgerUncheckedUpdateWithoutCompaniesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserCompanyAccessCreateWithoutUserInput = {
    assignedAt?: Date | string
    company: CompanyCreateNestedOneWithoutUsersInput
  }

  export type UserCompanyAccessUncheckedCreateWithoutUserInput = {
    companyId: string
    assignedAt?: Date | string
  }

  export type UserCompanyAccessCreateOrConnectWithoutUserInput = {
    where: UserCompanyAccessWhereUniqueInput
    create: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput>
  }

  export type UserCompanyAccessCreateManyUserInputEnvelope = {
    data: UserCompanyAccessCreateManyUserInput | UserCompanyAccessCreateManyUserInput[]
  }

  export type TransactionCreateWithoutCreatedByInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutTransactionsInput
    ledger?: LedgerCreateNestedOneWithoutTransactionsInput
    destinationCompany?: CompanyCreateNestedOneWithoutIncomingTransfersInput
    paymentMode: PaymentModeCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCreatedByInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutCreatedByInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput>
  }

  export type TransactionCreateManyCreatedByInputEnvelope = {
    data: TransactionCreateManyCreatedByInput | TransactionCreateManyCreatedByInput[]
  }

  export type UserCompanyAccessUpsertWithWhereUniqueWithoutUserInput = {
    where: UserCompanyAccessWhereUniqueInput
    update: XOR<UserCompanyAccessUpdateWithoutUserInput, UserCompanyAccessUncheckedUpdateWithoutUserInput>
    create: XOR<UserCompanyAccessCreateWithoutUserInput, UserCompanyAccessUncheckedCreateWithoutUserInput>
  }

  export type UserCompanyAccessUpdateWithWhereUniqueWithoutUserInput = {
    where: UserCompanyAccessWhereUniqueInput
    data: XOR<UserCompanyAccessUpdateWithoutUserInput, UserCompanyAccessUncheckedUpdateWithoutUserInput>
  }

  export type UserCompanyAccessUpdateManyWithWhereWithoutUserInput = {
    where: UserCompanyAccessScalarWhereInput
    data: XOR<UserCompanyAccessUpdateManyMutationInput, UserCompanyAccessUncheckedUpdateManyWithoutUserInput>
  }

  export type UserCompanyAccessScalarWhereInput = {
    AND?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
    OR?: UserCompanyAccessScalarWhereInput[]
    NOT?: UserCompanyAccessScalarWhereInput | UserCompanyAccessScalarWhereInput[]
    userId?: StringFilter<"UserCompanyAccess"> | string
    companyId?: StringFilter<"UserCompanyAccess"> | string
    assignedAt?: DateTimeFilter<"UserCompanyAccess"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCreatedByInput, TransactionUncheckedUpdateWithoutCreatedByInput>
    create: XOR<TransactionCreateWithoutCreatedByInput, TransactionUncheckedCreateWithoutCreatedByInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCreatedByInput, TransactionUncheckedUpdateWithoutCreatedByInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCreatedByInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    voucherNo?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    companyId?: StringFilter<"Transaction"> | string
    ledgerId?: StringNullableFilter<"Transaction"> | string | null
    destinationCompanyId?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    paymentModeId?: StringFilter<"Transaction"> | string
    businessDate?: DateTimeFilter<"Transaction"> | Date | string
    particulars?: StringFilter<"Transaction"> | string
    remarks?: StringNullableFilter<"Transaction"> | string | null
    approvedBy?: StringNullableFilter<"Transaction"> | string | null
    approvedOver?: StringNullableFilter<"Transaction"> | string | null
    attachmentUrl?: StringNullableFilter<"Transaction"> | string | null
    createdById?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCompanyAccessCreateWithoutCompanyInput = {
    assignedAt?: Date | string
    user: UserCreateNestedOneWithoutCompanyAccessInput
  }

  export type UserCompanyAccessUncheckedCreateWithoutCompanyInput = {
    userId: string
    assignedAt?: Date | string
  }

  export type UserCompanyAccessCreateOrConnectWithoutCompanyInput = {
    where: UserCompanyAccessWhereUniqueInput
    create: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput>
  }

  export type UserCompanyAccessCreateManyCompanyInputEnvelope = {
    data: UserCompanyAccessCreateManyCompanyInput | UserCompanyAccessCreateManyCompanyInput[]
  }

  export type CompanyLedgerMappingCreateWithoutCompanyInput = {
    mappedAt?: Date | string
    ledger: LedgerCreateNestedOneWithoutCompaniesInput
  }

  export type CompanyLedgerMappingUncheckedCreateWithoutCompanyInput = {
    ledgerId: string
    mappedAt?: Date | string
  }

  export type CompanyLedgerMappingCreateOrConnectWithoutCompanyInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    create: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyLedgerMappingCreateManyCompanyInputEnvelope = {
    data: CompanyLedgerMappingCreateManyCompanyInput | CompanyLedgerMappingCreateManyCompanyInput[]
  }

  export type TransactionCreateWithoutCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ledger?: LedgerCreateNestedOneWithoutTransactionsInput
    destinationCompany?: CompanyCreateNestedOneWithoutIncomingTransfersInput
    paymentMode: PaymentModeCreateNestedOneWithoutTransactionsInput
    createdBy: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutCompanyInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput>
  }

  export type TransactionCreateManyCompanyInputEnvelope = {
    data: TransactionCreateManyCompanyInput | TransactionCreateManyCompanyInput[]
  }

  export type TransactionCreateWithoutDestinationCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutTransactionsInput
    ledger?: LedgerCreateNestedOneWithoutTransactionsInput
    paymentMode: PaymentModeCreateNestedOneWithoutTransactionsInput
    createdBy: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutDestinationCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutDestinationCompanyInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput>
  }

  export type TransactionCreateManyDestinationCompanyInputEnvelope = {
    data: TransactionCreateManyDestinationCompanyInput | TransactionCreateManyDestinationCompanyInput[]
  }

  export type UserCompanyAccessUpsertWithWhereUniqueWithoutCompanyInput = {
    where: UserCompanyAccessWhereUniqueInput
    update: XOR<UserCompanyAccessUpdateWithoutCompanyInput, UserCompanyAccessUncheckedUpdateWithoutCompanyInput>
    create: XOR<UserCompanyAccessCreateWithoutCompanyInput, UserCompanyAccessUncheckedCreateWithoutCompanyInput>
  }

  export type UserCompanyAccessUpdateWithWhereUniqueWithoutCompanyInput = {
    where: UserCompanyAccessWhereUniqueInput
    data: XOR<UserCompanyAccessUpdateWithoutCompanyInput, UserCompanyAccessUncheckedUpdateWithoutCompanyInput>
  }

  export type UserCompanyAccessUpdateManyWithWhereWithoutCompanyInput = {
    where: UserCompanyAccessScalarWhereInput
    data: XOR<UserCompanyAccessUpdateManyMutationInput, UserCompanyAccessUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CompanyLedgerMappingUpsertWithWhereUniqueWithoutCompanyInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    update: XOR<CompanyLedgerMappingUpdateWithoutCompanyInput, CompanyLedgerMappingUncheckedUpdateWithoutCompanyInput>
    create: XOR<CompanyLedgerMappingCreateWithoutCompanyInput, CompanyLedgerMappingUncheckedCreateWithoutCompanyInput>
  }

  export type CompanyLedgerMappingUpdateWithWhereUniqueWithoutCompanyInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    data: XOR<CompanyLedgerMappingUpdateWithoutCompanyInput, CompanyLedgerMappingUncheckedUpdateWithoutCompanyInput>
  }

  export type CompanyLedgerMappingUpdateManyWithWhereWithoutCompanyInput = {
    where: CompanyLedgerMappingScalarWhereInput
    data: XOR<CompanyLedgerMappingUpdateManyMutationInput, CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyInput>
  }

  export type CompanyLedgerMappingScalarWhereInput = {
    AND?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
    OR?: CompanyLedgerMappingScalarWhereInput[]
    NOT?: CompanyLedgerMappingScalarWhereInput | CompanyLedgerMappingScalarWhereInput[]
    companyId?: StringFilter<"CompanyLedgerMapping"> | string
    ledgerId?: StringFilter<"CompanyLedgerMapping"> | string
    mappedAt?: DateTimeFilter<"CompanyLedgerMapping"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutCompanyInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCompanyInput, TransactionUncheckedUpdateWithoutCompanyInput>
    create: XOR<TransactionCreateWithoutCompanyInput, TransactionUncheckedCreateWithoutCompanyInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCompanyInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCompanyInput, TransactionUncheckedUpdateWithoutCompanyInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCompanyInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCompanyInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutDestinationCompanyInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutDestinationCompanyInput, TransactionUncheckedUpdateWithoutDestinationCompanyInput>
    create: XOR<TransactionCreateWithoutDestinationCompanyInput, TransactionUncheckedCreateWithoutDestinationCompanyInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutDestinationCompanyInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutDestinationCompanyInput, TransactionUncheckedUpdateWithoutDestinationCompanyInput>
  }

  export type TransactionUpdateManyWithWhereWithoutDestinationCompanyInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutDestinationCompanyInput>
  }

  export type LedgerCreateWithoutGroupInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyLedgerMappingCreateNestedManyWithoutLedgerInput
    transactions?: TransactionCreateNestedManyWithoutLedgerInput
  }

  export type LedgerUncheckedCreateWithoutGroupInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutLedgerInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutLedgerInput
  }

  export type LedgerCreateOrConnectWithoutGroupInput = {
    where: LedgerWhereUniqueInput
    create: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput>
  }

  export type LedgerCreateManyGroupInputEnvelope = {
    data: LedgerCreateManyGroupInput | LedgerCreateManyGroupInput[]
  }

  export type LedgerUpsertWithWhereUniqueWithoutGroupInput = {
    where: LedgerWhereUniqueInput
    update: XOR<LedgerUpdateWithoutGroupInput, LedgerUncheckedUpdateWithoutGroupInput>
    create: XOR<LedgerCreateWithoutGroupInput, LedgerUncheckedCreateWithoutGroupInput>
  }

  export type LedgerUpdateWithWhereUniqueWithoutGroupInput = {
    where: LedgerWhereUniqueInput
    data: XOR<LedgerUpdateWithoutGroupInput, LedgerUncheckedUpdateWithoutGroupInput>
  }

  export type LedgerUpdateManyWithWhereWithoutGroupInput = {
    where: LedgerScalarWhereInput
    data: XOR<LedgerUpdateManyMutationInput, LedgerUncheckedUpdateManyWithoutGroupInput>
  }

  export type LedgerScalarWhereInput = {
    AND?: LedgerScalarWhereInput | LedgerScalarWhereInput[]
    OR?: LedgerScalarWhereInput[]
    NOT?: LedgerScalarWhereInput | LedgerScalarWhereInput[]
    id?: StringFilter<"Ledger"> | string
    ledger_name?: StringFilter<"Ledger"> | string
    ledger_details?: StringNullableFilter<"Ledger"> | string | null
    isActive?: BoolFilter<"Ledger"> | boolean
    openingBalance?: FloatFilter<"Ledger"> | number
    openingBalanceType?: StringFilter<"Ledger"> | string
    groupId?: StringFilter<"Ledger"> | string
    createdAt?: DateTimeFilter<"Ledger"> | Date | string
    updatedAt?: DateTimeFilter<"Ledger"> | Date | string
  }

  export type GroupCreateWithoutLedgersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupUncheckedCreateWithoutLedgersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GroupCreateOrConnectWithoutLedgersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutLedgersInput, GroupUncheckedCreateWithoutLedgersInput>
  }

  export type CompanyLedgerMappingCreateWithoutLedgerInput = {
    mappedAt?: Date | string
    company: CompanyCreateNestedOneWithoutLedgersInput
  }

  export type CompanyLedgerMappingUncheckedCreateWithoutLedgerInput = {
    companyId: string
    mappedAt?: Date | string
  }

  export type CompanyLedgerMappingCreateOrConnectWithoutLedgerInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    create: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput>
  }

  export type CompanyLedgerMappingCreateManyLedgerInputEnvelope = {
    data: CompanyLedgerMappingCreateManyLedgerInput | CompanyLedgerMappingCreateManyLedgerInput[]
  }

  export type TransactionCreateWithoutLedgerInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutTransactionsInput
    destinationCompany?: CompanyCreateNestedOneWithoutIncomingTransfersInput
    paymentMode: PaymentModeCreateNestedOneWithoutTransactionsInput
    createdBy: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutLedgerInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutLedgerInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput>
  }

  export type TransactionCreateManyLedgerInputEnvelope = {
    data: TransactionCreateManyLedgerInput | TransactionCreateManyLedgerInput[]
  }

  export type GroupUpsertWithoutLedgersInput = {
    update: XOR<GroupUpdateWithoutLedgersInput, GroupUncheckedUpdateWithoutLedgersInput>
    create: XOR<GroupCreateWithoutLedgersInput, GroupUncheckedCreateWithoutLedgersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutLedgersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutLedgersInput, GroupUncheckedUpdateWithoutLedgersInput>
  }

  export type GroupUpdateWithoutLedgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GroupUncheckedUpdateWithoutLedgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingUpsertWithWhereUniqueWithoutLedgerInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    update: XOR<CompanyLedgerMappingUpdateWithoutLedgerInput, CompanyLedgerMappingUncheckedUpdateWithoutLedgerInput>
    create: XOR<CompanyLedgerMappingCreateWithoutLedgerInput, CompanyLedgerMappingUncheckedCreateWithoutLedgerInput>
  }

  export type CompanyLedgerMappingUpdateWithWhereUniqueWithoutLedgerInput = {
    where: CompanyLedgerMappingWhereUniqueInput
    data: XOR<CompanyLedgerMappingUpdateWithoutLedgerInput, CompanyLedgerMappingUncheckedUpdateWithoutLedgerInput>
  }

  export type CompanyLedgerMappingUpdateManyWithWhereWithoutLedgerInput = {
    where: CompanyLedgerMappingScalarWhereInput
    data: XOR<CompanyLedgerMappingUpdateManyMutationInput, CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerInput>
  }

  export type TransactionUpsertWithWhereUniqueWithoutLedgerInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutLedgerInput, TransactionUncheckedUpdateWithoutLedgerInput>
    create: XOR<TransactionCreateWithoutLedgerInput, TransactionUncheckedCreateWithoutLedgerInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutLedgerInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutLedgerInput, TransactionUncheckedUpdateWithoutLedgerInput>
  }

  export type TransactionUpdateManyWithWhereWithoutLedgerInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutLedgerInput>
  }

  export type TransactionCreateWithoutPaymentModeInput = {
    id?: string
    voucherNo: string
    type: string
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    company: CompanyCreateNestedOneWithoutTransactionsInput
    ledger?: LedgerCreateNestedOneWithoutTransactionsInput
    destinationCompany?: CompanyCreateNestedOneWithoutIncomingTransfersInput
    createdBy: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutPaymentModeInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutPaymentModeInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput>
  }

  export type TransactionCreateManyPaymentModeInputEnvelope = {
    data: TransactionCreateManyPaymentModeInput | TransactionCreateManyPaymentModeInput[]
  }

  export type TransactionUpsertWithWhereUniqueWithoutPaymentModeInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutPaymentModeInput, TransactionUncheckedUpdateWithoutPaymentModeInput>
    create: XOR<TransactionCreateWithoutPaymentModeInput, TransactionUncheckedCreateWithoutPaymentModeInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutPaymentModeInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutPaymentModeInput, TransactionUncheckedUpdateWithoutPaymentModeInput>
  }

  export type TransactionUpdateManyWithWhereWithoutPaymentModeInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutPaymentModeInput>
  }

  export type CompanyCreateWithoutTransactionsInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyUncheckedCreateWithoutTransactionsInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessUncheckedCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionUncheckedCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyCreateOrConnectWithoutTransactionsInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutTransactionsInput, CompanyUncheckedCreateWithoutTransactionsInput>
  }

  export type LedgerCreateWithoutTransactionsInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutLedgersInput
    companies?: CompanyLedgerMappingCreateNestedManyWithoutLedgerInput
  }

  export type LedgerUncheckedCreateWithoutTransactionsInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    companies?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutLedgerInput
  }

  export type LedgerCreateOrConnectWithoutTransactionsInput = {
    where: LedgerWhereUniqueInput
    create: XOR<LedgerCreateWithoutTransactionsInput, LedgerUncheckedCreateWithoutTransactionsInput>
  }

  export type CompanyCreateWithoutIncomingTransfersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingCreateNestedManyWithoutCompanyInput
    transactions?: TransactionCreateNestedManyWithoutCompanyInput
  }

  export type CompanyUncheckedCreateWithoutIncomingTransfersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessUncheckedCreateNestedManyWithoutCompanyInput
    ledgers?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutCompanyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompanyCreateOrConnectWithoutIncomingTransfersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutIncomingTransfersInput, CompanyUncheckedCreateWithoutIncomingTransfersInput>
  }

  export type PaymentModeCreateWithoutTransactionsInput = {
    id?: string
    name: string
    category: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentModeUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    category: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentModeCreateOrConnectWithoutTransactionsInput = {
    where: PaymentModeWhereUniqueInput
    create: XOR<PaymentModeCreateWithoutTransactionsInput, PaymentModeUncheckedCreateWithoutTransactionsInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyAccess?: UserCompanyAccessCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    companyAccess?: UserCompanyAccessUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type CompanyUpsertWithoutTransactionsInput = {
    update: XOR<CompanyUpdateWithoutTransactionsInput, CompanyUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CompanyCreateWithoutTransactionsInput, CompanyUncheckedCreateWithoutTransactionsInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutTransactionsInput, CompanyUncheckedUpdateWithoutTransactionsInput>
  }

  export type CompanyUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUncheckedUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUncheckedUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type LedgerUpsertWithoutTransactionsInput = {
    update: XOR<LedgerUpdateWithoutTransactionsInput, LedgerUncheckedUpdateWithoutTransactionsInput>
    create: XOR<LedgerCreateWithoutTransactionsInput, LedgerUncheckedCreateWithoutTransactionsInput>
    where?: LedgerWhereInput
  }

  export type LedgerUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: LedgerWhereInput
    data: XOR<LedgerUpdateWithoutTransactionsInput, LedgerUncheckedUpdateWithoutTransactionsInput>
  }

  export type LedgerUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutLedgersNestedInput
    companies?: CompanyLedgerMappingUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerNestedInput
  }

  export type CompanyUpsertWithoutIncomingTransfersInput = {
    update: XOR<CompanyUpdateWithoutIncomingTransfersInput, CompanyUncheckedUpdateWithoutIncomingTransfersInput>
    create: XOR<CompanyCreateWithoutIncomingTransfersInput, CompanyUncheckedCreateWithoutIncomingTransfersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutIncomingTransfersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutIncomingTransfersInput, CompanyUncheckedUpdateWithoutIncomingTransfersInput>
  }

  export type CompanyUpdateWithoutIncomingTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUpdateManyWithoutCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutIncomingTransfersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUncheckedUpdateManyWithoutCompanyNestedInput
    ledgers?: CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type PaymentModeUpsertWithoutTransactionsInput = {
    update: XOR<PaymentModeUpdateWithoutTransactionsInput, PaymentModeUncheckedUpdateWithoutTransactionsInput>
    create: XOR<PaymentModeCreateWithoutTransactionsInput, PaymentModeUncheckedCreateWithoutTransactionsInput>
    where?: PaymentModeWhereInput
  }

  export type PaymentModeUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: PaymentModeWhereInput
    data: XOR<PaymentModeUpdateWithoutTransactionsInput, PaymentModeUncheckedUpdateWithoutTransactionsInput>
  }

  export type PaymentModeUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentModeUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyAccess?: UserCompanyAccessUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companyAccess?: UserCompanyAccessUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCompanyAccessInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutCompanyAccessInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    role?: string
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutCompanyAccessInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCompanyAccessInput, UserUncheckedCreateWithoutCompanyAccessInput>
  }

  export type CompanyCreateWithoutUsersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgers?: CompanyLedgerMappingCreateNestedManyWithoutCompanyInput
    transactions?: TransactionCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyUncheckedCreateWithoutUsersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ledgers?: CompanyLedgerMappingUncheckedCreateNestedManyWithoutCompanyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionUncheckedCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyCreateOrConnectWithoutUsersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
  }

  export type UserUpsertWithoutCompanyAccessInput = {
    update: XOR<UserUpdateWithoutCompanyAccessInput, UserUncheckedUpdateWithoutCompanyAccessInput>
    create: XOR<UserCreateWithoutCompanyAccessInput, UserUncheckedCreateWithoutCompanyAccessInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCompanyAccessInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCompanyAccessInput, UserUncheckedUpdateWithoutCompanyAccessInput>
  }

  export type UserUpdateWithoutCompanyAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutCompanyAccessInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type CompanyUpsertWithoutUsersInput = {
    update: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
    create: XOR<CompanyCreateWithoutUsersInput, CompanyUncheckedCreateWithoutUsersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutUsersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutUsersInput, CompanyUncheckedUpdateWithoutUsersInput>
  }

  export type CompanyUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgers?: CompanyLedgerMappingUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledgers?: CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUncheckedUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyCreateWithoutLedgersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessCreateNestedManyWithoutCompanyInput
    transactions?: TransactionCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyUncheckedCreateWithoutLedgersInput = {
    id?: string
    companyCode: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCompanyAccessUncheckedCreateNestedManyWithoutCompanyInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutCompanyInput
    incomingTransfers?: TransactionUncheckedCreateNestedManyWithoutDestinationCompanyInput
  }

  export type CompanyCreateOrConnectWithoutLedgersInput = {
    where: CompanyWhereUniqueInput
    create: XOR<CompanyCreateWithoutLedgersInput, CompanyUncheckedCreateWithoutLedgersInput>
  }

  export type LedgerCreateWithoutCompaniesInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    group: GroupCreateNestedOneWithoutLedgersInput
    transactions?: TransactionCreateNestedManyWithoutLedgerInput
  }

  export type LedgerUncheckedCreateWithoutCompaniesInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    groupId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutLedgerInput
  }

  export type LedgerCreateOrConnectWithoutCompaniesInput = {
    where: LedgerWhereUniqueInput
    create: XOR<LedgerCreateWithoutCompaniesInput, LedgerUncheckedCreateWithoutCompaniesInput>
  }

  export type CompanyUpsertWithoutLedgersInput = {
    update: XOR<CompanyUpdateWithoutLedgersInput, CompanyUncheckedUpdateWithoutLedgersInput>
    create: XOR<CompanyCreateWithoutLedgersInput, CompanyUncheckedCreateWithoutLedgersInput>
    where?: CompanyWhereInput
  }

  export type CompanyUpdateToOneWithWhereWithoutLedgersInput = {
    where?: CompanyWhereInput
    data: XOR<CompanyUpdateWithoutLedgersInput, CompanyUncheckedUpdateWithoutLedgersInput>
  }

  export type CompanyUpdateWithoutLedgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type CompanyUncheckedUpdateWithoutLedgersInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyCode?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserCompanyAccessUncheckedUpdateManyWithoutCompanyNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutCompanyNestedInput
    incomingTransfers?: TransactionUncheckedUpdateManyWithoutDestinationCompanyNestedInput
  }

  export type LedgerUpsertWithoutCompaniesInput = {
    update: XOR<LedgerUpdateWithoutCompaniesInput, LedgerUncheckedUpdateWithoutCompaniesInput>
    create: XOR<LedgerCreateWithoutCompaniesInput, LedgerUncheckedCreateWithoutCompaniesInput>
    where?: LedgerWhereInput
  }

  export type LedgerUpdateToOneWithWhereWithoutCompaniesInput = {
    where?: LedgerWhereInput
    data: XOR<LedgerUpdateWithoutCompaniesInput, LedgerUncheckedUpdateWithoutCompaniesInput>
  }

  export type LedgerUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: GroupUpdateOneRequiredWithoutLedgersNestedInput
    transactions?: TransactionUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerUncheckedUpdateWithoutCompaniesInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutLedgerNestedInput
  }

  export type UserCompanyAccessCreateManyUserInput = {
    companyId: string
    assignedAt?: Date | string
  }

  export type TransactionCreateManyCreatedByInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCompanyAccessUpdateWithoutUserInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutUsersNestedInput
  }

  export type UserCompanyAccessUncheckedUpdateWithoutUserInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessUncheckedUpdateManyWithoutUserInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTransactionsNestedInput
    ledger?: LedgerUpdateOneWithoutTransactionsNestedInput
    destinationCompany?: CompanyUpdateOneWithoutIncomingTransfersNestedInput
    paymentMode?: PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessCreateManyCompanyInput = {
    userId: string
    assignedAt?: Date | string
  }

  export type CompanyLedgerMappingCreateManyCompanyInput = {
    ledgerId: string
    mappedAt?: Date | string
  }

  export type TransactionCreateManyCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateManyDestinationCompanyInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCompanyAccessUpdateWithoutCompanyInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCompanyAccessNestedInput
  }

  export type UserCompanyAccessUncheckedUpdateWithoutCompanyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCompanyAccessUncheckedUpdateManyWithoutCompanyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingUpdateWithoutCompanyInput = {
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledger?: LedgerUpdateOneRequiredWithoutCompaniesNestedInput
  }

  export type CompanyLedgerMappingUncheckedUpdateWithoutCompanyInput = {
    ledgerId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingUncheckedUpdateManyWithoutCompanyInput = {
    ledgerId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ledger?: LedgerUpdateOneWithoutTransactionsNestedInput
    destinationCompany?: CompanyUpdateOneWithoutIncomingTransfersNestedInput
    paymentMode?: PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutDestinationCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTransactionsNestedInput
    ledger?: LedgerUpdateOneWithoutTransactionsNestedInput
    paymentMode?: PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutDestinationCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutDestinationCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LedgerCreateManyGroupInput = {
    id?: string
    ledger_name: string
    ledger_details?: string | null
    isActive?: boolean
    openingBalance?: number
    openingBalanceType?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LedgerUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyLedgerMappingUpdateManyWithoutLedgerNestedInput
    transactions?: TransactionUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    companies?: CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutLedgerNestedInput
  }

  export type LedgerUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    ledger_name?: StringFieldUpdateOperationsInput | string
    ledger_details?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    openingBalance?: FloatFieldUpdateOperationsInput | number
    openingBalanceType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingCreateManyLedgerInput = {
    companyId: string
    mappedAt?: Date | string
  }

  export type TransactionCreateManyLedgerInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    destinationCompanyId?: string | null
    amount: number
    paymentModeId: string
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompanyLedgerMappingUpdateWithoutLedgerInput = {
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutLedgersNestedInput
  }

  export type CompanyLedgerMappingUncheckedUpdateWithoutLedgerInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompanyLedgerMappingUncheckedUpdateManyWithoutLedgerInput = {
    companyId?: StringFieldUpdateOperationsInput | string
    mappedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTransactionsNestedInput
    destinationCompany?: CompanyUpdateOneWithoutIncomingTransfersNestedInput
    paymentMode?: PaymentModeUpdateOneRequiredWithoutTransactionsNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutLedgerInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentModeId?: StringFieldUpdateOperationsInput | string
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyPaymentModeInput = {
    id?: string
    voucherNo: string
    type: string
    companyId: string
    ledgerId?: string | null
    destinationCompanyId?: string | null
    amount: number
    businessDate: Date | string
    particulars: string
    remarks?: string | null
    approvedBy?: string | null
    approvedOver?: string | null
    attachmentUrl?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateWithoutPaymentModeInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    company?: CompanyUpdateOneRequiredWithoutTransactionsNestedInput
    ledger?: LedgerUpdateOneWithoutTransactionsNestedInput
    destinationCompany?: CompanyUpdateOneWithoutIncomingTransfersNestedInput
    createdBy?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutPaymentModeInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutPaymentModeInput = {
    id?: StringFieldUpdateOperationsInput | string
    voucherNo?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    ledgerId?: NullableStringFieldUpdateOperationsInput | string | null
    destinationCompanyId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    businessDate?: DateTimeFieldUpdateOperationsInput | Date | string
    particulars?: StringFieldUpdateOperationsInput | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedOver?: NullableStringFieldUpdateOperationsInput | string | null
    attachmentUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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