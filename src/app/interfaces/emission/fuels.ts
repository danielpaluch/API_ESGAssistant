import { EmissionSourceName, IEmissionData } from './emission';

export enum FuelGroup {
  GaseousFuels = 'Gaseous fuels',
  LiquidFuels = 'Liquid fuels',
  SolidFuels = 'Solid fuels',
  BiofuelsBiomass = 'Biofuels/Biomass',
}

export enum FuelType {
  Butane = 'Butane',
  CNG = 'CNG',
  LNG = 'LNG',
  LPG = 'LPG',
  NaturalGas = 'Natural gas',
  NaturalGas100MineralBlend = 'Natural gas (100% mineral blend)',
  OtherPetroleumGas = 'Other petroleum gas',
  Propane = 'Propane',
  AviationSpirit = 'Aviation spirit',
  AviationTurbineFuel = 'Aviation turbine fuel',
  BurningOil = 'Burning oil',
  DieselAverageBiofuelBlend = 'Diesel (average biofuel blend)',
  Diesel100MineralDiesel = 'Diesel (100% mineral diesel)',
  FuelOil = 'Fuel oil',
  GasOil = 'Gas oil',
  Naphtha = 'Naphtha',
  PetrolAverageBiofuelBlend = 'Petrol (average biofuel blend)',
  Petrol100MineralPetrol = 'Petrol (100% mineral petrol)',
  ProcessedFuelOilsResidualOil = 'Processed fuel oils - residual oil',
  ProcessedFuelOilsDistillateOil = 'Processed fuel oils - distillate oil',
  WasteOils = 'Waste oils',
  MarineGasOil = 'Marine gas oil',
  MarineFuelOil = 'Marine fuel oil',
  CoalIndustrial = 'Coal (industrial)',
  CoalElectricityGeneration = 'Coal (electricity generation)',
  CoalDomestic = 'Coal (domestic)',
  CokingCoal = 'Coking coal',
  PetroleumCoke = 'Petroleum coke',
  CoalElectricityGenerationHomeProducedCoalOnly = 'Coal (electricity generation - home produced coal only)',
  Bioethanol = 'Bioethanol',
  BiodieselME = 'Biodiesel ME',
  BiomethaneCompressed = 'Biomethane (compressed)',
  BiodieselMEFromUsedCookingOil = 'Biodiesel ME (from used cooking oil)',
  BiodieselMEFromTallow = 'Biodiesel ME (from tallow)',
  BiodieselHVO = 'Biodiesel HVO',
  Biopropane = 'Biopropane',
  DevelopmentDiesel = 'Development diesel',
  DevelopmentPetrol = 'Development petrol',
  OffRoadBiodiesel = 'Off road biodiesel',
  BiomethaneLiquified = 'Biomethane (liquified)',
  MethanolBio = 'Methanol (bio)',
  AvturRenewable = 'Avtur (renewable)',
  WoodLogs = 'Wood logs',
  WoodChips = 'Wood chips',
  WoodPellets = 'Wood pellets',
  GrassStraw = 'Grass/straw',
  Biogas = 'Biogas',
  LandfillGas = 'Landfill gas',
}

export enum FuelUnit {
  Tonnes = 'tonnes',
  Litres = 'litres',
  CubicMetres = 'cubicMetres',
  KWhNetCv = 'kWhNetCv', // Net CV stands for Net Calorific Value
  KWhGrossCv = 'kWhGrossCv', // Gross CV stands for Gross Calorific Value
  GJ = 'gj',
  Kg = 'kg',
}

export interface IFuel extends IEmissionData {
  fuelGroup: FuelGroup; // Select field
  fuelType: FuelType; // Select field
  unit: FuelUnit; // Select field
  usedFuel: number; // Number field
  totalCO2e: number; // Calculation based on usedFuel
  totalCO2?: number; // Calculation based on usedFuel
  totalCH4?: number; // Calculation based on usedFuel
  totalN2O?: number; // Calculation based on usedFuel
}

// VALIDATION
// totalCO2e should be the sum of totalCO2, totalCH4 and totalN2O
