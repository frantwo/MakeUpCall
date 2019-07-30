import axios from "axios";

export default class service {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/artists`,
      withCredentials: true // => you might need this when having the users in the app
    });
  }

  errorHandler = err => {
    // console.error(err);
    throw err;
  };

  handleUpload(theFile) {
    // console.log('file in service: ', theFile)
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(this.errorHandler);
  }

  saveNewThing(newThing) {
    // console.log('new thing is: ', newThing)
    return this.service
      .post("/pictures/create", newThing)
      .then(res => res.data)
      .catch(this.errorHandler);
  }
}
