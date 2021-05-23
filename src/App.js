import React from 'react';
import './App.css';

let win=false

class BoardBtn extends React.Component{
  render(){
    const {style,onClick,value}=this.props;
    return(
      <button style={style} onClick={onClick} className='button'>{value}</button>
    )
  }
}

class Board extends React.Component{
  
  state={
    bgStyleWin:{
      background:'-webkit-radial-gradient(circle, white, #77cce0)',
      outline:'none',
      border:'1px solid grey'
    },
    bgStyleDraw:{
      background:'-webkit-radial-gradient(circle, white, #FF462D)',
      outline:'none',
      border:'1px solid grey'
    }
  }

  checkWin(){
    let value={...this.props.value};
    if(value[0][0]!=='' && value[0][0]===value[1][1] && value[0][0]===value[2][2])
      return '00,11,22';
    else if(value[1][1]!=='' && value[1][1]===value[0][2] && value[1][1]===value[2][0])
      return '02,11,20';
    for(var i=0; i<3; i++)
    {
      if(value[i][0]!=='' && value[i][0]===value[i][1] && value[i][0]===value[i][2])
        return i+'0,'+i+'1,'+i+'2';
      else if(value[0][i]!=='' && value[0][i]===value[1][i] && value[0][i]===value[2][i])
        return '0'+i+',1'+i+',2'+i;
    }
    return false;
  }

  color=(x,y)=>{
    var string=this.checkWin();
    var xy=x+''+y;
    if(string){
      if(string.includes(xy))
        return this.state.bgStyleWin;
      else
        return this.state.bgStyleDraw;
    }
    else if(this.props.count===9)
      return this.state.bgStyleDraw;
  }

  handleClick(e,x,y){
    let value={...this.props.value};
    if(value[x][y]!=='' || win)
      return;
    let current=this.props.current;
    value[x][y]=this.props.current;
    if(this.checkWin())
      win=true;
    this.props.setValue(value,current);
  }

  renderBox(x,y){
    let val=this.props.value[x][y];
    return(
      <BoardBtn style={this.color(x,y)} onClick={(e)=>this.handleClick(e,x,y)} value={val}/>
    )
  }

  render(){
    return(
	    <div className='main'>
	      <div className='box-row'>
	        {this.renderBox(0,0)}
	        {this.renderBox(0,1)}
	        {this.renderBox(0,2)}
	      </div>
	      <div className='box-row'>
	        {this.renderBox(1,0)}
	        {this.renderBox(1,1)}
	        {this.renderBox(1,2)}
	      </div>
	      <div className='box-row'>
	        {this.renderBox(2,0)}
	        {this.renderBox(2,1)}
	        {this.renderBox(2,2)}
	      </div>
	    </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      current:'X',
      value:[['','',''],['','',''],['','','']],
      count:0
    }
  }

  timer;

  resetValue=()=>{
    this.setState({
      current:'X',
      value:[['','',''],['','',''],['','','']],
      count:0
    });
    clearTimeout(this.timer);
    win=false;
  }

  setValue(value,current){
    current=(current==='X')?'O':'X';
    this.setState({value,current,count:this.state.count+1});
    if(this.state.count===8 || win){
      this.timer=setTimeout(()=>this.resetValue(),5000);
    }
  }

  render(){
    const {value,current,count}=this.state;
    return(
      <div className='App'>
      <header><h4>TIC-TAC-TOE</h4></header>
      <Board value={value} current={current} setValue={()=>this.setValue(value,current)} count={count}/>
      <button className='btn-reset' onClick={this.resetValue}>RESET</button>
      <footer></footer>
      </div>
    )
  }
}

export default App;
