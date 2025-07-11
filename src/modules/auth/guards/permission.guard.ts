import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.get<string[]>(
            'permissions',
            context.getHandler(),
        );

        if (!requiredPermissions || requiredPermissions.length === 0) {
            return true; // Không yêu cầu quyền nào
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userPermissions: string[] = user.role.permissions.map((permission: any) => permission.code) || [];

        const hasPermission = requiredPermissions.every((perm) =>
            userPermissions.includes(perm),
        );

        if (!hasPermission) {
            throw new ForbiddenException('Bạn không có quyền truy cập chức năng này.');
        }

        return true;
    }
}