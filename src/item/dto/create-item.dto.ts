/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateItemDto {
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsPositive()
    price: number

    @IsNumber()
    currentStock: number
}