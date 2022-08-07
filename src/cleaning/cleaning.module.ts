import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CleaningService } from './cleaning.service';
import { CleaningController } from './cleaning.controller';
import { Cleaning, CleaningSchema } from './schemas/cleaning.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cleaning.name, schema: CleaningSchema }]), AuthModule],
  providers: [CleaningService],
  controllers: [CleaningController]
})
export class CleaningModule {}
