export class StartChallengeCommand {
  constructor(
    readonly challengeId: string,
    readonly habitId: string,
    readonly target: number,
    readonly startDate: Date,
    readonly deadline: Date,
  ) {}
}
