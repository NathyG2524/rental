import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { BaseEntity } from './base-entity';
  import { ColumnNumericTransformer } from 'src/shared/utils/numeric.transformer';
  
  @Entity({ name: 'exchanges' })
  export class Exchange extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'numeric', transformer: new ColumnNumericTransformer() })
    rate: number;
  
    @Column()
    currency: string;
  }
  