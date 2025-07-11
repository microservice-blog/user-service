import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Request} from 'express';

@Injectable()
export class JwtAuthenticationGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();

        // Debug log (tuỳ chọn)
        console.log('🛡️ JWT Guard Check:', {
            error: err,
            user,
            info,
            cookies: req.cookies,
        });

        const token = req.cookies?.Authentication;

        // ⛔ Không có token gửi lên
        if (!token) {
            throw new ForbiddenException({
                statusCode: 403,
                message: 'Không tìm thấy token trong cookie! Vui lòng đăng nhập.',
                error: 'Forbidden',
            });
        }

        // ⛔ Token không hợp lệ (giải mã sai, không đúng định dạng)
        if (info?.name === 'JsonWebTokenError') {
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Token không hợp lệ!',
                error: 'Unauthorized',
            });
        }

        // ⏰ Token hết hạn
        if (info?.name === 'TokenExpiredError') {
            throw {
                statusCode: 440, // Hoặc 401, tuỳ hệ thống bạn
                message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!',
                error: 'LoginTimeout',
            };
        }

        // ✅ Có lỗi khác hoặc không có user
        if (err || !user) {
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Xác thực thất bại!',
                error: 'Unauthorized',
            });
        }

        return user;
    }
}