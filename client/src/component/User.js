import axios from "axios";
import React, { useState } from "react";


export default function User() {
  const [signup, setSignup] = useState(false);
  const [signin, setSignin] = useState(false);
  const [passNotsame, setPassNotSame] = useState(false);
  const [msg,setMsg] = useState(false);
  const [dberr,setDbErr] = useState(false);
  const[err,setErr] = useState(false)
  const [registerUser, setRegisterUser] = useState({
    name: "",
    email: "",
    password: "",
  });

const [email,setEmail] = useState();
const [password,setPassword] = useState();



  function login (e) {
    e.preventDefault();
    axios.post('http://localhost:8080/login',{email,password})
    .then(res=>{
      sessionStorage.setItem('token',res.data.token) 
      window.location.href= '/quiz'
    });
  }

  function check(e) {
    if (e.target.value != registerUser.password) {
      setPassNotSame(true);
    } else {
      setPassNotSame(false);
    }
  }

  let name, value;
  function inputHandler(e) {
    name = e.target.name;
    value = e.target.value;
    setRegisterUser({ ...registerUser, [name]: value });
  }

  function registerEvent(e) {
    e.preventDefault();
    axios.post('http://localhost:8080/register',{registerUser})
    .then((res)=>{
      if(res.data.msg) {
        setMsg(res.data.msg)
        setDbErr(false)
        setErr(false)
      }else{
        setDbErr(res.data.err)
        setMsg(false)
        setErr(res.data.msg)
      }
    })
    .catch(err=>{setErr(err.data.msg)
      setMsg(false)
      setDbErr(false)
    });
  }

  return (
    <div className="userScreen">
      {!signup && !signin && (
        <>
          <button
            className="btn btn-warning btns"
            onClick={() => {
              setSignup(true);
              setSignin(false);
            }}
          >
            SignUP
          </button>
          <button
            className="btn btn-success btns"
            onClick={() => {
              setSignin(true);
              setSignup(false);
            }}
          >
            signIN
          </button>
        </>
      )}

      {signup && (
        <div className="card">
          <h1>SIGN-UP here !</h1>
          {
            msg&&(<div class="alert alert-success" role="alert">
            {msg}
            </div>)
          }
          {
            dberr&&(<div class="alert alert-danger" role="alert">
            {dberr}
            </div>)
          }
          {
            err && (<div class="alert alert-danger" role="alert">
             retry again registration fail due to error
            </div>)
          }
          <form onSubmit={registerEvent}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                class="form-control"
                name="name"
                onChange={inputHandler}
              />
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                name="email"
                onChange={inputHandler}
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                name="password"
                onChange={inputHandler}
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm-Password
              </label>
              <input
                type="password"
                class="form-control"
                onBlur={(e) => check(e)}
              />
            </div>

            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            {passNotsame ? (
              <h3 style={{ color: "red" }}>both password must be same</h3>
            ) : (
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            )}
          </form>
        </div>
      )}

      {signin && (
        <>
          <div className="card">
            <h1>SiGN-IN here !</h1>

            <form onSubmit={login}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  class="form-control"
                  id="exampleInputEmail1"
                  name='email'
                  onChange={(e)=>{setEmail(e.target.value)}}
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label" >
                  Password
                </label>
                <input
                  type="password"
                  required
                  name='password'
                  onChange={(e)=>setPassword(e.target.value)}
                  class="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button type="submit" class="btn btn-primary">
                LOGIN
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
