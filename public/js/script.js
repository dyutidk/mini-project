function signUpValidation(){

    var username=document.getElementById("username").value;
    var password=document.getElementById("pass").value;
    var confpass=document.getElementById("cpass").value;
    var email=document.getElementById("email").value;
    var phno=document.getElementById("phno");
    if(username_valid(username,8,12)){
        if(password_valid(password,confpass,8,12)){
            if(email_valid(email)){
                if(phno_valid(phno)){
                    return true;
                }
           
            }
        }

    }
    
    return false;
    

}
function username_valid(uname,min,max){
    var len=uname.length;
    if(len>max||len<min){
        alert("Username length should be between "+min+" to "+max+" characters");
        return false;
    }
    return true;
}
function password_valid(pass,cpass,min,max){
    var passLen=pass.length;
    if(passLen>max||passLen<min){
        alert("Username length should be between "+min+" to "+max+" characters");
        return false;
    }
    if(pass!=cpass){
        alert("Password mismatch.Please confirm the password once more.");
        return false;
    }
    return true;
}
function email_valid(email){
    var mailformat= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
        return true;
    }
    else{
        alert("You have entered an invalid email address!");
        email.focus();
        return false;
    }
}
function phno_valid(ph){
    if(ph.value.length==10){
        //phoneFormat=/(6|7|8|9)\d{9}/;
        //if(ph.mat(phoneFormat)){
            return true;
    }
    else{
        alert("Invalid phone number!");
        return false;
    }
  
   
}
function signInValidation(){
    var username=document.signinForm.username;
    var pass=document.signinForm.password;
    if(username_valid(username,8,12)){
        if(pass_valid(pass,8,12)){
            if(auth_valid(username,password)){
                return true;
            }
        }

    }
}
function pass_valid(pass,min,max){
    var passLen=pass.length;
    if(passLen>max||passLen<min){
        alert("Passwords are "+min+" to "+max+" characters long");
        return false;
    }

}