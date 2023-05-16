games = ['chess', 'checkers', 'tic tac toe', 'connect four','8 Queens','sudoku']
gamesIcons = ['chess', 'dot-circle', 'times', 'dice-six','chess-queen','sort-numeric-up-alt']

function startGame(name) {
  document.body.style.background = '#FFF'
  const body = document.getElementById('body')
  if(body) body.style.right = '99%'

  const exit = document.createElement('button')
  exit.id = 'exit';exit.textContent = 'Main Menu'
  exit.addEventListener('click', () => {
    mainMenu();
    setTimeout(() => exit.remove(), 600)
  })
  document.body.appendChild(exit);

  switch (name){
    case games[0]: new chess();break;
    case games[1]: new checkers();break;
    case games[2]: new tic_tac_toe();break;
    case games[3]: new connect_four();break;
    case games[4]: new Queens();break;
    case games[5]: new sudoku();break;
  }
}

function mainMenuInit(){
  const body = document.createElement('section')
  body.id = 'body'
  body.innerHTML = `
    <div class='curtain'>
      <div class='curtain__wrapper'>
        <input type='checkbox' checked id='active'>
        <div class='curtain__panel curtain__panel--left'>Let's Start</div>
        <div class='curtain__content'></div>
        <div class='curtain__panel curtain__panel--right'>Click to Play!</div>
      </div>
    </div>`
  document.body.appendChild(body)
  const menu = document.createElement('div');menu.id = 'menu'
  for (let i = 0; i < games.length; i++) {
    const g = document.createElement('button')
    g.name = games[i]
    g.innerHTML = '<i class="fas fa-' + gamesIcons[i] + '"></i>' + games[i]
    g.addEventListener('click', () => {startGame(g.name)})
    menu.appendChild(g)
  }
  const content = document.querySelector('.curtain__content');
  content.appendChild(menu)
}

function mainMenu(){
  const board = document.getElementById('board')
  if(board) {
    const body = document.getElementById('body')
    body.style.right = '0'
    setTimeout(() => {board.remove()}, 600)
  }
  else mainMenuInit()
}

mainMenu()
