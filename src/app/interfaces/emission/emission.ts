import { IFuel } from './fuels';

export enum EmissionSourceName {
  Fuel = 'Fuel',
}

export interface IEmissionData {
  type: EmissionSourceName;
}

export type EmissionSourceData = IFuel;

// This is the main interface for the emission report
export interface IEmissionReport {
  name: string;
  description: string;
  emissionDataArr: EmissionSourceData[];
  author: string;
  createdAt: Date;
}
