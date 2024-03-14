import { v4 as uuidv4 } from 'uuid'
import { validate as uuidValidate } from 'uuid'
import { InvalidIdError } from './invalid-id.error'

export abstract class Id {
  protected constructor(readonly value: string) {}
  static generate(): string {
    return uuidv4()
  }

  protected static guardValidId(value: string): void {
    if (!uuidValidate(value)) {
      throw InvalidIdError.withInvalidValue(value)
    }
  }

  equals(id: Id): boolean {
    return id.value === this.value
  }
}
