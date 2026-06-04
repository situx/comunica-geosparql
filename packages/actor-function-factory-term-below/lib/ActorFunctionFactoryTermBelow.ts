import type {
  IActionFunctionFactory,
  IActorFunctionFactoryArgs,
  IActorFunctionFactoryOutput,
  IActorFunctionFactoryOutputTerm,
} from '@comunica/bus-function-factory';
import {
  ActorFunctionFactoryDedicated,
} from '@comunica/bus-function-factory';

import { GeoSparqlExtOperator } from '@comunica/utils-expression-evaluator';
import { TermFunctionBelow } from './TermFunctionBelow';

/**
 * A comunica TermFunctionEnvelope Function Factory Actor.
 */
export class ActorFunctionFactoryTermBelow extends ActorFunctionFactoryDedicated {
  public constructor(args: IActorFunctionFactoryArgs) {
    super({
      ...args,
      functionNames: [ GeoSparqlExtOperator.BELOW ],
      termFunction: true,
    });
  }

  public async run<T extends IActionFunctionFactory>(_: T):
  Promise<T extends { requireTermExpression: true } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput> {
    return new TermFunctionBelow();
  }
}
