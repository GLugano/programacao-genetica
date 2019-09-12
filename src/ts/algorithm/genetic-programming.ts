import { AlgorithmConfig } from "../../models/algorithm-config.model";
import { TreeNode } from "../../models/tree-node.model";

export class GeneticProgramming extends AlgorithmConfig {
  operators: string[] = ["+", "-", "*", "/"];
  defaultConfigs: AlgorithmConfig = {
    minNumber: 0,
    maxNumber: 10,
    variables: ["A", "B", "C"],
    maxTreeDepth: 10,
    percentMutation: 3,
  };
  leafValues: string[] = [];

  start(): void { }

  configure(configs: AlgorithmConfig): void {
    this.maxNumber = configs.maxNumber;
    this.minNumber = configs.minNumber;
    this.variables = configs.variables;
    this.maxTreeDepth = configs.maxTreeDepth;
    this.percentMutation = configs.percentMutation;
    this.leafValues = [...this.generateNumberRange(), ...this.variables];
  }

  generateNumberRange(): string[] {
    const range: string[] = [];

    for (let i = this.minNumber; i <= this.maxNumber; i++) {
      range.push(i + "");
    }

    return range;
  }

  generateNode(leafValues: string[] = this.leafValues, nodeValues: string[] = this.operators): TreeNode {
    const newNode: TreeNode = { value: null, childs: [] };
    const isLeaf: boolean = (Math.floor(Math.random() * 5) + 1) % 5 === 0;
    let values: string[];

    if (isLeaf) {
      values = leafValues;
    } else {
      values = nodeValues;

      newNode.childs = [this.generateNode(), this.generateNode()];
    }

    newNode.value = values[Math.floor(Math.random() * values.length)];

    return newNode;
  }
}