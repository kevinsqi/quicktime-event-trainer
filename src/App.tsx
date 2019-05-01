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

enum Mode {
  Playing = "Playing",
  Paused = "Paused",
  Stopped = "Stopped"
}

function Trainer({ mode, setMode }: { mode: Mode; setMode: Function }) {
  const [countCorrect, setCountCorrect] = React.useState(0);
  const [countAttempts, setCountAttempts] = React.useState(0);
  const [iconPressed, setIconPressed] = React.useState<string | null>(null);
  const [iconName, setIconName] = React.useState<string>("empty");

  React.useEffect(() => {
    let timer: number | undefined = undefined;

    function updateIcon() {
      // Reset user input
      setIconPressed(null);

      // Set new icon
      const index = _.random(0, 3);
      const mapping: { [key: number]: string } = {
        0: "x",
        1: "circle",
        2: "square",
        3: "triangle"
      };
      const newIconName = mapping[index];
      setIconName(newIconName);

      // Use "functional updater form": https://overreacted.io/a-complete-guide-to-useeffect/
      setCountAttempts(countAttempts => countAttempts + 1);

      // Recursively continue
      timer = window.setTimeout(updateIcon, 1000);
    }

    if (mode === Mode.Paused) {
      window.clearTimeout(timer);
    } else {
      updateIcon();
    }

    return () => {
      window.clearTimeout(timer);
    };
  }, [mode]);

  useKey(
    (pressedKey: number, event: any) => {
      const mapping: { [key: string]: string } = {
        ArrowLeft: "square",
        ArrowRight: "circle",
        ArrowUp: "triangle",
        ArrowDown: "x"
      };
      if (!iconPressed && mapping[event.key] === iconName) {
        setCountCorrect(countCorrect + 1);
        setIconPressed(mapping[event.key]);
      }
    },
    {},
    { dependencies: [iconName, iconPressed, countCorrect] }
  );

  return (
    <div className="d-flex flex-column align-items-center justify-content-center width-full height-full">
      <div style={{ fontSize: 40 }}>
        {countCorrect} / {countAttempts}
      </div>
      <div
        style={{
          fontSize: 100,
          color: iconPressed === iconName ? "blue" : "black"
        }}
      >
        <RandomIcon iconName={iconName} />
      </div>
      <div>
        <button
          className="btn btn-secondary-outline"
          onClick={() => {
            if (mode === Mode.Paused) {
              setMode(Mode.Playing);
            } else if (mode === Mode.Playing) {
              setMode(Mode.Paused);
            }
          }}
        >
          {mode === Mode.Paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}

function IntroScreen({ setMode }: { setMode: Function }) {
  return <div onClick={() => setMode(Mode.Playing)}>Hello</div>;
}

function App() {
  const [mode, setMode] = React.useState<Mode>(Mode.Stopped);

  if (mode === Mode.Playing || mode === Mode.Paused) {
    return <Trainer mode={mode} setMode={setMode} />;
  } else {
    return <IntroScreen setMode={setMode} />;
  }
}

export default App;
