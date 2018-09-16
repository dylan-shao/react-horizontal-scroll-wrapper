import React from 'react';
import { shallow, mount } from 'enzyme';
import HorizontalScrollWrapper from '../index';

let wrapper;

const wrapperMount = (...args) => (wrapper = mount(...args));
const wrapperShallow = (...args) => (wrapper = shallow(...args));

describe('HorizontalScrollWrapper component', () => {
  beforeEach(() => {
    if (wrapper && wrapper.unmount) wrapper.unmount();
    wrapper = undefined;
  });

  describe('onItemScroll', () => {
    it('should trigger this onItemScroll function and scroll to the init position if passed in', () => {
      const callBackSpy = jest.fn();
      const position = 3;
      wrapperMount(
        <HorizontalScrollWrapper onItemScroll={callBackSpy} position={position}>
          <div>children</div>
        </HorizontalScrollWrapper>,
      );
      expect(callBackSpy.mock.calls.length).toBe(1);
      expect(callBackSpy.mock.calls[0][0]).toBe(position);
    });

    it('should trigger setScrollValue method and onItemScroll when click next and prev button', () => {
      wrapperMount(
        <HorizontalScrollWrapper smooth>
          <div>children</div>
        </HorizontalScrollWrapper>,
      );

      const instance = wrapper.instance();
      instance.setScrollValue = jest.fn();

      wrapper.find('.prev').simulate('click');
      expect(instance.setScrollValue).toHaveBeenCalledTimes(1);

      wrapper.find('.next').simulate('click');
      expect(instance.setScrollValue).toHaveBeenCalledTimes(2);
    });
  });

  describe('onUnmount', () => {
    it('should call onUnmount if passed in', () => {
      const callBackSpy = jest.fn();
      const position = 3;
      wrapperMount(
        <HorizontalScrollWrapper onUnmount={callBackSpy} position={position}>
          <div>children</div>
        </HorizontalScrollWrapper>,
      );
      expect(callBackSpy).toHaveBeenCalledTimes(0);
      wrapper.unmount();
      expect(callBackSpy).toHaveBeenCalledTimes(1);
    });
  });
});
