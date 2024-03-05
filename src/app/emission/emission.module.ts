import { Module } from '@nestjs/common';
import { EmissionResolver } from './emission.resolver';
import { EmissionService } from './emission.service';

@Module({
  providers: [EmissionService, EmissionResolver],
  controllers: [EmissionResolver],
})
export class EmissionModule {}
