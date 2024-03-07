import {
  Field,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum EmissionType {
  Fuel = 'Fuel',
}

registerEnumType(EmissionType, { name: 'EmissionType' });

@InterfaceType({
  resolveType: (value) => {
    if (value.type === EmissionType.Fuel) {
      return 'Fuel';
    }
  },
})
export abstract class EmissionData {
  @Field((type) => EmissionType)
  type: EmissionType;
}

@ObjectType()
export class EmissionReport{
  @Field((type) => String)
  name: string;

  @Field((type) => String)
  description: string;

  @Field((type) => [EmissionData])
  emission_data_arr: EmissionData[];

  @Field((type) => String)
  author: string;

  @Field((type) => Date)
  created_at: Date;
}
