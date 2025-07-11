import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PermissionEntity} from "./permission.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionEntity])],
})
export class PermissionModule {}
