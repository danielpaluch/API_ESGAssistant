import { IFuel } from './fuels';

enum EmissionsData {
  IFuel,
}

export interface Emission {
  emissionData: EmissionsData;
}
