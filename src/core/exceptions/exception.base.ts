export interface SerializedException {
  correlationId: string;
  code: string;
  message: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
  /**
   * ^ Consider adding optional `metadata` object to
   *  exceptions (if language doesn't support anything
   *  similiar by default) and pass some useful technical
   *  information about the exception when throwing.
   *  This will make debugging easier.
   */
}

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class ExceptionBase
 * @extends Error
 */
export abstract class ExceptionBase extends Error {
  /** exception code are used here */
  abstract code: string;

  public readonly correlationId: string;

  /**
   *
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}]
   * **BE CAREFUL** not to include sensitive info in `metadata`
   *  to prevent leaks since all exception's data will end up
   *  in application's log files. Only include non-sensitive
   *  info that may help with debugging.
   */
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON() {
    return {
      code: this.code,
      message: this.message,
      correlationId: this.correlationId,
      cause: this.cause,
      stack: this.stack,
      metadata: this.metadata,
    };
  }
}
