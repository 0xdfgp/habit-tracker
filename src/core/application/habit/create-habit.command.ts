export class CreateHabitCommand {
  id: string
  name: string
  frequency: number
  duration: number
  restTime: number
  userId: string

  constructor(params: {
    id: string
    name: string
    frequency: number
    duration: number
    restTime: number
    userId: string
  }) {
    this.id = params.id
    this.name = params.name
    this.frequency = params.frequency
    this.duration = params.duration
    this.restTime = params.restTime
    this.userId = params.userId
  }
}
