import { Injectable, Logger } from '@nestjs/common';
import { SubmitPrevoyanceDto } from './dto/submit-prevoyance.dto';
import * as crypto from 'crypto';

@Injectable()
export class PrevoyanceService {
    private readonly logger = new Logger(PrevoyanceService.name);

    // Simulation AES-256 Key & IV
    private readonly encryptionKey = crypto.randomBytes(32);
    private readonly iv = crypto.randomBytes(16);

    calculateScoring(data: SubmitPrevoyanceDto): number {
        let score = 50; // Base score

        if (data.age >= 30 && data.age <= 50) score += 20;
        if (data.revenuAnnuel > 80000) score += 15;
        if (data.revenuAnnuel > 120000) score += 15;
        if (data.objectifPrincipal === 'Retraite') score += 10;
        else if (data.objectifPrincipal === 'Baisse impôts') score += 15;

        return Math.min(score, 100);
    }

    encryptData(data: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    processSubmission(dto: SubmitPrevoyanceDto) {
        this.logger.log('Receiving new prevoyance submission');

        // 1. Scoring calculation
        const score = this.calculateScoring(dto);
        this.logger.log(`Calculated Server-Side Scoring: ${score}/100`);

        // 2. Encrypt sensitive data
        const sensitiveData = JSON.stringify({
            nom: dto.nom,
            prenom: dto.prenom,
            email: dto.email,
            telephone: dto.telephone,
            revenuAnnuel: dto.revenuAnnuel
        });

        const encryptedData = this.encryptData(sensitiveData);
        this.logger.log(`Data encrypted (AES-256 simulation): ${encryptedData.substring(0, 40)}...`);

        // 3. Return result to client
        return {
            success: true,
            message: 'Données reçues et traitées de manière sécurisée (nLPD).',
            scoring: score,
            demonstration: {
                encryptedStringLog: encryptedData.substring(0, 40) + '...'
            }
        };
    }
}
