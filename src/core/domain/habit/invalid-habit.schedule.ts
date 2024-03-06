import { BaseError } from '../../error'

export class InvalidHabitSchedule extends BaseError {
  private constructor(message: string) {
    super('invalid-habit-duration', message)
  }

  static create(
    frequency: number,
    duration: number,
    restTime: number,
  ): InvalidHabitSchedule {
    return new InvalidHabitSchedule(
      `Invalid habit schedule: frequency ${frequency}, duration ${duration}, rest time ${restTime}`,
    )
  }
}
