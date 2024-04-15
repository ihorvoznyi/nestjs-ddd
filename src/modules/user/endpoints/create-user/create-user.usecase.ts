import { Inject, Injectable } from '@nestjs/common';
import { ConflictException } from 'src/core/exceptions';

import { CreateUserCommand } from './create-user.command';
import { USER_REPOSITORY } from '../../user.di-tokens';
import { UserRepositoryPort } from '../../database';
import { UserAlreadyExistsError, UserEntity } from '../../domain';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepositoryPort,
  ) {}

  public async execute(command: CreateUserCommand) {
    const user = UserEntity.create({
      email: command.email,
      password: '',
    });

    try {
      this.userRepo.insert(user);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        throw new UserAlreadyExistsError();
      }

      throw error;
    }
  }
}
