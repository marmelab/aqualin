import expect from "expect";
import { main, drawGameState } from ".";
import { Colors } from "./Colors";

describe("initial test", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});

describe("programms arguments", () => {
  it("read argument", () => {
    main([ "node", "fakejs", "-f=myconfigfile"])
  });
})

describe('draw gameState',() =>{
  it("should draw the gamestate", ()=>{
    let originalLogger = console.log;
    let output : string[] = []
    console.log = (str: string) => {
      output.push(str);
    }
    let gameState = [
      [{ color: 1, symbol: 1 }, null, { color: 2, symbol: 2 }],
      [null, { color: 1, symbol: 3 }, { color: 3, symbol: 3 }],
      [{ color: 1, symbol: 2 }, null, { color: 3, symbol: 2 }]
    ]
    drawGameState(gameState)
    expect(output.length).toBe(7);
    expect(output[0]).toBe('┌───┬───┬───┐')
    expect(output[1]).toBe('│ ' + Colors.Red + '❋' + Colors.Reset + ' │   │ ' + Colors.Green + '♕' + Colors.Reset + ' │')
    expect(output[2]).toBe('├───┼───┼───┤')
    expect(output[3]).toBe('│   │ ' + Colors.Red + '◈' + Colors.Reset + ' │ ' + Colors.Yellow + '◈' + Colors.Reset + ' │')
    expect(output[4]).toBe('├───┼───┼───┤')
    expect(output[5]).toBe('│ ' + Colors.Red + '♕' + Colors.Reset + ' │   │ ' + Colors.Yellow + '♕' + Colors.Reset + ' │')
    expect(output[6]).toBe('└───┴───┴───┘')
    console.log = originalLogger;
  });
})