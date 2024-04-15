import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'joh.doe@gmail.com',
    description: "User's email",
  })
  email: string;
}
