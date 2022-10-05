import React from "react";
import "./styles/App.css";

function App() {
  return (
    <div className="app">
      <h1>Hello World</h1>
      <button
        onClick={() => {
          window.electronAPI.sendNotification("Hello World", "Sdfsdf");
        }}
      >
        click me
      </button>
    </div>
  );
}

export default App;
