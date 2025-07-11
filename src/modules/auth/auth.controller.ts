import {Body, Controller, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/createUser.dto";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {Response} from "express";
import {JwtAuthenticationGuard} from "./guards/jwt-authentication.guard";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    async register(@Body() registrationData: CreateUserDto) {
        return this.authService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @Post('log-in')
    async logIn(@Req() request: any, @Res() response: Response) {
        const user = request.user;
        const cookie = this.authService.getCookieWithJwtToken(user.id, user.role.permissions);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Res() response: Response) {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }
}
