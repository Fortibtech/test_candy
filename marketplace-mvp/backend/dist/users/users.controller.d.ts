import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateProfile(req: any, body: {
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
}
