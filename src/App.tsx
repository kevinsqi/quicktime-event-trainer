import React, { Component } from "react";
import { MdClear } from "react-icons/md";
import { IoIosSquareOutline, IoIosRadioButtonOff } from "react-icons/io";
import { GiTriangleTarget } from "react-icons/gi";
import _ from "lodash";
import "./App.css";

function RandomIcon() {
  const [iconName, setIconName] = React.useState<string>("circle");

  React.useEffect(() => {
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
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

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

class App extends Component {
  render() {
    return (
      <div className="d-flex align-items-center justify-content-center width-full height-full">
        <div style={{ fontSize: 100 }}>
          <RandomIcon />
        </div>
      </div>
    );
  }
}

export default App;
