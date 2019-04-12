import React, { Component } from "react";
import { MdClear } from "react-icons/md";
import { IoIosSquareOutline, IoIosRadioButtonOff } from "react-icons/io";
import { GiTriangleTarget } from "react-icons/gi";
import _ from "lodash";
import "./App.css";

function RandomIcon() {
  const index = _.random(0, 3);

  if (index === 0) {
    return <MdClear />;
  }
  if (index === 1) {
    return <IoIosRadioButtonOff />;
  }
  if (index === 2) {
    return <IoIosSquareOutline />;
  }
  if (index === 3) {
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
