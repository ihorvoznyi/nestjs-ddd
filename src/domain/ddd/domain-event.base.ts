import { randomUUID } from 'crypto';
import { Guard } from 'src/core/helpers/guard';

type DomainEventMetadata = {
  /** Timestamp when this domain event occured */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events, logs correlation, etc.) */
  readonly correlationId: string;

  /** UserID for debugging and logging purposes */
  readonly userId?: string;
};

export type DomainEventProps<T> = Omit<T, 'id' | 'metadata'> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export abstract class DomainEvent {
  public readonly id: string;

  /** Aggragate ID where domain event occured */
  public readonly aggregateId: string;

  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'DomainEvent props should not be empty',
      );
    }

    this.id = randomUUID();
  }
}
