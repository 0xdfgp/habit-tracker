import { InvalidHabitDuration } from './invalid-habit.duration'

export class Habit {
  private constructor(
    readonly id: string,
    readonly name: string,
    readonly frequency: string,
    readonly duration: number,
    readonly restTime: number,
    readonly userId: string,
  ) {}

  static create(
    id: string,
    name: string,
    frequency: string,
    duration: number,
    restTime: number,
    userId: string,
  ): Habit {
    if (frequency === 'daily' && duration > 1440) {
      throw InvalidHabitDuration.withFrequencyAndDuration(frequency, duration)
    }

    return new Habit(id, name, frequency, duration, restTime, userId)
  }
}
