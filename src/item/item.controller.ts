/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';

@ApiTags('item')
@Controller('item')
export class ItemController {
    constructor(private readonly itemService: ItemService) {}


    @Get()
    @ApiOperation({ summary: 'Get all items' })
    
    getItems() {
        return this.itemService.findAll()
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get item by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Successfully obtained item', schema: {example: {success: true, message: "Successfully obtained", data: {id: 1, name: "Example", price: 100, currentStock: 200}}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Item not found", data: null}} })
    async getItem(@Param ('id') id: number) {
        const response = await this.itemService.findOneById(id)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Post()
    @ApiOperation({ summary: 'Create item' })
    @ApiBody({ schema: {example: {name: 'Example', price: 100, currentStock: 100}} })
    createItem(@Body() dto: CreateItemDto) {
        return this.itemService.create(dto)
    }

    @Get('/name/:name')
    @ApiOperation({ summary: 'Get item by name' })
    @ApiParam({ name: 'name', type: String })
    @ApiResponse({ status: 200, description: 'Successfully obtained item', schema: {example: {success: true, message: "Successfully obtained", data: {id: 1, name: "Example", price: 100, currentStock: 200}}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Item not found", data: null}} })
    async getItemByName(@Param ('name') name: string) {
        const response = await this.itemService.findItemByName(name)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update item price by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: {example: {price: 100}} })
    @ApiResponse({ status: 200, description: 'Item updated', schema: {example: {success: true, message: "Successfully price updated", data: {id: 1, name: "Example", price: 100, currentStock: 200}}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Item not found", data: null}} })
    async updateItem(@Body() body: { price: number }, @Param('id') id: number) {
        const response = await this.itemService.updatePrice(id, body.price)
        if(!response.success) throw new BadRequestException(response)
        return response 
    }
    
    @Get('/pricehistory/:id')
    @ApiOperation({ summary: 'Get price history by item id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Successfully obtained price history', schema: {example: {success: true, message: "Successfully obtained price history for item", data: [{id: 1, price: 100, createdAt: "2021-08-01T00:00:00.000Z"}]}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Item not found", data: null}} })
    async getPriceHistory(@Param ('id') id: number) {
        const response = await this.itemService.getItemPriceHistory(id)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Get('/stock/:stockValue')
    @ApiOperation({ summary: 'Get items by stock' })
    @ApiParam({ name: 'stockValue', type: Number })
    @ApiResponse({ status: 200, description: 'Successfully obtained items', schema: {example: {success: true, message: "Successfully obtained items", data: [{id: 1, name: "Example", price: 100, currentStock: 200}]}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Failed to obtain items", data: null}} })
    async getItemsByStock(@Param ('minStock') stockValue: number) {
        const response = await this.itemService.findByStock(stockValue)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Get('/stock/filter/:orderBy')
    @ApiOperation({ summary: 'Filter items by stock' })
    @ApiParam({ name: 'orderBy', type: String, enum: ['ASC', 'DESC'] })
    @ApiResponse({ status: 200, description: 'Successfully obtained items', schema: {example: {success: true, message: "Successfully filtered stock", data: [{id: 1, name: "Example", price: 100, currentStock: 200}]}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Failed to filter stock", data: null}} })
    async filterItemsByStock(@Param ('orderBy') orderBy: 'ASC' | 'DESC') {
        const response = await this.itemService.filterByStock(orderBy)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Get('/delete/:id')
    @ApiOperation({ summary: 'Delete item by id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Success', schema: {example: {success: true, message: "Success", data: null}} })
    @ApiResponse({ status: 400, description: 'Failed', schema: {example: {success: false, message: "Failed", data: null}} })
    async deleteItem(@Param ('id') id: number) {
        const response = await this.itemService.delete(id)
        if(!response.success) throw new BadRequestException(response)
        return response
    }

    @Put('/stock/:id')
    @ApiOperation({ summary: 'Update stock by item id' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ schema: {example: {currentStock: 150}} })
    @ApiResponse({ status: 200, description: 'Stock updated', schema: {example: {success: true, message: "Stock updated", data: {id: 1, name: "Example", price: 100, currentStock: 150}}} })
    @ApiResponse({ status: 400, description: 'Error: Bad Request', schema: {example: {success: false, message: "Item not found", data: null}} })
    async updateStock(@Body() body: { currentStock: number }, @Param('id') id: number) {
        const response = await this.itemService.updateStock(id, body.currentStock)
        if(!response.success) throw new BadRequestException(response)
        return response 
    }
}