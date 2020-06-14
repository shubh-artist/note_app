import React, { Component } from "react";
import "./style.css";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allnotes);
  }

  render() {
    return (
      <div>
        <div>
          <p>All Notes</p>
          <ul style={{ padding: 0, margin: 0 }}>
            {this.props.allnotes.map((ele, i) => (
              <li
                className="notes"
                key={i}
                onClick={() => {
                  this.props.openeditmode(ele);
                }}
              >
                <h3>{ele.heading}</h3>
                <p>{ele.updatedAt}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button onClick={this.props.openinnewmode}>Add New</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
