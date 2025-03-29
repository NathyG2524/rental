import { Rental } from '@entities';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rental, (rental) => rental.payments)
  rental: Rental;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  paymentDate: Date;

  @Column()
  paymentMethod: string;

  @Column()
  status: string;

  @Column()
  transactionId: string;
}
