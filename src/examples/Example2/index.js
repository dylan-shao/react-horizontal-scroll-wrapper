import React, { Component } from 'react';
import HorizontalScrollWrapper from 'HorizontalScrollWrapper';

export class Example2 extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
    };
  }
  updatePosition = position => {
    this.setState({ currentStep: position }, () => {
      console.log(`Example2 position is: ${position + 1}`);
    });
  };
  render() {
    const { currentStep } = this.state;

    return (
      <section className="example1">
        <HorizontalScrollWrapper
          smooth
          onItemScroll={position => {
            this.updatePosition(position);
          }}
          onUnmount={() => {
            this.updatePosition(null);
          }}
        >
          <div>
            <img
              src="https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/257840/pexels-photo-257840.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="beautiful scene"
              height="200"
              width="350"
            />
          </div>
        </HorizontalScrollWrapper>
      </section>
    );
  }
}

export default Example2;
