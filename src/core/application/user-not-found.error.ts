import { BaseError } from '../error'

export class UserNotFoundError extends BaseError {
  private constructor(message: string) {
    super('user-not-found', message)
  }

  static withId(userId: string): UserNotFoundError {
    return new UserNotFoundError(`User with id ${userId} not found`)
  }
}
