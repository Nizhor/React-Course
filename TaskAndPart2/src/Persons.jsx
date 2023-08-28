import React from 'react';

const Persons = ({ persons, filter }) => {
  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      {filteredPersons.map(person => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  );
};

export default Persons;
