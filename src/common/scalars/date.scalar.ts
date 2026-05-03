import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description =
    'Unix epoch seconds represented as an integer and converted to a JavaScript Date';

  parseValue(value: unknown): Date {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new Error(
        'GraphQL Date scalar parser expected integer epoch seconds',
      );
    }

    return new Date(value * 1000);
  }

  serialize(value: unknown): number {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error('GraphQL Date scalar serializer expected a valid Date');
    }

    return Math.floor(value.getTime() / 1000);
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.INT) {
      throw new Error(
        'GraphQL Date scalar parser expected integer epoch seconds',
      );
    }

    return new Date(parseInt(ast.value, 10) * 1000);
  }
}
