const auth = firebase.auth()
function signup(){
const email=document.getElementById('usp').value;
const password=document.getElementById('pp').value;

auth.createUserWithEmailAndPassword(email, password)
  .then(({user}) => {
    console.log('signed up!')
    user.getIdToken().then(function(idToken){
      console.log(idToken)
      //fetch header id token 
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
   })
    fetch("https://cd8ca327978d.ngrok.io/organiser/login",{
      method:"POST",
      headers: new Headers({
          'Authorization': 'Bearer ' + idToken
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
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