import { Field, Float, ObjectType, registerEnumType } from "@nestjs/graphql";
import { EmissionData, EmissionType } from "./emission-report.model";

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

