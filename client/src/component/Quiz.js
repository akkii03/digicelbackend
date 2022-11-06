import React, { useEffect, useState,CSSProperties } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


export default function Quiz() {
  const [ques, setQues] = useState();
  const [loading,setLoading] = useState(true)
  const [Qnumber,setQnumber] = useState(1)
  const [index,setIndex] = useState(0)
  const [level,setLevel] = useState(5);
  const [complete,setComplete] = useState(false)
  const [count,setCount] = useState(0)

  
  

  function nextQues() {

    const ans = document.querySelector("input[name=ans]:checked").value;


    if(ans==ques[index].ans) {
       setLevel(level+1)
       setCount(count+1)

    }else{
      if(level>1) setLevel(level-1)
      setCount(count-1)
    }
    setIndex(index+1)
    setQnumber(Qnumber+1) 
    if(Qnumber>=10) {
      setComplete(true)
    }
    
  }

  function prevQues() {
    const ans = document.querySelector("input[name=ans]:checked").value;
   
      if(level>1) setLevel(level-1)
    
    if(index>0){
      setIndex(index-1)
      setQnumber(Qnumber-1)
    }
    if(Qnumber<10) {
      setComplete(false);
    }
   
  }

  function logout() {
    sessionStorage.clear();
    window.location.href = '/user';
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      axios
      .get("https://digicelserver.herokuapp.com/user/ques")
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
      loading?(<ClipLoader
        aria-label="Loading Spinner"
        size={250}
        data-testid="loader"
      />):(
        <div class="col-md">
            <>
            {
              index>=10 ?(
                <>
          <h1>Your score is {count} out of 10 </h1>
          </>
              ):(
                <div class="card-body">
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
                </div>
              )
            }
           
        
     
        
      </>
        </div>
      
           
          
        
      )
     }
    </div>
  );
}
