import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class ResumePageDto {

  Degree: string[];

  Facalty: string[];

  Field_of_study: string[];

  Academy: string[];

  Grade: Float32Array[];

  Education_End_Year: number[];   

  Work_JobName: string[];
  
  Work_JobType: string[];
  
  Company: string[];

  Work_Start_Month: number[];

  Work_End_Month: number[];

  Work_Start_Year: number[];

  Work_End_Year: number[];

  Salary: Float32Array[];

  Infomation: string[];

  CertName: string[];

  CertPic: string[];

  CertYear: number[];
 
}