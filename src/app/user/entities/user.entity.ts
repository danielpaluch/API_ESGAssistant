import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Role } from '../../enums/role.enum';

@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String)
  @Prop({ required: true })
  firstName: string;

  @Field(() => String)
  @Prop({ required: true })
  lastName: string;

  @Field(() => String)
  @Prop({ required: true })
  email: string;

  @Field(() => String)
  @Prop({ required: true })
  password: string;

  @Field(() => [Role])
  @Prop({ required: true })
  roles: Role[];

  @Field(() => String)
  @Prop({ required: true })
  phone: string;

  @Field(() => String)
  @Prop({ required: true })
  company: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
