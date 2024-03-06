import { Habit } from './habit'
import { Name } from './name'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: Name): Habit | undefined
}
