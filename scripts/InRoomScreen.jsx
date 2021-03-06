import * as React from 'react';
import Socket from './Socket';
import Flashcards from './Flashcards';
import Chatbox from './Chatbox';
import WhiteboardButton from './WhiteboardButton';

function InRoomScreen() {
  const [users, setUsers] = React.useState([]);
  function fakeRoomLeave() {
    Socket.emit('leave room', {
      msg: '',
    });
  }

  function updateUsers(data) {
    console.log(`Received new user: ${data.all_users}`);
    setUsers(data.all_users);
  }

  function getNewuser() {
    React.useEffect(() => {
      Socket.on('users received', updateUsers);
      return () => {
        Socket.off('users received', updateUsers);
      };
    });
  }

  getNewuser();

  return (
    <div id="inRoomScreen">
      <WhiteboardButton />
      <div className="inRoom_chat_usr_container">
        <Chatbox />
        <ul className="userListing">
          {
            users.map((user, index) => <li key={index}>{user}</li>)
        }
        </ul>
      </div>
        <div id="flashcards">
          <Flashcards />
        </div>
      <button onClick={fakeRoomLeave} type="submit">FakeLeaveRoom</button>
    </div>
  );
}

export default InRoomScreen;
