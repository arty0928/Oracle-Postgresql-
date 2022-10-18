import React from "react";

export default class Example3 extends React.Component {
    state = {
      text: "",
    };
  
    handlChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    };
  
    onclick = () => {
        const textbox = {
          inText: this.state.text,
        };
        fetch("http://localhost:3002/text", {
          method: "post", //통신방법
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(textbox),
        })
          .then((res) => res.json()) //추가된 부분
          .then((json) => {
            console.log(json);
            this.setState({
              text: json.text,
            });
          });
      };
  
    render() {
      return (
        <div>
          <input name="text" onChange={this.handlChange}></input>
          <button onClick={this.onclick}>전송</button>
          <h3>{this.state.text}</h3>
        </div>
      );
    }
  }