import { DomainEvent } from './domain.event'

export abstract class EventSourcedEntity {
  private appliedEvents: DomainEvent[] = []
  private version: number

  protected constructor(stream?: Array<DomainEvent>) {
    if (stream) {
      stream.forEach((e) => {
        this.when(e)
      })
      this.version = stream.length
    } else {
      this.version = 0
    }

    this.appliedEvents = []
  }

  protected apply(e: DomainEvent): void {
    this.appliedEvents.push(e)
    this.when(e)
  }

  protected abstract when(e: DomainEvent): void

  releaseEvents(): DomainEvent[] {
    const events = this.appliedEvents
    this.appliedEvents = []
    return events
  }
}
