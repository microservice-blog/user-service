import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../../user/user.service";
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService,
                private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')!,
        });
    }

    // gắn thông tin người dùng vào request.user
    async validate(id: any) {
        return this.userService.getById(id.userId);
    }
}
