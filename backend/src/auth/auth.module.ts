import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants'
import { JwtStrategy } from './jwt.strategy';
import { AuthenticationController } from './auth.controller';
import { RegisterModule } from 'src/register/register.module';
import { EmailConfirmationModule } from 'src/emailconfirmation/emailConfirmation.module';
import { EmailModule } from 'src/email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import  UserReq   from "src/users/user.entity"; 

@Module({
  imports: [
    EmailModule,
    EmailConfirmationModule,
    RegisterModule,
    UsersModule, 
    PassportModule,
    TypeOrmModule.forFeature([UserReq ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    })
    
  ],
  controllers: [ AuthenticationController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
