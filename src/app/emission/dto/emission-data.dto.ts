import { Field, InputType } from '@nestjs/graphql';
import { EmissionType} from '../models/emission-report.model';

@InputType()
export class CreateEmissionDataInput {
  @Field(() => EmissionType)
  type: EmissionType;
}