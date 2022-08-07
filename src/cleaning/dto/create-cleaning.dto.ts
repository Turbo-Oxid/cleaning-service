import { IsNotEmpty } from "class-validator";
import { ServiceCleaningDto } from "./service-cleaning.dto";

export class CreateCleaningDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    description: string;
    
    @IsNotEmpty()
    services: ServiceCleaningDto[];
}