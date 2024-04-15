import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from 'src/core/exceptions/exceptions';
import { Guard } from 'src/core/helpers/guard';

export type AggregateID = string;

export interface BaseEntityProps {
  id: AggregateID;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateID;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    this.props = props;

    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;

    this.validate();
  }

  protected readonly props: EntityProps;

  protected abstract _id: AggregateID;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateID {
    return this._id;
  }

  private setId(id: AggregateID): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public quals(object?: Entity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  public getProps(): EntityProps & BaseEntityProps {
    const props = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };

    return Object.freeze(props);
  }

  // public toObject(): unknown {
  //   //
  // }

  /**
   * There are certain rules that always have to be true (invariants)
   * for each entity. Validate is called every time before
   * saving an entity to the database to make sure those rules are respected.
   */
  public abstract validate(): void;

  private validateProps(props: EntityProps): void {
    const MAX_PROPS = 50;

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Entity props must not be empty.');
    }

    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Entity props must be an object');
    }

    if (Object.keys(props).length > MAX_PROPS) {
      throw new ArgumentOutOfRangeException(
        `Entity props must be in range of ${MAX_PROPS} properties`,
      );
    }
  }
}
