import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Env } from './env.interfaces';

@Injectable()
export class EnvService {
  constructor(private configService: NestConfigService<Env>) {
    //
  }

  get<T extends keyof Env>(key: T) {
    return this.configService.get(key);
  }
}
