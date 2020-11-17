import React from 'react';
import ags from './agentsStyles.css';

const populateStars = (score) => {
  const starBar = [];
  for (let i = 0; i < 5; i++) {
    if (i >= score) {
      starBar.push(<span key={i} className={ags.unfilledStar}>&#9733;</span>);
    } else {
      starBar.push(<span key={i} className={ags.filledStar}>&#9733;</span>);
    }
  }
  return starBar;
};

const Agents = ({ agents }) => (
  <div className={ags.AgentsContainer}>
    {agents.map((agent, index) => (
      <div key={index} className={ags.picture}>
        <div className={ags.photo}>
          <div className={ags.thumbnailContainer}>
            <img className={ags.thumbnail} id={index} src={agent.picture} />
          </div>
          <div className={ags.caption}>
            {index ? 'Premier' : 'Listing'}
            {' '}
            Agent
          </div>
        </div>
        <div className={ags.contactCard}>
          <div className={ags.contactPicture}>
            <div className={ags.pictureContainer}>
              <img src={agent.picture} className={ags.contactThumbnail} />
            </div>
          </div>
          <div className={ags.agentDetails}>
            <span className={ags.agentNameWrapper}>
              <span className={ags.agentName}>{agent.name}</span>
            </span>
            {' '}
            <span className={ags.agentTitle}>
              {index ? 'Premier Agent' : 'Listing Agent'}
            </span>
            {' '}
            <span className={ags.agentPhone}>
            {agent.phone}
            </span>
          </div>
          <div className={ags.reviews}>
            <span>
              {populateStars(agent.reviewsScore)}
              {agent.reviewsCount}
            </span>
            <span>
              {agent.recentSales}
              {' '}
              Recent Sales
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Agents;
