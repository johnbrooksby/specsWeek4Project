import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post(register ? "http://localhost:5051/register/" : "http://localhost:5051/login/", {username, password})
      .then((res) => {
        console.log(res.data);
        setRegister(res)
        authCtx.login(res.data.token, res.data.exp, res.data.userId);
        setUsername('')
        setPassword('')

      })
      .catch((err) => {
        console.error(err);
        setUsername("");
        setPassword("");
      });

    console.log("submitHandler called");
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          autoFocus
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />
        <button className="form-btn" >{register ? "Sign Up" : "Login"} </button>
      </form>
      <button className="form-btn" onClick={() => setRegister(prev => !prev)}>
        Need to {register ? "Login" : "Sign Up"}?
      </button>
    </main>
  );
};

export default Auth;
