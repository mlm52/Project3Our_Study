import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Flashcard from './Flashcard';
import Socket from './Socket';

export default function Flashcards() {
  const [addCards, setAddCards] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const CARDS = 'cards';

  function addFlashCards(e) {
    e.preventDefault();
    setAddCards(true);
  }

  function newCards() {
    useEffect(() => {
      Socket.on(CARDS, (data) => {
        setFlashcards(data);
      });
    });
  }

  newCards();

  return (
    addCards
      ? <CreateFlashcards cards={flashcards} />
      : (

          <div>
            <div className="card-grid">
              {flashcards.map((flashcard) => <Flashcard key={uuidv4()} flashcard={flashcard} />)}
            </div>
            <button type="submit" onClick={addFlashCards}>Edit Flashcards</button>
          </div>
      )
  );
}

function CreateFlashcards({ cards }) {
  const [submitted, setSubmit] = useState(false);
  const [fields, setFields] = useState(cards);
  const NEW_CARDS = 'new cards';

  function handleQuestion(i, event) {
    const values = [...fields];
    values[i].question = event.target.value;
    setFields(values);
  }

  function handleAnswer(i, event) {
    const values = [...fields];
    values[i].answer = event.target.value;
    setFields(values);
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ question: '', answer: '' });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }

  function handleSubmit(event) {
    event.preventDefault();
    Socket.emit(NEW_CARDS, fields);
    setSubmit(true);
  }

  return (
    submitted
      ? <Flashcards />
      : (
        <div>
          {fields.map((field, idx) => (
            <div key={`${field + idx}`} className="form-row">

              <div className="col-5">
                <input type="text" className="question" placeholder="Enter question" value={field.question} onChange={(e) => handleQuestion(idx, e)} />
              </div>
              <div className="col-5">
                <input type="text" className="answer" placeholder="Enter answer" value={field.answer} onChange={(e) => handleAnswer(idx, e)} />
              </div>

              <button type="button" onClick={() => handleRemove(idx)}>X</button>

            </div>
          ))}

          <div className="row">
            <span>
              <button type="button" id="addCard" onClick={handleAdd}>Add Card</button>
            </span>

          </div>

          <input type="button" value="Done" onClick={handleSubmit} />

        </div>

      )

  );
}

CreateFlashcards.defaultProps = {
  cards: [],
};

CreateFlashcards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object),

};
