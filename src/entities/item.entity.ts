import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemImage } from './item-image.entity';
import { Rental } from './rental.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ default: true })
  availability: boolean;

  @OneToMany(() => Rental, (rental) => rental.item)
  rentals: Rental[];

  @OneToMany(() => ItemImage, (itemImage) => itemImage.item)
  images: ItemImage[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
