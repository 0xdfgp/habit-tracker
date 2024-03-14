import { StartChallengeCommand } from './start-challenge.command'
import { HabitRepository } from '../../domain/habit/habit.repository'
import { HabitId } from '../../domain/habit/habit.id'
import { HabitNotFoundError } from '../habit-not-found.error'
import { Challenge } from '../../domain/challenge/challenge'
import { EventPublisher } from '../../domain/event-publisher'

export class StartChallengeCommandHandler {
  constructor(
    readonly habitRepository: HabitRepository,
    readonly eventPublisher: EventPublisher,
  ) {}
  handle(command: StartChallengeCommand): void {
    const habitId = HabitId.create(command.habitId)

    if (!this.habitRepository.findById(habitId)) {
      throw HabitNotFoundError.withId(habitId)
    }

    const challenge = Challenge.createStarted(
      command.challengeId,
      habitId,
      command.target,
      command.startDate,
      command.deadline,
    )

    this.eventPublisher.publish(challenge.releaseEvents())
  }
}
