import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email: email},
            relations: ['role', 'role.permissions']
        })
        if (user) {
            return user;
        }
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }

    async create(userData: CreateUserDto) {
        const existingUser = await this.userRepository.findOne({
            where: {email: userData.email}
        });
        if (existingUser) {
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
        }
        const newUser = this.userRepository.create(userData);
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getById(id: any) {
        const user = await this.userRepository.findOne({
            where: {id: id},
            relations: ['role', 'role.permissions']
        });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
    }
}
