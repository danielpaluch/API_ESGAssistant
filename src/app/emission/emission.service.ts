import { Injectable } from '@nestjs/common';
import { FuelType } from '../interfaces/emission/fuels';
import { EmissionReport, EmissionType } from './models/emission-report.model';
import { Fuel, FuelGroup, FuelUnit } from './models/fuel.model';
import { Electricity, ElectricitySource, ElectricityUnit } from './models/electricity.model';
import { Water, WaterType, WaterUnit } from './models/water.model';

@Injectable()
export class EmissionService {
  async createEmissionReport(): Promise<EmissionReport> {
    const fuelEmission: Fuel = {
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

    const electricityEmission: Electricity = {
      type: EmissionType.Electricity,
      electricitySource: ElectricitySource.Default,
      electricityUnit: ElectricityUnit.Mwh,
      usedElectricity: 100,
      totalCO2e: 100,
    }

    const waterEmmision: Water = {
      type: EmissionType.Water,
      waterType: WaterType.WaterSupply,
      waterUnit: WaterUnit.CubicMetres,
      waterUsed: 100,
      totalCO2e: 100,
    }

    const report: EmissionReport = {
      name: 'Name',
      author: 'XD',
      description: 'Description',
      created_at: new Date(),
      emission_data_arr: [fuelEmission, electricityEmission, waterEmmision],
    };

    return report;
  }

  // Get the emission report
  async getAllEmissionReports(): Promise<EmissionReport[]> {
    return await this.getAllEmissionReports();
  }

  // Get the emission report by id
  async getEmissionReportById(id: string): Promise<EmissionReport> {
    return await this.getEmissionReportById(id);
  }

  // Delete the emission report by id
  async deleteEmissionReportById(id: string): Promise<EmissionReport> {
    return await this.deleteEmissionReportById(id);
  }
}
