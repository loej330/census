import './App.css';
import './Poll.css';
import Poll from './Poll.js';
import { useContext, useState, useEffect, createContext } from 'react';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

const User = createContext(0);
const Global = createContext(0);

//testing getting data from the api KEYWORD: testing
/*
function DataBlock() {
  const [ data, setData ] = useState(null);
  useEffect(() => {
    (async () => {
      const url = 'http://localhost:3000/query';
      const sql = "SELECT * FROM polls";
      const req = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({query: sql})
      }
      const res = await fetch(url, req);
      if (!res.ok) { setData(`Error ${res.status}: ${res.statusText}`); }
      else {
        const data = await res.json();
        setData(JSON.stringify(data));
      }
    })();
  }, []);
  return (<div>{data}</div>);
}
*/

const PAGES = {
  HOME: 0,
  SETTINGS: 1, 
  TOPICS: 2,
  PROFILE: 3
}

function Login() {
  const [ status, setStatus ] = useState(null);
  const username = "test";
  const password = "1234";
  
  useEffect(() => {
    (async () => {
      const login = {
        username: username,
        password: password,
      };
      const url = 'http://localhost:3000/api/login';
      const req = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(login)
      }
      const res = await fetch(url, req);
      if (!res.ok) { setStatus(`Error ${res.status}: ${res.statusText}`); }
      else {
        const user = await res.json();
        setStatus(`ok mr ${user.username} you AIGHT`);
      }
    })();
  }, []);

  return (<div>{ status }</div>) 
  
}

function PollBlock() {
  const [ polls, setPolls ] = useState(null);
  useEffect(() => {
    (async () => {
      const url = 'http://localhost:3000/api/polls';
      const req = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
      }
      const res = await fetch(url, req);
      //TODO: this is a little messy, wouldn't you agree?
      if (!res.ok) { setPolls(`Error ${res.status}: ${res.statusText}`); }
      else {
        const data = await res.json();
        setPolls([ ...data ]);
      }
    })();
  }, []);
  // return (JSON.stringify(polls));
  return (polls != null && polls.map(poll => 
    <Poll key={poll.poll_id} poll={poll}/>
  ));
}

function Basic() {
  const [ data, setData ] = useState(null);
  useEffect(() => {
    (async () => {
      const url = 'http://localhost:3000/';
      const res = await fetch(url);
      if (!res.ok) { setData(`Error ${res.status}: ${res.statusText}`); }
      const text = await res.text();
      setData(text);
    })();
  }, []);
  return (<div>{data}</div>);
}

function Home() {
  const { global, setGlobal } = useContext(Global);
  return (
    <div className={'poll-list-container'}>
      <h3>Dark mode: {global.dark ? 'on' : 'off'}</h3>
      <PollBlock/>
    </div>
  )
}

function Settings() {
  const { global, setGlobal } = useContext(Global);

  //TODO: decide weather settings should update in real time or need to be 'saved' for changes to take effect
  const updateGlobalBool = (e) => {
    const { name } = e.target;
    setGlobal({
      ...global,
      [name]: !global[name],
    });
  }

  return (
    <div>
      <div>Dark Mode (i consume soy):
        <input type="checkbox" checked={global.dark} name="dark" onChange={updateGlobalBool}/>
      </div>
      <div>Results Always Visible (i have severe ADHD):
        <input type="checkbox" checked={global.results} name="results" onChange={updateGlobalBool}/>
      </div>
    </div>
  )
}

function Profile() {
  const { user } = useContext(User);
  return (
    <div>
      {user}, you know you my nigga, right?
      <Login/>
    </div>
  )
}

function App() {
  let global_object = {
    results: false,
    dark: false,
  }

  //TODO: move these contexts one level out 
  const [ user, setUser ] = useState(0);
  const [ global, setGlobal ] = useState(global_object);

  return (
    <User.Provider value={{ user, setUser }}>
    <Global.Provider value={{ global, setGlobal }}>
    <div>
      <BrowserRouter>
        <h1>It's Happenning</h1>
        <div><Link to="">Home</Link></div>
        <div><Link to="settings">Settings</Link></div>
        <div><Link to="topics">Topics</Link></div>
        <div><Link to="profile">Profile</Link></div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/topics" element={<Profile/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </Global.Provider>
    </User.Provider>
  )
}

export default App;
