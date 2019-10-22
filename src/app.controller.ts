import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RandomService } from './shared/services/random/random.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly randomService: RandomService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello() + ' ' + this.randomService.randomName(5);
  }
}
