import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const req = context.switchToHttp().getRequest();
       try {
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if(bearer !== 'Bearer' || !token) throw new UnauthorizedException({message: 'user is not authorized'});
        const user = this.jwtService.verify(token);
        
        if(!user.admin) throw new HttpException('No acces', HttpStatus.FORBIDDEN); 
        req.user = user;
        return true;
       } catch (e) {
        console.log(e);
        throw new UnauthorizedException({message: 'user is not authorized'});
       }
    }

}