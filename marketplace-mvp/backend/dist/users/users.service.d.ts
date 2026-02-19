import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    update(id: number, data: {
        name?: string;
        bio?: string;
        avatarUrl?: string;
        phoneNumber?: string;
    }): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        bio: string | null;
        avatarUrl: string | null;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findOne(id: number): Promise<{
        id: number;
        email: string;
        password: string;
        name: string | null;
        bio: string | null;
        avatarUrl: string | null;
        phoneNumber: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
