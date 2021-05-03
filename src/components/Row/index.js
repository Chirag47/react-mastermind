import { Layout } from "element-react";
import React from "react";
import './Row.css';
import StatusCircle from "../StatusCircle";
class Row extends React.Component{
  constructor(props){
    super(props);
    this.submitPattern = this.submitPattern.bind(this);
    this.getColor = this.getColor.bind(this);
  }
  
  submitPattern(){
    let temp;
    let pattern = [...this.props.pattern];
    temp = [...this.props.values.filter((val,index) => {
      if(pattern[index] === val){
        pattern[index] = -1;
        return true;
      }
      return false;
    }).map(() => 2)];
    temp = [...temp, ...this.props.values.filter((val,index) => {
      let idx = pattern.indexOf(val);
      if(idx >= 0 && pattern[index] !== val){
        pattern[idx] = -1;
        return true;
      }
      return false;
    }).map(() => 1)];
    let length = temp.length;
    if(length < 4){
      for(let i=0;i<4-length;i++){
        temp.push(0);
      }
    }
    this.props.updateStatus(temp);
  }
  getColor(id){
    return this.props.colors[this.props.values[id]];
  }
  render(){
    return (
      <div className="button-row">
        <div className="input-row">
          <button className="inputButton" style={{background: this.getColor(0)}} onClick={() => this.props.buttonClicked(1)} disabled={this.props.disabled}></button>
          <button className="inputButton" style={{background: this.getColor(1)}} onClick={() => this.props.buttonClicked(2)} disabled={this.props.disabled}></button>
          <button className="inputButton" style={{background: this.getColor(2)}} onClick={() => this.props.buttonClicked(3)} disabled={this.props.disabled}></button>
          <button className="inputButton" style={{background: this.getColor(3)}} onClick={() => this.props.buttonClicked(4)} disabled={this.props.disabled}></button>
          <button className={(this.props.values.indexOf('') < 0 ? 'show': 'hide') + ' submit'} onClick={() => this.submitPattern()} disabled={this.props.disabled}><i className="el-icon-check" /></button>
        </div>
        <div className="status-box">
          <Layout.Row gutter="20"  className="status-row">
              <StatusCircle statusValue={this.props.statusValues[0]} />
              <StatusCircle statusValue={this.props.statusValues[1]} />
          </Layout.Row>
          <Layout.Row gutter="20"  className="status-row">
              <StatusCircle statusValue={this.props.statusValues[2]} />
              <StatusCircle statusValue={this.props.statusValues[3]} />
          </Layout.Row>
        </div>
      </div>
    )
  }
}

export default Row;