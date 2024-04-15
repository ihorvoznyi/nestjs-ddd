import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { routesV1 } from 'src/core/configs/api';
import { UserAlreadyExistsError } from '../../domain';

import { CreateUserRequestDto } from './create-user.request';
import { CreateUserCommand } from './create-user.command';
import { CreateUserUseCase } from './create-user.usecase';

@Controller(routesV1.version)
export class CreateUserEndpoint {
  constructor(private handler: CreateUserUseCase) {
    //
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
  })
  @Post(routesV1.user.root)
  async create(@Body() body: CreateUserRequestDto) {
    const command = new CreateUserCommand(body);
    const result = await this.handler.execute(command);
    return result;
  }
}
