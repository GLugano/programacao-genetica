import { AlgorithmConfig } from "../../models/algorithm-config.model";
import { TreeNode } from "../../models/tree-node.model";
import _ from "lodash";

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
  root: TreeNode = null;

  start(): void {
    this.root = this.generateNode();
    console.log(JSON.stringify(this.root, null, 4));
  }

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

  generateNode(depth: number = 1): TreeNode {
    const newNode: TreeNode = { value: null, childs: [], depth: depth };
    const isLeaf: boolean = depth >= this.maxTreeDepth || (_.random(0, 6) % 5) === 0;
    let values: string[];

    if (isLeaf || depth >= this.maxTreeDepth) {
      values = this.leafValues;
    } else {
      values = this.operators;

      newNode.childs = [this.generateNode(depth + 1), this.generateNode(depth + 1)];
    }

    newNode.value = values[_.random(0, values.length - 1)];

    return newNode;
  }
}