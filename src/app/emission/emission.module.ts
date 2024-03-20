import { Module } from '@nestjs/common';
import { EmissionResolver } from './emission.resolver';
import { EmissionService } from './emission.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmissionReport, EmissionReportSchema } from './models/emission-report.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: EmissionReport.name, schema: EmissionReportSchema }])],
  providers: [EmissionService, EmissionResolver],
})
export class EmissionModule {}
