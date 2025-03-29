import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Item } from './item.entity';
import { Payment } from './payment.entity';
import { Review } from './review.entity';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Payment, (payment) => payment.rental)
  payments: Payment;

  @OneToMany(() => Review, (review) => review.rental)
  review: Review;

  @ManyToOne(() => Customer, (customer) => customer.rentals)
  customer: Customer;

  @ManyToOne(() => Item, (item) => item.rentals)
  item: Item;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @Column()
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
