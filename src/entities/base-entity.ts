import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
