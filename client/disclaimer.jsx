import React from 'react';
import ds from './disclaimerStyles.css'

const Disclaimer = (scheduleBool) => {
  const view = scheduleBool.view ? 'Schedule A Tour' : 'Request Info';
  const message = `By pressing ${view}, you agree that Trulia and real estate professionals may contact you via phone/text about your inquiry, which may involve the use of automated means. You are not required to consent as a condition of purchasing any property, goods or services. Message/data rates may apply. You also agree to our Terms of Use Trulia does not endorse any real estate professionals.`;

  return (
    <div className={ds.text}>
      {scheduleBool.view ? <span className={ds.advisory}>&#9888; Public Health Advisory</span> : null}
      {message}
    </div>
  );
};

export default Disclaimer;
