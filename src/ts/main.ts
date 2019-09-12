import { GeneticProgramming } from './algorithm/genetic-programming';
import { TreeNode } from '../models/tree-node.model';

export class Main {
  init(): void {
    const geneticProgramming = new GeneticProgramming();

    geneticProgramming.configure(geneticProgramming.defaultConfigs);

    // const leafValues: string[] = [...geneticProgramming.variables, ];
    // const generatedTree: TreeNode = this.generateTree(leafValues, nodeValues);
  }

  generateTree(leafValues: string[], nodeValues: string[]): TreeNode {
    let generatedTree: TreeNode = { value: null, childs: [] };

    return generatedTree;
  }

  isLeafValue() {

  }
}