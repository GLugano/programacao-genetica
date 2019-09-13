import { GeneticProgramming } from './algorithm/genetic-programming';

export class Main {
  init(): void {
    const geneticProgramming = new GeneticProgramming();
    geneticProgramming.configure(geneticProgramming.defaultConfigs);
    geneticProgramming.start();
  }
} 