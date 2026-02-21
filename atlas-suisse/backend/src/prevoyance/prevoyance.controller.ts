import { Controller, Post, Body } from '@nestjs/common';
import { PrevoyanceService } from './prevoyance.service';
import { SubmitPrevoyanceDto } from './dto/submit-prevoyance.dto';

@Controller('prevoyance')
export class PrevoyanceController {
    constructor(private readonly prevoyanceService: PrevoyanceService) { }

    @Post('submit')
    submitForm(@Body() submitPrevoyanceDto: SubmitPrevoyanceDto) {
        return this.prevoyanceService.processSubmission(submitPrevoyanceDto);
    }
}
