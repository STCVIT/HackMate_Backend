const auth = firebase.auth()
function signup(){
const email=document.getElementById('usp').value;
const password=document.getElementById('pp').value;

auth.createUserWithEmailAndPassword(email, password)
  .then(({user}) => {
    console.log('signed up!')
    user.getIdToken().then(function(idToken){
      console.log(idToken)
      fetch('https://c960aaf31793.ngrok.io/participant/signup',{
        method:'POST',
        headers: new Headers({
          'Authorization': 'Bearer '+ idToken
        })
      }).then((res)=>{
        console.log(res.status)
      })
       })
    user.sendEmailVerification().then(function() {
      console.log('Email has been sent!')
      })
    })
  .catch((error) => {
    console.log(error)
  });
}

function signin(){
    const email=document.getElementById('usn').value;
    const password=document.getElementById('pn').value;
    auth.signInWithEmailAndPassword(email, password)
  .then(({user}) => {
    console.log('signed in!')
   user.getIdToken().then(function(idToken){
    console.log(idToken)
   
    fetch("https://hackportalbackend.herokuapp.com/participant/login",{
      headers: new Headers({
          'Authorization': 'Bearer ' + idToken
        })
      })
    
        .then(response => console.log(response.status))
      })
})      
  .catch((error) => {
    console.log(error)
  });
}

function forgotPassword(){
// var emailAddress = "deepgandhi151@gmail.com";
// auth.sendPasswordResetEmail(emailAddress).then(function() {
//   // Email sent.
// }).catch(function(error) {
//   // An error happened.
// });

//check reset password

var user = firebase.auth().currentUser;
var newPassword = getASecureRandomPassword();

user.updatePassword(newPassword).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
});

}

// function abc(){
//   fetch("https://cd8ca327978d.ngrok.io/")
//       .then(response => response.json())
//       .then(json => {
//           console.log(json);
//           console.log(json.status)
//       })
 
// .catch((error) => {
//   console.log(error)
// });
// }

const url = 'https://hackportalbackend.herokuapp.com'

const postHack = () =>{
  fetch(`${url}/organiser/createHack`,{
    method:"POST",
    headers:new Headers({
      'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNDMyMDRhMTc5MTVlOGJlN2NjZDdjYjI2NGRmNmVhMzgzYzQ5YWIiLCJ0eXAiOiJKV1QifQ.eyJvcmdhbmlzZXIiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9oYWNrcG9ydGFsLTQ1MGQwIiwiYXVkIjoiaGFja3BvcnRhbC00NTBkMCIsImF1dGhfdGltZSI6MTYyNjE4MjA5MiwidXNlcl9pZCI6ImltaUxLblZsNVNOcmRqdTZxeFZHSVEzM1lvMDMiLCJzdWIiOiJpbWlMS25WbDVTTnJkanU2cXhWR0lRMzNZbzAzIiwiaWF0IjoxNjI2MTgyMDkyLCJleHAiOjE2MjYxODU2OTIsImVtYWlsIjoiZGVlcHNhbWlyLmdhbmRoaTIwMjBAdml0c3R1ZGVudC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlZXBzYW1pci5nYW5kaGkyMDIwQHZpdHN0dWRlbnQuYWMuaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.KJ642Blh1YJ5DgW6ZgPRIZxHZ4oBrnLLOt6_cuQCuD-_AUWVmpsAar34qz83BBdCayUwnUufAm92DYlCS5cKqpZSZwVQ2WLSV0xsXpBdWfIwjvF1AuXTVPyCKnWQAOJVJEicmUbcF4opmO0Us_VhTuu6B1eFpNT6e-Cgde__2avWrboFmtoA7spscBM3UZBfZWkiFXhLfDa1grSrx8SsvRJ0hcVJNRbM1XEAc5Kj8t1mGjF50GB4CWhbN4c87H9d6u14d_xdqxkH2AaQmlJt1Kmg9CcFAfBcfihrEYuxfh-hGilslGPqopXElfFA4u6qTIyPHQb_5Qm0mtc-jLrJ_w'
    }),
    body:{
      "name": "testing 101",
    "venue": "VIT",
    "start": "2021-06-13",
    "end": "2021-06-14",
    "description": "aGV5",
    "max_team_size": 4,
    "mode_of_conduct":"Offline",
    "prize_pool":100000,
    "website":"google.com"
    }
  }).then((res)=>res.json())
  .then((data)=>console.log(data))
  .catch((e)=>console.error(e))
}

