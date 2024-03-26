import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { EmissionType} from '../models/emission-report.model';
import { Type } from "class-transformer"
import { FuelGroup, FuelType, FuelUnit } from '../models/fuel.model';
import { ElectricitySource, ElectricityUnit } from '../models/electricity.model';

@InputType()
export class CreateEmissionDataInput {
  @Field(() => EmissionType)
  type: EmissionType;

  // @Field(() => FuelGroup)
  // fuelGroup: FuelGroup; // Select field
  //
  // @Field(() => FuelType)
  // fuelType: FuelType; // Select field
  //
  // @Field(() => FuelUnit)
  // unit: FuelUnit; // Select field
  //
  // @Field(() => Float)
  // usedFuel: number; // Number field
  //
  // @Field(() => ElectricitySource)
  // electricitySource: ElectricitySource.Default
  //
  // @Field(() => ElectricityUnit)
  // electricityUnit: ElectricityUnit.Mwh
  //
  // @Field(() => Float)
  // usedElectricity: number
  //
  // @Field(() => Float)
  // totalCO2e: number; // Calculation based on usedFuel
  //
  // @Field(() => Float)
  // totalCO2: number; // Calculation based on usedFuel
  //
  // @Field(() => Float)
  // totalCH4: number; // Calculation based on usedFuel
  //
  // @Field(() => Float)
  // totalN2O: number; // Calculation based on usedFuel
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