import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Messenger from "./pages/Messenger";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import PostPage from "./pages/PostPage";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
function App() {
  const user = useSelector((state) => state.user?.currentUser);
  const socket = useRef();

  useEffect(() => {
    if (user) {
      socket.current = io("ws://localhost:8900");
      socket.current.emit("addUser", user._id);
    }
  }, [user]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home socket={socket} /> : <Register />}
        </Route>
        <Route path="/">
          {user ? <Messenger socket={socket} /> : <Login />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/messenger">
          {user ? <Messenger socket={socket} /> : <Register />}
        </Route>
        <Route path="/profile/:username">
          <Profile socket={socket} />
        </Route>
        <Route path="/posts/:postId">
          <PostPage socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
