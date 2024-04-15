import { Module } from '@nestjs/common';
import { APP_MODULES } from './modules';

@Module({
  imports: [...APP_MODULES],
  controllers: [],
})
export class AppModule {}
