import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { EmissionService } from './emission.service';
import { EmissionReport } from './models/emission-report.model';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateEmissionDto } from './dto/create-emission.dto';

@Resolver(() => EmissionReport)
export class EmissionResolver {
  constructor(private readonly emissionService: EmissionService) {}

  // Mutation for testing
  @Mutation(() => EmissionReport)
  async createEmissionReport(@Args('payload') payload: CreateEmissionDto): Promise<EmissionReport> {
    return await this.emissionService.createEmissionReport(payload);
  }

  // Delete the emission report by id
  @Mutation(() => EmissionReport)
  async deleteEmissionReportById(@Args('_id', {type: () => String}) _id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    return await this.emissionService.deleteEmissionReportById(_id);
  }

  // Query for getting all emission reports
  @Query(() => [EmissionReport])
  async getAllEmissionReports(): Promise<EmissionReport[]> {
    return await this.emissionService.getAllEmissionReports();
  }

  // Query for getting the emission report by id
  @Query(() => EmissionReport)
  async getEmissionReportById(@Args('_id', {type: () => String}) _id: MongooseSchema.Types.ObjectId): Promise<EmissionReport> {
    return await this.emissionService.getEmissionReportById(_id);
  }
}
