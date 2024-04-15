import { IsEmail, IsString, Max, Min } from 'class-validator';

export class CreateUserRequestDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Min(3)
  @Max(50)
  password: string;
}
