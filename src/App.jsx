import { useState, useCallback, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import pass from './assets/pass.mp4'

function App() {
  const [length, setlength] = useState(8);
  const [nual, setNual] = useState(false);
  const [chal, setChal] = useState(false);
  const [p, setP] = useState(' ');
  const pref = useRef(null);

  const copypass = () => {
    window.navigator.clipboard.writeText(p);
    pref.current?.select();
  };

  const generatepass = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (nual) str += '01234567890';
    if (chal) str += '!@#$%^&*()_+';

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setP(pass);
  }, [length, nual, chal]);

  useEffect(() => {
    generatepass();
  }, [length, nual, chal]);

  return (
    <div className="app-container">
      <video
        src={pass}
        autoPlay
        loop
        muted
        className="background-video"
      />
      <div className="content w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={p}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={pref}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copypass}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setlength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={nual}
              onChange={() => setNual((prev) => !prev)}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={chal}
              onChange={() => setChal((prev) => !prev)}
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
