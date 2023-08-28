import React from 'react';

const PersonsList = ({ persons }) => (
  <ul>
    {persons.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);

export default PersonsList;
