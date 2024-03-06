import { Id } from '../id'

export class HabitId extends Id {
  static create(id: string): HabitId {
    return new HabitId(id)
  }
}
