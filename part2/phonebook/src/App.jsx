import React, { useState, useEffect } from 'react';
import axios from 'axios';
import phonebookService from './services/phonebook';

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={onChange} />
    </div>
  );
}

const PersonForm = ({ onSubmit, name, onNameChange, number, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={name} onChange={onNameChange} /></div>
      <div>number: <input value={number} onChange={onNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  );
}

const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      {persons.map(person => 
        <div key={person.name}>
          <Person person={person} />
          <button onClick={() => onDelete(person.id)}>delete</button>
        </div>
      )}
    </div>
  );
}

const Person = ({ person }) => {
  return <p>{person.name} {person.number}</p>
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message}</div>;
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    phonebookService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(p => p.name === newName);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        const changedPerson = { ...existingPerson, number: newNumber };
        phonebookService.update(changedPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson));
            showMessage(`Updated ${newName}`);
          })
          .catch(error => {
            showMessage(`Error updating ${newName}: ${error.message}`, 'error');
          });
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    phonebookService.create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
        showMessage(`Added ${newName}`);
      })
      .catch(error => {
        showMessage(`Error adding ${newName}: ${error.message}`, 'error');
      });
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      phonebookService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          showMessage(`Deleted ${person.name}`);
        })
        .catch(error => {
          showMessage(`Error deleting ${person.name}: ${error.message}`, 'error');
        });
    }
  };

  const displayedPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter value={filter} onChange={(e) => setFilter(e.target.value)} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        number={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons persons={displayedPersons} onDelete={deletePerson} />
    </div>
  );
}


export default App;
