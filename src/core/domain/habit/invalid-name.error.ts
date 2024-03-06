import { BaseError } from '../../error'

export class InvalidNameError extends BaseError {
  private constructor(message: string) {
    super('invalid-name', message)
  }

  static withInvalidValue(name: string): InvalidNameError {
    return new InvalidNameError(`Invalid name: ${name}`)
  }
}
