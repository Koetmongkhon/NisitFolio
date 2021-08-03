import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdditionalSkill, AdditionalSkillDocument, Skill, UserSkill, Account } from './analytics.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('account')
    private AccountModel: Model<Account>,

    @InjectModel('AdditionalSkill')
    private AdditionalSkillModel: Model<AdditionalSkillDocument>,
    
    @InjectModel('UserSkill')
    private UserSkillModel: Model<UserSkill>,
    
    @InjectModel('Skill')
    private SkillModel: Model<Skill>,
    ) {}
  
  async findAllAccount(): Promise<Account[]> {
    return this.AccountModel.find().exec();
  }
  async findAddSkill(): Promise<AdditionalSkill[]> {
    //console.log('test');
    return this.AdditionalSkillModel.find().exec();
  }

  // -------------------- UserSkill ---------------------------
  
  async findUserSkill(): Promise<UserSkill[]> {
    return this.UserSkillModel.find().exec() ;
  }

  async createUserSkill(userId: string, inJobId: string, SkillId: string, Score: number){
    const newUserSkill = new this.UserSkillModel({
      userId, inJobId, SkillId, Score
    }) ;
    return await newUserSkill.save() ;
  }

  // -------------------- Skill ---------------------------

  async findAllSkill(): Promise<Skill[]>{
    return this.SkillModel.find().exec() ;
  }

  async createSkill(SkillName: string) {
    const newSkill = new this.SkillModel({SkillName}) ;
    return await newSkill.save() ;
  }
}
