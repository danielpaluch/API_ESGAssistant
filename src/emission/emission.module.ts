import { Module } from '@nestjs/common';
import { EmissionService } from './emission.service';

@Module({
  providers: [EmissionService]
})
export class EmissionModule {}
