import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

@EntityModel('menu')
export class Menu {
  @Column({
    type: 'bigint',
    unsigned: true,
    primary: true,
    generated: 'increment',
    comment: '菜单id',
  })
  id: string;
  @Column({ type: 'varchar', length: 10, comment: '方法' })
  method: string;
  @Column({ type: 'varchar', length: 255, comment: 'path' })
  path: string;

  @Column({ type: 'bigint', unsigned: true, comment: '父节点id' })
  parentId: string;

  // 公用部分
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @VersionColumn({ type: 'bigint', unsigned: true })
  _version: number;
}
