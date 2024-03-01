import { Habit } from '../../domain/habit/habit'
import { v4 as uuidv4 } from 'uuid'

export class HabitMother {
  private id = 'id'
  private habitName = 'name'
  private frequency = 'daily'
  private duration = 1
  private restTime = 1
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

  withId(id: string) {
    this.id = id
    return this
  }
}
