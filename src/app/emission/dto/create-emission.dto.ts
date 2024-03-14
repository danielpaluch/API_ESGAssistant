import { IsString, IsArray, IsDate } from 'class-validator';
import {EmissionData} from '../models/emission-report.model';

export class CreateEmissionDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    emission_data_arr: EmissionData[];

    @IsString()
    author: string;

    @IsDate()
    created_at: Date;
}