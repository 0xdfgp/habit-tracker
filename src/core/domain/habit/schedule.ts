import { InvalidHabitSchedule } from './invalid-habit.schedule'

export class Schedule {
  private constructor(
    readonly frequency: number,
    readonly duration: number,
    readonly restTime: number,
  ) {
    if (duration + restTime > frequency) {
      throw InvalidHabitSchedule.create(frequency, duration, restTime)
    }
  }

  static create(
    frequency: number,
    duration: number,
    restTime: number,
  ): Schedule {
    return new Schedule(frequency, duration, restTime)
  }
}
