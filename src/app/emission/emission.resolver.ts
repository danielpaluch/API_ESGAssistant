import { Query, Resolver } from '@nestjs/graphql';
import { EmissionReport } from '../models/emission-report.model';
import { EmissionService } from './emission.service';

@Resolver()
export class EmissionResolver {
  constructor(private readonly emissionService: EmissionService) {}

  @Query(() => EmissionReport)
  async emissionReport() {
    return await this.emissionService.emissionReport();
  }
}
