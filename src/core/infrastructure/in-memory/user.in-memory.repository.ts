import { User } from 'src/core/domain/user/user'
import { UserRepository } from '../../domain/user/userRepository'

export class UserInMemoryRepository implements UserRepository {
  private users: User[] = []
  save(user: User): void {
    this.users.push(user)
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id)
  }

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username)
  }

  addUsers(users: User[]): UserInMemoryRepository {
    this.users = users
    return this
  }

  isUserSaved(user: User): boolean {
    return this.users.some((u) => u.id === user.id)
  }
}
