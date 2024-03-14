import { Schedule } from './schedule'
import { HabitId } from './habit.id'
import { Name } from './name'
import { AggregateRoot } from '../aggregate-root'
import { HabitWasCreatedEvent } from './habit-was-created.event'

export class Habit extends AggregateRoot {
  readonly id: HabitId
  readonly name: Name
  readonly schedule: Schedule
  readonly userId: string

  private constructor(
    id: HabitId,
    name: Name,
    schedule: Schedule,
    userId: string,
  ) {
    super()
    this.userId = userId
    this.schedule = schedule
    this.name = name
    this.id = id
  }

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

    const habit = new Habit(habitId, habitName, schedule, userId)
    habit.recordEvent(HabitWasCreatedEvent.fromHabit(habit))

    return habit
  }
}
