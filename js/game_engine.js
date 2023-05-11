class gameEngine{
  state
  moves
  constructor(state) {
    this.state = state
    this.moves = []
    this.game()//.then(r => console.log("Game ended"))
  }

  // async game(){
  game(){
    console.log("Game started")
    console.log(this.state)
    this.drawer(this.state);

    // while(true){
    //   this.drawer(this.state);
    //   let p = new Promise((resolve)=>{
    //     setTimeout(()=>{
    //       let input = prompt("Enter input or write exit to end game");
    //       resolve(input);
    //     },2000)
    //   });
    //   let input = await p;
    //   console.log(input);
    //   if(!input || input === 'end' || input === 'exit') break;
    //   this.controller(this.state,input);
    // }
  }
  drawer(state){}
  controller(state, input){}
}
