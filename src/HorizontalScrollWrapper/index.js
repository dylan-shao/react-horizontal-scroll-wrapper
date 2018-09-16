import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './style.css';

class HorizontalScrollWrapper extends PureComponent {
  constructor(props) {
    super(props);
    // we have position in both state and props because onItemScroll is optional,
    // if people does not pass in onItemScroll, we still need to have all the features
    this.state = {
      position: props.position || 0,
      mostLeft: true,
      mostRight: false,
    };
    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    const { onItemScroll, disappearPercent = 0.1, wait = 200 } = this.props;

    // scroll trigger update position
    const scrollHandler = event => {
      const { scrollLeft, scrollWidth, offsetWidth } = event.target;
      const { children } = this.props;
      const averageWidth = scrollWidth / children.length;
      // gap between the center of the container and the center of 1st and 2nd children
      const gap = averageWidth - offsetWidth / 2;
      const position = Math.floor(
        (averageWidth + scrollLeft - gap) / averageWidth,
      );
      const mostLeft = scrollLeft < disappearPercent * offsetWidth;
      const mostRight =
        scrollWidth - offsetWidth - scrollLeft < disappearPercent * offsetWidth;
      this.setState({ position, mostLeft, mostRight }, () => {
        // eslint-disable-next-line
        onItemScroll && onItemScroll(this.state.position);
      });
    };
    this.deboundedScrollHandler = _.debounce(scrollHandler, wait);
    this.wrapperRef.current.addEventListener(
      'scroll',
      this.deboundedScrollHandler,
    );
    this.setScrollValue();
  }

  // TODO update below using getDerivedStateFromProps() when we upgrade to v^16.4
  componentWillReceiveProps(nextProps) {
    if (nextProps.position !== this.props.position) {
      this.setState({ position: nextProps.position });
    }
  }

  // remove this if you want the smooth scroll without self center
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.position !== this.props.position ||
      prevState.position !== this.state.position
    ) {
      // eslint-disable-next-line
      !this.props.smooth && this.setScrollValue();
    }
  }

  componentWillUnmount() {
    this.wrapperRef.current.removeEventListener(
      'scroll',
      this.deboundedScrollHandler,
    );
    const { onUnmount } = this.props;
    // eslint-disable-next-line
    onUnmount && onUnmount();
  }

  // update scroll position
  setScrollValue = () => {
    const { children, onItemScroll } = this.props;

    const { current } = this.wrapperRef;
    const { scrollWidth, offsetWidth } = current;
    const averageWidth = scrollWidth / children.length;
    const offset = averageWidth + averageWidth / 2 - offsetWidth / 2;
    const getScrollLeftValue = position => {
      switch (position) {
        case 0:
          return 0;
        case 1:
          return offset;
        default:
          return averageWidth * (this.state.position - 1) + offset;
      }
    };
    current.scrollLeft = getScrollLeftValue(this.state.position);
    // eslint-disable-next-line
    onItemScroll && onItemScroll(this.state.position);
  };

  render() {
    const { children } = this.props;
    const { mostLeft, mostRight } = this.state;

    const getNextPosition = (prevState, left) => {
      if (left) {
        return prevState.position - 1 > 0 ? prevState.position - 1 : 0;
      }
      return prevState.position + 1 > children.length - 1
        ? children.length - 1
        : prevState.position + 1;
    };

    const clickHandler = (left = false) => {
      this.setState(
        prevState => ({ position: getNextPosition(prevState, left) }),
        this.setScrollValue,
      );
    };

    const noneDisplayClassName = 'noneDisplay';
    const getDisplayClass = value => (value ? noneDisplayClassName : '');

    return (
      <div className="horizontalScrollWrapper">
        <div
          ref={this.wrapperRef}
          className="horizontalScrollWrapper-container container"
        >
          {this.props.children}
        </div>
        <div
          className={`prev ${getDisplayClass(mostLeft)}`}
          onClick={() => {
            clickHandler(true);
          }}
          role="button"
          tabIndex={0}
          onKeyUp={e => {
            // enter
            if (e.keyCode === 13) {
              clickHandler(true);
            }
          }}
        >
          &#10094;
        </div>
        <div
          className={`next ${getDisplayClass(mostRight)}`}
          onClick={() => {
            clickHandler();
          }}
          role="button"
          tabIndex={0}
          onKeyUp={e => {
            // enter
            if (e.keyCode === 13) {
              clickHandler();
            }
          }}
        >
          &#10095;
        </div>
      </div>
    );
  }
}

HorizontalScrollWrapper.defaultProps = {
  onItemScroll: null,
  onUnmount: null,
  position: 0,
  smooth: false,
  disappearPercent: 0.1,
  wait: 200,
};
HorizontalScrollWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onItemScroll: PropTypes.func,
  onUnmount: PropTypes.func,
  position: PropTypes.number,
  /* percentage control when to hide the next and prev button, 0 - 1 */
  disappearPercent: PropTypes.number,
  wait: PropTypes.number,
  /* set to true when you want the item to smoothly move without center itself when you scroll */
  smooth: PropTypes.bool,
};

export default HorizontalScrollWrapper;
