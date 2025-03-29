import { Rental } from '@entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Rental, (rental) => rental.review)
  rental: Rental;

  @Column('int')
  rating: number;

  @Column('text', { nullable: true })
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAat: Date;
}
