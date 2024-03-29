import { IsString, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { EmissionData } from '../models/emission-report.model';
import { InputType, Field } from '@nestjs/graphql';
import { CreateEmissionDataInput } from './emission-data.input';
import { Type } from 'class-transformer'

@InputType()
export class CreateEmissionInput {
    @IsString()
    @IsNotEmpty()
    @Field(() => String!)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Field(() => String!)
    description: string;

    @ValidateNested({ each: true })
    @IsNotEmpty()
    @Type(() => CreateEmissionDataInput)
    @Field(() => [CreateEmissionDataInput])
    emission_data_arr: CreateEmissionDataInput[];

    @IsString()
    @IsNotEmpty()
    @Field(() => String!)
    author: string;
}