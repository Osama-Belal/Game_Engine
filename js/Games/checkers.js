class checkers extends gameEngine{
  constructor() {
    const state = {}
    for (let i = 0; i < 8; i++) {
      state[i] = []
      for (let j = 0; j < 8; j++) {
          if(i < 3)
            state[i][j] =  i%2 !== j%2 ? {player: 'r', color: 'red'}:{player: '-'}
          else if(7-i < 3)
            state[i][j] =  i%2 !== j%2 ? {player: 'c', color: 'cyan'}:{player: '-'}
          else
            state[i][j] =  {player: '-'}
      }
    }
    state['turn'] = 'r'
    console.log(state);
    super(state);
  }
  drawer(state) {
    super.drawer(state)
    while (true) {
      const board = document.getElementById('board')
      if (board) board.remove()
      else break;
    }

    const table = document.createElement("div");table.id = 'board'
    const turn = document.createElement('h1');turn.id = 'turn'
    turn.textContent = 'Turn: ' + (state['turn'] === 'r' ? 'Player 1' : 'Player 2')
    turn.style.textAlign = 'center';turn.style.fontSize = '2em'
    turn.style.margin = '0'
    turn.style.color = state['turn'] === 'r' ? '#e96767' : '#4dc5c5';
    table.appendChild(turn);

    const letters = document.createElement('div');
    for (let j = 0; j < 9; j++) {
      const td = document.createElement('button');
      if(!j) td.textContent = ''
      else td.textContent = String.fromCharCode('a'.charCodeAt(0) + j - 1)
      td.className = 'chess_label'
      letters.appendChild(td);
    }
    letters.style.display = 'flex'
    table.appendChild(letters);

    for (let i = 0; i < 8; i++) {
      const tr = document.createElement('div');
      const numbers = document.createElement('button');
      numbers.className = 'chess_label'
      numbers.textContent = (i + 1) + ''
      tr.appendChild(numbers)

      for (let j = 0; j < 8; j++) {
        const td = document.createElement('button');
        td.className = (i%2 === j%2 ? "white" : "black")
        td.style.width = td.style.height = '1.3em'
        td.style.fontSize = '3em'
        if(state[i][j].player !== '-'){
          if(state[i][j].player === 'r'|| state[i][j].player === 'c') td.textContent = "\u2689";
          else if(state[i][j].player === 'R'|| state[i][j].player === 'C') td.textContent = "\u2689";
          td.style.color = state[i][j].color
        }
        else td.textContent = ''
        td.addEventListener('click', () => {
          if(state[i][j].symbol !== '' || this.moves.length === 1)
            this.moves.push(String.fromCharCode('a'.charCodeAt(0) + j) + (i + 1))
          if(this.moves.length === 2){
            this.controller(state, this.moves[0] + ' ' + this.moves[1])
            this.moves = []
          }
        })
        tr.appendChild(td);
      }
      tr.style.display = 'flex'
      table.appendChild(tr);
    }
    document.body.appendChild(table);
  }


  controller(state, input) {
    super.controller(state, input)
    const splitted = input.split(" ")
    if(splitted.length !== 2) {
      console.log("Invalid Input!")
      return
    }

    const from = splitted[0], to = splitted[1]
    if(from.length !== 2 || to.length !== 2 || from === to){
      console.log("Invalid Input!")
      return
    }

    const colFrom = from[0].charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
    const rowFrom = from[1] - '1'
    const colTo = to[0].charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
    const rowTo = to[1] - '1'

    // Check if the input is valid
    if (isNaN(rowFrom) || isNaN(rowTo) || isNaN(colFrom) || isNaN(colTo) ||
    rowFrom < 0 || rowFrom >= 8 || colFrom < 0 || colFrom >= 8 || rowTo < 0 || rowTo >= 8 || colTo < 0 || colTo >= 8) {
      console.log("Invalid Input!")
      return;
    }

    // Check if the piece belongs to the current player
    const player = state[rowFrom][colFrom].player
    if(player.toLowerCase() !== state['turn']){
      console.log("Invalid Input!")
      return
    }
    // Check if the piece can move to the destination
    if (this.validateMove(state,rowFrom, colFrom, rowTo, colTo)) {
      console.log("Valid Move!");
       // Move the piece
      state[rowTo][colTo] = state[rowFrom][colFrom];
      state[rowFrom][colFrom] = {player: '-'};
      // If the piece reaches the last row, promote it
      if (rowTo === 7 && state[rowTo][colTo].player === 'r') {
        state[rowTo][colTo].player = 'R';
      } else if (rowTo === 0 && state[rowTo][colTo].player === 'c') {
        state[rowTo][colTo].player = 'C';
      }
      // Change the turn
      state['turn'] = state['turn'] === 'r' ? 'c' : 'r';
    }
    else {
      console.log("check for jump");
      let jumps = this.getAvailableJumps(rowFrom, colFrom, state);
      console.log(jumps);
      jumps = jumps.filter(jump => jump[0]['to'][0] === rowTo && jump[0]['to'][1] === colTo);
      console.log(jumps);
      if (jumps.length > 0) {
        console.log("Valid Jump!");
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            state[i][j] = jumps[0][1][i][j];
          }
        }
        console.log(state);
        // If the piece reaches the last row, promote it
        if (rowTo === 7 && state[rowTo][colTo].player === 'r') {
          state[rowTo][colTo].player = 'R';
        } else if (rowTo === 0 && state[rowTo][colTo].player === 'c') {
          state[rowTo][colTo].player = 'C';
        }
        // Change the turn
        state['turn'] = state['turn'] === 'r' ? 'c' : 'r';
      }
    }
    this.drawer(state)
  }

  // Define how moves are validated
  validateMove(state,startRow, startCol, endRow, endCol) {
    console.log("validateMove");
    if(startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 || endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7){
      return false;
    }
    // Check if the destination is already occupied
    if (state[endRow][endCol].player !== '-') {
      return false;
    }
    // Check if the move is diagonal and only one square away
    if (Math.abs(startRow - endRow) !== 1 || Math.abs(startCol - endCol) !== 1) {
      return false;
    }
    // Check if the piece is moving in the correct direction
    if (state[startRow][startCol].player === 'r' && startRow > endRow || state[startRow][startCol].player === 'c' && startRow < endRow) {
      return false;
    }
    // All conditions passed, the move is valid
    return true;
  }

// Define how jumps are validated
  validateJump(state,startRow, startCol, endRow, endCol) {
    console.log("validateJump");
    console.log(startRow, startCol, endRow, endCol,state);

    if(startRow < 0 || startRow > 7 || startCol < 0 || startCol > 7 || endRow < 0 || endRow > 7 || endCol < 0 || endCol > 7){
      return false;
    }
    // Check if the destination is already occupied
    if (state[endRow][endCol].player !== '-') {
      return false;
    }
    // Check if the move is diagonal and two squares away
    if (Math.abs(startRow - endRow) !== 2 || Math.abs(startCol - endCol) !== 2) {
      return false;
    }
    // Check if the piece is moving in the correct direction
    if (state[startRow][startCol].player === 'r' && startRow > endRow || state[startRow][startCol].player === 'c' && startRow < endRow) {
      return false;
    }
    // Check if there is a piece to capture
    const middleRow = (startRow + endRow) / 2;
    const middleCol = (startCol + endCol) / 2;
    if (state[middleRow][middleCol].player === '-' || state[middleRow][middleCol] === state['turn']) {
      return false;
    }
    // All conditions passed, the jump is valid
    return true;
  }

  simulateJump(board, jump) {
    // Create a copy of the board
    let newBoard = this.deepCopy(board);

    console.log("simulateJump");
    console.log(jump);
    console.log(newBoard);
    // Remove the jumped piece from the board
    newBoard[jump.jumped[0]][jump.jumped[1]] = {player: '-'};

    // Move the piece to the landing spot on the board
    newBoard[jump.to[0]][jump.to[1]] = newBoard[jump.from[0]][jump.from[1]];
    newBoard[jump.from[0]][jump.from[1]] = {player: '-'};

    // Check if the piece should be kinged
    if (jump.to[0] === 0 && newBoard[jump.to[0]][jump.to[1]].player === 'c') {
      newBoard[jump.to[0]][jump.to[1]].player = 'C';
    } else if (jump.to[0] === 7 && newBoard[jump.to[0]][jump.to[1]] === 'r') {
      newBoard[jump.to[0]][jump.to[1]].player = 'R';
    }

    return newBoard;
  }

  getAvailableJumps(row, col, board) {
    let jumps = [];
    let piece = board[row][col];

    if (piece.player === 'C' || piece.player === 'R') {
      // If the piece is a king, check all directions for jumps
      let directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
      for (let i = 0; i < directions.length; i++) {
        let direction = directions[i];
        let jumpedRow = row + direction[0];
        let jumpedCol = col + direction[1];
        let landingRow = row + direction[0] * 2;
        let landingCol = col + direction[1] * 2;
        if (this.validateJump(board,row,col, landingRow, landingCol)) {
          // If the space is a valid landing spot, add the jump to the list of available jumps
          let jump = { from: [row, col], to: [landingRow, landingCol], jumped: [jumpedRow, jumpedCol] };
          let b=this.simulateJump(board, jump);
          jumps.push([jump, b]);
          // Check for double jumps
          let doubleJumps = this.getAvailableJumps(landingRow, landingCol, b);
          if (doubleJumps.length > 0) {
            jumps = jumps.concat(doubleJumps);
          }
        }
      }
    } else {
      // If the piece is not a king, check forward and backward jumps based on the piece color
      let directions = piece.player === 'r' ? [[1, -1], [1, 1]] : [[-1, -1], [-1, 1]];
      for (let i = 0; i < directions.length; i++) {
        let direction = directions[i];
        let jumpedRow = row + direction[0];
        let jumpedCol = col + direction[1];
        let landingRow = row + direction[0] * 2;
        let landingCol = col + direction[1] * 2;
        if (this.validateJump(board,row,col, landingRow, landingCol)) {
          // If the space is a valid landing spot, add the jump to the list of available jumps
          let jump = { from: [row, col], to: [landingRow, landingCol], jumped: [jumpedRow, jumpedCol] };
          let b=this.simulateJump(board, jump);
          jumps.push([jump, b]);
          // Check for double jumps
          let doubleJumps = this.getAvailableJumps(landingRow, landingCol, b);
          if (doubleJumps.length > 0) {
            jumps = jumps.concat(doubleJumps);
          }
        }
      }
    }

    return jumps;
  }
  deepCopy(obj) {
    // If obj is null or is not an object, return obj
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    // Create a new object or array, depending on the type of obj
    const newObj = Array.isArray(obj) ? [] : {};

    // Recursively copy all the properties of obj into newObj
    for (let key in obj) {
      newObj[key] = this.deepCopy(obj[key]);
    }

    return newObj;
  }


}
