import { BaseError } from '../error'
import { HabitId } from '../domain/habit/habit.id'

export class HabitNotFoundError extends BaseError {
  constructor(message: string) {
    super('habit-not-found', message)
  }

  static withId(id: HabitId): HabitNotFoundError {
    return new HabitNotFoundError(`Habit with id ${id} was not found`)
  }
}
