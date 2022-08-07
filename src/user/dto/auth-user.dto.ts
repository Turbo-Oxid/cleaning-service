import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthUserDto {
    @IsEmail({message: 'Must be an email'})
    @IsNotEmpty({message: 'Must not be empty'})
    email: string;
    
    @IsNotEmpty({message: 'Must not be empty'})
    password: string; 
  }