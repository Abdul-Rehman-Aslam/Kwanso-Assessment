import { Controller, Post, Body } from '@nestjs/common';
import { InviteService } from './invites.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Invite } from './entities/invites.entity';

@ApiTags('invites')
@Controller('invites')
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post()
  @ApiBody({ schema: { example: { email: 'test@example.com' } } })
  @ApiOperation({ summary: 'Create invite' })
  @ApiResponse({
    status: 200,
    description: 'The invite has been successfully created.',
    type: Invite,
  })
  createInvite(@Body('email') email: string): Promise<Invite> {
    return this.inviteService.createInvite(email);
  }

  @Post('resend')
  @ApiBody({ schema: { example: { email: 'test@example.com' } } })
  @ApiOperation({ summary: 'Resend invite' })
  @ApiResponse({
    status: 200,
    description: 'The invite has been successfully resent.',
    type: Invite,
  })
  resendInvite(@Body('email') email: string): Promise<Invite> {
    return this.inviteService.resendInvite(email);
  }
}
