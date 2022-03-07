import { parseInput } from './askInputs';

describe('parseInput', () => {
  it('should return a turn when input is correct', () => {
    expect(parseInput('A1 B1 2 B3', 3, 3)).toEqual({
      move: {
        source: { column: 0, row: 0 },
        target: { column: 1, row: 0 },
      },
      tokenToPlace: {
        indexRiverToken: 1,
        coordinates: { column: 1, row: 2 },
      },
      coordinates: null,
    });
  });

  it('should return an empty move when input only contains a token to place', () => {
    expect(parseInput('2 B3', 3, 3)).toEqual({
      move: null,
      tokenToPlace: {
        indexRiverToken: 1,
        coordinates: { column: 1, row: 2 },
      },
      coordinates: null,
    });
  });

  it('should return an empty move, empty tokenToPlace and only contains coordinates', () => {
    expect(parseInput('B3', 3, 3)).toEqual({
      move: null,
      tokenToPlace: null,
      coordinates: { column: 1, row: 2 },
    });
  });

  it('should throw an error if the move is invalid', () => {
    expect(() => parseInput('A1 B56 2 B3', 3, 3)).toThrowError('Invalid move');
  });

  it('should throw an error if the token to place is invalid', () => {
    expect(() => parseInput('7 B3', 3, 3)).toThrowError('Invalid token');
  });
});
