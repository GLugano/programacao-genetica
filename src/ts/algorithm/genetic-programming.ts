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
    initialPopulation: 15,
    maxPopulation: 200,
  };
  leafValues: string[] = [];
  nodes: TreeNode[] = [];

  start(): void {
    for (let i = 0; i < this.initialPopulation; i++) {
      this.nodes[i] = this.generateNode();
    }

    console.log(this.nodes.length);
  }

  configure(configs: AlgorithmConfig): void {
    this.maxNumber = configs.maxNumber || this.defaultConfigs.maxNumber;
    this.minNumber = configs.minNumber || this.defaultConfigs.minNumber;
    this.variables = configs.variables || this.defaultConfigs.variables;
    this.maxTreeDepth = configs.maxTreeDepth || this.defaultConfigs.maxTreeDepth;
    this.percentMutation = configs.percentMutation || this.defaultConfigs.percentMutation;
    this.maxPopulation = configs.maxPopulation || this.defaultConfigs.maxPopulation;
    this.initialPopulation = configs.maxPopulation || this.defaultConfigs.initialPopulation;

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