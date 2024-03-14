import { BaseError } from '../error'
import { HabitId } from '../domain/habit/habit.id'

export class ChallengeNotFoundError extends BaseError {
  constructor(message: string) {
    super('challenge-not-found', message)
  }

  static withId(id: HabitId): ChallengeNotFoundError {
    return new ChallengeNotFoundError(`Challenge with id ${id} was not found`)
  }
}
