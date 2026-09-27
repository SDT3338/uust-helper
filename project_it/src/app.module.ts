import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lost } from './entities/lost.entity.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 2. Асинхронная настройка TypeORM через ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Lost], // Надежнее указывать классы напрямую
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
      }),
    }),

    // 3. Регистрация репозитория для использования в AppService
    TypeOrmModule.forFeature([Lost]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
