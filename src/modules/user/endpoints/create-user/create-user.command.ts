import { Command, CommandProps } from 'src/domain/ddd';

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
  }

  readonly email: string;
  readonly password: string;
}
