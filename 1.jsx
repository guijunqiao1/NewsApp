import React from "react";

function App() {
    const [a,A] = setState("");
    function fn(e) {
        console.log("e:",e);
        A(e);
        console.log("a:",a.value);
    }
    return (
        <div>
            <input type="text" value={a} onChange={(value)=>{
                A(value);
            }}/>
            <button onClick={()=>{
                console.log("a:",a.value);
            }}>click</button>
        </div>
    )
}

export default App;