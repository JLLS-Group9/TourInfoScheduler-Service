import React from 'react'


const Agents = ({ agents }) => (
  <span>
    {agents.map((agent, index) =>
    <span key={index}>
      <label>{index ? 'Premier Agent' : 'Listing Agent'}</label>
      <img  src={agent.picture}></img>

    </span> )}
  </span>
)

export default Agents;