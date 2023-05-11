class tic_tac_toe extends gameEngine{
  constructor() {
    const state = {}
    for (let i = 0; i < 3; i++) {
      state[i] = [];
      for (let j = 0; j < 3; j++) state[i][j] = '';
    }
    state['turn'] = 'x';
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
    // const numbers = document.createElement('div');
    // for (let j = 0; j < 4; j++) {
    //   const td = document.createElement('button');
    //   if(!j) {td.textContent = '';continue}
    //   else td.textContent = j + ''
    //   td.className = 'tic_label'
    //   numbers.appendChild(td);
    // }
    // numbers.style.display = 'flex'
    // table.appendChild(numbers);

    for (let i = 0; i < 3; i++) {
      const tr = document.createElement('div');
      // const numbers = document.createElement('button');
      // numbers.style.width = '1em'
      // numbers.style.paddingRight = '2em'
      // numbers.textContent = (i + 1) + ''
      // tr.appendChild(numbers)

      for (let j = 0; j < 3; j++) {
        const td = document.createElement('button');
        const span = document.createElement('span');
        span.textContent = state[i][j];
        if(state[i][j] === 'x'|| state[i][j] === 'o')
          span.classList.add(state[i][j])
        span.style.fontSize = '8em'

        td.style.width = td.style.height = '12em'
        if(j < 2) td.style.borderRight = '10px solid #18bc9c'
        if(i < 2) td.style.borderBottom = '10px solid #18bc9c'
        td.addEventListener('click', () => {this.controller(state, (i+1) + ' ' + (j+1))})
        td.appendChild(span)
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
      console.log("Invalid Move!")
      return
    }
    const row = splitted[0] - '1', col = splitted[1] - '1', value = state['turn']
    if (isNaN(row) || isNaN(col) || row < 0 || row > 2 || col < 0 || col > 2 || (value !== 'x'  && value !== 'o')) {
      console.log("Invalid Input!")
      return
    }

    if(state[row][col] === ''){
      state['turn'] = (value === 'x' ? 'o' : 'x')
      state[row][col] = value
    }
    else{
      console.log("Invalid move")
    }
    this.drawer(state)
  }

}
