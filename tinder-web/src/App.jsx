import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";

function App() {
  // return (
  // <>
  // <Provider store={appStore}>
  //   <BrowserRouter basename="/">
  //     <Routes>
  //       <Route path="/login" element={<Login/>}/>
  //       <Route path="/" element = {<Body/>}>
  //       <Route path="/" element={<Feed/>}/>
  //        <Route path="/profile" element={<Profile/>}/>
  //        <Route path="connections" element={<Connections/>}/>
  //        <Route path="/requests" element={<Requests/>}/>
  //       </Route>
  //     </Routes>
  //   </BrowserRouter>
  //   </Provider>
  // </>
  // )
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<Body />}>
              <Route path = "feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="connections" element={<Connections />} />
              <Route path="requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
