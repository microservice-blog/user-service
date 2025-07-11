import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,      // tự động loại bỏ field thừa
            forbidNonWhitelisted: true, // báo lỗi nếu có field thừa
            transform: true,      // tự chuyển đổi kiểu (VD: string => number)
        }),
    );
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
