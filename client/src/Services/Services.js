import Axios from "axios";

export default class AuthServices {
  constructor() {
    this.service = Axios.create({
      baseURL: `${process.env.REACT_APP_URL}/auth`,
      withCredentials: true
    });
  }

  signup = (username, password, role, email) => {
    return this.service
      .post("/signup", { username, password, role, email })
      .then(response => response.data);
  };

  login = (username, password) => {
    return this.service
      .post("/login", { username, password })
      .then(response => response.data);
  };

  loggedin = () => {
    return this.service.get("/currentuser").then(response => response.data);
  };

  logout = () => {
    return this.service.get("/logout").then(response => response.data);
  };
}
