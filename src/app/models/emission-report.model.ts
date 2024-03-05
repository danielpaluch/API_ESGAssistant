import { Field, ObjectType } from '@nestjs/graphql';
import { EmissionSourceData } from '../interfaces/emission/emission';

@ObjectType()
export class EmissionReport {
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  description: string;

  //   @Field((type) => [EmissionSourceData])
  //   emissionDataArr: EmissionSourceData[];

  @Field((type) => String)
  author: string;

  @Field((type) => Date)
  createdAt: Date;
}
