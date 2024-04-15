import { randomUUID } from 'crypto';

import { Guard } from 'src/core/helpers/guard';
import { RequestCtxService } from 'src/core/application/context';
import { ArgumentInvalidException as ArgumentNotProvidedException } from 'src/core/exceptions/exceptions';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;
export type test = Partial<Command>;

type CommandMetadata = {
  /**
   * ID for correlation purposes (for commands that
   * arrive from other microservices, logs, correlations, etc.)
   */
  readonly correlationId: string;

  /**
   * ID for a user who invoker the command. Can be useful
   * for logging and tracking execution of commands and events
   */
  readonly userId?: string;

  /**
   * Time when the command occured.
   * Mostly for tracing purposes.
   */
  readonly timestamp: number;
};

export class Command {
  constructor(props: CommandProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'Command props should not be empty.',
      );
    }

    const ctx = RequestCtxService.getContext();
    this.id = props.id || randomUUID();
    this.metadata = {
      userId: props?.metadata?.userId,
      correlationId: props?.metadata?.correlationId || ctx.requiestId,
      timestamp: props?.metadata?.timestamp || Date.now(),
    };
  }

  /**
   * Command id, in case if we want to save it
   * for auditing purposes and create a correlation chain
   */
  readonly id: string;

  readonly metadata: CommandMetadata;
}
