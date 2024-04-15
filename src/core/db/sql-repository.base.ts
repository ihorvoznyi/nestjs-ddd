import { ZodObject, TypeOf, ZodTypeAny } from 'zod';
import {
  DatabasePool,
  DatabaseTransactionConnection,
  IdentifierSqlToken,
  QueryResult,
  QuerySqlToken,
  sql,
} from 'slonik';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AggregateRoot, Mapper } from 'src/domain/ddd';
import { RepositoryPort } from 'src/domain/ddd/repository.port';
import { RequestCtxService } from '../application/context';

export abstract class SqlRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel,
> implements RepositoryPort<Aggregate>
{
  protected tableName: string;

  protected schema: ZodObject<any>;

  constructor(
    private readonly _pool: DatabasePool,
    protected readonly mapper: Mapper<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    //
  }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const records = entities.map(this.mapper.toPersistance);
  }

  /**
   * Start a global transaction to save
   * results of all event hanlders in one operation
   */
  public async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.pool.transaction(async (connection) => {
      if (!RequestCtxService.getTransactionConnection()) {
        RequestCtxService.setTransactionConnection(connection);
      }

      try {
        const result = await handler();

        return result;
      } catch (error: any) {
        //
      } finally {
        RequestCtxService.cleanTransactionConnection();
      }
    });
  }

  /**
   * Utility method for write queries when you need to mutate an entity.
   * Executes entity validation, publishes events,
   * and does some debug logging.
   * For read queries use `this.pool` directly
   *
   * @param sql
   * @param entity
   */
  protected async writeQuery<T extends ZodTypeAny>(
    sql: QuerySqlToken<T>,
    entity: Aggregate | Aggregate[],
  ): Promise<QueryResult<TypeOf<T>>> {
    const entities = Array.isArray(entity) ? entity : [entity];
    entities.forEach((entity) => entity.validate());

    // TODO: Implement logging to display those ids
    const entityIds = entities.map((entity) => entity.id);

    const result = await this.pool.query(sql);

    Promise.all(
      entities.map((entity) => {
        entity.publishEvents(this.eventEmitter);
      }),
    );

    return result;
  }

  protected async generateInsertQuery(models: DbModel[]) {
    const entries = Object.entries(models);
    const values: any = [];
    const propertyNames: IdentifierSqlToken[] = [];

    entries.forEach((entry) => {
      if (entry[0] && entry[1] !== undefined) {
        propertyNames.push(sql.identifier([entry[0]]));
        if (entry[1] instanceof Date) {
          values.push(sql.timestamp(entry[1]));
        } else {
          values.push(entry[1]);
        }
      }
    });
  }

  /**
   * Get database pool.
   * If global request transaction is started
   * returns a transaction pool.
   */
  protected get pool(): DatabasePool | DatabaseTransactionConnection {
    return RequestCtxService.getTransactionConnection() ?? this._pool;
  }
}
