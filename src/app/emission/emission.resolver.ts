import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmissionService } from './emission.service';
import { EmissionReport } from './models/emission-report.model';
import { Schema as MongooseSchema } from 'mongoose';
import { CreateEmissionInput } from './dto/create-emission.input';
import { EmissionReportResult} from './dto/delete-emission.dto';


@Resolver(() => EmissionReport)
export class EmissionResolver {
  constructor(private readonly emissionService: EmissionService) {}

  // Mutation for testing
  @Mutation(() => EmissionReportResult)
  async createEmissionReport(@Args('payload') payload: CreateEmissionInput): Promise<EmissionReportResult> {
    const createdReport = await this.emissionService.createEmissionReport(payload);
    const createdSuccess = !!createdReport;
    return new EmissionReportResult(createdSuccess, createdSuccess ? "The report has been created successfully" : undefined);
  }

  // Delete the emission report by id
  @Mutation(() => EmissionReportResult)
  async deleteEmissionReportById(@Args('_id', {type: () => String}) _id: MongooseSchema.Types.ObjectId): Promise<EmissionReportResult> {
    const deletedReport = await this.emissionService.deleteEmissionReportById(_id);
    const deletedSuccess = !!deletedReport;
    return new EmissionReportResult(deletedSuccess, deletedSuccess ? "The report has been deleted successfully" : undefined);
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
