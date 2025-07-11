import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JwtAuthenticationGuard} from "../auth/guards/jwt-authentication.guard";
import {RoleDto} from "./role.dto";
import {RoleService} from "./role.service";

@Controller('role')
export class RoleController {

    constructor(private readonly roleService: RoleService) {
    }

    @Post('create')
    @UseGuards(JwtAuthenticationGuard)
    async createRole(@Body() roleData: RoleDto) {
        return this.roleService.save(roleData);
    }

    @Post('update')
    @UseGuards(JwtAuthenticationGuard)
    async updateRole(@Body() roleData: RoleDto) {
        return this.roleService.save(roleData);
    }
}
