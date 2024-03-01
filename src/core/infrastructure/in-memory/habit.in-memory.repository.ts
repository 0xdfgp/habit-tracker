import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'

export class HabitInMemoryRepository implements HabitRepository {
  habits: Habit[] = []

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findByName(name: string): Habit | undefined {
    return this.habits.find((habit) => habit.name === name)
  }

  addHabits(habits: Habit[]): HabitInMemoryRepository {
    this.habits.push(...habits)
    return this
  }

  isHabitSaved(habit: Habit): boolean {
    return this.habits.some((h) => h.id === habit.id)
  }
}
