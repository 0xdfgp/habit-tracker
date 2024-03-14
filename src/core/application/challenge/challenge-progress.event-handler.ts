import { ChallengeRepository } from '../../domain/challenge/challenge.repository'
import { EventPublisher } from '../../domain/event-publisher'
import { HabitId } from '../../domain/habit/habit.id'
import { DomainEvent } from '../../domain/domain.event'

export class ChallengeProgressEvent {
  constructor(
    readonly habitId: string,
    readonly progress: number,
    readonly date: Date,
  ) {}
}

export class ChallengeProgressEventHandler {
  constructor(
    readonly challengeRepository: ChallengeRepository,
    readonly eventPublisher: EventPublisher,
  ) {}

  handle(command: ChallengeProgressEvent): void {
    const habitId = HabitId.create(command.habitId)

    const challenges = this.challengeRepository.findAllPendingByHabitId(habitId)

    const events: DomainEvent[] = []

    challenges.forEach((challenge) => {
      challenge.logProgress(command.date, command.progress)
      events.push(...challenge.releaseEvents())
    })

    this.eventPublisher.publish(events)
  }
}
