let url = "http://localhost:3000"
async function signup() {
  let username = document.getElementById("username").value
  let password = document.getElementById("password").value
  let email = document.getElementById("email").value
  let name = document.getElementById("name").value

  try{
    const response = await fetch(`${url}/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        username: username
      })

    })
    if(response.ok){
      alert("You are signed up")
    }
    else{
      const data = await response.json()
      const message = data.message
      alert(message);
    }

  }
  catch(e){
    console.log(e)
  }
}