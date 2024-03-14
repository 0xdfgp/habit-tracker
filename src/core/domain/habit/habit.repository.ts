import { Habit } from './habit'
import { Name } from './name'
import { HabitId } from './habit.id'

export interface HabitRepository {
  save(habit: Habit): void
  findByName(name: Name): Habit | undefined
  findById(id: HabitId): Habit | undefined
}
