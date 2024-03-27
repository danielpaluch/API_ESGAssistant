import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EmissionData, EmissionType } from "./emission-report.model";
import { CreateWaterModel } from '../dto/emission-data.input';

export enum WaterType {
    WaterSupply = "Water Supply",
    WaterTreatment = "Water Treatment",
}

registerEnumType(WaterType, { name: 'WaterType' })  

export enum WaterUnit {
    CubicMetres = "Cubic Metres",
}

registerEnumType(WaterUnit, { name: 'WaterUnit' })  

@ObjectType({ implements: EmissionData })
export class Water implements EmissionData {
  constructor(emissionData: CreateWaterModel) {
    this.waterType = emissionData.waterType;
    this.waterUnit = emissionData.waterUnit;
    this.waterUsed = emissionData.waterUsed;
    this.totalCO2e = emissionData.totalCO2e;
  }

  @Field(type => EmissionType)
  type: EmissionType.Water

  @Field(type => WaterType)
  waterType: WaterType

  @Field(type => WaterUnit)
  waterUnit: WaterUnit

  @Field(type => Float)
  waterUsed: number

  @Field(type => Float)
  totalCO2e: number
}

