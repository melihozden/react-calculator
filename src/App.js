import React, { Component } from 'react';
import './App.css';

class minimizeForm extends Component{
  render(){
    return (
      <div {...this.props}/>
    );
  }
}

class App extends Component {

  state = {
    value: null,
    displayValue : '0',
    signColor : 'rgb(0,0,0,0.25)', 
    operatorWait : false,
    operator : null,
  }
  clearDisplay = () =>{
    this.setState({
      displayValue : '0'
    })
  }

  writeDigit = (digit) =>{
    const {displayValue,operatorWait} = this.state
    if(operatorWait){
      this.setState({
        displayValue : String(digit),
        operatorWait : false
      });
    }
    else{
      this.setState({
      displayValue : displayValue === '0' ? String(digit) : displayValue + digit   // if value is 0 do nothing 
    })
  }
}

  writeDot = () =>{
    const {displayValue,operatorWait} = this.state
    if(operatorWait){
      this.setState({
        operatorWait : false
      });
    }
    else if(displayValue.indexOf('.') === -1){
        this.setState({
          displayValue : displayValue + '.',
          operatorWait: false
        });
      }
    }
  

  changeSign = () =>{
    const {displayValue} = this.state
    const {signColor} = this.state
    this.setState({
      displayValue : displayValue.charAt(0) === '-' ? displayValue.substr(1) : '-' + displayValue,
      signColor : signColor === 'rgb(0,0,0,0.25)' && displayValue.charAt(0) !== '-' ? 'rgb(0,0,0,0.75)' : 'rgb(0,0,0,0.25)'
    });
}
operationControl = (nextOperator) =>{

  const {displayValue,operator,value} = this.state;
  const nextValue = parseFloat(displayValue) ;

  const operations = {
    '/': (previousValue,nextValue) => previousValue / nextValue, 
    '*': (previousValue,nextValue) => previousValue * nextValue,
    '+': (previousValue,nextValue) => previousValue + nextValue, 
    '-': (previousValue,nextValue) => previousValue - nextValue,
    '=': (nextValue) => nextValue 
  }

  if(value == null){
    this.setState({
      value: nextValue,
      signColor : 'rgb(0,0,0,0.25)'
    });
  }
  else if(operator) {
    const previousValue = value || 0 ;
    const finishedValue = operations[operator](previousValue,nextValue);
  
    this.setState({
      value : finishedValue,
      displayValue : String(finishedValue),
      signColor : 'rgb(0,0,0,0.25)'
    })
  }

  this.setState({
    operatorWait : true,
    operator: nextOperator
  });
}
  render() {

const {displayValue} = this.state ;
const styleZero = {
  width : "155px"
}
const styleEqual = {
  height : "155px",
  backgroundColor : "rgba(255, 128, 0, 0.95)"
}
const styleOperations = {
  backgroundColor : "rgba(255, 128, 0, 0.95)"
}
const signColor = { 
  backgroundColor: this.state.signColor
}
    return (
      <div className="App">
      <pre>{JSON.stringify(this.state, null, 2)}</pre>
       <div className="calculator">
          <minimizeForm className="screenDisplay">{displayValue}</minimizeForm>
      <table>
        <tr>
          <td><button className="button-t t-ac" onClick={() => this.clearDisplay()}>AC</button></td>
          <td><button className="button-t t-c" onClick={this.changeSign} style={signColor}>+/-</button></td>
          <td><button className="button-t t-divide" onClick={()=>this.operationControl('/')}>/</button></td>
          <td><button className="button-t t-multiply" style={styleOperations} onClick={()=>this.operationControl('*')}>*</button></td>
        </tr>
        <tr>
          <td><button className="button-t t-7" onClick={()=>this.writeDigit(7)}>7</button></td>
          <td><button className="button-t t-8" onClick={()=>this.writeDigit(8)}>8</button></td>
          <td><button className="button-t t-9" onClick={()=>this.writeDigit(9)}>9</button></td>
          <td><button className="button-t t-sub" style={styleOperations} onClick={()=>this.operationControl('-')}>-</button></td>
        </tr>
        <tr>
          <td><button className="button-t t-4" onClick={()=>this.writeDigit(4)}>4</button></td>
          <td><button className="button-t t-5" onClick={()=>this.writeDigit(5)}>5</button></td>
          <td><button className="button-t t-6" onClick={()=>this.writeDigit(6)}>6</button></td>
          <td><button className="button-t t-add" style={styleOperations} onClick={()=>this.operationControl('+')}>+</button></td>
        </tr>
        <tr>
          <td><button className="button-t t-1" onClick={()=>this.writeDigit(1)}>1</button></td>
          <td><button className="button-t t-2" onClick={()=>this.writeDigit(2)}>2</button></td>
          <td><button className="button-t t-3" onClick={()=>this.writeDigit(3)}>3</button></td>
          <td rowSpan = "2"><button className="button-t t-equal" style={styleEqual}  onClick={()=>this.operationControl('=')}>=</button></td>
        </tr>
        <tr>
          <td colSpan = "2"><button className="button-t t-0" onClick={()=>this.writeDigit(0)} style={styleZero}>0</button></td>
          <td><button className="button-t t-dot" onClick= {()=>this.writeDot('.')}>.</button></td>
        </tr>
        </table>
       </div>


      </div>
    );
  }
}

export default App;
