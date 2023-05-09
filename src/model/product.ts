import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';

import { LimitedTimeOffer } from './limited_time_offer';
import { ProductMedia } from './product_media';
import { Review } from './review';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @OneToOne(() => ProductMedia, (media) => media.product)
  thumbnail!: Relation<ProductMedia>;

  @OneToMany(() => ProductMedia, (media) => media.product)
  media!: Relation<ProductMedia[]>;

  @OneToMany(() => LimitedTimeOffer, (offer) => offer.product)
  offers!: Relation<LimitedTimeOffer[]>;

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Relation<Review[]>;
}
