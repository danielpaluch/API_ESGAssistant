import { Field, InputType } from '@nestjs/graphql';
import { Role } from '../../enums/role.enum';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Role])
  roles: Role[];

  @Field(() => String)
  phone: string;

  @Field(() => String)
  company: string;
}
