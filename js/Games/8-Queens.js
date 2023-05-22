class Queens extends gameEngine{
  session
  constructor() {
    const state = {}
    for (let i = 0; i < 8; i++) {
      state[i] = []
      for (let j = 0; j < 8; j++) {
        state[i][j] = 0
      }
    }
    super(state);
    const Eight_Queens = `
    :- use_module(library(clpfd)).
    :- use_module(library(lists)).

    % Predicate to solve the N-queens problem
    n_queens(N, Solution) :-
        length(Solution, N),
        all_queens(Solution, N),
        safe_queens(Solution).

    n_queens(N, Partial, Solution) :-
        length(Solution, N),
        all_queens(Solution, N),
        sublist(Partial, Solution),
        safe_queens(Solution).


    % Sublist for partial solution
    sublist(A, B) :-
        append(Before, After, B),
        append(Useless, A, Before).


    % Predicate to place the queens on the board
    all_queens(Solution, N):-
        sublist([1], Solution),
        sublist([2], Solution),
        sublist([3], Solution),
        sublist([4], Solution),
        sublist([5], Solution),
        sublist([6], Solution),
        sublist([7], Solution),
        sublist([8], Solution).


    % Predicate to check if a queen is safe from attacks
    safe_queens([]).
    safe_queens([Col|Cols]) :-
      safe_queens(Cols, Col, 1),
      safe_queens(Cols).

    safe_queens([], _, _).
    safe_queens([First|Other], Col, Offset) :-
            Col =\\= First,
            abs(Col - First) =\\= Offset,
            Next = Offset + 1,
            safe_queens(Other, Col, Next).
`
    this.session = pl.create()
    this.session.consult(Eight_Queens);
  }

  drawer(state){
    super.drawer(state)
    while (true) {
      const solve = document.getElementById('solve');if (solve) solve.remove()
      const board = document.getElementById('board');if (board) board.remove()
      else break;
    }

    const table = document.createElement("div");table.id = 'board'
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
        if(state[i][j]) td.textContent = '\u265B'
        if(state[i][j] === -1) {
          td.classList.add('invalid_cell')
          setTimeout(() => {td.classList.remove('invalid_cell')}, 1000)
          state[i][j] = 1
        }
        if(state[i][j] === 2) {
          td.classList.add('new_cell')
          setTimeout(() => {td.classList.remove('new_cell')}, 400)
          state[i][j] = 1
        }
        td.addEventListener('click', () => {
          this.controller(state, String.fromCharCode('a'.charCodeAt(0) + j) + (i + 1))})
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
    let n = 8
    function buildState(){
      let cur = '['
      for (let i = 0; i < n; i++) {
        let c = '_'
        for (let j = 0; j < n; j++)
          if (state[i][j]) c = (j+1) + ''
        cur += i !== n-1 ? c + ',' : c
      }
      cur += ']'
      console.log(cur)
      return cur === '[_,_,_,_,_,_,_,_]' ? "n_queens("+n+", Board)." : "n_queens("+n+"," + cur + ",Board)."
    }
    function get_all_answers(query, session){
      session.answer({
        success: function (answer) {
          let sol = session.format_answer(answer)
          const matches = sol.match(/\d+/g); // Match one or more digits
          const array = matches.map(Number); // Convert matched strings to numbers
          for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) state[i][j] = 0
          for (let i = 0; i < array.length; i++) state[i][array[i] - 1] = 2
          console.log(sol)
          drawingCallback(state)
        },
        fail: function () {
          alert("No more answers")
          session.query("solution(M).", {
            success: function (goal) {console.log("Query is correct!", goal)},
            error: function (err) {console.log("Error while query!", err)},
          });
          get_all_answers(query, session)
        },
        error: function (err) {alert("Error occurred while querying!" + err)},
      });
    }
    get_all_answers(buildState(), session)
  }

  controller(state, input){
    super.controller(state, input)
    if(input.length !== 2) {
      console.log("Invalid Input!")
      return
    }

    const col = input[0].charAt(0).charCodeAt(0) - 'a'.charCodeAt(0)
    const row = input[1] - '1'
    if (isNaN(row) || isNaN(col) || row < 0 || row >= 8 || col < 0 || col >= 8) {
      console.log("Invalid Input!")
      return
    }

    if(state[row][col])
      state[row][col] = 0

    else{
      let queen = true
      for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
          if (state[i][j])
            if (i === row || j === col || i - j === row - col || i + j === row + col) {
              queen = false
              state[i][j] = -1
            }
      if(queen) state[row][col] = 2
      else console.log("Invalid Move")
    }

    this.drawer(state)
  }

}
