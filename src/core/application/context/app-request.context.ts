import { RequestContext } from 'nestjs-request-context';
import { DatabaseTransactionConnection } from 'slonik';

export class AppRequestCtx extends RequestContext {
  requiestId: string;
  transactionConnection?: DatabaseTransactionConnection; // For global transactions
}

export class RequestCtxService {
  static getContext(): AppRequestCtx {
    return RequestContext.currentContext.req;
  }

  static setRequestId(id: string) {
    const ctx = this.getContext();
    ctx.requiestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requiestId;
  }

  static setTransactionConnection(connection: DatabaseTransactionConnection) {
    const ctx = this.getContext();
    ctx.transactionConnection = connection;
  }

  static getTransactionConnection() {
    const ctx = this.getContext();
    return ctx.transactionConnection;
  }

  static cleanTransactionConnection(): void {
    const ctx = this.getContext();
    ctx.transactionConnection = undefined;
  }
}
