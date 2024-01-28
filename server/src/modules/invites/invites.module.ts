import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invites.service';
import { InviteController } from './invites.controller';
import { Invite } from './entities/invites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invite])],
  providers: [InviteService],
  controllers: [InviteController],
  exports: [InviteService],
})
export class InviteModule {}
