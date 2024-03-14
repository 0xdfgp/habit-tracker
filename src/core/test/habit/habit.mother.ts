import { Habit } from '../../domain/habit/habit'
import { v4 as uuidv4 } from 'uuid'
import { HabitId } from '../../domain/habit/habit.id'

export class HabitMother {
  private id = HabitId.generate()
  private habitName = 'name'
  private frequency = 86400
  private duration = 60
  private restTime = 600
  private userId = uuidv4()

  build(): Habit {
    return Habit.create(
      this.id,
      this.habitName,
      this.frequency,
      this.duration,
      this.restTime,
      this.userId,
    )
  }

  static create(): Habit {
    return new HabitMother().build()
  }

  static createWithId(id: string): Habit {
    return new HabitMother().withId(id).build()
  }

  withId(id: string) {
    this.id = id
    return this
  }
}
