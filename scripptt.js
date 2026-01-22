var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
var editIndex = -1; // -1 means adding new, anything else is the index we are editing

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

// Initial Load
render();

function render() {
    list.innerHTML = "";
    if (contacts.length === 0) {
        help.style.display = "block";
        box.style.display = "none";
        return;
    }
    help.style.display = "none";

    contacts.forEach((c, i) => {
        let li = document.createElement("li");
        li.innerHTML = 
           `<b style="display:block;font-size:22px;">${c.name}</b><br>
            <span style="display:block;font-size:15px;margin-top:-17px;"> ${c.number}</span><br><span style="display:block;font-size:15px;margin-top:-17px;">${c.email}</span>`;
        li.onclick = () => show(i);
        list.appendChild(li);
    });
}
     
function show(i) {
    editIndex = i;
    document.querySelectorAll("li").forEach(el => el.classList.remove("active"));
    list.children[i].classList.add("active");

    let c = contacts[i];
    box.style.display = "block";
    nameTitle.innerText = c.name;
    numDisp.innerText = c.number;
    emailDisp.innerText = c.email;
}

// Open Modal for New Contact
document.getElementById("openAddBtn").onclick = () => {
    editIndex = -1;
    document.getElementById("modalTitle").innerText = "Add Contact";
    modal.style.display = "flex";
    nameInput.value = ""; emailInput.value = ""; numberInput.value = "";
};

// Open Modal for Edit
document.getElementById("editBtn").onclick = () => {
    let c = contacts[editIndex];
    document.getElementById("modalTitle").innerText = "Edit Contact";
    modal.style.display = "flex";
    nameInput.value = c.name;
    emailInput.value = c.email;
    numberInput.value = c.number;
};

// Delete Contact
document.getElementById("deleteBtn").onclick = () => {
    if (confirm("Delete this contact?")) {
        contacts.splice(editIndex, 1);
        updateStorage();
        box.style.display = "none";
        render();
    }
};

// Save Contact (Add or Edit)
document.getElementById("modalSaveBtn").onclick = () => {
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let phone = numberInput.value.trim();

    // 1. Check all fields required
    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }
    console.log((localStorage.getItem("contacts")));
    console.log(JSON.parse(localStorage.getItem("contacts")));

    // 2. Phone validation: Starts with 6,7,8,9 and 10 digits
    let phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone must start with 6, 7, 8, or 9 and be 10 digits long.");
        return;
    }

    // 3. Duplicate Phone Check
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
    if (editIndex !== -1) show(editIndex); // Keep details open if editing
};

document.getElementById("modalCancelBtn").onclick = () => modal.style.display = "none";

function updateStorage() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}