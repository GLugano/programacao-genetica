import { AlgorithmConfig } from "../../models/algorithm-config.model";

export class GeneticProgramming extends AlgorithmConfig {
  operators: string[] = ["+", "-", "*", "/"];
  defaultConfigs: AlgorithmConfig = {
    minNumber: 0,
    maxNumber: 10,
    variables: ["A", "B", "C"],
    maxTreeDepth: 10,
    percentMutation: 3,
  };
  numeric: string[];

  start(): void { }

  configure(configs: AlgorithmConfig): void {
    this.maxNumber = configs.maxNumber;
    this.minNumber = configs.minNumber;
    this.variables = configs.variables;
    this.maxTreeDepth = configs.maxTreeDepth;
    this.percentMutation = configs.percentMutation;
    console.log(1);
    console.log(this.generateNumberRange());
  }

  *generateNumberRange() {
    for (let i = this.minNumber; i <= this.maxNumber; i++) {
      yield i + "";
    }
  }
}