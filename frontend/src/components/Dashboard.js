import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import http from "../components/Https";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allnotes: [],
      heading: "",
      body: "",
      mode: "new",
      currentlyActive: undefined
    };
  }

  editHeading = s => {
    this.setState({ heading: s });
  };

  editBody = b => {
    this.setState({ body: b });
  };

  saveNote = () => {
    //code
    let data = {
      heading: this.state.heading,
      body: this.state.body
    };
    if (this.state.mode !== "new") {
      data.id = this.state.currentlyActive;
    }
    console.log(data);
    http
      .post("/createupdate", data)
      .then(result => {
        console.log(result.data);
        alert(result.data.message);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.fetchallnotes();
      });
  };

  fetchallnotes = () => {
    http
      .get("/fetchallnotes")
      .then(result => {
        console.log(result.data.data);
        if (!result.data.status) {
          this.props.logout(); //token invalid
        } else {
          this.setState({ allnotes: result.data.data });
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.openinnewmode();
      });
  };

  openeditmode = e => {
    console.log(e);
    this.setState({
      mode: "edit",
      heading: e.heading,
      body: e.body,
      currentlyActive: e._id
    });
  };

  openinnewmode = () => {
    this.setState({
      mode: "new",
      heading: "",
      body: "",
      currentlyActive: undefined
    });
  };

  componentDidMount() {
    this.fetchallnotes();
  }
  render() {
    return (
      <div style={container}>
        <div
          style={{
            flex: 1,
            height: "100vh",
            border: "1px solid black",
            overflow: "hidden"
          }}
        >
          <Sidebar
            allnotes={this.state.allnotes}
            openeditmode={this.openeditmode}
            openinnewmode={this.openinnewmode}
          />
        </div>
        <div style={{ flex: 2, height: "100vh" }}>
          <Editor
            editheading={this.editHeading}
            editbody={this.editBody}
            data={this.state}
            saveNote={this.saveNote}
          />
        </div>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

const container = {
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flex: 1,
  flexDirection: "row"
};

export default Dashboard;
