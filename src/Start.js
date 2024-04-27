import React from "react";

const App = ({ setGameBoard, type }) => {
  const [, setType] = type;
  const criteria = [
    { id: 1, text: "Easy", val: 2 },
    { id: 2, text: "Medium", val: 4 },
    { id: 3, text: "Hard", val: 6 },
  ];
  return (
    <div className="board gr-1">
      {criteria.map(({ id, text, val }) => (
        <div
          key={id}
          className="banner"
          onClick={() => {
            setType(val);
            setGameBoard(true);
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default App;
