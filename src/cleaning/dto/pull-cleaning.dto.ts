import { IsNotEmpty } from "class-validator";

export class PullCleaningDto {
    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    serviceDescription: string;
    
}