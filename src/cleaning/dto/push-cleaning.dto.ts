import { IsNotEmpty } from "class-validator";
import { ServiceCleaningDto } from "./service-cleaning.dto";

export class PushCleaningDto {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    service: ServiceCleaningDto;
    
}