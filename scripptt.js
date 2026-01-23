var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
var editIndex = -1;

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

render();

function render() {
    list.innerHTML = "";
    if (contacts.length === 0) {
        help.style.display = "block";
        box.style.display = "none";
        return;
    }
    
    contacts.forEach((c, i) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <b style="display:block;font-size:20px;">${c.name}</b>
            <span style="color:#666; font-size:14px;">${c.number}</span><br>
            <span style="color:#666; font-size:14px;">${c.email}</span>`;
        li.onclick = () => show(i);
        list.appendChild(li);
    });
}

function show(i) {
    editIndex = i;
    document.querySelectorAll("li").forEach(el => el.classList.remove("active"));
    list.children[i].classList.add("active");

    let c = contacts[i];
    help.style.display = "none";
    box.style.display = "block";
    nameTitle.innerText = c.name;
    numDisp.innerText = c.number;
    emailDisp.innerText = c.email;
}

document.getElementById("openAddBtn").onclick = () => {
    editIndex = -1;
    document.getElementById("modalTitle").innerText = "Add Contact";
    modal.style.display = "flex";
    nameInput.value = ""; emailInput.value = ""; numberInput.value = "";
};

document.getElementById("editBtn").onclick = () => {
    let c = contacts[editIndex];
    document.getElementById("modalTitle").innerText = "Edit Contact";
    modal.style.display = "flex";
    nameInput.value = c.name;
    emailInput.value = c.email;
    numberInput.value = c.number;
};

// FIX: Delete logic now clears the view completely
document.getElementById("deleteBtn").onclick = () => {
    if (confirm("Delete this contact?")) {
        contacts.splice(editIndex, 1);
        updateStorage();
        box.style.display = "none";
        help.style.display = "block";
        render();
    }
};

document.getElementById("modalSaveBtn").onclick = () => {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = numberInput.value.trim();

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    let phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone must start with 6-9 and be 10 digits.");
        return;
    }

    let exists = contacts.some((c, i) => c.number === phone && i !== editIndex);
    if (exists) {
        alert("This phone number already exists!");
        return;
    }

    let obj = { name, email, number: phone };
    if (editIndex === -1) {
        contacts.push(obj);
    } else {
        contacts[editIndex] = obj;
    }

    updateStorage();
    modal.style.display = "none";
    render();
    
    // If we just edited, refresh the detail view
    // if (editIndex !== -1) show(editIndex);
};

document.getElementById("modalCancelBtn").onclick = () => modal.style.display = "none";

function updateStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}