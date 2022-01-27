import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('user')
export class User {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    generated: 'increment',
    comment: '用户id',
  })
  id: string;
  @Column({ type: 'varchar', length: 100, comment: '用户名' })
  username: string;
  @Column({ type: 'varchar', length: 255, comment: '密码哈希' })
  passwordHash: string;
  @Column({ type: 'varchar', length: 255, comment: '盐' })
  salt: string;
  @Column({ type: 'varchar', length: 80 })
  nickname: string;

  // 公用部分
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn({ type: 'bigint', unsigned: true, default: 0 })
  _version: number;
}
