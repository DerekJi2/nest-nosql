import { Controller, Get, Render, Param, Logger } from '@nestjs/common';
import { RandomService } from 'src/shared/services/random/random.service';
import { SmsData } from 'src/shared/models/sms-data.interface';
import { MongoClient } from 'mongodb';
import { MongoDbConfigs } from 'src/shared/configs/mongodb.config';

const controller = 'mongodb/seedling';

@Controller(controller)
export class SeedlingController {
    private timeElapsed: number;
    private maxStepCount = 100000;

    constructor(
        public randomService: RandomService,
    ) {
    }

    @Get(':start/:count')
    // @Render(`${controller}/index`)
    index(@Param() params) {
        try {
            this.dbMain(+params.start, +params.count);
        } catch (err) {
            return JSON.stringify(err);
        }
        return `Success! ${this.timeElapsed}`;
    }

    @Get('query')
    query(@Param() params) {
        return this.dbQuery();
    }

    private dbQuery() {
        // db.spw.find({"sent": {"$eq": 0}}).limit(250).count()
        this.timeElapsed = 0;
        MongoClient.connect(MongoDbConfigs.Url, { useUnifiedTopology: true }, (errConnect, mongoClient) => {
            if (errConnect) {
                throw errConnect;
            }

            const dbo = mongoClient.db(MongoDbConfigs.Database);
            const collection = dbo.collection('spw');

            Logger.log('Starting query ...' + new Date());
            collection.find({ sent: { $eq: 0 }}).limit(15).toArray((errQuery, result) => {
                if (errQuery) {
                    throw errQuery;
                }
                Logger.log(result);
                mongoClient.close();
                return result;
            });
        });
    }

    private dbMain(start: number, count: number): void {
        this.timeElapsed = 0;
        MongoClient.connect(MongoDbConfigs.Url, { useUnifiedTopology: true }, (err, mongoClient) => {
            if (err) {
                throw err;
            }

            const dbo = mongoClient.db(MongoDbConfigs.Database);
            const collection = dbo.collection('spw');

            const startTime = new Date().getTime();
            const data = this.generateSeeds(collection, start, count);
            const endTime = new Date().getTime();

            this.timeElapsed = endTime - startTime;

            mongoClient.close();
        });
    }

    private generateSeeds(collection, start: number, count: number): SmsData[] {
        let data: SmsData[] = [];

        if (count > this.maxStepCount) {
            const loops = Math.ceil(count / this.maxStepCount);
            for (let c = 0; c < loops; c++) {
                const loopStart = c * this.maxStepCount  + start;
                const loopCount = (c < loops - 1) ? this.maxStepCount : count % this.maxStepCount;
                const seedsData = this.generateSeeds(collection, loopStart, loopCount);
            }
            return [];
        }

        Logger.log(`${start} -> ${count}`);
        for (let i = start; i < start + count; i++) {
            const item: SmsData = {
                id: i,
                name: this.randomService.randomName(9),
                sent: this.randomService.randomBoolean(3) ? 1 : 0,
            };
            data.push(item);
        }

        if (collection) {
            collection.insertMany(data);
        }

        return [];
    }
}
