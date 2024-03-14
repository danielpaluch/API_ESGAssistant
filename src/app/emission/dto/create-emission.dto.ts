import { IsString } from 'class-validator';
export class CreateEmissionDto {
    @IsString()
    name: string;


}