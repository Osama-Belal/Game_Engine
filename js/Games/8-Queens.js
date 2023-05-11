class Queens extends gameEngine{
  constructor() {
    const state = {}
    for (let i = 0; i < 8; i++) {
      state[i] = []
      for (let j = 1; j <= 8; j++) {
        state[i][j] = 0
      }
    }
    super(state);
  }

  drawer(state){
    super.drawer(state)
    while (true) {
      const board = document.getElementById('board')
      if (board) board.remove()
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
        td.addEventListener('click', () => {
          this.controller(state, String.fromCharCode('a'.charCodeAt(0) + j) + (i + 1))})
        tr.appendChild(td);
      }
      tr.style.display = 'flex'
      table.appendChild(tr);
    }
    document.body.appendChild(table);
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
      if(queen) state[row][col] = 1
      else console.log("Invalid Move")
    }

    this.drawer(state)
  }

}
