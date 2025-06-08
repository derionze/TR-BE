import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body('identifier') identifier: string, // bisa email atau username
        @Body('password') password: string,
    ) {
        return this.authService.login(identifier, password);
    }
}
