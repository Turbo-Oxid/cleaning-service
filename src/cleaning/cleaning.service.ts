import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { PullCleaningDto } from './dto/pull-cleaning.dto';
import { PushCleaningDto } from './dto/push-cleaning.dto';
import { Cleaning, CleaningDocument } from './schemas/cleaning.schema';

@Injectable()
export class CleaningService {
    constructor(@InjectModel(Cleaning.name) private cleaningModel: Model<CleaningDocument>) {}

    async createCleaning(createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
        const findCleaning = await this.cleaningModel.findOne({name: createCleaningDto.name});
        if(findCleaning) throw new HttpException('cleaning already exists', HttpStatus.BAD_REQUEST);
        const createdCleaning = new this.cleaningModel(createCleaningDto);
        return createdCleaning.save();
    }
    
    async deleteCleaning(id: string): Promise<DeleteResult> {
        const findCleaning = await this.cleaningModel.findOne({_id: id});
        if(!findCleaning) throw new HttpException('cleaning not found', HttpStatus.BAD_REQUEST);
        return this.cleaningModel.deleteOne({_id: id});
    }

    async list(): Promise<Cleaning[]> {
        return this.cleaningModel.find();
    }

    async addService(pushCleaningDto: PushCleaningDto): Promise<Cleaning> {
        const findCleaning = await this.cleaningModel.findOne({_id: pushCleaningDto.id});
        if(!findCleaning) throw new HttpException('cleaning not found', HttpStatus.BAD_REQUEST);
        return this.cleaningModel.findOneAndUpdate({_id: pushCleaningDto.id},{$push: {services: pushCleaningDto.service}});
    }

    async deleteService(pullCleaningDto: PullCleaningDto): Promise<Cleaning> {
        const findCleaning = await this.cleaningModel.findOne({_id: pullCleaningDto.id});
        if(!findCleaning) throw new HttpException('cleaning not found', HttpStatus.BAD_REQUEST);
        return this.cleaningModel.findOneAndUpdate({_id: pullCleaningDto.id}, {$pull: {services: {description: pullCleaningDto.serviceDescription}}});
    }

    async setCostService(pushCleaningDto: PushCleaningDto) {
        const findCleaning = await this.cleaningModel.findOne({_id: pushCleaningDto.id});
        if(!findCleaning) throw new HttpException('cleaning not found', HttpStatus.BAD_REQUEST);
        await this.cleaningModel.updateOne({_id: pushCleaningDto.id}, {$pull: {services: {description: pushCleaningDto.service.description}}});
        return this.cleaningModel.findOneAndUpdate({_id: pushCleaningDto.id},{$push: {services: pushCleaningDto.service}}); // I can't think of a better way ¯\_(ツ)_/¯
    }
}
