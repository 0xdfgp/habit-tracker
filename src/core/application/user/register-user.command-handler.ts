import { RegisterUserCommand } from './register-user.command'
import { Inject, Injectable } from '@nestjs/common'
import {
  UserRepository,
  userRepository,
} from '../../domain/user/userRepository'
import { User } from '../../domain/user/user'
import { UserAlreadyExistsError } from './user-already-exists.error'

@Injectable()
export class RegisterUserCommandHandler {
  constructor(
    @Inject(userRepository) private readonly repository: UserRepository,
  ) {}

  handle(command: RegisterUserCommand) {
    if (this.repository.findByUsername(command.username)) {
      throw UserAlreadyExistsError.withUsername(command.username)
    }

    const user = new User(command.id, command.username, command.fullname)

    this.repository.save(user)
  }
}
