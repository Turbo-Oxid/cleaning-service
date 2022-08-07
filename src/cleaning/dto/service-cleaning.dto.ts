import { IsNotEmpty, IsNumber } from "class-validator";

export class ServiceCleaningDto {
    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;
}