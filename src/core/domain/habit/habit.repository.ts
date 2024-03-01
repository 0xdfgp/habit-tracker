import { Habit } from './habit'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: string): Habit | undefined
}
