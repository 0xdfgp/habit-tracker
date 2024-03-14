import { Id } from '../id'

export class ChallengeId extends Id {
  protected constructor(value: string) {
    super(value)
  }

  static create(value: string): ChallengeId {
    this.guardValidId(value)
    return new ChallengeId(value)
  }

  static empty(): ChallengeId {
    return new ChallengeId('')
  }
}
