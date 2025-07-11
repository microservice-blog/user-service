import {IsArray, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class RoleDto {

    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsArray()
    @IsOptional()
    permissions?: number[];
}