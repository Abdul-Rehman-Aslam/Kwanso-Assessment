import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../common/entities/baseModel.entity';

@Entity()
export class User extends BaseModel {
  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isSuperAdmin: boolean;
}
