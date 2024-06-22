import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';
import { ADMIN_EMAILS } from './config/config';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async googleLogin(req): Promise<{ message: string, user: User }> {
    if (!req.user) {
      throw new Error('No user from google');
    }

    const { email, firstName, lastName, picture, accessToken } = req.user;

    let user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      user = this.userRepository.create({
        email,
        firstName,
        lastName,
        picture,
        accessToken,
        role: ADMIN_EMAILS.includes(email) ? 'admin' : 'user',
      });

      await this.userRepository.save(user);
    } else {
      user.accessToken = accessToken;
      await this.userRepository.save(user);
    }

    return {
      message: 'User Info from Google',
      user,
    };
  }
}
