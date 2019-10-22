import { Controller, Injectable } from '@nestjs/common';
import { BaseControllerParams } from 'src/shared/models/base-controller-params';

export abstract class MyBaseController {
    constructor(
        protected readonly bcp: BaseControllerParams,
    ) {

    }

    get appService() {
        return this.bcp.appService;
    }

    get randomService() {
        return this.bcp.randomService;
    }
}
