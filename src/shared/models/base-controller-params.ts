import { AppService } from 'src/app.service';
import { RandomService } from '../services/random/random.service';

export class BaseControllerParams {
    constructor(
        public appService: AppService,
        public randomService: RandomService,
    ) {

    }
}
