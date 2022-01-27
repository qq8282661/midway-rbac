import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('permission')
export class Permission {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    generated: 'increment',
    comment: '权限id',
  })
  id: string;
  @Column({ type: 'varchar', length: 10, comment: '方法' })
  method: string;
  @Column({ type: 'varchar', length: 255, comment: 'path' })
  path: string;

  // 公用部分
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn({ type: 'bigint', unsigned: true, default: 0 })
  _version: number;
}
