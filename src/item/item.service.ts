/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Item } from "./item.entity";
import { Repository } from "typeorm";
import { PriceHistory } from "./price-history.entity";
import { CreateItemDto } from "./dto/create-item.dto";
import { createResponse } from "src/utils/response.util";

@Injectable()

export class ItemService {
    constructor(
        @InjectRepository(Item) private itemRepo: Repository<Item>,
        @InjectRepository(PriceHistory) private priceHistoryRepo: Repository<PriceHistory>
    ) {}

    findAll(): Promise<Item[]> {
        return this.itemRepo.find();
    }

    async create(item: CreateItemDto): Promise<Item> {
        const itemEntity = this.itemRepo.create(item)
        return this.itemRepo.save(itemEntity);
    }

    async updatePrice(id: number, newPrice: number) {
        const itemEntity = await this.itemRepo.findOne({
            where: { 
                id: id 
            }
        });

        if (!itemEntity) return createResponse(false, 'Item not found', null);

        await this.priceHistoryRepo.save({
            item: itemEntity,
            oldPrice: itemEntity.price,
            newPrice: newPrice,
        });

        itemEntity.price = newPrice;
        const response = await this.itemRepo.save(itemEntity);
        return createResponse(true, 'Successfully price updated', response);
    }

    async delete(id: number) {
        const response = await this.itemRepo.delete(id);
        if(response) return createResponse(true, 'Successfully deleted item', null);
        return createResponse(false, 'Item not found', null); 
    }

    async findOneById(id: number) {
        const response = await this.itemRepo.findOne({where: {id: id}});

        if(response) return createResponse(true, 'Successfully obtained', response);
        return createResponse(false, 'Item not found', null);
    }

    async findItemByName(name: string) {
        const response = await this.itemRepo.find({where: {name: name}}); 
        if(response) return createResponse(true, 'Successfully obtained items', response);
        return createResponse(false, 'Failed to obtain items', null)
    }

    async findByStock(minStock: number) {
        const response = await this.itemRepo.find({where: {currentStock: minStock}}); 
        if(response) return createResponse(true, 'Successfully obtained items', response);
        return createResponse(false, 'Failed to obtain items', null);
    }

    async filterByStock(orderBy: 'ASC' | 'DESC') {
        const response = await this.itemRepo.createQueryBuilder('item')
                        .where('item.currentStock > 0')
                        .orderBy('item.currentStock', orderBy)
                        .getMany();
        
        if(response) return createResponse(true, 'Successfully filtered stock', response);
        return createResponse(false, 'Failed to filter stock', null);
    }

    async getItemPriceHistory(id: number) {
        const itemEntity = await this.itemRepo.findOne({
            where: {
                id: id
            },
            relations: ['priceHistory']
        });

        if (!itemEntity) return createResponse(false, 'Item not found', null);

        return createResponse(true, 'Successfully obtained price history for item', itemEntity.priceHistory);
    }

    async updateStock(id: number, newStock: number) {
        const itemEntity = await this.itemRepo.findOne({
            where: { 
                id: id 
            }
        });

        if (!itemEntity) return createResponse(false, 'Item not found', null);

        itemEntity.currentStock = newStock;
        const response = await this.itemRepo.save(itemEntity);
        return createResponse(true, 'Successfully updated item stock', response);
    }
}