import './App.css';
import React from 'react';
import './index.css';
import Modal from 'react-modal';
import NotesItems from './NotesItems';

Modal.setAppElement('#root');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentNote: {
        title: '',
        text: '',
        key: '',
        showModal: false
      }
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
  }

  handleInput(e) {
    this.setState({
      currentNote: {
        ...this.state.currentNote,
        [e.target.name]: e.target.value,
        [e.target.name]: e.target.value,
        key: Date.now()
      }
    });
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  addNote(e) {
    e.preventDefault();
    const newNote = this.state.currentNote;
    console.log(newNote)
    if (newNote.text !== '') {
      const newNotes = [...this.state.notes, newNote];
      this.setState({
        notes: newNotes,
        currentNote: {
          title: '',
          text: '',
          key: ''
        }
      })
    }
  }

  deleteNote(key) {
    const filteredNotes = this.state.notes.filter(note => note.key !== key);
    this.setState({
      notes: filteredNotes
    }
    )
  }

  updateNote(e){
    e.preventDefault();
    this.setState({
      currentNote: {
        title: '',
        text: '',
        key: '',
        showModal: false
      }
    })
  }





  render() {
    let subtitle;
    const newDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const modals = this.state.notes;
    const modalItems = modals.map(modal =>
    {
        return (
        <div className='list' key={modal.key} onClick={this.handleOpenModal}>
            {modal.title}
            <br></br>
            {modal.text}
            <br></br>
            <div id="date">
           [Created at {months[newDate.getMonth()]} {newDate.getDate()}th {
newDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}]
</div>
</div>
)
           })
    return (
      <div className='App'>
        <form id='notes-form' onSubmit={this.addNote}>
          <input name="title" placeholder="Name your note here!" type="text" defaultValue={this.state.title} onChange={this.handleInput}></input>
          <br></br>
          <textarea name="text" placeholder="Write your note here!" defaultValue={this.state.text} onChange={this.handleInput}>
          </textarea>
          <button type="submit">Add that note!</button>
        </form>
        <NotesItems notes={this.state.notes} deleteNote={this.deleteNote} handleOpenModal={this.handleOpenModal}></NotesItems>
        <Modal
          isOpen={this.state.showModal}
          contentLabel="Your Note!"
        >
          <form>
          <input name="title" placeholder="Name your note here!" type="text" defaultValue={this.state.title} onChange={this.handleInput}></input>
          <br></br>
          <textarea name="text" placeholder="Write your note here!" defaultValue={this.state.text} onChange={this.handleInput}>
          </textarea>
          <button type="submit" onClick={this.updateNote}>Update note!</button>
          </form>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    )
  }
}

export default App;