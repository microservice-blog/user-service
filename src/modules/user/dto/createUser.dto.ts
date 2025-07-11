import {IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min} from "class-validator";
import {Match} from "../../../decorators/match.decorator";
import {IsStrongPassword} from "../../../decorators/is-strong-password.decorator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword({message: 'Password is too weak'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @Match('password', {message: 'Passwords do not match'})
    rePassword: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    age?: number;

    @IsOptional()
    @IsInt()
    roleId?: number;
}