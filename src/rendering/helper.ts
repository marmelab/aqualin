export const renderHelp = (message: string) => {
  console.log(message);
};

export const howToplay = (renderer: (string) => void) => {
  let message = `Aqualin is a competitive game. Two players are required to play the game.
Each player need to have the most score by creating cluster.
Score depends of the soize of each cluster. Bigger cluster give more points. The bigger, the better thay are.

+-------------------------------+---+---+---+----+----+
| Number of cell in the cluster | 2 | 3 | 4 | 5  | 6  |
+-------------------------------+---+---+---+----+----+
| Points rewarded               | 1 | 3 | 6 | 10 | 15 |
+-------------------------------+---+---+---+----+----+

PLayers play one after the other.
Each turn you can, but not mandatory, move a token. 
And, this one is mandatory, place a token from the river.

To move a token you will need to specify it's coordinate and the coordinate of the wanted position. Eg: B1 B3
The move can only be a move up/down OR left/right.
You can't move token if there is another token between the token position and the wanted position. 

To place a token, you have to indiciate the token position on the river on then the coordinate on the board. Eg: 2 B3

Note, if you do move and place you need to specify the the move command and then the place command. eg: B1 B2 2 C1 
`;
  renderer(message);
};
