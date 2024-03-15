import { IsString, IsArray } from 'class-validator';
import { EmissionData } from '../models/emission-report.model';
import { InputType, Field } from '@nestjs/graphql';
import { CreateEmissionDataInput } from './emission-data.dto';

@InputType()
export class CreateEmissionDto {
    @IsString()
    @Field(() => String!)
    name: string;

    @IsString()
    @Field(() => String!)
    description: string;

    @IsArray()
    @Field(() => [CreateEmissionDataInput])
    emission_data_arr: EmissionData[];

    @IsString()
    @Field(() => String!)
    author: string;
}