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
  <span>
    {agents.map((agent, index) => (
      <span key={index} className={ags.picture}>
        <span className={ags.photo}>
          <img className={ags.thumbnail} id={index} src={agent.picture} />
        </span>
          <span className={ags.caption}>{index ? 'Premier' : 'Listing'}</span>
          <span className={ags.caption}>{'Agent'}</span>
        <span className={ags.contactCard}>
          <img src={agent.picture} />
          <h1>{agent.name}</h1>
          <label>{index ? 'Premier Agent' : 'Listing Agent'}</label>
          {agent.phone}
          {agent.recentSales}
          {' '}
          Recent Sales
          {populateStars(agent.reviewsScore)}
          (
          {agent.reviewsCount}
          )
        </span>
      </span>
    ))}
  </span>
);

export default Agents;
