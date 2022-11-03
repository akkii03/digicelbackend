import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='mainScreen'>
      <h1>Quizz</h1>
      <div className='choose'>
        <Link to='/admin'>
            <button className='btn btn-warning btns'>
                ADMIN
            </button>
        </Link>
        <Link to='/user'>
            <button className=' btn btn-primary btns'>
                USER
            </button>
        </Link>
      </div>
    </div>
  )
}
