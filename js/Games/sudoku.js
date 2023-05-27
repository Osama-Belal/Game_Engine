class sudoku extends gameEngine{
  session
  constructor() {
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    function generateValidSudokuBoard() {
      const board = Array.from({ length: 9 }, () => new Array(9).fill(0));
      const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const boxSize = 3;

      // generate random numbers for first row
      shuffle(numList);
      for (let i = 0; i < 9; i++) {
        board[0][i]= numList[i];
      }

      // generate random numbers for remaining rows
      for (let row = 1; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          // find the box boundaries for the current cell
          const rowStart = Math.floor(row / boxSize) * boxSize;
          const colStart = Math.floor(col / boxSize) * boxSize;
          // get the values in the current cell's box
          const box = [];
          for (let j = 0; j < boxSize; j++) {
            for (let k = 0; k < boxSize; k++) {
              box.push(board[rowStart + j][colStart + k]);
            }
          }
          // get the values in the current cell's row and column
          const rowValues = board[row];
          const colValues = board.map((r) => r[col]);
          // get the list of valid numbers for the current cell
          const validNums = numList.filter(
            (num) => !box.includes(num) && !rowValues.includes(num) && !colValues.includes(num)
          );
          // if there are no valid numbers, backtrack
          if (validNums.length === 0) {
            return generateValidSudokuBoard();
          }
          // randomly select a valid number and set it in the current cell
          const randIndex = Math.floor(Math.random() * validNums.length);
          board[row][col]= validNums[randIndex];
        }
      }

      // randomly remove cells to create the initial board
      // zero clues => absolutely solvable
      // 17 clues => minimum to have unique solution
      // 40 clues => have only one solution
      const numCellsToRemove = 81 - (Math.floor(Math.random() * 20) + 17);
      let cellsRemoved = 0;
      while (cellsRemoved < numCellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
          board[row][col] = 0;
          cellsRemoved++;
        }
      }

      return board;
    }
    const board = generateValidSudokuBoard()
    const state = []
    for(let i = 0;i < 9;i++){
      state[i] = []
      for(let j = 0;j < 9;j++)
        state[i][j] = board[i][j] ? {val: board[i][j], fixed: true} : {val: 0, fixed: false}
    }
    super(state);
    const Sudoku = `
    :-use_module(library(chr)).
    :- use_module(library(clpfd)).
    :- use_module(library(lists)).
    sudoku(Rows) :-
            length(Rows, 9),
            maplist(same_length(Rows), Rows),
            append(Rows, Vs),
            Vs ins 1..9,
            maplist(all_distinct, Rows),
            transpose(Rows, Columns),
            maplist(all_distinct, Columns),
            Rows = [As,Bs,Cs,Ds,Es,Fs,Gs,Hs,Is],
            blocks(As, Bs, Cs),
            blocks(Ds, Es, Fs),
            blocks(Gs, Hs, Is).
    blocks([], [], []).
    blocks([N1,N2,N3|Ns1],
           [N4,N5,N6|Ns2],
           [N7,N8,N9|Ns3]) :-
           all_distinct([N1,N2,N3,N4,N5,N6,N7,N8,N9]),
           blocks(Ns1, Ns2, Ns3).
`
    this.session = pl.create()
    this.session.consult(Sudoku);
  }

  controller(state, input) {
    super.controller(state, input);
    const splitted = input.split(" ")
    if(splitted.length !== 3) {
      console.log("Invalid Move!")
      return
    }
    const row = splitted[0] - '1', col = splitted[1] - '1', value = splitted[2] - '0'
    if (isNaN(row) || isNaN(col) || row < 0 || row >= 9 || col < 0 || col >= 9) {
      console.log("Invalid Input!")
      return
    }

    if(value === -1){
      if(state[row][col].fixed) console.log("Can't Delete Fixed Number")
      else state[row][col] = 0
    }
    else if (this.validate_input(state, row, col, value))
      state[row][col] = {val: value, fixed: false}
    else console.log("Invalid Move")
    this.drawer(state)
  }
  initialize_state() {
    this.state = {}
    for (let i = 1; i <= 9; i++) {
      (this.state)[i] = [];
      for (let j = 1; j <= 9; j++) {
        (this.state)[i][j] = 0;
      }
    }

    // Fill the state with random numbers
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        if (Math.random() < 0.5) {
          // Fill the cell with a random number between 1 and 9
          let randomNumber = Math.floor(Math.random() * 9) + 1;
          if (this.validate_input(this.state, i, j, randomNumber)) {
            (this.state)[i][j] = randomNumber;
          }
        }
      }
    }
    return this.state
  }
  validate_input(state, row, col, value) {
    if(value > 9 || value < 1 || isNaN(value) || state[row][col].fixed) return false;

    // Check row
    let invalid = true;
    for (let j = 0; j < 9; j++) {
      if (state[row][j].val === value) {
        invalid = false;
        state[row][j].val += 10
      }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (state[i][col].val === value) {
        invalid = false;
        state[i][col].val += 10
      }
    }

    // Check box
    let boxRow = Math.floor(row / 3) * 3;console.log('br', boxRow)
    let boxCol = Math.floor(col / 3) * 3;console.log('bc', boxCol)
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if (state[i][j].val === value) {
          invalid = false;
          state[i][j].val += 10
        }
      }
    }
    return invalid;
  }

  drawer(state) {
    super.drawer(state);
    while (true) {
      const board = document.getElementById('board')
      if (board) board.remove()
      else break;
    }

    const table = document.createElement("div");table.id = 'board'
    const numbers = document.createElement('div');
    for (let j = 0; j < 10; j++) {
      const td = document.createElement('button');
      if(!j) td.textContent = ''
      else td.textContent = j + ''
      td.className = 'chess_label'
      numbers.appendChild(td);
    }
    numbers.style.display = 'flex'
    table.appendChild(numbers);

    for (let i = 0; i < 9; i++) {
      const tr = document.createElement('div');
      const numbers = document.createElement('button');
      numbers.className = 'chess_label'
      numbers.textContent = (i + 1) + ''
      tr.appendChild(numbers)

      for (let j = 0; j < 9; j++) {
        const td = document.createElement('button');
        if(state[i][j].val > 9){
          td.classList.add('invalid_cell')
          setTimeout(() => {td.classList.remove('invalid_cell')}, 1000)
          state[i][j].val -= 10
        }
        td.textContent = state[i][j].val ? state[i][j].val : ''
        if (state[i][j].fixed) td.classList.add('tile-start')
        if(i===2 || i===5) td.classList.add('horizontal-line')
        if(j===2 || j===5) td.classList.add('vertical-line')
        td.classList.add('tile');
        td.style.width = td.style.height = '1.3em'
        td.style.fontSize = '3em'
        td.addEventListener('click', () => {
          const val = state[i][j].val ? -1 : prompt('Enter the number')
          this.controller(state, (i+1) + ' ' + (j+1) + ' ' + val)
        })
        tr.appendChild(td);
      }
      tr.style.display = 'flex'
      table.appendChild(tr);
    }
    const solve = document.createElement('button')
    solve.id = 'solve';solve.textContent = 'Solve'
    solve.addEventListener('click', () => this.solve(state, this.session, this.drawer.bind(this)))
    table.appendChild(solve)
    document.body.appendChild(table);
  }


  solve(state, session, drawingCallback){
    let n = 9
    function formatSolution(state, answer){
      let sol = session.format_answer(answer)
      // const matches = sol.match(/\d+/g); // Match one or more digits
      // const array = matches.map(Number); // Convert matched strings to numbers
      // for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) state[i][j].val = 0
      // for (let i = 0; i < array.length; i++) state[i][array[i] - 1] = 2
      console.log(sol)
      drawingCallback(state)
    }
    function buildState(){
      let cur = '['
      for (let i = 0; i < n; i++) {
        cur += '['
        for (let j = 0; j < n; j++) {
          cur += (state[i][j].val ? state[i][j].val + '' : '_')
          if(j !== n-1) cur += ','
        }
        cur += ']'
        if(i !== n-1) cur += ','
      }
      cur += ']'
      console.log("Rows = " + cur + ",sudoku(Rows),maplist(label, Rows).")
      return "Rows = " + cur + ",sudoku(Rows),maplist(label, Rows)."
    }
    function get_all_answers(query, session){
      session.answer({
        success: function (answer) {formatSolution(state, answer)},
        error: function (err) {alert("Error occurred while querying!" + err)},
        fail: function () {
          alert("No more answers")
          session.query(query, {
            success: function (goal) {console.log("Query is correct!", goal)},
            error: function (err) {console.log("Error while query!", err)},
          });
          // get_all_answers(query, session)
          session.answer({
            success: function (answer) {formatSolution(state, answer)},
            fail: function () {alert("No more answers")},
            error: function (err) {alert("Error occurred while querying!" + err)},
          });
        },
      });
    }
    get_all_answers(buildState(), session)
  }
}
