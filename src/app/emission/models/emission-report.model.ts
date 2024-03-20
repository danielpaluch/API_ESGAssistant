import {
  Field,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum EmissionType {
  Fuel = 'Fuel',
  Electricity = 'Electricity',
  Water = 'Water'
}

registerEnumType(EmissionType, { name: 'EmissionType' });

@InterfaceType({
  resolveType: (value) => {
    if (value.type === EmissionType.Fuel) {
      return 'Fuel';
    }

    if (value.type === EmissionType.Electricity) {
      return 'Electricity';
    }

    if (value.type === EmissionType.Water) {
      return 'Water';
    }
  },
})
export abstract class EmissionData {
  @Field(() => EmissionType)
  type: EmissionType;
}

@ObjectType({ description: "The main EmissionReport Model"})
@Schema()
export class EmissionReport{
  @Field(() => String)
  _id?: MongooseSchema.Types.ObjectId

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => [EmissionData])
  @Prop()
  emission_data_arr: EmissionData[];

  @Field(() => String)
  @Prop()
  author: string;

  @Field(() => Date)
  @Prop()
  created_at: Date;
}

export type EmissionReportDocument = EmissionReport & Document;
export const EmissionReportSchema = SchemaFactory.createForClass(EmissionReport);

