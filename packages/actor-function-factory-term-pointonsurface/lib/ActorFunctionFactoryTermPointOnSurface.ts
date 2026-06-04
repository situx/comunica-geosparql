import type {
  IActionFunctionFactory,
  IActorFunctionFactoryArgs,
  IActorFunctionFactoryOutput,
  IActorFunctionFactoryOutputTerm,
} from '@comunica/bus-function-factory';
import {
  ActorFunctionFactoryDedicated,
} from '@comunica/bus-function-factory';

import {GeoSparqlExtOperator} from '@comunica/utils-expression-evaluator';
import { TermFunctionPointOnSurface } from './TermFunctionPointOnSurface';

/**
 * A comunica TermFunctionSimplify Function Factory Actor.
 */
export class ActorFunctionFactoryTermPointOnSurface extends ActorFunctionFactoryDedicated {
  public constructor(args: IActorFunctionFactoryArgs) {
    super({
      ...args,
      functionNames: [ GeoSparqlExtOperator.POINTONSURFACE ],
      termFunction: true,
    });
  }

  public async run<T extends IActionFunctionFactory>(_: T):
  Promise<T extends { requireTermExpression: true } ? IActorFunctionFactoryOutputTerm : IActorFunctionFactoryOutput> {
    return new TermFunctionPointOnSurface();
  }
}
