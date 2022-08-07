import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user.schema';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { RecoveryUserDto } from 'src/user/dto/recovery-user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}
    
    async registration(createUserDto: CreateUserDto): Promise<object> { 
        const candidate = await this.userService.getUserByEmail(createUserDto.email);
        if(candidate) throw new HttpException('user already registered', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(createUserDto.password, 5);
        const user = await this.userService.create({...createUserDto, password: hashPassword});
        return this.generateToken(user);
    }

    async login(authUserDto: AuthUserDto): Promise<object> { 
        const user = await this.validateUser(authUserDto);
        return this.generateToken(user);
    } 

    async recovery(recoveryUserDto: RecoveryUserDto): Promise<object> {
        const candidate = await this.userService.getUserToRecovery(recoveryUserDto.login, recoveryUserDto.email);
        if(!candidate) throw new HttpException('incorrect login or email', HttpStatus.BAD_REQUEST);
        const hashPassword = await bcrypt.hash(recoveryUserDto.password, 5);
        const user = await this.userService.changePassword({...recoveryUserDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User): Promise<object> {
        const payload = {email: user.email, admin: user.admin};
        return {token: this.jwtService.sign(payload)}
    }

    private async validateUser(authUserDto: AuthUserDto): Promise<User>{
        const user = await this.userService.getUserByEmail(authUserDto.email);
        if(!user) throw new HttpException('incorrect email or password', HttpStatus.BAD_REQUEST);
        const passwordEquals = await bcrypt.compare(authUserDto.password, user.password);
        if(user && passwordEquals) return user;
        throw new HttpException('incorrect email or password', HttpStatus.BAD_REQUEST);
    }
       
}
