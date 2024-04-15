import { Module } from '@nestjs/common';
import { USER_ENDPOINTS } from './endpoints';

@Module({
  imports: [],
  providers: [],
  controllers: [...USER_ENDPOINTS],
})
export class UserModule {}
