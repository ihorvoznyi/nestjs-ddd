import { z } from 'zod';
import { Injectable } from '@nestjs/common';

import { UserEntity } from '../domain';
import { RepositoryPort } from 'src/domain/ddd/repository.port';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  password: z.string().min(3).max(20),
  createdAt: z.preprocess((val: any) => new Date(val), z.date()),
  updatedAt: z.preprocess((val: any) => new Date(val), z.date()),
});

export type UserModel = z.infer<typeof userSchema>;

@Injectable()
export class UserRepository implements RepositoryPort<UserEntity> {
  insert(entity: UserEntity | UserEntity[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
