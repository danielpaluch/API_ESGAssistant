enum FuelGroup {
  'Gaseous fuels',
  'Liquid fuels',
  'Solid fuels',
  'Biofuels/Biomass',
}

enum FuelType {
  'Butane',
  'CNG',
  'LNG',
  'LPG',
  'Natural gas',
  'Natural gas (100% mineral blend)',
  'Other petroleum gas',
  'Propane',
  'Aviation spirit',
  'Aviation turbine fuel',
  'Burning oil',
  'Diesel (average biofuel blend)',
  'Diesel (100% mineral diesel)',
  'Fuel oil',
  'Gas oil',
  'Naphtha',
  'Petrol (average biofuel blend)',
  'Petrol (100% mineral petrol)',
  'Processed fuel oils - residual oil',
  'Processed fuel oils - distillate oil',
  'Waste oils',
  'Marine gas oil',
  'Marine fuel oil',
  'Coal (industrial)',
  'Coal (electricity generation)',
  'Coal (domestic)',
  'Coking coal',
  'Petroleum coke',
  'Coal (electricity generation - home produced coal only)',
  'Bioethanol',
  'Biodiesel ME',
  'Biomethane (compressed)',
  'Biodiesel ME (from used cooking oil)',
  'Biodiesel ME (from tallow)',
  'Biodiesel HVO',
  'Biopropane',
  'Development diesel',
  'Development petrol',
  'Off road biodiesel',
  'Biomethane (liquified)',
  'Methanol (bio)',
  'Avtur (renewable)',
  'Wood logs',
  'Wood chips',
  'Wood pellets',
  'Grass/straw',
  'Biogas',
  'Landfill gas',
}

enum FuelUnit {
  Tonnes,
  Litres,
  CubicMetres,
  KWhNetCv, // Net CV stands for Net Calorific Value
  KWhGrossCv, // Gross CV stands for Gross Calorific Value
  GJ,
  Kg,
}

export interface IFuel {
  fuelGroup: FuelGroup; // Select field
  fuelType: FuelType; // Select field
  unit: FuelUnit; // Select field
  usedFuel: number; // Number field
  totalCO2e: number; // Calculation based on usedFuel
  totalCO2: number; // Calculation based on usedFuel
  totalCH4: number; // Calculation based on usedFuel
  totalN2O: number; // Calculation based on usedFuel
}

// VALIDATION
// totalCO2e should be the sum of totalCO2, totalCH4 and totalN2O
