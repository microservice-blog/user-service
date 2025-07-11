import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {RoleEntity} from "../role/role.entity";

@Entity('tb_permission')
export class PermissionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    code: string;

    @Column()
    method: string;

    @Column()
    path: string;

    @Column({nullable: true})
    description: string;

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}