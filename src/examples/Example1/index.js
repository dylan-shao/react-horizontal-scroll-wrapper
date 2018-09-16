import React, { Component } from 'react';
import HorizontalScrollWrapper from 'HorizontalScrollWrapper';
import StageCard from './StageCard';
import './style.css';

export class Example1 extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 3,
    };
  }
  updatePosition = position => {
    this.setState({ currentStep: position }, () => {
      console.log(`Example1 position is: ${position + 1}`);
    });
  };
  render() {
    const { currentStep } = this.state;
    // assign
    const content = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
    ];

    return (
      <div className="example1">
        <HorizontalScrollWrapper
          smooth
          onItemScroll={position => {
            this.updatePosition(position);
          }}
          position={currentStep}
          onUnmount={() => {
            this.updatePosition(null);
          }}
        >
          {content.map(({ id, completed }, index) => (
            <StageCard
              key={id}
              complete={completed || false}
              currentStep={index + 1}
              totalSteps={content.length}
              content={index}
            />
          ))}
        </HorizontalScrollWrapper>
      </div>
    );
  }
}

export default Example1;
