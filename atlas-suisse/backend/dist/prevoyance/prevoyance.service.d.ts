import { SubmitPrevoyanceDto } from './dto/submit-prevoyance.dto';
export declare class PrevoyanceService {
    private readonly logger;
    private readonly encryptionKey;
    private readonly iv;
    calculateScoring(data: SubmitPrevoyanceDto): number;
    encryptData(data: string): string;
    processSubmission(dto: SubmitPrevoyanceDto): {
        success: boolean;
        message: string;
        scoring: number;
        demonstration: {
            encryptedStringLog: string;
        };
    };
}
