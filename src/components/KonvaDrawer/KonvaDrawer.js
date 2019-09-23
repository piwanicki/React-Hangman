import React, {Component} from 'react';
import {Stage, Layer, Line,  Circle} from 'react-konva';
import classes from './KonvaDrawer.module.css'

class KonvaDrawer extends Component  {

  state = {
     hangmanLinesPts: [0, 10, 30,-50,60,10,30,-50,30,-100,10,-60,30,-100,50,-60,30,-100,50,-60],
  }


  // addLinePoint = () => {
    
  //   const chances = this.props.chances;
  //   let hangmanLinePoints = [];
    
  //  if(chances !== 6 ) {
  //    hangmanLinePoints = [...this.state.hangmanLinesPts]
  //  }
  //   if (chances === 5 ) {
  //     hangmanLinePoints.push(0, 10, 30,-50);
  //   } 
  //   if( chances === 4 ) {
  //     hangmanLinePoints.push(60,10,30,-50,30);
  //   }
  //   if( chances === 3 ) {
  //     hangmanLinePoints.push(-100);
  //   }
  //   if( chances === 2 ) {
  //     hangmanLinePoints.push(10,-60,30,-100);
  //   }
  //   if( chances === 1 ) {
  //     hangmanLinePoints.push(50,-60,30,-100,50,-60);
  //   }
  //   this.setState({hangmanLinesPts: hangmanLinePoints});
  //   console.log(this.state.hangmanLinesPts)
  // }

  // componentDidMount() {
  //   this.addLinePoint()
  // }
  
  // componentWillReceiveProps() {
  //   this.addLinePoint()
  // }

  render () {

    let hangmanLines = [];
    const chances = this.props.chances;

    if(chances === 5 ) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0,4);
    } 
    if( chances === 4 ) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0,9);
    }
    if( chances === 3 ) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0,10);
    }
    if( chances === 2 ) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0,14);
    }
    if( chances === 1 ) {
      hangmanLines = [...this.state.hangmanLinesPts].slice(0,20);
    }
    if( chances === 0 ) {
      hangmanLines = [...this.state.hangmanLinesPts];
    }


    return (
      <div className={classes.KonvaDrawer} >
        <Stage width={340} height={340}>
          <Layer>
            <Line 
              points={hangmanLines}
              stroke='black'
              offsetY={-250}
              offsetX={-60}
              />
            { this.props.chances === 0 ? <Circle radius={20} x={90} y={125} stroke='black'/> : null}
            <Line 
              points={[0,-15,0,-60,160,-60,160,160,100,190,160,160,220,190,160]}
              offsetX={-90}
              offsetY={-120}
              stroke='brown'
               />
          </Layer>
        </Stage>
      </div>
    )
  };
}


export default KonvaDrawer;

