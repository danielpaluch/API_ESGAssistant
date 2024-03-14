import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { EmissionService } from './emission.service';
import { EmissionReport } from './models/emission-report.model';

@Resolver(() => EmissionReport)
export class EmissionResolver {
  constructor(private readonly emissionService: EmissionService) {}

  // Mutation for testing
  @Mutation(() => EmissionReport)
  async createEmissionReport(): Promise<EmissionReport> {
    return await this.emissionService.createEmissionReport();
  }

  // Query for getting all emission reports
  @Query(() => [EmissionReport])
  async getAllEmissionReports(): Promise<EmissionReport[]> {
    return await this.emissionService.getAllEmissionReports();
  }

  // Query for getting the emission report by id
  @Query(() => EmissionReport)
  async getEmissionReportById(@Args('id') id: string): Promise<EmissionReport> {
    return await this.emissionService.getEmissionReportById(id);
  }

  // Delete the emission report by id
  @Mutation(() => EmissionReport)
  async deleteEmissionReportById(@Args('id') id: string): Promise<EmissionReport> {
    return await this.emissionService.deleteEmissionReportById(id);
  }
}
