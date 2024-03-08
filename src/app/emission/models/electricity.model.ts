import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EmissionData, EmissionType } from "./emission-report.model";


// This source is based on data from Poland
// Can be updated to other data
export enum ElectricitySource {
    Default = "Default"
}

registerEnumType(ElectricitySource, { name: 'ElectricitySource' })

export enum ElectricityUnit {
  Mwh = "Mwh",
}

registerEnumType(ElectricityUnit, { name: 'ElectricityUnit' })

@ObjectType({ implements: EmissionData})
export class Electricity implements EmissionData {
  @Field((type) => EmissionType)
  type: EmissionType.Electricity;

  @Field(type => ElectricitySource)
  electricitySource: ElectricitySource.Default

  @Field(type => ElectricityUnit)
  electricityUnit: ElectricityUnit.Mwh

  @Field(type => Float)
  usedElectricity: number

  @Field(type => Float)
  totalCO2e: number
}

