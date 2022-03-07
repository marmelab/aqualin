import expect from 'expect';

import { GameState } from '../GameStateTypes';
import { calculateScore, calculateScoreFromConnectedNodes } from './score';

describe('score calculation', () => {
  it('should calculate correct score from number of connected nodes', () => {
    expect(calculateScoreFromConnectedNodes(0)).toBe(0);
    expect(calculateScoreFromConnectedNodes(1)).toBe(0);
    expect(calculateScoreFromConnectedNodes(2)).toBe(1);
    expect(calculateScoreFromConnectedNodes(3)).toBe(3);
    expect(calculateScoreFromConnectedNodes(4)).toBe(6);
    expect(calculateScoreFromConnectedNodes(5)).toBe(10);
    expect(calculateScoreFromConnectedNodes(6)).toBe(15);
    expect(calculateScoreFromConnectedNodes(7)).toBe(21);
    expect(calculateScoreFromConnectedNodes(10)).toBe(45);
  });

  it('should calculate correct score', () => {
    const gameState: GameState = {
      board: [
        [
          { color: 0, symbol: 0 },
          { color: 0, symbol: 2 },
          { color: 0, symbol: 1 },
        ],
        [
          { color: 1, symbol: 1 },
          { color: 1, symbol: 0 },
          { color: 1, symbol: 2 },
        ],
        [
          { color: 2, symbol: 2 },
          { color: 2, symbol: 1 },
          { color: 2, symbol: 0 },
        ],
      ],
      river: [],
      playerTurn: 'Color',
      moveDone: false,
    };
    expect(calculateScoreFromConnectedNodes(0)).toBe(0);
    expect(calculateScore(gameState)).toEqual({
      symbol: 0,
      color: 9,
    });
  });

  it('should calculate correct score', () => {
    const gameState: GameState = {
      board: [
        [
          { color: 0, symbol: 0 },
          { color: 0, symbol: 2 },
          { color: 0, symbol: 1 },
        ],
        [
          { color: 1, symbol: 1 },
          { color: 1, symbol: 0 },
          { color: 2, symbol: 2 },
        ],
        [
          { color: 2, symbol: 0 },
          { color: 2, symbol: 1 },
          { color: 1, symbol: 2 },
        ],
      ],
      river: [],
      playerTurn: 'Color',
      moveDone: false,
    };
    expect(calculateScoreFromConnectedNodes(0)).toBe(0);
    expect(calculateScore(gameState)).toEqual({
      symbol: 1,
      color: 5,
    });
  });
});
