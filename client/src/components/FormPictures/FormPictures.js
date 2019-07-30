import React, { Component } from "react";
import service from "./service";

export default class FormPictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_name: "",
      photo_url: "",
      userID: ""
    };
    this.service = new service();
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // photo_url => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("photo_url", e.target.files[0]);

    this.service
      .handleUpload(uploadData)
      .then(response => {
        console.log("response is: ", response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ photo_url: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  // this method submits the form
  handleSubmit = e => {
    e.preventDefault();

    this.service
      .saveNewThing({ ...this.state, userID: this.props.userID })
      .then(res => {
        console.log("added: ", res);
        // here you would redirect to some other page
      })
      .catch(err => {
        console.log("Error while adding the thing: ", err);
      });
  };

  render() {
    return (
      <div>
        <h2>Add picture</h2>
        <h2>{this.props.userID}</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <label>Name</label>
          <input
            type="text"
            name="photo_name"
            value={this.state.photo_name}
            onChange={e => this.handleChange(e)}
          />
          <input type="file" onChange={e => this.handleFileUpload(e)} />
          <button type="submit">Save new thing</button>
        </form>
      </div>
    );
  }
}
