games = ['chess', 'checkers', 'tic tac toe', 'connect four','8 Queens','sudoku']

function startGame(name) {
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
  //   draw in new window
  const newWindow = window.open('', '')
  const windowDoc = newWindow.document
  windowDoc.write(`
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="../tile.png">
        <title>Game Main Menu</title>
      </head>
      <body>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

html,
body{
  width: 100%;height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Righteous', 'Chivo Mono', monospace;
}

#menu{
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
}

#menu button{
  border: none;
  border-radius: 15px;
  font-size: 2em;
  background: transparent;
  color: #333;
  cursor:pointer;
  font-family: 'Chivo Mono';
  text-transform: uppercase;
  font-weight: bolder;
  transition: all .1s ease-in-out;
  width: 30%;
  height: 5em;
  margin: 5px;
}

#menu button:hover{
    box-shadow: 0px 0px 7px 0px #2e482e;
    background: linear-gradient(45deg, #47bfa2, transparent);
}
/* ----------------------------- Curtain Effect -------------------------- */
section{
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  right: 0;
  transition: 1s ease-in-out;
}

.curtain {
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.curtain__wrapper {
  width: 100%;
  height: 100%;
}

input[type=checkbox] {
  position: absolute;
  cursor: pointer;
  width: 99%;
  height: 99%;
  border-radius: 50%;
  z-index: 100;
  opacity: 0;
}

input:not(:checked){
  width: 5%;
}
input:checked ~div.curtain__panel--left{
     transform: translateX(0);
}
input:checked ~div.curtain__panel--right{
     transform: translateX(0);
}

.curtain__panel {
  display: flex;
  align-items: center;
  background: orange;
  box-sizing: border-box;
  color: #fff;
  float: left;
  position: relative;
  width: 50%;
  height: 100vh;
  transition: all 1s ease-out;
  z-index: 2;
  font-size: 2.5em;
}

.curtain__panel--left {
   justify-content: flex-end;
   padding-right: 1em;
   transform: translateX(-90%);
}

.curtain__panel--right {
   padding-left: 1em;
   justify-content: flex-start;
   transform: translateX(90%);
}

/* -------------------------- Behind the curtains ------------------------- */
.curtain__content {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1081%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(155%2c 255%2c 130%2c 1)'%3e%3c/rect%3e%3cpath d='M96.67801739302635 119.6141006708075L-44.24254185488226 185.3264366395925 21.469794113902736 326.2469958875011 162.39035336181135 260.5346599187161z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M662.53 380.47 a183.24 183.24 0 1 0 366.48 0 a183.24 183.24 0 1 0 -366.48 0z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M343.19050451459015 303.87731471838987L285.47373236725826 227.28457111962797 208.88098876849637 285.00134326695985 266.59776091582825 361.59408686572175z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M475.868733892402 222.61503262757557L318.4013316927495 174.4724164455509 270.2587155107248 331.9398186452034 427.7261177103773 380.0824348272281z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M907.86 422.16 a163.19 163.19 0 1 0 326.38 0 a163.19 163.19 0 1 0 -326.38 0z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M403.4620173857598 471.62543928756077L472.8819014664857 527.8405530023808 522.4946299983529 395.6031700238819z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M957.09 213.12 a112.04 112.04 0 1 0 224.08 0 a112.04 112.04 0 1 0 -224.08 0z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1258.71 15.02 a174.06 174.06 0 1 0 348.12 0 a174.06 174.06 0 1 0 -348.12 0z' fill='rgba(28%2c 142%2c 42%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1081'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
  background-size: cover;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;
  box-sizing: border-box;
  text-align: center;
}

.curtain__content button{
  border: 1px solid #333;
  background: #333;
  font-size: 2em;
  color: #FFF;
  width: 30%;
  height: 5em;
  margin: 1px;
}

        </style>
        <section>
        <div class='curtain'>
            <div class='curtain__wrapper'>
                <input type='checkbox' checked id='active'>
                <div class='curtain__panel curtain__panel--left'>Let's Start</div>
                <div class='curtain__content'></div>
                <div class='curtain__panel curtain__panel--right'>Click to Play!</div>
            </div>
        </div>
        </section>
      </body>
    </html>
  `);
  const menu = document.createElement('div');menu.id = 'menu'
  for (let i = 0; i < games.length; i++) {
    const g = document.createElement('button')
    g.name = games[i]
    // g.textContent = games[i]
    g.innerHTML = '<i class="fas fa-chess"></i>' + games[i]
    g.addEventListener('click', () => {startGame(g.name)})
    menu.appendChild(g)
  }
  const content = windowDoc.querySelector('.curtain__content');
  content.appendChild(menu)
}

mainMenuInit()
