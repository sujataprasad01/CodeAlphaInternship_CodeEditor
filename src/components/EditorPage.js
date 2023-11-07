import React, { useEffect, useRef, useState } from 'react'
import logo from '../images/code (1).png'
import Client from '../pages/Client'
import Editor from '../pages/Editor'
import { initSocket } from '../socket'
import ACTIONS from '../Actions'
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast';

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('socket connection failed, try again later');
        reactNavigator('/');
      }


      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username,
      });

      //   listening for joined evenet
      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} joined the room.`);
          console.log(`${username} joined`);
        }
        setClients(clients);
    });
  // listening for disconnected
  socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
    toast.success(`${username} left the room`);
    setClients((prev) => {
      return prev.filter(
        (client) => client.socketId !== socketId
      );
    })
  })
};
init();
return ()=>{
  // socketRef.current.disconnect();
  socketRef.current.off(ACTIONS.JOINED);
  socketRef.current.off(ACTIONS.DISCONNECTED);
};
  }, [])

if (!location.state) {
  return <Navigate to="/"></Navigate>;
}

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
          {clients.map((client) => (<Client key={client.socketId} username={client.username} />))}
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
