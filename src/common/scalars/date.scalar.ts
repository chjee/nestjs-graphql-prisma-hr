import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  parseValue(value: any): Date {
    if (typeof value === 'number') {
      // convert incoming integer to Date
      return new Date(value);
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  }

  serialize(value: any): number {
    if (value instanceof Date) {
      // convert outgoing Date to integer for JSON
      return Number((value.getTime() / 1000).toFixed(0));
      // return value.getTime();
    }
    throw new Error('GraphQL Date Scalar serializer expected a `Date` object');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind == Kind.INT) {
      // convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10) * 1000);
      // return new Date(parseInt(ast.value, 10));
    }
    // invalid hard-coded value (not an integer)
    return null;
  }
}
