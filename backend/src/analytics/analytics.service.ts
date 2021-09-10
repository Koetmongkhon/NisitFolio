import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAddSkill, UserJobSkill, AdditionalSkill, JobTitle } from './analytics.schema';

import { ObjectId } from 'mongodb' ;



@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('UserAdditionalSkill')
    private UserAddSkill: Model<UserAddSkill>,
    @InjectModel('UserJobSkill')
    private UserJobSkillModel: Model<UserJobSkill>,
    @InjectModel('AdditionalSkill')
    private AdditionalSkillModel: Model<AdditionalSkill>,
    @InjectModel('JobTitle')
    private JobTitleModel: Model<JobTitle>,    

  ) {}
  
  async additionalAnalytics(id: ObjectId): Promise<any> {
    const Jobs = await this.UserJobSkillModel.aggregate([
      { $match: {userId: id} },
      { 
        $group: { 
          _id: { JobName: "$JobName" } 
        },
      },
      { $sort: { _id: 1 } },
    ]);

    let jobs = [];
    for ( var job of Jobs ) {
      const job_name = job._id.JobName;
      const job_THname = await this.JobTitleModel.findOne({ Name: job_name }).select({ THName: 1, _id: 0 }).exec();
      jobs.push({ name: job_name, THname: job_THname.THName });
    }

    console.log(jobs);
    let finalResults = {};
    finalResults['InterestedJobs'] = jobs;
    const mySkills = await this.AdditionalSkillModel.find({ UserId: id }).select({ AdditionalSkill: 1 , _id: 0 }).distinct('AdditionalSkill');
    //console.log(mySkills);
    finalResults['mySkills'] = mySkills;

    for ( var job of jobs ) {
      const job_name = job.name;
      console.log(job_name);
      console.log(job.THname);
      const users = await this.UserJobSkillModel.find({ JobName: job_name }).select({ userId: 1, _id: 0 }).distinct('userId');
      //console.log(users);
      const numberOfUsers = users.length;

      const rawResults = await this.AdditionalSkillModel.aggregate([
        {
          $match: { UserId: { "$in": users } }
        },
        {  
          $group: {
            _id: { AdditionalSkill: "$AdditionalSkill"},
            total: { $sum: 1 }                        
          }
        },
        { $sort: { total: -1, _id: 1 }}
      ]).exec();

      let ModifiedResults = [];
      for (var result of rawResults) {
        ModifiedResults.push({ AdditionalSkill: result['_id'].AdditionalSkill,
                              total: result.total,
                              percentage: result.total/numberOfUsers * 100
                            });
      }

      finalResults[job_name] = {};
      finalResults[job_name]['numberOfUsers'] = numberOfUsers;
      finalResults[job_name]['List'] = ModifiedResults;
    }
    /*
    * Overview
    */
    const totalUsers = await this.UserJobSkillModel.find().select({ userId: 1, _id: 0 }).distinct('userId');
    const totalNumberOfUsers = totalUsers.length;
    const rawResults = await this.AdditionalSkillModel.aggregate([
      {  
        $group: {
          _id: { AdditionalSkill: "$AdditionalSkill"},
          total: { $sum: 1 }                        
        }
      },
      { $sort: {total: -1 , _id: 1 }}
    ]).exec();
    //console.log(rawResults);
    let ModifiedResults = [];
    for (var result of rawResults) {
      if (result['_id'].AdditionalSkill == null) {continue;};
      ModifiedResults.push({ AdditionalSkill: result['_id'].AdditionalSkill,
                            total: result.total,
                            percentage: result.total/totalNumberOfUsers * 100
                          });
  
    }
    finalResults['Overview'] = {};
    finalResults['Overview']['numberOfUsers'] = totalNumberOfUsers;
    finalResults['Overview']['List'] = ModifiedResults;
    return finalResults;
  }
  
/*
* ******************************************************************************************************************************************
*/

  async findUserJobSkill(userId: ObjectId): Promise<any> {
    const userSkill = await this.UserJobSkillModel.aggregate([
                        { $match: {userId: userId} },
                        { 
                          $group: { 
                            _id: { JobName: "$JobName" } 
                          }
                        },
                        { $sort: { _id: 1 }},
    ]) ;
    let array = {} ;
    let InterestedJobs = [] ;
    
    for (var obj of userSkill) {
      InterestedJobs.push(obj._id.JobName) ;
    }
    array['InterestedJobs'] = InterestedJobs ;

    for (var job of InterestedJobs) {
      const SumSkill = await this.UserJobSkillModel.aggregate([
                        { $match: { JobName: job } },
                        {
                          $group: {
                            _id: { SkillName: "$SkillName"}, 
                            total: { $sum: 1},
                          }
                        },
                        { $sort : {total: -1, _id: 1}},
      ])
      console.log(SumSkill) ;
      let n = 0 ;
      for (var i of SumSkill) {
        n += i.total ;
      }
      array[job] = {numberOfUsers: n} ;
      let temp = [] ;
      for (var i of SumSkill){ 
        // console.log(i) ;
        const _name = i._id.SkillName ;
        const _sum = i.total ;
        
        // ---------- AllUser Score --------------//
        const AllUser = await this.UserJobSkillModel.find({JobName: job, SkillName: _name}) ;
        let AllScore = [] ;
        let UserScore = null ;
        let sum = 0 ;
        let n = 0 ;
        console.log(AllUser) ;
        for (var j of AllUser) {
          if (userId.equals(j.userId)) { 
            UserScore = j.Score ;
          }
          AllScore.push(j.Score) ;
          sum += j.Score ;
          n += 1 ;
        }
        
        // console.log(_name);
        // console.log(_sum);
        temp.push({SkillName: _name, total: _sum, "AllScore": AllScore, "UserScore": UserScore,"Mean": sum/n, percentage: _sum/n*100}) ;
      }
      array[job]['List'] = temp ;
    }

    const users = await this.UserJobSkillModel.find( {JobName: { "$in" : InterestedJobs }} ).select({ userId: 1, _id: 0 }).distinct('userId');
    const numberOfUsers = users.length;
    
    const New = await this.UserJobSkillModel.aggregate([
      { 
        $match: { JobName: { "$in" : InterestedJobs } } 
      },
      { 
        $group: { 
          _id: { SkillName: "$SkillName" }, 
          total: { $sum: 1 }
        }
      },
      { 
        $sort: { total: -1 , _id: 1 },
      }
    ])
    let temp2 = [] ;
    let percentage = 0 ;
    for (var i of New) {
      percentage = i.total/numberOfUsers*100 ;
      temp2.push({"SkillName": i._id.SkillName, "percentage": percentage}) ;
    }
    array["Overview"] = {};
    array['Overview']['numberOfUser'] = numberOfUsers ;
    array['Overview']['List'] = temp2 ; 
    console.log(New) ;
    //console.log(array);
    return array ;
  }

  // -------------------- Skill ---------------------------[]

  async createUserJobSkill(userId: ObjectId, Objective: string, Score: number, JobName: string, SkillName: string) {
    const createUserJobSkill =  new this.UserJobSkillModel({userId, Objective, Score, JobName, SkillName}) ;
    return createUserJobSkill.save() ;
  }
}