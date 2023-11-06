import React, { useState } from 'react'
import logo from '../images/code (1).png'
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast'
const Home = () => {
    const [roomId, setRoomId]=useState('');
    const [username, setUsername]=useState('');

    const createNewRoom=(e)=>{
      e.preventDefault();
      const id=uuidV4();
      setRoomId(id);
      toast.success('Created a new room')
    };
  return (
    <div className="homePageWrapper">
    <div className="formWrapper">
        <div className="editorname">
        <img
            className="homePageLogo"
            src={logo}
            alt="code-sync-logo"
        /><h1>Code Sync</h1>
        </div>
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
            <input
                type="text"
                className="inputBox"
                placeholder="ROOM ID"
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                // onKeyUp={handleInputEnter}
            />
            <input
                type="text"
                className="inputBox"
                placeholder="USERNAME"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                // onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn">
                Join
            </button>
            <span className="createInfo">
                If you don't have an invite then create &nbsp;
                <a
                    onClick={createNewRoom}
                    href=""
                    className="createNewBtn"
                >
                    new room
                </a>
            </span>
        </div>
    </div>
    <footer>
        <h4>
            Built with 💛 &nbsp; by &nbsp;
            <a href="https://github.com/sujataprsad01">Sujata Prasad</a>
        </h4>
    </footer>
</div>
  )
}

export default Home
