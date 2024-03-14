import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { Name } from '../../domain/habit/name'
import { HabitId } from 'src/core/domain/habit/habit.id'

export class HabitInMemoryRepository implements HabitRepository {
  habits: Habit[] = []

  findById(id: HabitId): Habit {
    return this.habits.find((habit) => habit.id.equals(id))
  }

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findByName(name: Name): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  setHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits = habits
    return this
  }

  addHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits.push(...habits)
    return this
  }

  isHabitSaved(habit: Habit): boolean {
    return this.habits.some((h) => h.id.equals(habit.id))
  }
}
