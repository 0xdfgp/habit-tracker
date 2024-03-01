import { User } from './user'

export interface UserRepository {
  save(user: User): void
  findById(id: string): User | undefined
  findByUsername(username: string): User | undefined
}

export const userRepository = Symbol('UserRepository')
