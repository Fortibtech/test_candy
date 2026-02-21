"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrevoyanceController = void 0;
const common_1 = require("@nestjs/common");
const prevoyance_service_1 = require("./prevoyance.service");
const submit_prevoyance_dto_1 = require("./dto/submit-prevoyance.dto");
let PrevoyanceController = class PrevoyanceController {
    prevoyanceService;
    constructor(prevoyanceService) {
        this.prevoyanceService = prevoyanceService;
    }
    submitForm(submitPrevoyanceDto) {
        return this.prevoyanceService.processSubmission(submitPrevoyanceDto);
    }
};
exports.PrevoyanceController = PrevoyanceController;
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_prevoyance_dto_1.SubmitPrevoyanceDto]),
    __metadata("design:returntype", void 0)
], PrevoyanceController.prototype, "submitForm", null);
exports.PrevoyanceController = PrevoyanceController = __decorate([
    (0, common_1.Controller)('prevoyance'),
    __metadata("design:paramtypes", [prevoyance_service_1.PrevoyanceService])
], PrevoyanceController);
//# sourceMappingURL=prevoyance.controller.js.map