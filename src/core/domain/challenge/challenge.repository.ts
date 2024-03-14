import { ChallengeId } from './challenge.id'
import { Challenge } from './challenge'
import { HabitId } from '../habit/habit.id'

export interface ChallengeRepository {
  findById(id: ChallengeId): Challenge

  findAllPendingByHabitId(habitId: HabitId): Array<Challenge>
}
