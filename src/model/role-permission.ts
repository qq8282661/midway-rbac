import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('role_permission')
export class UserRole {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    comment: '权限id',
  })
  permissionId: string;

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
  @VersionColumn({ type: 'bigint', unsigned: true })
  _version: number;
}
