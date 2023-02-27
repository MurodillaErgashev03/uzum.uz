
const emailInput = findElement("#email");
const passwordInput = findElement("#password");
const  submitBtn = findElement("#sumbit-btn");
const  errorMessage = findElement("#error-message")


const BASE_URL = '​https://reqres.in/api/';





submitBtn.addEventListener('click', ()=>{
    
    errorMessage.textContent = '';
    passwordInput.className = 'form-control form-control-lg';
	emailInput.className = 'form-control form-control-lg';


    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(!(emailInput.value.match(mailformat))){
        errorMessage.textContent = "Email noto'g'ri formatda"
        emailInput.className   += 'error-active';
        return;
    }
    if (!(passwordInput.value.trim().length > 5)) {
		passwordInput.className += ' error-active';
		errorMessage.textContent =
			"parol minimum 5 ta harfdan iborat bo'lishi kerak";
		return;
	}
    fetch('https://reqres.in/api/register', {
        method: "post",
        body:JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value,
              
        }),
        headers:{
            'Content-Type': 'application/json'
        },

    }).then((res) => res.json()).then((res) =>{
        

        if(res.error){    
            throw new Error(res.error);
         }


        const token = res.token;
      

        localStorage.setItem('token', token);
        
        window.location.href = "../index.html";

    
    })
    .catch((err) => {
        errorMessage.textContent = "Email yoki parol xato"
    })
})