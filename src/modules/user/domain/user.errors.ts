export class UserAlreadyExistsError {
  static readonly message = 'User already exists';

  constructor(cause?: Error, metadata?: unknown) {
    //
  }
}
