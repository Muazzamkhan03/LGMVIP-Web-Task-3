const displayStudents = ()=>{
    let tableBody = document.querySelector("#students");

    if(localStorage.getItem("students")){
        Array.from(JSON.parse(localStorage.getItem("students"))).forEach((student)=>{
            let row = document.createElement("tr");
            row.innerHTML = `<td>
                                <b>${student.uname}</b> <br>
                                ${student.gender} <br>
                                <a href= "mailto: ${student.email}">${student.email}</a> <br>
                                ${student.website} <br>
                                ${student.skills.join(",")} <br>
                            </td>
                            <td id="img-data">
                                <img src="${student.img}">
                            </td>
            `
            tableBody.append(row);

        });

    }
}

displayStudents(); 

// REQUIRED COMPONENTS 

let uname = document.querySelector("#name");
let email = document.querySelector("#email");
let website = document.querySelector("#website");
let img = document.querySelector("#img");
let radios = document.querySelectorAll("input[name='gender'");
let gender;
let checkboxes = document.querySelectorAll("input[name='skills'");
let skills = [];

let enroll = document.querySelector("#enroll");
let clear = document.querySelector("#clear");



// FUNCTIONS

const getGender = ()=>{
    radios.forEach((radio)=>{
        if(radio.checked){
            gender = radio.value;
        }
    });
}

const getSkills = ()=>{
    Array.from(checkboxes).forEach((skill)=>{
        if(skill.checked){
            skills.push(skill.value);
        }
    });
}

const addToStorage = ()=>{
    if(!localStorage.getItem("students")){
        localStorage.setItem("students", "[]");
    }
    else{
        let json = JSON.parse(localStorage.getItem("students"));
        json.push({
            "uname": uname.value,
            "email": email.value,
            "website": website.value, 
            "img": img.value,
            "gender": gender, 
            "skills": skills
        });
        json = JSON.stringify(json);
        localStorage.setItem("students",json);
    }
    
}


// EVENT LISTENERS

enroll.addEventListener("click", (e)=>{
    getGender();
    getSkills();
    addToStorage();
    
    location.reload();
});

clear.addEventListener("click", (e)=>{
    location.reload();
})
