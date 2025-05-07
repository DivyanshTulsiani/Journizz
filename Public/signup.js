let url = "https://journizz.onrender.com"


async function login() {
  username = document.getElementById("username").value
  password = document.getElementById("password").value

  try{
    const response = await fetch(`${url}/signin`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })

    if(response.ok){
      alert("You are signed up")
      const data = await response.json()
      // console.log(data.token)
      localStorage.setItem("token",data.token)

      //ab iske baad user ko redirect kro main site tho uske liye we use window href

      window.location.href = "/dashboard.html"
    }
    else{
      const data = await response.json()
      alert(data.message)
    }

  }
  catch(e){
    alert("Please check your credentials")
  }
}
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
      try{
        await login()
      }
      catch(e){

      }
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