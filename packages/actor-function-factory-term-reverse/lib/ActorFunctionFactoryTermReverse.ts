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
import { TermFunctionReverse } from './TermFunctionReverse';

/**
 * A comunica TermFunctionEnvelope Function Factory Actor.
 */
export class ActorFunctionFactoryTermReverse extends ActorFunctionFactoryDedicated {
  public constructor(args: IActorFunctionFactoryArgs) {
    super({
      ...args,
      functionNames: [ GeoSparqlExtOperator.REVERSE ],
      termFunction: true,
    });
  }

  public async run<T extends IActionFunctionFactory>(_: T):
  Promise<T extends { requireTermExpression: true } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput> {
    return new TermFunctionReverse();
  }
}
