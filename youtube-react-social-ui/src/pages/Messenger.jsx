import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversation from "../components/Conversation";
import Topbar from "../components/Topbar";
import Message from "../components/Message";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MakeFriend from "../components/MakeFriend";
import { Cancel, PermMedia } from "@material-ui/icons";

export default function Messenger({ socket }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const user = useSelector((state) => state.user?.currentUser);
  const scrollRef = useRef();

  const [file, setFile] = useState(null);

  // console.log("user:", user);
  // console.log("currentChat:", currentChat);
  // console.log("messages:", messages);
  // console.log("newMessage:", newMessage);
  // console.log("arrivalMessage:", arrivalMessage);
  // console.log("onlineUsers:", onlineUsers);
  // console.log("conversations:", conversations);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      if (data.type === "file") {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          img: data.img,
          filename: data.filename,
          createdAt: Date.now(),
        });
        console.log(data);
      } else {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now(),
        });
      }
    });
  }, [socket]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [socket, user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      message.img = fileName;
      console.log(message);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    const reader = new FileReader();
    reader.onloadend = function () {
      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
        img: file ? reader.result : 1,
        filename: file ? file.name : 1,
        type: "file",
      });
      socket.emit("send-img");
    };
    reader.readAsDataURL(file);

    // socket.current.emit("sendMessage", {
    //   senderId: user._id,
    //   receiverId,
    //   text: newMessage,
    //   // img: file ? URL.createObjectURL(file) : 1,
    //   img: file ? file : 1,
    //   filename: file ? file.name : 1,
    //   type: "file",
    // });
    setFile();
    console.log(message, receiverId);

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar socket={socket} />
      <Wrapper>
        <Menu>
          <div className="h">
            <input placeholder="Search for friends" />
            {conversations.map((c, index) => (
              <div key={index} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </Menu>
        <ChatBox>
          <ChatBoxWrapper className="h">
            {currentChat ? (
              <>
                <Top>
                  {messages.map((m, index) => (
                    <div key={index} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </Top>
                <Bottom>
                  <div>
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <span style={{ cursor: "pointer" }}>Photo or Video</span>
                    <input
                      style={{
                        position: "absolute",
                        opacity: "0",
                        width: "100px",
                        cursor: "pointer",
                      }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <textarea
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  {file && (
                    <ShareImg>
                      <img
                        src={URL.createObjectURL(file)}
                        alt=""
                        className="shareImg"
                      />
                      <Cancel
                        className="shareCancelImg"
                        onClick={() => setFile(null)}
                      />
                    </ShareImg>
                  )}
                  <button onClick={handleSubmit}>Send</button>
                </Bottom>
              </>
            ) : (
              <span className="noConversationText">
                Mở một cuộc trò chuyện để bắt đầu một cuộc trò chuyện.
              </span>
            )}
          </ChatBoxWrapper>
        </ChatBox>
        <ChatOnlineStyled>
          <MakeFriend />
        </ChatOnlineStyled>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  div {
    .h {
      padding: 10px;
      height: 100%;
    }
  }
`;
const Menu = styled.div`
  flex: 3.5;
  input {
    width: 90%;
    padding: 10px 0;
    border: none;
    border-bottom: 1px solid gray;
  }
`;
const ChatBox = styled.div`
  flex: 5.5;
`;
const ChatBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  .noConversationText {
    position: absolute;
    top: 10%;
    font-size: 50px;
    color: rgb(224, 220, 220);
    cursor: default;
  }
`;
const Top = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 10px;
`;
const Bottom = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  textarea {
    width: 80%;
    height: 90px;
    padding: 10px;
  }
  button {
    width: 70px;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: teal;
    color: white;
  }
`;
const ChatOnlineStyled = styled.div`
  flex: 3;
  .h {
    .message.own {
      align-items: flex-end;
    }
  }
`;
const ShareImg = styled.div`
  padding: 0 20px 10px 20px;
  position: relative;
  width: 200px;
  height: 100%;
  .shareImg {
    width: 80%;
    height: 80%;
    object-fit: cover;
  }
  .shareCancelImg {
    position: absolute;
    top: 0;
    right: 20px;
    cursor: pointer;
    opacity: 0.7;
  }
`;
