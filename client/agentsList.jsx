import React from 'react';
import ags from './agentsStyles.css'

const Agents = ({ agents }) => (
  <span>
    {agents.map((agent, index) => (
      <span key={index} className={ags.picture}>
        <img src={agent.picture} />
        <label>{index ? 'Premier Agent' : 'Listing Agent'}</label>
        <span className= {ags.contactCard}>
          <img src={agent.picture} />
          <h1>{agent.name}</h1>
          <label>{index ? 'Premier Agent' : 'Listing Agent'}</label>
          {agent.phone}
          {agent.recentSales} Recent Sales
          {agent.reviewsScore}
          ({agent.reviewsCount})
        </span>
      </span>
    ))}
  </span>
);

export default Agents;
