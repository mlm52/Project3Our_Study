import * as React from 'react';
import Socket from './Socket';

function RoomJoinCreate() {
  const [createRoom, setCreateRoom] = React.useState(true);

  function switchToCreate() {
    setCreateRoom(true);
  }

  function switchToJoin() {
    setCreateRoom(false);
  }

  function createNewRoom(event) {
    const newRoom = document.getElementById('create_input');
    Socket.emit('new room creation request', {
      roomName: newRoom.value,
    });

    newRoom.value = '';

    event.preventDefault();
  }

  function joinExistingRoom(event) {
    const roomId = document.getElementById('join_room_id_input');
    const roomPassword = document.getElementById('join_room_password_input');
    Socket.emit('join room request', {
      roomId: roomId.value,
      roomPassword: roomPassword.value,
    });

    roomId.value = '';
    roomPassword.value = '';

    event.preventDefault();
  }

  return (
    <div id="roomJoinCreateButtons">
      <div id="main_buttons_container">
      <button id="start_create" onClick={switchToCreate} type="submit">Create Room</button>
      <button id="start_join" onClick={switchToJoin} type="submit">Join Room</button>
      </div>
      {
        createRoom
          ?
          (
            <form onSubmit={createNewRoom} id="createRoomForm">
              <input id="create_input" placeholder="Enter room name here" />
              <button id="create_room_button" type="submit">Create</button>
            </form>
          )
          : (
            <form onSubmit={joinExistingRoom} id="joinRoomForm">
              <input id="join_room_id_input" placeholder="Enter room id here" />
              <input id="join_room_password_input" placeholder="Enter room password here" />
              <button id="join_room_button" type="submit">Join</button>
            </form>
          )
      }
    </div>
  );
}

export default RoomJoinCreate;
