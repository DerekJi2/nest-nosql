import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomService } from './shared/services/random/random.service';
import { SeedlingController } from './mongodb/seedling/seedling.controller';
import { MongoDbConfigs } from './shared/configs/mongodb.config';

@Module({
  imports: [
    // MongooseModule.forRoot(`${MongoDbConfigs.Url}/${MongoDbConfigs.Database}`),
  ],
  controllers: [AppController, SeedlingController],
  providers: [AppService, RandomService],
})
export class AppModule {}
