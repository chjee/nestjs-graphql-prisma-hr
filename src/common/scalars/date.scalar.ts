import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

const MIN_MYSQL_DATE_SECONDS = -62135596800; // 0001-01-01T00:00:00.000Z
const MAX_MYSQL_DATETIME_SECONDS = 253402300799; // 9999-12-31T23:59:59.000Z

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

    return this.createDateFromEpochSeconds(value);
  }

  serialize(value: unknown): number {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error('GraphQL Date scalar serializer expected a valid Date');
    }

    const seconds = Math.floor(value.getTime() / 1000);
    this.assertEpochSecondsInRange(seconds);

    return seconds;
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind !== Kind.INT) {
      throw new Error(
        'GraphQL Date scalar parser expected integer epoch seconds',
      );
    }

    return this.createDateFromEpochSeconds(parseInt(ast.value, 10));
  }

  private createDateFromEpochSeconds(seconds: number): Date {
    this.assertEpochSecondsInRange(seconds);

    const date = new Date(seconds * 1000);
    if (Number.isNaN(date.getTime())) {
      throw new Error('GraphQL Date scalar parser received an invalid date');
    }

    return date;
  }

  private assertEpochSecondsInRange(seconds: number): void {
    if (!Number.isSafeInteger(seconds)) {
      throw new Error(
        'GraphQL Date scalar parser expected safe integer epoch seconds',
      );
    }

    if (
      seconds < MIN_MYSQL_DATE_SECONDS ||
      seconds > MAX_MYSQL_DATETIME_SECONDS
    ) {
      throw new Error(
        'GraphQL Date scalar parser expected epoch seconds within MySQL date range',
      );
    }
  }
}
