import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmissionService } from './emission.service';
import { EmissionReport } from './models/emission-report.model';

@Resolver()
export class EmissionResolver {
  constructor(private readonly emissionService: EmissionService) {}

  @Mutation(() => EmissionReport)
  async emissionReport(): Promise<EmissionReport> {
    return await this.emissionService.emissionReport();
  }
}
