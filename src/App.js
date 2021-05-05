import './App.css';
import React from "react";
import Row from "./components/Row";
import { Button, Dialog } from 'element-react';

class App extends React.Component {
  constructor(){
    super();
    let colors = ['yellow','red','cyan','green','violet','blue'];
    let rowValues = new Array(10).fill(1),
      rowStatuses = new Array(10).fill(1);
    rowValues = rowValues.map(() => {return {values: ['','','','']}});
    rowStatuses = rowStatuses.map(() => {return {values: [0,0,0,0]}});

    let randomNumber1 = Math.floor(Math.random() * 6),
    randomNumber2 = Math.floor(Math.random() * 6),
    randomNumber3 = Math.floor(Math.random() * 6),
    randomNumber4 = Math.floor(Math.random() * 6);
    let pattern = [
      randomNumber1,
      randomNumber2,
      randomNumber3,
      randomNumber4
    ]
    this.state = {
      activeRowIndex: 1,
      rowValues,
      rowStatuses,
      pattern,
      colors,
      selectedColor: 'yellow',
      dialogVisible: false,
      dialogMessage: ''
    }
    this.resetGame = this.resetGame.bind(this);
    this.resetGame();    
  }
  resetGame(){
    let rowValues = new Array(10).fill(1),
      rowStatuses = new Array(10).fill(1);
    rowValues = rowValues.map(() => {return {values: ['','','','']}});
    rowStatuses = rowStatuses.map(() => {return {values: [0,0,0,0]}});
    let randomNumber1 = Math.floor(Math.random() * 6),
    randomNumber2 = Math.floor(Math.random() * 6),
    randomNumber3 = Math.floor(Math.random() * 6),
    randomNumber4 = Math.floor(Math.random() * 6);
    let pattern = [
      randomNumber1,
      randomNumber2,
      randomNumber3,
      randomNumber4
    ]
    this.setState({
      activeRowIndex: 1,
      rowValues,
      rowStatuses,
      pattern,
      selectedColor: 'yellow',
    })
  }
  showRules(){
    alert('Try to guess the pattern, in both order and color, within ten turns. \nAfter submitting a row,' + 
      'a small black peg is placed for each code peg from the guess which is correct in both color and position.' + 
      '\nA white peg indicates the existence of a correct color code peg placed in the wrong position.' + 
      '\nA white peg with cross in between indicates the existence of a wrong color peg.');
  }
  onButtonClick(rowId,buttonId){
    let rowValues = this.state.rowValues;
    rowValues[rowId]['values'][buttonId - 1] = this.state.colors.indexOf(this.state.selectedColor);
    this.setState({
      rowValues
    })
  }
  selectColor(color){
    this.setState({
      selectedColor: color
    })
  }
  submitRowResults(id,result){
    console.log(id,result);
    this.setState({
      rowStatuses: this.state.rowStatuses.map((row,idx) => {
        if(idx === id){
          row.values = result
        }
        return row;
      })
    })
    if(result.indexOf(1) < 0 && result.indexOf(0) < 0){
      this.setState({
        dialogMessage: "Congrats! You won",
        dialogVisible: true
      })
    } else if(this.state.activeRowIndex === 10){
      this.setState({
        dialogMessage: "You Lost.",
        dialogVisible: true
      })
    } else {
      this.setState({
        activeRowIndex: this.state.activeRowIndex + 1
      })
    }
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <h1>React MASTERMIND</h1>
          <h3 onClick={() => this.showRules()}>See Rules</h3>
        </div>
        <header className="App-content">
          <h1>Guess the pattern</h1>
          <div className="container">
            <div>
              {this.state.rowValues.map((rowValue,idx) => {
                return (
                  <div key={idx}>
                    <Row disabled={(idx+1) !== this.state.activeRowIndex} values={rowValue.values} colors={this.state.colors}
                      updateStatus={this.submitRowResults.bind(this,idx)} buttonClicked={this.onButtonClick.bind(this,idx)} 
                      pattern={this.state.pattern} statusValues={this.state.rowStatuses[idx].values} />
                  </div>
                )
              })}
            </div>
            <div className="color-menu">
              <h3>Select Colour</h3>
              {
                this.state.colors.map((color,index) => {
                  return (
                    <button key={index} className="" style={{
                      background: color,
                      border: color === this.state.selectedColor ? '5px solid white' : 'none'
                    }} 
                      onClick={this.selectColor.bind(this,color)} />
                  )
                })
              }
            </div>
          </div>
        </header>
        <Dialog
          title="Result"
          size="tiny"
          visible={ this.state.dialogVisible }
          onCancel={ () => this.setState({ dialogVisible: false }) }
          lockScroll={ true }
        >
          <Dialog.Body>
            <span>{this.state.dialogMessage}</span>
          </Dialog.Body>
          <Dialog.Footer className="dialog-footer">
            <Button onClick={ () => this.setState({ dialogVisible: false }) }>Cancel</Button>
            <Button type="primary" onClick={ () => {this.resetGame(); this.setState({ dialogVisible: false })} }>Play Again</Button>
          </Dialog.Footer>
        </Dialog>
      </div>
    );
  }
}

export default App;
