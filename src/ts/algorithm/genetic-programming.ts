import { AlgorithmConfig } from "../../models/algorithm-config.model";
import { TreeNode } from "../../models/tree-node.model";
import _ from "lodash";
import { evaluate } from "mathjs";
import fs from "fs";
import { AlgorithmObj } from "../../models/algorithm-object.model";

interface INodeInTree {
  node: TreeNode;
  position: number;
  found: boolean;
}

export class GeneticProgramming extends AlgorithmConfig {
  operators: string[] = ["+", "-", "*", "/"];
  defaultConfigs: AlgorithmConfig = {
    minNumber: 0,
    maxNumber: 10,
    variables: [],
    maxTreeDepth: 10,
    percentMutation: 3,
    initialPopulation: 15,
    maxPopulation: 200,
  };
  leafValues: string[] = [];
  nodes: AlgorithmObj[] = [];
  testValues: any[] = [];
  bestNode: AlgorithmObj;

  start(): void {
    let jsonData: any;

    fs.readFile('./entrada.json', 'utf-8', (err, data) => {
      if (err) throw err;

      jsonData = JSON.parse(data);

      jsonData.values.forEach((value) => {
        this.testValues.push(value);
      });

      for (let prop in this.testValues[0]) {
        if (prop !== "resultado") {
          this.variables.push(prop);
        }
      }

      for (let i = 0; i < this.initialPopulation; i++) {
        const tree: TreeNode = this.generateNode();
        this.nodes[i] = {
          fitness: this.calcCompleteFitness(this.treeNodeToString(tree)),
          tree,
        }
      }

      this.saveBestFitness();
    });
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
      if (i !== 0) range.push(i + "");
    }

    return range;
  }

  generateNode(depth: number = 1, father: TreeNode = null): TreeNode {
    const newNode: TreeNode = { value: null, children: [], depth: depth, father: father };
    const isLeaf: boolean = depth >= this.maxTreeDepth || (_.random(0, 6) % 5) === 0;
    let values: string[];

    if (isLeaf || depth >= this.maxTreeDepth) {
      values = this.leafValues;
    } else {
      values = this.operators;

      newNode.children = [this.generateNode(depth + 1, newNode), this.generateNode(depth + 1, newNode)];
    }

    newNode.value = values[_.random(0, values.length - 1)];

    return newNode;
  }

  treeNodeToString(node: TreeNode): string {
    let value: string = node.value;

    if (node.children.length !== 0) {
      let child1: TreeNode = node.children[0];
      let child2: TreeNode = node.children[1];

      if (this.hasChild(node.children[0])) {
        value = this.treeNodeToString(child1) + " " + value;
      } else {
        value = child1.value + " " + value;
      }

      if (this.hasChild(child2)) {
        value += " " + this.treeNodeToString(child2);
      } else {
        value += " " + child2.value;
      }
    }

    return value;
  }

  hasChild(node: TreeNode) {
    return !!node.children;
  }

  calcFitness(expected: number, result: number) {
    return Math.pow(Math.abs(expected - result), 2);
  }

  calcCompleteFitness(calc: string) {
    let fitness: number = 0;

    this.testValues.forEach((value) => {
      fitness += this.calcFitness(evaluate(calc, value), value.resultado);
    });

    return Math.sqrt(fitness);
  }

  saveBestFitness() {
    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (!this.bestNode || this.bestNode.fitness > node.fitness) {
        this.bestNode = node;
      }
    }
  }

  getTreeSize(tree: TreeNode, size: number = 0): number {
    if (this.hasChild(tree)) {
      size += this.getTreeSize(tree.children[0]) + this.getTreeSize(tree.children[1]);
    }

    return size++;
  }

  getRandomNodeFromTree(tree: TreeNode): TreeNode {
    const treeSize: number = this.getTreeSize(tree);
    const randomValue: number = _.random(1, treeSize);
    const node: INodeInTree = this.getNode({
      found: false,
      node: tree,
      position: 1,
    }, randomValue);

    return node ? node.node : null;
  }

  getNode(node: INodeInTree, target: number): INodeInTree {
    if (node.position === target) {
      node.found = true;
    } else if (this.hasChild(node.node)) {
      let newNode: INodeInTree = {
        node: node.node.children[0],
        position: node.position + 1,
        found: false,
      };

      newNode = this.getNode(newNode, target);

      if (newNode.found) {
        return newNode;
      } else {
        newNode.node = node.node.children[1];
        newNode.position = newNode.position + 1;

        return this.getNode(newNode, target);
      }
    }

    return node;
  }

  do() {
    // crossover
    // mutação

    this.doAllFitness();
    this.saveBestFitness();
  }

  doAllFitness() {
    for (let i = 0; i < this.nodes.length; i++) {
      const obj: AlgorithmObj = this.nodes[i];
      
      if (obj.fitness !== null || obj.fitness !== undefined) {
        obj.fitness = this.calcCompleteFitness(this.treeNodeToString(obj.tree));
      }
    }
  }
}