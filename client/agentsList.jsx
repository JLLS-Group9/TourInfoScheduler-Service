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
          <img className={ags.thumbnail} id={index} src={agent.picture} />
        </div>
          <span className={ags.caption}>{index ? 'Premier' : 'Listing'}</span>
          <span className={ags.caption}>{'Agent'}</span>
        <div className={ags.contactCard}>
          <img src={agent.picture} />
          <h1>{agent.name}</h1>
          <span>{index ? 'Premier Agent' : 'Listing Agent'}</span>
          {agent.phone}
          {agent.recentSales}
          {' '}
          Recent Sales
          {populateStars(agent.reviewsScore)}
          (
          {agent.reviewsCount}
          )
        </div>
      </div>
    ))}
  </div>
);

export default Agents;
