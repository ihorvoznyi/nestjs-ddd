import { RepositoryPort } from 'src/domain/ddd/repository.port';
import { UserEntity } from '../domain';

export type UserRepositoryPort = RepositoryPort<UserEntity>;
