import { Schedule } from './schedule'
import { HabitId } from './habit.id'
import { Name } from './name'

export class Habit {
  private constructor(
    readonly id: HabitId,
    readonly name: Name,
    readonly schedule: Schedule,
    readonly userId: string,
  ) {}

  static create(
    id: string,
    name: string,
    frequency: number,
    duration: number,
    restTime: number,
    userId: string,
  ): Habit {
    const habitId = HabitId.create(id)
    const habitName = Name.create(name)
    const schedule = Schedule.create(frequency, duration, restTime)

    return new Habit(habitId, habitName, schedule, userId)
  }
}
