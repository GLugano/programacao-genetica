export class AlgorithmConfig {
  maxTreeDepth: number;
  /**
  * Valor numérico mínimo a árvore na geração
  */
  minNumber: number;
  /**
  * Valor numérico máximo a árvore na geração
  */
  maxNumber: number;
  /**
  * Percentual da população que sofrerá mutação
  */
  percentMutation: number;
  /**
  * Lista de variáveis que serão utilizadas na geração da árvore
  */
  variables: string[];
  /**
  * População inicial
  */
  initialPopulation: number;
  /**
  * População inicial
  */
  maxPopulation: number;
}