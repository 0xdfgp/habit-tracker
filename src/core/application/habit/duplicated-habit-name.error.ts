import { BaseError } from '../../error'

export class DuplicatedHabitNameError extends BaseError {
  private constructor(message: string) {
    super('duplicated-habit-name', message)
  }

  static withName(name: string): DuplicatedHabitNameError {
    return new DuplicatedHabitNameError(
      `Habit with name ${name} already exists`,
    )
  }
}
