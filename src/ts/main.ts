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

  generateNode(node: TreeNode, leafValues: string[], nodeValues: string[]): void {
    const newNode: TreeNode = { value: null, childs: [] };
    const isLeaf: boolean = (Math.floor(Math.random() * 5) + 1) % 5 === 0;

  }

  isLeafValue() {

  }
}