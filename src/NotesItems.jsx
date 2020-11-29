import React from 'react'
import './index.css'

function NotesItems(props){
 const notes = props.notes;
 const newDate = new Date()
 const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 const notesItems = notes.map(note =>
    {
        return (
        <li className='list' key={note.key} onClick={props.handleOpenModal}>
            {note.title}
            <br></br>
            {note.text}
            <br></br>
            <div id="date">
           [Created at {months[newDate.getMonth()]} {newDate.getDate()}th {
newDate.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})}]
</div>
            <button onClick={()=> {if(window.confirm('Delete the item?'))props.deleteNote(note.key)}}>Delete that baby!</button>
        </li>
        )
           })

    return(
        <ul>{notesItems}</ul>
    )
}


export default NotesItems;