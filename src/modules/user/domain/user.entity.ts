import { randomUUID } from 'crypto';

import { AggregateRoot } from 'src/domain/ddd';
import { CreateUserProps, UserProps, UserRoles } from './user.types';

type AggregateID = string;

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = randomUUID();
    const props: UserProps = { ...create, role: UserRoles.Member };
    const user = new UserEntity({ id, props });

    // user.addEvent(new UserCreatedDomainEvent({}));

    return user;
  }

  get role(): UserRoles {
    return this.role;
  }

  private changeRole(newRole: UserRoles): void {
    this.props.role = newRole;
  }

  makeMember() {
    this.changeRole(UserRoles.Member);
  }

  makePremium() {
    this.changeRole(UserRoles.Premium);
  }

  delete(): void {
    //
  }

  public validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
