import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invite } from './entities/invites.entity';

@Injectable()
export class InviteService {
  private readonly logger = new Logger(InviteService.name);
  constructor(
    @InjectRepository(Invite)
    private inviteRepository: Repository<Invite>,
  ) {}

  async createInvite(email: string): Promise<Invite> {
    try {
      const invite = new Invite();
      invite.email = email;
      invite.token = Math.random().toString(36).substring(2);
      invite.expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      console.log(`Invite token: ${invite.token}`);

      return this.inviteRepository.save(invite);
    } catch (error) {
      this.logger.error(`Failed to retrieve tasks.`);
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: {
          errorMessage: error.message,
        },
      });
    }
  }

  async resendInvite(email: string): Promise<Invite> {
    try {
      let invite = await this.inviteRepository.findOne({
        where: { email },
      });

      if (!invite) {
        throw new NotFoundException('Invite not found');
      }

      invite.token = Math.random().toString(36).substring(2);
      invite.expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

      console.log(`Resent invite token: ${invite.token}`);

      return this.inviteRepository.save(invite);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to resend invite');
      }
    }
  }

  async getInvite(email: string): Promise<Invite> {
    try {
      const invite = await this.inviteRepository.findOne({ where: { email } });

      if (!invite) {
        throw new NotFoundException('Invite not found');
      }

      if (new Date() > invite.expiryDate) {
        throw new BadRequestException('Invite has expired');
      }

      return invite;
    } catch (error) {
      throw error;
    }
  }
}
