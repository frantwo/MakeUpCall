import React, { Component } from "react";
import service from "./service";
import "./FormPictures.css";

export default class FormPictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_name: "",
      photo_url: "",
      userID: "",
      avoidAddPict: false,
      pictureUpdated: false
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
        this.setState({
          photo_url: response.secure_url,
          avoidAddPict: true,
          pictureUpdated: false
        });
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
        this.setState({ avoidAddPict: false, pictureUpdated: true });
      })
      .catch(err => {
        console.log("Error while adding the thing: ", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Add pictures:</h2>
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="choose-pict">
            <div>
              <label className="fields-form">Name</label>
              <input
                className="fields-form"
                type="text"
                name="photo_name"
                value={this.state.photo_name}
                onChange={e => this.handleChange(e)}
              />
            </div>
            <input
              className="fields-form"
              type="file"
              onChange={e => this.handleFileUpload(e)}
            />
          </div>
          <button
            className="button-add-pict"
            disabled={!this.state.avoidAddPict}
            type="submit"
          >
            Add new picture
          </button>
          {this.state.pictureUpdated && (
            <p className="updatedFinished">Picture added succesfully!</p>
          )}
        </form>
      </React.Fragment>
    );
  }
}
