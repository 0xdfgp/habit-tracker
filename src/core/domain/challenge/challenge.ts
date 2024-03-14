import { EventSourcedEntity } from '../event-sourced.entity'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ChallengeState } from './challenge-state'
import { ProgressLoggedEvent } from './progress-logged.event'
import { ChallengeCompletedEvent } from './challenge-completed.event'
import { ChallengeId } from './challenge.id'
import { HabitId } from '../habit/habit.id'
import { DomainEvent } from '../domain.event'

export class Challenge extends EventSourcedEntity {
  private challengeState: ChallengeState

  private constructor(stream: Array<DomainEvent> = []) {
    super(stream)
    if (stream.length === 0) {
      this.challengeState = ChallengeState.empty()
    }
  }
  protected when(e: DomainEvent): void {
    switch (e.type) {
      case ChallengeStartedEvent.Type:
        this.whenChallengeStarted(e as unknown as ChallengeStartedEvent)
        break
      case ProgressLoggedEvent.Type:
        this.whenProgressLogged(e as unknown as ProgressLoggedEvent)
        break
      case ChallengeCompletedEvent.Type:
        this.whenChallengeCompleted(e as unknown as ChallengeCompletedEvent)
        break
      default:
        throw new Error('Unknown event type')
    }
  }

  private whenChallengeStarted(event: ChallengeStartedEvent) {
    this.challengeState = this.challengeState.withChallengeStarted(event)
  }

  private whenProgressLogged(event: ProgressLoggedEvent) {
    this.challengeState = this.challengeState.withProgressLogged(event)
  }

  private whenChallengeCompleted(event: ChallengeCompletedEvent) {
    this.challengeState = this.challengeState.withChallengeCompleted(event)
  }

  isPending(): boolean {
    return this.challengeState.isPending()
  }
  private hasReachedTheGoal(): boolean {
    return this.challengeState.hasReachedTheTarget()
  }

  static create(stream: Array<DomainEvent>): Challenge {
    return new Challenge(stream)
  }

  static createStarted(
    id: string,
    habitId: HabitId,
    target: number,
    startDate: Date,
    deadline: Date,
  ): Challenge {
    const challengeId = ChallengeId.create(id)
    const challenge = new Challenge()

    challenge.start(challengeId, habitId, target, startDate, deadline)
    return challenge
  }

  start(
    id: ChallengeId,
    habitId: HabitId,
    target: number,
    startDate: Date,
    deadline: Date,
  ): void {
    if (this.isPending()) {
      return
    }

    this.apply(
      ChallengeStartedEvent.with(id, habitId, target, startDate, deadline),
    )
  }

  logProgress(date: Date, progress: number): void {
    if (!this.isPending()) {
      throw new Error('Cannot log progress on a challenge that is not pending')
    }

    // We can check if the event has been already applied if necessary
    this.apply(ProgressLoggedEvent.with(this.challengeState.id, progress, date))

    if (this.hasReachedTheGoal()) {
      this.apply(ChallengeCompletedEvent.with(this.challengeState.id, date))
    }
  }
}
