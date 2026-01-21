// DOM Elements
const list = document.getElementById("contactList");
const help = document.getElementById("helpText");
const box = document.getElementById("detailsBox");
const nameTitle = document.getElementById("dNameTitle");
const numDisp = document.getElementById("dNumber");
const emailDisp = document.getElementById("dEmail");

const modal = document.getElementById("modalOverlay");
const nameInput = document.getElementById("modalName");
const emailInput = document.getElementById("modalEmail");
const numberInput = document.getElementById("modalNumber");

document.getElementById("openAddBtn").onclick=()=>{
    editIndex=-1;
    modal.style.display="flex";
    nameInput="";emailInput="";numberInput="";
};
document.getElementById("modalSaveBtn").onclick=() =>{
    let name=nameInput.value.trim();
    let email=emailInput.value.trim();
    let phone=numberInput.value.trim();
    if(!name||!email||!phone){
        alert("all fields required");
        return;
    }
    let phonepattern=/^[6-9]\D{9}$/;
    if(!phonepattern.test(phone)){
        alert("phone number must be starts with 6,7,8,9");
        return;
    }
    

};
document.getElementById("modalCancelBtn").onclick=()=>{
    modal.style.display="none";
};
