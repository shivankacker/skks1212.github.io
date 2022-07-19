const saveUserForm = (event) => {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let dob = document.getElementById("dob").value;
    let acceptTermsAndConditions = document.getElementById("tnc").checked;

    const userDetails = {
        name,
        email,
        password,
        dob,
        acceptTermsAndConditions,
    };

    let userEntries = JSON.parse(localStorage.getItem("user-entries")) || [];
    userEntries.push(userDetails);
    document.getElementById("user_form").reset();
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    printResponses();
   
}

const printResponses = () => {
    const response_wrap = document.getElementById("responses");
    response_wrap.innerHTML = "";
    const responses = JSON.parse(localStorage.getItem("user-entries")) || [];
    responses.forEach((response, i)=> {
        response_wrap.innerHTML += `
            <div class="mb-7">
                ${i+1} ----
                <br>
                Name : ${response.name}
                <br>
                Email : ${response.email}
                <br>
                Password : ${response.password}
                <br>
                DOB : ${response.dob}
            </div>
        `;
    })
}

const validateDOB = (dob_string) => {
    const now_unix = Math.round(Date.now()/1000);
    const dob_unix = Math.round((new Date(dob_string)).getTime()/1000);
    const difference = now_unix - dob_unix;

    const y18 = 567648000;
    const y55 = 1734480000;

    return difference < y55 && difference > y18
}

let form = document.getElementById("user_form");
form.addEventListener("submit", saveUserForm, true);
window.addEventListener("load", printResponses, true);
document.getElementById("dob").addEventListener("change", ()=>{
    const dob_element = document.getElementById("dob");
    if(!validateDOB(dob_element.value)){
        dob_element.setCustomValidity("You have to be between the age of 18 and 55");
        dob_element.reportValidity();
        return;
    }else{
        dob_element.setCustomValidity("");
    }
}, true)
