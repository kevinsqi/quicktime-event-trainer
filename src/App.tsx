import React from "react";
import { MdClear } from "react-icons/md";
import { IoIosSquareOutline, IoIosRadioButtonOff } from "react-icons/io";
import { GiTriangleTarget } from "react-icons/gi";
import useKey from "use-key-hook";
import _ from "lodash";
import "./App.css";

function RandomIcon({ iconName }: any) {
  if (iconName === "empty") {
    return null;
  }
  if (iconName === "x") {
    return <MdClear />;
  }
  if (iconName === "circle") {
    return <IoIosRadioButtonOff />;
  }
  if (iconName === "square") {
    return <IoIosSquareOutline />;
  }
  if (iconName === "triangle") {
    return <GiTriangleTarget />;
  }
  throw new Error("Invalid index");
}

function App() {
  const [countCorrect, setCountCorrect] = React.useState(0);
  const [countAttempts, setCountAttempts] = React.useState(0);

  const [iconName, setIconName] = React.useState<string>("empty");
  React.useEffect(
    () => {
      let timer: any;
      timer = setInterval(() => {
        const index = _.random(0, 3);
        const mapping: { [key: number]: string } = {
          0: "x",
          1: "circle",
          2: "square",
          3: "triangle"
        };
        const iconName: string = mapping[index];
        setIconName(iconName);
        setCountAttempts(countAttempts + 1);
      }, 1000);

      return () => {
        window.clearInterval(timer);
      };
    },
    [countAttempts, iconName]
  );

  useKey(
    (pressedKey: number, event: any) => {
      const mapping: { [key: string]: string } = {
        ArrowLeft: "square",
        ArrowRight: "circle",
        ArrowUp: "triangle",
        ArrowDown: "x"
      };
      const iconPressed = mapping[event.key];
      console.log(iconPressed, iconName);
      if (iconPressed === iconName) {
        setCountCorrect(countCorrect + 1);
      }
    },
    {},
    { dependencies: [iconName, countCorrect] }
  );

  return (
    <div className="d-flex flex-column align-items-center justify-content-center width-full height-full">
      <div style={{ fontSize: 40 }}>
        {countCorrect} / {countAttempts}
      </div>
      <div style={{ fontSize: 100 }}>
        <RandomIcon iconName={iconName} />
      </div>
    </div>
  );
}

export default App;
