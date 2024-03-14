import { DomainEvent } from '../domain.event'
import { HabitId } from './habit.id'
import { Habit } from './habit'

export type HabitWasCreatedPayload = {
  readonly id: string
  readonly name: string
  readonly frequency: number
  readonly duration: number
  readonly restTime: number
  readonly userId: string
}

export class HabitWasCreatedEvent extends DomainEvent<HabitWasCreatedPayload> {
  private constructor(habitId: HabitId, payload: HabitWasCreatedPayload) {
    super(habitId, HabitWasCreatedEvent.name, payload)
  }

  static fromHabit(habit: Habit): HabitWasCreatedEvent {
    return new HabitWasCreatedEvent(habit.id, {
      id: habit.id.value,
      name: habit.name.value,
      frequency: habit.schedule.frequency,
      duration: habit.schedule.duration,
      restTime: habit.schedule.restTime,
      userId: habit.userId,
    })
  }
}
