import { Injectable } from '@nestjs/common';

import { Mapper } from 'src/domain/ddd';
import { UserModel } from './database';
import { UserEntity } from './domain';
import { UserResponseDto } from './dtos';

@Injectable()
export class UserMapper
  implements Mapper<UserEntity, UserModel, UserResponseDto>
{
  toPersistance(entity: UserEntity): UserModel {
    throw new Error('Method not implemented.');
  }

  toDomain(record: UserModel): UserEntity {
    throw new Error('Method not implemented.');
  }

  toResponse(entity: UserEntity): UserResponseDto {
    throw new Error('Method not implemented.');
  }
}
