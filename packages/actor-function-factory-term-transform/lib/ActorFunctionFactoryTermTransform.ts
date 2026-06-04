import type {
  IActionFunctionFactory,
  IActorFunctionFactoryArgs,
  IActorFunctionFactoryOutput,
  IActorFunctionFactoryOutputTerm,
} from '@comunica/bus-function-factory';
import {
  ActorFunctionFactoryDedicated,
} from '@comunica/bus-function-factory';

import { GeoSparqlOperator } from '@comunica/utils-expression-evaluator';
import { TermFunctionTransform } from './TermFunctionTransform';

/**
 * A comunica TermFunctionEnvelope Function Factory Actor.
 */
export class ActorFunctionFactoryTermTransform extends ActorFunctionFactoryDedicated {
  public constructor(args: IActorFunctionFactoryArgs) {
    super({
      ...args,
      functionNames: [ GeoSparqlOperator.TRANSFORM ],
      termFunction: true,
    });
  }

  public async run<T extends IActionFunctionFactory>(_: T):
  Promise<T extends { requireTermExpression: true } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput> {
    return new TermFunctionTransform();
  }
}
