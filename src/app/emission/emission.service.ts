import { BadRequestException, Injectable } from '@nestjs/common';
import { EmissionReport, EmissionReportDocument, EmissionType } from './models/emission-report.model';
import { Fuel, FuelGroup, FuelUnit, FuelType } from './models/fuel.model';
import { Electricity, ElectricitySource, ElectricityUnit } from './models/electricity.model';
import { Water, WaterType, WaterUnit } from './models/water.model';
import { Model, Schema as MongooseSchema } from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import { CreateEmissionInput } from './dto/create-emission.input';

@Injectable()
export class EmissionService {
  constructor(@InjectModel(EmissionReport.name) private emissionModel: Model<EmissionReportDocument>) {}

  async createEmissionReport(payload: CreateEmissionInput): Promise<EmissionReport> {
    // const fuelEmission: Fuel = {
    //   type: EmissionType.Fuel,
    //   fuelGroup: FuelGroup.GaseousFuels,
    //   fuelType: FuelType.Butane,
    //   unit: FuelUnit.Litres,
    //   usedFuel: 10,
    //   totalCO2e: 10,
    //   totalCO2: 10,
    //   totalCH4: 10,
    //   totalN2O: 10,
    // };
    //
    // const electricityEmission: Electricity = {
    //   type: EmissionType.Electricity,
    //   electricitySource: ElectricitySource.Default,
    //   electricityUnit: ElectricityUnit.Mwh,
    //   usedElectricity: 100,
    //   totalCO2e: 100,
    // }
    //
    // const waterEmmision: Water = {
    //   type: EmissionType.Water,
    //   waterType: WaterType.WaterSupply,
    //   waterUnit: WaterUnit.CubicMetres,
    //   waterUsed: 100,
    //   totalCO2e: 100,
    // }
    //
    // const report: EmissionReport = {
    //   name: 'Name',
    //   author: 'XD',
    //   description: 'Description',
    //   created_at: new Date(),
    //   emission_data_arr: [fuelEmission, electricityEmission, waterEmmision],
    // };
    try {
      const emissionDataArr = payload.emission_data_arr.map((emissionData: any) => {
        if(emissionData.type === EmissionType.Fuel) {
          return new Fuel(emissionData);
        }
        if(emissionData.type === EmissionType.Electricity) {
          return new Electricity(emissionData);
        }
      })

      console.log(emissionDataArr)

      const emissionReportData: EmissionReport = {
        ...payload,
        created_at: new Date()
      }



      const emissionReportModel = new this.emissionModel(emissionReportData);
      const createdEmissionReport = await emissionReportModel.save()

      return createdEmissionReport
    } catch (error) {
      console.log(error.message)
      throw new BadRequestException(error.message)
    }

  }

  // Delete the emission report by id
  async deleteEmissionReportById(_id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    return this.emissionModel.findByIdAndDelete(_id)
  }

  // Get the emission report
  async getAllEmissionReports(): Promise<EmissionReport[]> {
    return this.emissionModel.find()
  }

  // Get the emission report by id
  async getEmissionReportById(_id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    return this.emissionModel.findById(_id);
  }
}
