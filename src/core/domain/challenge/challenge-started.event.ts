import { ChallengeId } from './challenge.id'
import { HabitId } from '../habit/habit.id'
import { DomainEvent } from '../domain.event'

export type ChallengeStartedPayload = {
  readonly challengeId: string
  readonly habitId: string
  readonly target: number
  readonly startDate: Date
  readonly deadline: Date
}

export class ChallengeStartedEvent extends DomainEvent<ChallengeStartedPayload> {
  static readonly Type = 'ChallengeStarted'

  private constructor(id: ChallengeId, payload: ChallengeStartedPayload) {
    super(id, ChallengeStartedEvent.Type, payload)
  }

  static with(
    challengeId: ChallengeId,
    habitId: HabitId,
    target: number,
    startDate: Date,
    deadline: Date,
  ): ChallengeStartedEvent {
    return new ChallengeStartedEvent(challengeId, {
      challengeId: challengeId.value,
      habitId: habitId.value,
      target,
      startDate,
      deadline,
    })
  }
}
