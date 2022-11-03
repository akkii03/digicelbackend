import React, { useState } from "react";
import axios from "axios";



export default function Admin() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [login, setLogin] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apifail, setApiFail] = useState(false);

  
  

  const [ques, setQues] = useState({
    ques: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    ans: "",
    level:'',
  });



  let name, value;
  function hadelQues(e) {
    name = e.target.name;
    value = e.target.value;
    setQues({ ...ques, [name]: value });
  }

  function submitQues(e) {
    e.preventDefault();
    const ans = document.querySelector("input[name=ans]:checked").value;
    ques.ans = ans;
    ques.level = parseInt(ques.level);
    console.log("thes ques is ",ques);
    
      axios
      .post("http://localhost:8080/admin/addQues", { ques })
      .then((res) => {
        console.log(res.data);
        setSuccess(true);
        setApiFail(false);
      })
      .catch((err) => {
        setApiFail(true);
        setSuccess(false);
      });
      

    
  }

  function admin(e) {
    e.preventDefault();
    if (email == "digicel@gmail.com" && pass == "admin") {
      setLogin(true);
      setInvalid(false);
    } else {
      setLogin(false);
      setInvalid(true);
    }
  }

  return (
    <div>
      {login ? (
        <>
          <h1>Add Quiz Ques</h1>
          {apifail && (
            <div class="alert alert-danger" role="alert">
              sorry Ques is not add due to server issue
            </div>
          )}
          {success && (
            <div class="alert alert-success" role="alert">
              The ques is added successfully !
            </div>
          )}
          
          <form onSubmit={submitQues}>
            <div class="mb-3">
              <label class="form-label">Question</label>
              <input
              required
                type="text"
                class="form-control"
                name="ques"
                onChange={hadelQues}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Option-1</label>
              <input
                type="text"
                required
                class="form-control"
                name="option1"
                onChange={hadelQues}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Option-2</label>
              <input
                type="text"
                required
                class="form-control"
                name="option2"
                onChange={hadelQues}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Option-3</label>
              <input
                type="text"
                required
                class="form-control"
                name="option3"
                onChange={hadelQues}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Option-4</label>
              <input
                type="text"
                required 
                class="form-control"
                name="option4"
                onChange={hadelQues}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Choose Answer :- </label>
              <br />
              <input type="radio" name="ans"  required value={ques.option1} />
              <lable>{ques.option1}</lable>
              <br />
              <input type="radio" name="ans" required value={ques.option2} />
              <lable>{ques.option2}</lable>
              <br />
              <input type="radio" name="ans" required value={ques.option3} />
              <lable>{ques.option3}</lable>
              <br />
              <input type="radio" name="ans" required value={ques.option4} />
              <lable>{ques.option4}</lable>
              <br />
            </div>
            <div className="mb-3">
              <label>Diffculty Level</label>
              <input type='number' required min='1' max='10' name="level"
                onChange={hadelQues} />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            {invalid ? <h1>invalid details</h1> : <></>}
          </form>
        </>
      ) : (
        <>
          <h1>admin page</h1>
          <form onSubmit={admin}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPass(e.target.value)}
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
            {invalid ? <h1>invalid details</h1> : <></>}
          </form>
        </>
      )}
    </div>
  );
}
