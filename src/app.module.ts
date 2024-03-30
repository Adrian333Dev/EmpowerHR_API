import { Module } from '@nestjs/common';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: { middlewares: [loggingMiddleware()] },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
