import { Kind } from 'graphql';
import { DateScalar } from './date.scalar';

describe('DateScalar', () => {
  const scalar = new DateScalar();

  it('parses variable values as Unix epoch seconds', () => {
    expect(scalar.parseValue(978307200)).toEqual(
      new Date('2001-01-01T00:00:00.000Z'),
    );
  });

  it('parses inline integer literals as Unix epoch seconds', () => {
    expect(
      scalar.parseLiteral({
        kind: Kind.INT,
        value: '978307200',
      }),
    ).toEqual(new Date('2001-01-01T00:00:00.000Z'));
  });

  it('serializes dates as Unix epoch seconds', () => {
    expect(scalar.serialize(new Date('2001-01-01T00:00:00.000Z'))).toBe(
      978307200,
    );
  });

  it('round-trips date-only values without shifting the UTC calendar date', () => {
    const date = scalar.parseValue(
      scalar.serialize(new Date('2023-12-01T00:00:00.000Z')),
    );

    expect(date.toISOString().slice(0, 10)).toBe('2023-12-01');
  });

  it('rejects millisecond-style or non-integer variable values', () => {
    expect(() => scalar.parseValue('978307200')).toThrow(
      /integer epoch seconds/,
    );
    expect(() => scalar.parseValue(978307200.123)).toThrow(
      /integer epoch seconds/,
    );
  });

  it('rejects non-integer literals', () => {
    expect(() =>
      scalar.parseLiteral({
        kind: Kind.STRING,
        value: '2001-01-01',
      }),
    ).toThrow(/integer epoch seconds/);
  });
});
