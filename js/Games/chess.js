class chess extends gameEngine{
  constructor() {
    const state = {}
    for (let i = 0; i < 8; i++) {
      state[i] = [];
      for (let j = 0; j < 8; j++)
        state[i][j] = {name:'', color: '', symbol: ''};
    }
    const namePieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    const blackPieces = ['\u265C', '\u265E', '\u265D', '\u265B', '\u265A', '\u265D', '\u265E', '\u265C'];
    const whitePieces = ['\u2656', '\u2658', '\u2657', '\u2655', '\u2654', '\u2657', '\u2658', '\u2656'];
    for (let i = 0; i < 8; i++) {
      state[0][i] = {name: namePieces[i], color: 'white', symbol: whitePieces[i]};
      state[1][i] = {name: 'pawn', color: 'white', symbol: '\u2659'};
      state[6][i] = {name: 'pawn', color: 'black', symbol: '\u265F'};
      state[7][i] = {name: namePieces[i], color: 'black', symbol: blackPieces[i]};
    }
    state['turn'] = 'white'
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
    turn.textContent = 'Turn: ' + state['turn']
    turn.style.textAlign = 'center';turn.style.fontSize = '2em'
    turn.style.margin = '0'
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
        td.className = (i%2 === j%2 ? "white" : "grey")
        td.style.width = td.style.height = '1.3em'
        td.style.fontSize = '3em'
        td.textContent = state[i][j].symbol
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
    super.controller(state, input);
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

    if(rowFrom < 0 || rowFrom >= 8 || colFrom < 0 || colFrom >= 8
      || rowTo < 0 || rowTo >= 8 || colTo < 0 || colTo >= 8){
      console.log("Invalid Input!")
      return
    }

    if(this.validate_move(state, {row: rowFrom, col: colFrom}, {row: rowTo, col: colTo})){
      const emptyPiece = {name: '', color:'', symbol:''}
      state[rowTo][colTo] = state[rowFrom][colFrom]
      state[rowFrom][colFrom] = emptyPiece
      state['turn'] = (state['turn'] === 'white' ? 'black' : 'white')
      this.drawer(state)
    }
    else console.log("Invalid Move!")
  }

  validate_move(state, from ,to){
    console.log(from)
    console.log(to)
    const Fcolor = state[from.row][from.col].color
    const Tcolor = state[to.row][to.col].color
    if(Fcolor === Tcolor || state['turn'] !== Fcolor) return false;

    const name = state[from.row][from.col].name
    switch (name){
      case 'rook': return this.move_rook(from, to)
      case 'knight': return this.move_knight(from, to)
      case 'bishop': return this.move_bishop(from, to)
      case 'queen': return this.move_queen(from, to)
      case 'king': return this.move_king(from, to)
      case 'pawn': return this.move_pawn(from, to, Fcolor, Tcolor)
    }

  }

  move_king(from, to){
    return ((Math.abs(to.row - from.row) <= 1) && (Math.abs(to.col - from.col) <= 1))
  }

  move_queen(from, to){
    return this.move_rook(from, to) || this.move_bishop(from, to)
  }

  move_rook(from, to){
    return (from.row === to.row || from.col === to.col)
  }

  move_knight(from, to){
    return ((Math.abs(to.row - from.row) === 2 && Math.abs(to.col - from.col) === 1) ||
    (Math.abs(to.row - from.row) === 1 && Math.abs(to.col - from.col) === 2))
  }
  move_bishop(from, to){
    return Math.abs(to.row - from.row) === Math.abs(to.col - from.col) ||
           from.row + from.col === to.row + to.col
  }

  move_pawn(from, to, from_color, to_color) {
    if (from_color === "white") {
      if (to.row === from.row + 1 && to.col === from.col && to_color === '') return true;
      else if (from.row === 1 && to.row === 3 && to.col === from.col && to_color === '') return true;
      else return to.row === from.row + 1 && Math.abs(from.col - to.col) && to_color === 'black'
    }
    else if (from_color === "black") {
      if (to.row === from.row - 1 && to.col === from.col && to_color === '') return true;
      else if (from.row === 6 && to.row === 4 && to.col === from.col && to_color === '') return true;
      else return to.row === from.row - 1 && Math.abs(from.col - to.col) && to_color === 'white'
    }
  }
}
