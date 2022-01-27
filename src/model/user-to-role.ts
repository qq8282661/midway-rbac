import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('user_to_role')
export class UserToRole {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    comment: '用户id',
  })
  userId: string;

  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    comment: '身份id',
  })
  roleId: string;

  // 公用部分
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn({ type: 'bigint', unsigned: true, default: 0 })
  _version: number;
}
