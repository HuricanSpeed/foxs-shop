/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class PriceHistory {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Item, (item) => item.priceHistory)
    item: Item;

    @Column('decimal')
    oldPrice: number;
    
    @Column('decimal')
    newPrice: number;

    @CreateDateColumn()
    changedAt: Date;
}