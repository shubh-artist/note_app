import React, { Component } from "react";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div style={{ display: "flex", marginLeft: "7%" }}>
          <input
            type="text"
            placeholder="Heading"
            value={this.props.data.heading}
            onChange={e => {
              this.props.editheading(e.target.value);
            }}
          />
          <button
            style={{
              marginLeft: "10%",
              borderRadius: "10%",
              width: "50px",
              height: "20px",
              marginTop: "6%"
            }}
            onClick={this.props.saveNote}
          >
            Save
          </button>
        </div>
        <textarea
          placeholder="Write your notes here"
          style={{ marginLeft: "8%", width: "290px", height: "230px" }}
          value={this.props.data.body}
          onChange={e => {
            this.props.editbody(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default Editor;
