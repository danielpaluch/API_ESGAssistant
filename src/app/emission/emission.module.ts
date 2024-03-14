import { Module } from '@nestjs/common';
import { EmissionResolver } from './emission.resolver';
import { EmissionService } from './emission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmissionReport, EmissionReportSchema } from '../schemas/emission-report.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmissionReport.name, schema: EmissionReportSchema }])],
  providers: [EmissionService, EmissionResolver],
})
export class EmissionModule {}
