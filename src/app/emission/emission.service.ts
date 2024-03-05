import { Injectable } from '@nestjs/common';

@Injectable()
export class EmissionService {
  async emissionReport() {
    return {
      name: 'Name',
      author: 'XD',
    };
  }
}
