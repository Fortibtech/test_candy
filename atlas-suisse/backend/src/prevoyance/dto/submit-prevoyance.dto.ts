import { IsString, IsNumber, IsBoolean, IsNotEmpty, IsEmail } from 'class-validator';

export class SubmitPrevoyanceDto {
    // Etape 1: Situation
    @IsString()
    @IsNotEmpty()
    statutCivil: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    canton: string;

    // Etape 2: Objectif
    @IsString()
    @IsNotEmpty()
    objectifPrincipal: string;

    // Etape 3: Revenu
    @IsNumber()
    @IsNotEmpty()
    revenuAnnuel: number;

    // Etape 4: Coordonnées
    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    prenom: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    telephone: string;

    @IsBoolean()
    nLpdConsent: boolean;
}
