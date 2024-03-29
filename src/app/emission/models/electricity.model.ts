import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EmissionData, EmissionType } from "./emission-report.model";
import { CreateElectricityModel, CreateEmissionDataInput } from '../dto/emission-data.input';


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
  constructor(emissionData: CreateElectricityModel) {
    this.electricitySource = emissionData.electricitySource;
    this.electricityUnit = emissionData.electricityUnit;
    this.usedElectricity = emissionData.usedElectricity;
    this.totalCO2e = emissionData.totalCO2e;
  }


  @Field(() => EmissionType)
  type: EmissionType.Electricity;

  @Field(() => ElectricitySource)
  electricitySource: ElectricitySource.Default

  @Field(() => ElectricityUnit)
  electricityUnit: ElectricityUnit.Mwh

  @Field(() => Float)
  usedElectricity: number

  @Field(() => Float)
  totalCO2e: number
}

