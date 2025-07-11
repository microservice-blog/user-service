import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "./role.entity";
import {Repository} from "typeorm";
import {PermissionEntity} from "../permission/permission.entity";
import {RoleDto} from "./role.dto";

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(RoleEntity)
        private roleRepository: Repository<RoleEntity>,
        @InjectRepository(PermissionEntity)
        private permissionRepository: Repository<PermissionEntity>
    ) {
    }

    async getById(id: number) {
        const role = await this.roleRepository.findOne({
            where: {id: id},
            relations: ['permissions']
        });
        if (role) {
            return role;
        }
        throw new HttpException('Role with this id does not exist', HttpStatus.NOT_FOUND);
    }

    async getAll() {
        return await this.roleRepository.find({
            relations: ['permissions']
        });
    }

    async save(roleData: RoleDto) {
        const {id, name, description, permissions: permissionIds} = roleData;

        try {
            let role: any;
            if (id) {
                role = await this.roleRepository.findOne({
                    where: {id},
                    relations: ['permissions'],
                });

                if (!role) {
                    throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
                }
            } else {
                role = this.roleRepository.create();
            }

            // Cập nhật thông tin chung
            role.name = name ?? role.name;
            role.description = description ?? role.description;
            if (permissionIds) {
                role.permissions = await this.permissionRepository.findByIds(permissionIds);
            }

            return await this.roleRepository.save(role);
        } catch (error) {
            throw new HttpException('Error saving role', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
