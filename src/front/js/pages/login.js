import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClick = () => {
    var data = {
      username: username,
      password: password
    }
    actions.login(data)
  }

  return (
    <div className="container text-center mt-5">
      <form>
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" onChange={(e) => { setUsername(e.target.value) }} id="username" aria-describedby="emailHelp" />
          <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <button type="button" class="btn btn-primary" onClick={handleClick}>Login</button>
      </form>
    </div>
  );
};
