export class Paginated<T> {
  take: number;
  page: number;
  count: number;
  data: readonly T[];

  constructor(props: Paginated<T>) {
    this.take = props.take;
    this.page = props.page;
    this.data = props.data;
    this.count = props.count;
  }
}

export type OrderBy = { field: string | true; param: 'asc' | 'desc' };

export type PaginatedQueryParams = {
  take: number;
  page: number;
  offset: number;
  orderBy: OrderBy;
};

export interface RepositoryPort<Entity> {
  insert(entity: Entity | Entity[]): Promise<void>;
}
