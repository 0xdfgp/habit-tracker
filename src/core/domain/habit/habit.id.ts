import { Id } from '../id'

export class HabitId extends Id {
  static create(id: string): HabitId {
    this.guardValidId(id)
    return new HabitId(id)
  }

  static empty() {
    return new HabitId('')
  }
}
