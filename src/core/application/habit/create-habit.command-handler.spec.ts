import { CreateHabitCommandHandler } from './create-habit.command-handler'
import { UserInMemoryRepository } from '../../infrastructure/in-memory/user.in-memory.repository'
import { HabitInMemoryRepository } from '../../infrastructure/in-memory/habit.in-memory.repository'
import { CreateHabitCommand } from './create-habit.command'
import { UserNotFoundError } from '../user-not-found.error'
import { UserMother } from '../../test/user/user.mother'
import { HabitMother } from '../../test/habit/habit.mother'
import { InvalidHabitSchedule } from '../../domain/habit/invalid-habit.schedule'
import { Habit } from '../../domain/habit/habit'
import { DuplicatedHabitNameError } from './duplicated-habit-name.error'
import { v4 as uuidv4 } from 'uuid'
import { InvalidNameError } from '../../domain/habit/invalid-name.error'
import { InvalidIdError } from '../../domain/invalid-id.error'

describe('CreateHabitCommandHandler', () => {
  let habitRepository: HabitInMemoryRepository
  let userRepository: UserInMemoryRepository
  let commandHandler: CreateHabitCommandHandler

  beforeEach(() => {
    habitRepository = new HabitInMemoryRepository()
    userRepository = new UserInMemoryRepository()

    commandHandler = new CreateHabitCommandHandler(
      habitRepository,
      userRepository,
    )
  })

  describe('When the habit is valid and the user exists', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = createCommandFromHabit(habit)

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should save the habit', () => {
      commandHandler.handle(command)

      expect(habitRepository.isHabitSaved(habit)).toBeTruthy()
    })
  })

  describe('when user does not exist', () => {
    const habit = HabitMother.create()
    const command = createCommandFromHabit(habit)

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        UserNotFoundError.withId(habit.userId),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })

  describe('When the habit already exists', () => {
    const existingHabit = HabitMother.create()
    const user = new UserMother().withId(existingHabit.userId).build()
    const habit = new HabitMother().withId(uuidv4()).build()

    const command = createCommandFromHabit(existingHabit)

    beforeEach(() => {
      userRepository.addUsers([user])
      habitRepository.addHabits([existingHabit])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        DuplicatedHabitNameError.withName(command.name),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.isHabitSaved(habit)).toBeFalsy()
    })
  })

  describe('When the habit frequency and rest time are not valid', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = createCommandFromHabit(habit)
    command.duration = 600
    command.restTime = 10
    command.frequency = 600

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidHabitSchedule.create(
          command.frequency,
          command.duration,
          command.restTime,
        ),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })

  describe('When the habit name is not valid', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = createCommandFromHabit(habit)
    command.name = 'a'

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidNameError.withInvalidValue(command.name),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })

  describe('When the habit id is not valid', () => {
    const habit = HabitMother.create()
    const user = new UserMother().withId(habit.userId).build()
    const command = createCommandFromHabit(habit)
    command.id = 'invalid-id'

    beforeEach(() => {
      userRepository.addUsers([user])
    })

    it('should throw an error', () => {
      expect(() => commandHandler.handle(command)).toThrowError(
        InvalidIdError.withInvalidValue(command.id),
      )
    })

    it('should not save the habit', () => {
      try {
        commandHandler.handle(command)
      } catch (error) {}

      expect(habitRepository.habits).toHaveLength(0)
    })
  })
})

function createCommandFromHabit(habit: Habit): CreateHabitCommand {
  return new CreateHabitCommand({
    id: habit.id.value,
    name: habit.name.value,
    frequency: habit.schedule.frequency,
    duration: habit.schedule.duration,
    restTime: habit.schedule.restTime,
    userId: habit.userId,
  })
}
