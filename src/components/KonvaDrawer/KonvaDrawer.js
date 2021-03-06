import React, { Component } from "react";
import { Stage, Layer, Line, Circle } from "react-konva";
import classes from "./KonvaDrawer.module.scss";
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

class KonvaDrawer extends Component {
  state = {
    hangmanLinesPts: [
      0,
      10,
      30,
      -50,
      60,
      10,
      30,
      -50,
      30,
      -100,
      10,
      -60,
      30,
      -100,
      50,
      -60,
      30,
      -100,
      50,
      -60
    ],
    stageWidth: 260,
    stageHeight: 290,
  };

 componentDidMount() {
   window.addEventListener('resize', this.checkSize);
   this.checkSize();
 }

 checkSize = () => {
   const width = ReactDOM.findDOMNode(this).offsetWidth;
   const height = ReactDOM.findDOMNode(this).offsetHeight;
   const scaleW =  width / 340;
   const scaleH =  height / 340;

   this.setState({
     stageWidth:width,
     stageHeight: height,
     scaleW: scaleW,
     scaleH: scaleH,
    }); 
 }

  render() {
    let hangmanLines = [];
    const chances = this.props.chances;

    if (chances === 5) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0, 4);
    }
    if (chances === 4) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0, 9);
    }
    if (chances === 3) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0, 10);
    }
    if (chances === 2) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0, 14);
    }
    if (chances === 1) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0, 20);
    }
    if (chances === 0) {
      hangmanLines = [...this.state.hangmanLinesPts];
    }

    const lineColor = this.props.darkMode ? 'whitesmoke' : 'black';

    return (
      <div className={classes.KonvaDrawer}>
        <Stage width={this.state.stageWidth} height={this.state.stageHeight} scaleX={this.state.scaleW} scaleY={this.state.scaleH}>
          <Layer>
            <Line
              points={hangmanLines}
              stroke={lineColor}
              offsetY={-250}
              offsetX={-60}
            />
            {this.props.chances === 0 ? (
              <Circle radius={20} x={90} y={125} stroke={lineColor} />
            ) : null}
            <Line
              points={[
                0,
                -15,
                0,
                -60,
                160,
                -60,
                160,
                160,
                100,
                190,
                160,
                160,
                220,
                190,
                160
              ]}
              offsetX={-90}
              offsetY={-120}
              stroke="#5e503f"
              strokeWidth={5}
            />
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

export default connect(mapStateToProps,null)(KonvaDrawer);
