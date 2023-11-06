import React, { useState } from 'react'
import logo from '../images/code (1).png'
import Client from '../pages/Client'
import Editor from '../pages/Editor'

const EditorPage = () => {
  const [clients, setClients]=useState([{socketId:1, username:"Sujata"}, {socketId:1, username:"John"}, {socketId:1, username:"Tanisha"}, {socketId:1, username:"shruti"}])
  return (
    <div className='mainWrap'>
      <div className='aside'> 
      <div className='asideinner'>
        <div className='editorname'>
      <img
            className="editorLogo"
            src={logo}
            alt="code-sync-logo" 
        /><h3>Code Sync <span className='realtimecol'> Realtime collaboration</span></h3>
        </div>
        <h3>Connected</h3>
        <div className='clientsList'>
       {clients.map((client)=>(<Client key={client.socketId} username={client.username}/>))}
        </div>
        </div>  
       <div className='buttonss'>
        <button className='btn copyBtn'>Copy ROOM ID</button>
        <button className='btn leaveBtn'>Leave</button>
        </div>
        </div>
     
      <div className='editorWrap'>
        <Editor></Editor>
      </div>
    </div>
  )
}

export default EditorPage
