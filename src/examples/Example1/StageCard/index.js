import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function StageCard(props) {
  const { currentStep, totalSteps } = props;
  return (
    <div className={'StageCard'} style={{ width: '150px' }}>
      <div className={'StageCard_status'}>
        Step {currentStep} of {totalSteps}
      </div>
      <div className="StageCard_title">Hello</div>
      <div className="StageCard_date">This is a card</div>
    </div>
  );
}

StageCard.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default StageCard;
