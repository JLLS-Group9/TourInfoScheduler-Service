import React from 'react';
import ds from './disclaimerStyles.css';

const Disclaimer = (scheduleBool) => {
  const view = scheduleBool.view ? 'Schedule A Tour' : 'Request Info';
  const popupMessage = 'real estate professionals';
  const popupMessageDisclaimer = `Real estate professionals include the real estate agents and brokers, mortgage lenders and loan officers, property managers, and other professionals you interact with through Trulia.`
  const publicHealthDisclaimer = `In-person tours may not currently allow for safe social distancing or comply with public health orders.`
  const message = `By pressing ${view}, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our Terms of Use Trulia does not endorse any `;

  return (
    <div className={ds.text}>
      {scheduleBool.view ? (
        <div className={ds.advisory}>
            &#9888; Public Health Advisory
          <div className={ds.hiddenDisclaimer}>
            {publicHealthDisclaimer}
          </div>
        </div>
      ) : null}
      {message}
      <div className={ds.popUp}>
        {popupMessage}{' '}
        <div className={ds.hiddenDisclaimer}>
          {popupMessageDisclaimer}
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
