import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAdminGuard } from 'src/auth/jwt-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAdminGuard)
  @Get('getClients')
  getClients() {
    return this.userService.getClients();
  }
}
