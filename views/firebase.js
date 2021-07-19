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
  fetch(`https://hackportalbackend.herokuapp.com/organiser/createHack`,{
    method:"POST",
    headers:new Headers({
      'Content-Type': 'application/json',
      'Authorization':'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhmNDMyMDRhMTc5MTVlOGJlN2NjZDdjYjI2NGRmNmVhMzgzYzQ5YWIiLCJ0eXAiOiJKV1QifQ.eyJvcmdhbmlzZXIiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9oYWNrcG9ydGFsLTQ1MGQwIiwiYXVkIjoiaGFja3BvcnRhbC00NTBkMCIsImF1dGhfdGltZSI6MTYyNjE4NjYyNCwidXNlcl9pZCI6ImltaUxLblZsNVNOcmRqdTZxeFZHSVEzM1lvMDMiLCJzdWIiOiJpbWlMS25WbDVTTnJkanU2cXhWR0lRMzNZbzAzIiwiaWF0IjoxNjI2MTg2NjI0LCJleHAiOjE2MjYxOTAyMjQsImVtYWlsIjoiZGVlcHNhbWlyLmdhbmRoaTIwMjBAdml0c3R1ZGVudC5hYy5pbiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlZXBzYW1pci5nYW5kaGkyMDIwQHZpdHN0dWRlbnQuYWMuaW4iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ii3ihugAoLVT-AELk1jG0RCBFCKmMrwweHW-AXVRDjx2TqHF88utykUN5NOUqL6NP1iE5UpH6CW8iEdg1UJymL0KuOOpaQE1R-KqTudUDXXG1YYj-Y1YPADuxTKrYYopn_Ay1qnRG7z4d6rL88eVGIsY70wWHW3FHP7CAc_1QIQi1td-hPkznqAhRkAWhME0OpaCqo74ehs9e7S5YcO5zjZgm7O9_Gna5110_nPiY0akmoMbmHUlgLoN6Kn1XVcKhXUjKiS2rzwFa1s764HdF4copfVFPXzEz76n7j_0omc6HFSjpaIDweZ_wrFesNO1iu3XyKNUve8iskM7O9fRew'
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
  }).then((res)=>res.status)
 
  .catch((e)=>console.error(e))
}
const link = 'localhost:3000/'
const token =''

const get = () => {
fetch(link,{
  headers:new Headers({
    'Authorization':'Bearer ' + token
  })
})
}