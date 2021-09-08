import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ResumeDocument = Resume2 & Document;

@Schema({ collection: 'Resume' })
export class Resume2 {
  @Prop()
  UserId: string;

  @Prop()
  Privacy: string;

  @Prop()
  interestedJob: string[];

  @Prop()
  additionalSkills: string[];

  @Prop()
  certificates: string[];
  
  @Prop()
  educationHistorys: string[];

  @Prop()
  workHistorys: string[];
  
  @Prop()
  portfolios: string[];

}

export const ResumeSchema = SchemaFactory.createForClass(Resume2);

