import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({message: 'Must not be empty'}) 
  login: string;
  
  @IsNotEmpty({message: 'Must not be empty'})
  password: string;
  
  @IsEmail({message: 'Must be an email'})
  @IsNotEmpty({message: 'Must not be empty'})
  email: string;
  
  @IsNotEmpty({message: 'Must not be empty'})
  admin: boolean
}