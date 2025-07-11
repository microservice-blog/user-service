import {Module} from '@nestjs/common';
import {RoleService} from './role.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./role.entity";
import {PermissionEntity} from "../permission/permission.entity";
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
