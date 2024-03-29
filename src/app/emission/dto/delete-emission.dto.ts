import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmissionReportResult {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String,{nullable: true})
  message?: string;

  constructor(success: boolean, message?: string) {
    this.success = success;
    this.message = message;
  }
}