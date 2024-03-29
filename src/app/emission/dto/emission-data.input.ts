import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { EmissionType} from '../models/emission-report.model';
import { Type } from "class-transformer"
import { FuelGroup, FuelType, FuelUnit } from '../models/fuel.model';
import { ElectricitySource, ElectricityUnit } from '../models/electricity.model';
import { WaterType, WaterUnit } from '../models/water.model';

@InputType()
export class CreateEmissionDataInput {
  @Field(() => EmissionType)
  type: EmissionType;

  @Field(() => FuelGroup, { nullable: true })
  fuelGroup: FuelGroup; // Select field

  @Field(() => FuelType, { nullable: true })
  fuelType: FuelType; // Select field

  @Field(() => FuelUnit, { nullable: true })
  unit: FuelUnit; // Select field

  @Field(() => Float, { nullable: true })
  usedFuel: number; // Number field

  @Field(() => ElectricitySource, { nullable: true })
  electricitySource: ElectricitySource.Default

  @Field(() => ElectricityUnit, { nullable: true })
  electricityUnit: ElectricityUnit.Mwh

  @Field(() => Float, { nullable: true })
  usedElectricity: number

  @Field(() => Float, { nullable: true })
  totalCO2e: number; // Calculation based on usedFuel

  @Field(() => Float, { nullable: true })
  totalCO2: number; // Calculation based on usedFuel

  @Field(() => Float, { nullable: true })
  totalCH4: number; // Calculation based on usedFuel

  @Field(() => Float, { nullable: true })
  totalN2O: number; // Calculation based on usedFuel

  @Field(() => WaterType, { nullable: true })
  waterType: WaterType

  @Field(() => WaterUnit, { nullable: true })
  waterUnit: WaterUnit

  @Field(() => Float, { nullable: true })
  waterUsed: number
}

@InputType()
export class CreateFuelModel extends PartialType(CreateEmissionDataInput) {
  @Field(() => EmissionType)
  type: EmissionType.Fuel;

  @Field(() => FuelGroup)
  fuelGroup: FuelGroup;

  @Field(() => FuelType)
  fuelType: FuelType;

  @Field(() => FuelUnit)
  unit: FuelUnit;

  @Field(() => Float)
  usedFuel: number;

  @Field(() => Float)
  totalCO2e: number;

  @Field(() => Float)
  totalCO2: number;

  @Field(() => Float)
  totalCH4: number;

  @Field(() => Float)
  totalN2O: number;
}

@InputType()
export class CreateElectricityModel extends PartialType(CreateEmissionDataInput) {
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

@InputType()
export class CreateWaterModel extends PartialType(CreateEmissionDataInput) {
  @Field(() => EmissionType)
  type: EmissionType.Water;

  @Field(() => WaterType)
  waterType: WaterType

  @Field(() => WaterUnit)
  waterUnit: WaterUnit

  @Field(() => Float)
  waterUsed: number

  @Field(() => Float)
  totalCO2e: number
}
