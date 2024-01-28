import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from '../../common/entities/baseModel.entity';
import { User } from '../../../modules/user/entities/user.entity';
import { TASK_STATUS } from '../../../types';

@Entity()
export class Task extends BaseModel {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TASK_STATUS,
    default: TASK_STATUS.PENDING,
  })
  status: TASK_STATUS;

  @ManyToOne(() => User, { eager: true, onDelete: 'CASCADE' })
  user: User;
}
