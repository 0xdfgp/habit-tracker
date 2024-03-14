import { Id } from './id'
import { EventId } from './event.id'

type Primitive = string | number | boolean | null | Date
type Map = { [key: string]: Primitive }

export abstract class DomainEvent<Payload extends Map = Map> {
  readonly id: Id
  readonly aggregateId: Id
  readonly type: string
  readonly payload: Payload
  readonly occurredAt: Date
  readonly version: number

  protected constructor(
    aggregateId: Id,
    type: string,
    payload: Payload,
    version: number = 1,
  ) {
    this.id = EventId.new()
    this.aggregateId = aggregateId
    this.type = type
    this.payload = payload
    this.occurredAt = new Date()
    this.version = version
  }
}
