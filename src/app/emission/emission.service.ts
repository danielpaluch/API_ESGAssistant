import { Injectable } from '@nestjs/common';
import { FuelType } from '../interfaces/emission/fuels';
import { EmissionReport, EmissionType } from './models/emission-report.model';
import { Fuel, FuelGroup, FuelUnit } from './models/fuel.model';

@Injectable()
export class EmissionService {
  async emissionReport(): Promise<EmissionReport> {
    const emissionData: Fuel = {
      type: EmissionType.Fuel,
      fuelGroup: FuelGroup.GaseousFuels,
      fuelType: FuelType.Butane,
      unit: FuelUnit.Litres,
      usedFuel: 10,
      totalCO2e: 10,
      totalCO2: 10,
      totalCH4: 10,
      totalN2O: 10,
    };

    const report: EmissionReport = {
      name: 'Name',
      author: 'XD',
      description: 'Description',
      created_at: new Date(),
      emission_data_arr: [emissionData],
    };

    return report;
  }
}
