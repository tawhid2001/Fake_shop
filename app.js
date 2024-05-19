const target = document.getElementById("handle-btn").addEventListener("click",(event)=>{
    const inputVal = document.getElementById("cmnt").value;
    
    const cmnt = document.getElementById("comment-con");

    const p = document.createElement("p");
    p.classList.add("child")

    p.innerText = inputVal;

    cmnt.appendChild(p)

    document.getElementById("cmnt").value = ""

    
    const allCmnt =  document.getElementsByClassName("child");


    for(const element of allCmnt){
        element.addEventListener("click",(e)=>{
            e.target.parentNode.removeChild(element);
        })
    }
})


fetch("https://jsonplaceholder.typicode.com/users")
.then(res => res.json())
.then(data => {
    displayData(data)
})


const displayData = (userData) =>{
    const container = document.getElementById("userData-con");
    userData.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user")

        

        div.innerHTML = `
        <h4>Title</h4>
        <p>Description</p>
        <button>Details</button>
        `;
        container.appendChild(div);
    });
}

