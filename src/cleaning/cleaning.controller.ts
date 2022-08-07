import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAdminGuard } from 'src/auth/jwt-admin.guard';
import { CleaningService } from './cleaning.service';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { PullCleaningDto } from './dto/pull-cleaning.dto';
import { PushCleaningDto } from './dto/push-cleaning.dto';

@Controller('cleaning')
export class CleaningController {
    constructor(private readonly cleaningService: CleaningService) {}
    
    @UseGuards(JwtAdminGuard)
    @Post('create')
    create(@Body() createCleaningDto: CreateCleaningDto) {
        return this.cleaningService.createCleaning(createCleaningDto);
    }

    @Get('list')
    list(){
        return this.cleaningService.list();
    }

    @Post('addService')
    addService(@Body() pushCleaningDto: PushCleaningDto) {
        return this.cleaningService.addService(pushCleaningDto);
    }

    @Post('deleteService')
    deleteService(@Body() pullCleaningDto: PullCleaningDto) {
        return this.deleteService(pullCleaningDto);
    }
}
