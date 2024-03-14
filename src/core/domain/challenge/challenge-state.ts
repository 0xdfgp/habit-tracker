import { ChallengeId } from './challenge.id'
import { HabitId } from '../habit/habit.id'
import { ChallengeStatus } from './challenge.status'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ProgressLoggedEvent } from './progress-logged.event'
import { ChallengeCompletedEvent } from './challenge-completed.event'

export class ChallengeState {
  constructor(
    readonly id: ChallengeId,
    readonly habitId: HabitId,
    readonly target: number,
    readonly startDate: Date,
    readonly deadline: Date,
    readonly progress: number,
    readonly status: ChallengeStatus,
    readonly lastUpdate: Date,
  ) {}

  static empty(): ChallengeState {
    return new ChallengeState(
      ChallengeId.empty(),
      HabitId.empty(),
      0,
      new Date(),
      new Date(),
      0,
      ChallengeStatus.empty(),
      new Date(),
    )
  }

  withChallengeStarted(event: ChallengeStartedEvent): ChallengeState {
    return new ChallengeState(
      event.id,
      HabitId.create(event.payload.habitId),
      event.payload.target,
      event.payload.startDate,
      event.payload.deadline,
      0,
      ChallengeStatus.pending(),
      event.payload.startDate,
    )
  }

  withProgressLogged(event: ProgressLoggedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.startDate,
      this.deadline,
      this.progress + event.payload.progress,
      this.status,
      event.payload.date,
    )
  }

  withChallengeCompleted(event: ChallengeCompletedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.startDate,
      this.deadline,
      this.progress,
      ChallengeStatus.completed(),
      event.payload.date,
    )
  }

  hasReachedTheTarget() {
    return this.target <= this.progress
  }

  isPending() {
    return this.status.isPending()
  }
}
