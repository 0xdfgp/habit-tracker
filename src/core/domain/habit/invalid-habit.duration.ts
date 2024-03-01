import { BaseError } from '../../error'

export class InvalidHabitDuration extends BaseError {
  private constructor(message: string) {
    super('invalid-habit-duration', message)
  }

  static withFrequencyAndDuration(frequency: string, duration: number) {
    return new InvalidHabitDuration(
      `Duration ${duration} is invalid for frequency ${frequency}`,
    )
  }
}
