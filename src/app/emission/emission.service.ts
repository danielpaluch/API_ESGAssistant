import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EmissionReport,
  EmissionReportDocument,
  EmissionType,
} from './models/emission-report.model';
import { Fuel, FuelGroup, FuelUnit, FuelType } from './models/fuel.model';
import { Electricity, ElectricitySource, ElectricityUnit } from './models/electricity.model';
import { Water, WaterType, WaterUnit } from './models/water.model';
import { Model, Schema as MongooseSchema } from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import { CreateEmissionInput } from './dto/create-emission.input';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EmissionService {
  constructor(@InjectModel(EmissionReport.name) private emissionModel: Model<EmissionReportDocument>) {}

  async createEmissionReport(payload: CreateEmissionInput): Promise<EmissionReport> {
    try {
      const emissionDataArr = payload.emission_data_arr.map((emissionData: any) => {
        if(emissionData.type === EmissionType.Fuel) {
          return new Fuel(emissionData);
        }
        if(emissionData.type === EmissionType.Electricity) {
          return new Electricity(emissionData);
        }
        if(emissionData.type === EmissionType.Water) {
          return new Water(emissionData);
        }
      })

      const emissionReportData: EmissionReport = {
        ...payload,
        created_at: new Date()
      }

      const emissionReportModel = new this.emissionModel(emissionReportData);

      return await emissionReportModel.save()
    } catch (error) {
      throw new BadRequestException(error.message)
    }

  }

  // Delete the emission report by id
  async deleteEmissionReportById(_id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    try {
      const deletedReport = this.emissionModel.findByIdAndDelete(_id).lean()

      if (!deletedReport) {
        throw new BadRequestException('The report does not exist or has already been deleted')
      }

      return deletedReport
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  // Get the emission report
  async getAllEmissionReports(): Promise<EmissionReport[]> {
    return this.emissionModel.find().lean()
  }

  // Get the emission report by id
  async getEmissionReportById(_id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    return this.emissionModel.findById(_id).lean();
  }
}
