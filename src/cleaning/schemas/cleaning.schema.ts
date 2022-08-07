import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ServiceCleaningDto } from '../dto/service-cleaning.dto';

export type CleaningDocument = Cleaning & Document;

@Schema()
export class Cleaning {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  services: ServiceCleaningDto[];
}

export const CleaningSchema = SchemaFactory.createForClass(Cleaning);