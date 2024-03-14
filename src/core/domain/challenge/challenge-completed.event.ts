import { ChallengeId } from './challenge.id'
import { DomainEvent } from '../domain.event'

export type ChallengeCompletedPayload = {
  readonly challengeId: string
  readonly date: Date
}

export class ChallengeCompletedEvent extends DomainEvent<ChallengeCompletedPayload> {
  static readonly Type = 'ProgressCompleted'

  private constructor(
    challengeId: ChallengeId,
    payload: ChallengeCompletedPayload,
  ) {
    super(challengeId, ChallengeCompletedEvent.Type, payload)
  }

  static with(challengeId: ChallengeId, date: Date): ChallengeCompletedEvent {
    return new ChallengeCompletedEvent(challengeId, {
      challengeId: challengeId.value,
      date,
    })
  }
}
