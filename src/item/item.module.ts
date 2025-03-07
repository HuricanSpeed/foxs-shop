/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceHistory } from "./price-history.entity";
import { Item } from "./item.entity";
import { ItemController } from "./item.controller";
import { ItemService } from "./item.service";

@Module({
    imports: [TypeOrmModule.forFeature([Item, PriceHistory])],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService]
})

export class ItemModule {}