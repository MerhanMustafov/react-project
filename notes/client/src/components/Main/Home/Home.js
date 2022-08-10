import {useState} from 'react';

function Home(){
  const [input, setInput] = useState('')

  function inputHandler(){

  }
    return (
        <form >
            <div className="searchFriendBoxWrapper">
                <label htmlFor="searchFriendBoxInput" className="searchFriendBoxLabel">Find a Friend</label>
                <input type="text" id="searchFriendBoxInput" placeholder="Type name" onChange={(e) => setInput(e.target.value)}/>

            </div>
        </form>
    )
};

export {Home};