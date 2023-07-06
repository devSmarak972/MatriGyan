import React from 'react'

const Chatsection = () => {
  return (
    <div class="chatSection">
      <div class="chat-cont"></div>
      <div class="chat-input-cont">
        <div class="ci-cont">
          <input
            type="text"
            class="chat-input"
            placeholder="Type chat here.."
          />
        </div>
        <div class="ci-send">
          <button class="chat-send">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatsection