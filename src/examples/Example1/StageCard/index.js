import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function StageCard(props) {
  const { complete, currentStep, totalSteps } = props;
  return (
    <div className={'StageCard'} style={{ width: '150px' }}>
      <div className={'StageCard_status'}>
        {complete && 'Completed'}
        {complete ? 'complete' : 'upcoming'} - Step {currentStep} of{' '}
        {totalSteps}
      </div>
      <div className="StageCard_title">Hello</div>
      <div className="StageCard_date">This is a card</div>
    </div>
  );
}

StageCard.defaultProps = {
  complete: false,
};

StageCard.propTypes = {
  complete: PropTypes.bool,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default StageCard;
