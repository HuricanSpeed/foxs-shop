/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemController } from './item/item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: "postgres",
      password: String(process.env.DATABASE_PASSWORD),
      database: String(process.env.DATABASE_NAME),
      autoLoadEntities: true,
      synchronize: true 
    }),
    ItemModule
  ],
  controllers: [AppController, ItemController],
  providers: [AppService],
})
export class AppModule {}
