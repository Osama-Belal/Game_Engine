class connect_four extends gameEngine{
  constructor() {
    const state = {}
    for (let i = 0; i < 6; i++) {
      state[i] = [];
      for (let j = 0; j < 7; j++) state[i][j] = '';
    }
    state['turn'] = 'r'
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
    table.className = 'blue'
    table.style.padding = '0.7em'
    table.style.borderRadius = '20px'

    for (let i = 0; i < 6; i++) {
      const tr = document.createElement('div');
      for (let j = 0; j < 7; j++) {
        const td = document.createElement('button');
        td.style.width = td.style.height = '5em'
        td.style.borderRadius = '50%'
        td.style.margin = '0.3em'
        td.className = (state[i][j] !== '' ? state[i][j] : 'cyan')
        td.addEventListener('click', () => {this.controller(state, j + 1 + '')})
        tr.appendChild(td);
      }
      tr.style.display = 'flex'
      table.appendChild(tr);
    }
    document.body.appendChild(table);
  }

  controller(state, input) {
    super.controller(state, input);
    const input_val = input - '1'
    if (isNaN(input_val) || input_val < 0 || input_val > 6) {
      console.log("Invalid Input!")
      return
    }

    for (let i = 5; i >= 0; i--){
      if (state[i][input_val] === '') {
        console.log(i, input_val)
        state[i][input_val] = state['turn']
        state['turn'] = (state['turn'] === 'r' ? 'y' : 'r')
        this.drawer(state)
        return;
      }
    }
    console.log("Invalid move")
  }

}
