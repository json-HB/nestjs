import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurdModule } from './curd/curd.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './model/users.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule as CacheM } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // seconds
      max: 10, // maximum number of items in cache
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env' : '.pro.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '19911221',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CurdModule,
    UsersModule,
    CacheM,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
