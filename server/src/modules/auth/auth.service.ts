import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        this.logger.error(`User not found`);
        throw new UnauthorizedException();
      }
      const passwordMatch = await bcrypt.compare(pass, user.password);

      if (!passwordMatch) {
        this.logger.error(`Password not match`);
        throw new UnauthorizedException();
      } else {
        const payload = { sub: user.id, email: user.email };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
