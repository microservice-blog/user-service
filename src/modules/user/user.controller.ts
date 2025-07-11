import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {JwtAuthenticationGuard} from "../auth/guards/jwt-authentication.guard";
import {PermissionGuard} from "../auth/guards/permission.guard";
import {Permissions} from "../../decorators/permission.decorator";
import {PermissionCode} from "../../utils/enums/permission-code.enum";

@Controller('user')
export class UserController {

    @Permissions(PermissionCode.USER_GET_ALL)
    @Get('user-info')
    @UseGuards(JwtAuthenticationGuard, PermissionGuard)
    getUserInfo(@Req() req, @Res() res) {
        const user = req.user;
        if (!user) {
            return res.status(401).send({message: 'Unauthorized'});
        }
        user.password = undefined;
        return res.send(user);
    }
}
