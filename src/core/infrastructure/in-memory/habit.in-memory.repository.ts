import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'
import { Name } from '../../domain/habit/name'

export class HabitInMemoryRepository implements HabitRepository {
  habits: Habit[] = []

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findByName(name: Name): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  addHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits.push(...habits)
    return this
  }

  isHabitSaved(habit: Habit): boolean {
    return this.habits.some((h) => h.id.equals(habit.id))
  }
}
