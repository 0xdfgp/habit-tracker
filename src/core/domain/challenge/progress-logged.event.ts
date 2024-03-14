import { ChallengeId } from './challenge.id'
import { DomainEvent } from '../domain.event'

export type ProgressLoggedPayload = {
  readonly challengeId: string
  readonly progress: number
  readonly date: Date
}

export class ProgressLoggedEvent extends DomainEvent<ProgressLoggedPayload> {
  static readonly Type = 'ProgressLogged'

  private constructor(
    challengeId: ChallengeId,
    payload: ProgressLoggedPayload,
  ) {
    super(challengeId, ProgressLoggedEvent.Type, payload)
  }

  static with(
    challengeId: ChallengeId,
    progress: number,
    date: Date,
  ): ProgressLoggedEvent {
    return new ProgressLoggedEvent(challengeId, {
      challengeId: challengeId.value,
      progress: progress,
      date: date,
    })
  }
}
