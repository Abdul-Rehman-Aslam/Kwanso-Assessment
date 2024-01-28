import { BaseModel } from '../../../modules/common/entities/baseModel.entity';
import { Entity, Column } from 'typeorm';

@Entity('invites')
export class Invite extends BaseModel {
  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  token: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiryDate: Date;
}
