import { InMemoryEventPublisher } from '../../infrastructure/in-memory/in-memory.event-publisher'
import { HabitInMemoryRepository } from '../../infrastructure/in-memory/habit.in-memory.repository'
import { StartChallengeCommandHandler } from './start-challenge.command-handler'
import { HabitMother } from '../../test/habit/habit.mother'
import { StartChallengeCommand } from './start-challenge.command'

import { ChallengeStartedEvent } from '../../domain/challenge/challenge-started.event'
import { Id } from '../../domain/id'

describe('StartChallengeCommandHandler', () => {
  let eventPublisher: InMemoryEventPublisher
  let habitRepository: HabitInMemoryRepository
  let commandHandler: StartChallengeCommandHandler

  beforeEach(() => {
    eventPublisher = new InMemoryEventPublisher()
    habitRepository = new HabitInMemoryRepository()
    commandHandler = new StartChallengeCommandHandler(
      habitRepository,
      eventPublisher,
    )
  })

  describe('When the habit exists and the challenge is valid', () => {
    const command = createCommand()
    const habit = HabitMother.createWithId(command.habitId)

    beforeEach(() => {
      habitRepository.setHabits([habit])
    })

    it('should start the challenge', () => {
      commandHandler.handle(command)

      expect(
        eventPublisher.hasPublishedEvent(
          ChallengeStartedEvent.Type,
          command.challengeId,
        ),
      ).toBeTruthy()
    })

    it('should not generate any other events', () => {
      commandHandler.handle(command)

      expect(eventPublisher.publishedEvents).toHaveLength(1)
    })
  })

  describe('When the habit does not exist', () => {
    const command = createCommand()

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError()
    })

    it('should not generate any events', () => {
      expect(eventPublisher.publishedEvents).toHaveLength(0)
    })
  })
})

function createCommand(): StartChallengeCommand {
  return new StartChallengeCommand(
    Id.generate(),
    Id.generate(),
    10,
    new Date(),
    new Date(),
  )
}
