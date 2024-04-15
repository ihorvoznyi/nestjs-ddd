import {
  CONFLICT,
  NOT_FOUND,
  ARGUMENT_INVALID,
  ARGUMENT_NOT_PROVIDED,
  INTERNAL_SERVER_ERROR,
  ARGUMENT_OUT_OF_RANGE,
} from './exception.codes';
import { ExceptionBase } from './exception.base';

/**
 * Used to indicate that an argument was not provided (is empty object/array, null or undefined).
 *
 * @class ArgumentNotProvidedException
 * @extends {ExceptionBase}
 */
export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

/**
 * Used to indicate that an incorrect argument was provided to a method/function/class constructor.
 *
 * @class ArgumentInvalidException
 * @extends {ExceptionBase}
 */
export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
}

/**
 * Used to indicate that an argument exceeded range limitation.
 * (for example: incorrect string/array length, number not is allowed min/max range etc.)
 *
 * @class ArgumentOutOfRangeException
 * @extends {ExceptionBase}
 */
export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

/**
 * Used to indicate that entity is not found
 *
 * @class NotFoundException
 * @extends {ExceptionBase}
 */
export class NotFoundException extends ExceptionBase {
  static readonly message = 'Not found';

  constructor(message = NotFoundException.message) {
    super(message);
  }

  readonly code = NOT_FOUND;
}

/**
 * Used to indicate conflict entities (usually in the database)
 *
 * @class ConflictException
 * @extends {ExceptionBase}
 */
export class ConflictException extends ExceptionBase {
  static readonly message = 'Conflict happened during operation execution';

  constructor(message = ConflictException.message) {
    super(message);
  }

  readonly code = CONFLICT;
}

/**
 * Used to indicate an internal server error that does not fall under all other errors
 *
 * @class InternalServerErrorException
 * @extends {ExceptionBase}
 */
export class InternalServerErrorException extends ExceptionBase {
  static readonly message = 'Internal server error';

  constructor(message = InternalServerErrorException.message) {
    super(message);
  }

  readonly code = INTERNAL_SERVER_ERROR;
}
