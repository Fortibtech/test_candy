import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(registerDto: RegisterDto) {
        console.log('Registering user:', registerDto.email);
        try {
            // Check if user exists
            const existingUser = await this.prisma.user.findUnique({ where: { email: registerDto.email } });
            if (existingUser) {
                console.log('User exists');
                throw new ConflictException('User already exists');
            }

            console.log('Hashing password...');
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);

            console.log('Creating user in DB...');
            const user = await this.prisma.user.create({
                data: {
                    email: registerDto.email,
                    password: hashedPassword,
                    name: registerDto.name,
                },
            });
            console.log('User created:', user.id);

            return this.login(user);
        } catch (error) {
            console.error('Error in register:', error);
            throw error;
        }
    }
}
