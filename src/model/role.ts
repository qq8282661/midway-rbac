import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('role')
export class Role {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    generated: 'increment',
    comment: '角色id',
  })
  id: string;
  @Column({ type: 'varchar', length: 10, comment: '职称' })
  title: string;
  @Column({ type: 'varchar', length: 255, comment: '身份标识' })
  identification: string;

  // 公用部分
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn({ type: 'bigint', unsigned: true })
  _version: number;
}
