import { EventEmitter2 } from '@nestjs/event-emitter';

import { Entity } from './entity.base';
import { DomainEvent } from './domain-event.base';

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
  private _domainEvents: DomainEvent[];

  get domainEvents() {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents() {
    this._domainEvents = [];
  }

  public async publishEvents(eventEmitter: EventEmitter2) {
    Promise.all(
      this.domainEvents.map(async (event) => {
        // TODO: Provide logging
        return eventEmitter.emitAsync(event.constructor.name, event);
      }),
    );

    this.clearEvents();
  }
}
