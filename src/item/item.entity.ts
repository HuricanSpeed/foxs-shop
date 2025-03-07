/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PriceHistory } from './price-history.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    currentStock: number;

    @OneToMany(() => PriceHistory, (priceHistory) => priceHistory.item)
    priceHistory: PriceHistory[];
}