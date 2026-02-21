import { PrevoyanceService } from './prevoyance.service';
import { SubmitPrevoyanceDto } from './dto/submit-prevoyance.dto';
export declare class PrevoyanceController {
    private readonly prevoyanceService;
    constructor(prevoyanceService: PrevoyanceService);
    submitForm(submitPrevoyanceDto: SubmitPrevoyanceDto): {
        success: boolean;
        message: string;
        scoring: number;
        demonstration: {
            encryptedStringLog: string;
        };
    };
}
