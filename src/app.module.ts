import { Module } from '@nestjs/common'
import { RegisterUserCommandHandler } from './core/application/user/register-user.command-handler'
import { CreateUserController } from './core/ui/api/create-user.controller'
import { userRepository } from './core/domain/user/userRepository'
import { UserInMemoryRepository } from './core/infrastructure/in-memory/user.in-memory.repository'

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    RegisterUserCommandHandler,
    { provide: userRepository, useClass: UserInMemoryRepository },
  ],
})
export class AppModule {}
