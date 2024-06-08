import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}