import { Module } from '@nestjs/common';
import { PrevoyanceController } from './prevoyance.controller';
import { PrevoyanceService } from './prevoyance.service';

@Module({
    controllers: [PrevoyanceController],
    providers: [PrevoyanceService],
})
export class PrevoyanceModule { }
