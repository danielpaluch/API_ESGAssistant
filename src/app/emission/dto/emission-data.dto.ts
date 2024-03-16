import { Field, InputType } from '@nestjs/graphql';
import { EmissionType} from '../models/emission-report.model';
import { Type } from "class-transformer"

@InputType()
export class CreateEmissionDataInput {
  @Field(() => EmissionType)
  type: EmissionType;
}