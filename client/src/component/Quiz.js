import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Quiz() {
  const [ques, setQues] = useState();
  const [loading,setLoading] = useState(true)
  const [Qnumber,setQnumber] = useState(1)
  const [index,setIndex] = useState(0)
  const [level,setLevel] = useState(5);
  
  

  function nextQues() {

    const ans = document.querySelector("input[name=ans]:checked").value;


    if(ans==ques[index].ans) {
      if(level<10) setLevel(level+1)

    }else{
      if(level>1) setLevel(level-1)
    }
    setIndex(index+1)
  
    
  }

  function prevQues() {
    const ans = document.querySelector("input[name=ans]:checked").value;
    if(ans==ques[index].ans) {
      if(level<10) setLevel(level+1)

    }else{
      if(level>1) setLevel(level-1)
    }
    if(index>0)setIndex(index-1)
  }

  function logout() {
    sessionStorage.clear();
    window.location.href = '/user';
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      axios
      .get("http://localhost:8080/user/ques")
      .then((res) => {setQues(res.data)
      setLoading(false);
      });
    }else{
      window.location.href = '/user'
    }
   
  }, []);
  console.log(ques);
  return (
    <div>
      <nav>
        
          <button className="btn btn-warning" onClick={logout}>Logout</button>
        
      </nav>
      <h1>Quiz</h1>
     {
      loading?("loading..."):(
            <>
              <h3>
                Question {Qnumber} of 10
                <span>
                  {" "}
                  ( Diffculty level <span class="badge bg-secondary">{level}</span> )
                </span>
              </h3>
              <br></br>
              <h5>{ques[index].ques}</h5>
              <div className="options">
                <label className="optionValue">
                 {ques[index].option1}
                  <input
                    type="radio"
                    value={ques[index].option1}
                    name="ans"
                  />
                </label>
                <label className="optionValue">
                {ques[index].option2}
                  <input
                    type="radio"
                    value={ques[index].option2}
                    name="ans"
                  />
                </label>
                <label className="optionValue">
                {ques[index].option3}
                  <input
                    type="radio"
                    value={ques[index].option3}
                    name="ans"
                  />
                </label>
                <label className="optionValue">
                {ques[index].option4}
                  <input
                    type="radio"
                    value={ques[index].option4}
                    name="ans"
                  />
                </label>
              </div>
              <button className="btn btn-danger" onClick={prevQues}>prev</button>
              <button className="btn btn-success" onClick={nextQues}>next</button>
              
            </>
          
        
      )
     }
    </div>
  );
}
