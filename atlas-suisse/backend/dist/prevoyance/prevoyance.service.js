"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var PrevoyanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrevoyanceService = void 0;
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let PrevoyanceService = PrevoyanceService_1 = class PrevoyanceService {
    logger = new common_1.Logger(PrevoyanceService_1.name);
    encryptionKey = crypto.randomBytes(32);
    iv = crypto.randomBytes(16);
    calculateScoring(data) {
        let score = 50;
        if (data.age >= 30 && data.age <= 50)
            score += 20;
        if (data.revenuAnnuel > 80000)
            score += 15;
        if (data.revenuAnnuel > 120000)
            score += 15;
        if (data.objectifPrincipal === 'Retraite')
            score += 10;
        else if (data.objectifPrincipal === 'Baisse impôts')
            score += 15;
        return Math.min(score, 100);
    }
    encryptData(data) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.encryptionKey, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    processSubmission(dto) {
        this.logger.log('Receiving new prevoyance submission');
        const score = this.calculateScoring(dto);
        this.logger.log(`Calculated Server-Side Scoring: ${score}/100`);
        const sensitiveData = JSON.stringify({
            nom: dto.nom,
            prenom: dto.prenom,
            email: dto.email,
            telephone: dto.telephone,
            revenuAnnuel: dto.revenuAnnuel
        });
        const encryptedData = this.encryptData(sensitiveData);
        this.logger.log(`Data encrypted (AES-256 simulation): ${encryptedData.substring(0, 40)}...`);
        return {
            success: true,
            message: 'Données reçues et traitées de manière sécurisée (nLPD).',
            scoring: score,
            demonstration: {
                encryptedStringLog: encryptedData.substring(0, 40) + '...'
            }
        };
    }
};
exports.PrevoyanceService = PrevoyanceService;
exports.PrevoyanceService = PrevoyanceService = PrevoyanceService_1 = __decorate([
    (0, common_1.Injectable)()
], PrevoyanceService);
//# sourceMappingURL=prevoyance.service.js.map