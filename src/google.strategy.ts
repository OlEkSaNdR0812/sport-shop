
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private appService: AppService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      clientID: '325560937422-t29l2be7vb2h20cjihg5cdu9e67nvl0p.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;
    const email = emails[0].value;
    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        role: 'user', 
      });
      await this.userRepository.save(user);
    }

    const payload = {
      email: user.email,
      role: user.role,
      accessToken,
    };
    done(null, payload);
  }
}
