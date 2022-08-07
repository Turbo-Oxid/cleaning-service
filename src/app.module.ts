import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CleaningModule } from './cleaning/cleaning.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/cleaning-service'), UserModule, AuthModule, CleaningModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
