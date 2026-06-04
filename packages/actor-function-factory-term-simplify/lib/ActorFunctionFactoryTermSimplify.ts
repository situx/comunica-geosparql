import type {
  IActionFunctionFactory,
  IActorFunctionFactoryArgs,
  IActorFunctionFactoryOutput,
  IActorFunctionFactoryOutputTerm,
} from '@comunica/bus-function-factory';
import {
  ActorFunctionFactoryDedicated,
} from '@comunica/bus-function-factory';

import {GeoSparqlExtOperator, GeoSparqlOperator} from '@comunica/utils-expression-evaluator';
import { TermFunctionSimplify } from './TermFunctionSimplify';

/**
 * A comunica TermFunctionSimplify Function Factory Actor.
 */
export class ActorFunctionFactoryTermSimplify extends ActorFunctionFactoryDedicated {
  public constructor(args: IActorFunctionFactoryArgs) {
    super({
      ...args,
      functionNames: [ GeoSparqlExtOperator.SIMPLIFY ],
      termFunction: true,
    });
  }

  public async run<T extends IActionFunctionFactory>(_: T):
  Promise<T extends { requireTermExpression: true } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput> {
    return new TermFunctionSimplify();
  }
}
