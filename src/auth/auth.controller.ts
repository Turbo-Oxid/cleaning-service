import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RecoveryUserDto } from 'src/user/dto/recovery-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('registration')
    registration(@Body() createUserDto: CreateUserDto) { 
      return this.authService.registration(createUserDto);
    }
    @Post('login')
    login(@Body() authUserDto: AuthUserDto) { 
      return this.authService.login(authUserDto);
    }    
    @Post('recovery')
    recovery(@Body() recoveryUserDto: RecoveryUserDto) {
      return this.authService.recovery(recoveryUserDto);
    }
}
