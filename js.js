// Load saved contacts
var contacts = JSON.parse(localStorage.getItem("contacts")) || [];

// Elements
var list = document.getElementById("contactList");
var helpText = document.getElementById("helpText");
var detailsBox = document.getElementById("detailsBox");
var dName = document.getElementById("dName");
var dNumber = document.getElementById("dNumber");
var dEmail = document.getElementById("dEmail");

var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");

var modalOverlay = document.getElementById("modalOverlay");
var modalName = document.getElementById("modalName");
var modalNumber = document.getElementById("modalNumber");
var modalEmail = document.getElementById("modalEmail");
var modalSaveBtn = document.getElementById("modalSaveBtn");
var modalCancelBtn = document.getElementById("modalCancelBtn");
var openAddBtn = document.getElementById("openAddBtn");

var selectedIndex = null;
var isEditMode = false;

renderContacts();

// Add
openAddBtn.onclick = function () {
    isEditMode = false;
    modalName.value = "";
    modalNumber.value = "";
    modalEmail.value = "";
   modalOverlay.style.display = "flex";
};

// Cancel
modalCancelBtn.onclick = function () {
    modalOverlay.style.display = "none";
};

// Save
modalSaveBtn.onclick = function () {
    var name = modalName.value.trim();
    var number = modalNumber.value.trim();
    var email = modalEmail.value.trim();

    if (!name || !number || !email) {
        alert("All fields required");
        return;
    }

    if (!/^\d{10}$/.test(number)) {
        alert("Phone must be 10 digits");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email");
        return;
    }

    for (var i = 0; i < contacts.length; i++) {
        if (isEditMode && i === selectedIndex) continue;

        if (contacts[i].number === number) {
            alert("Phone already exists");
            return;
        }
        if (contacts[i].email === email) {
            alert("Email already exists");
            return;
        }
    }

    if (isEditMode) {
        contacts[selectedIndex] = { name, number, email };
    } else {
        contacts.push({ name, number, email });
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
    modalOverlay.style.display = "none";
    renderContacts();
};

// Edit
editBtn.onclick = function () {
    isEditMode = true;
    var c = contacts[selectedIndex];
    modalName.value = c.name;
    modalNumber.value = c.number;
    modalEmail.value = c.email;
    modalOverlay.style.display = "flex";
};

// Delete
deleteBtn.onclick = function () {
    if (confirm("Delete contact?")) {
        contacts.splice(selectedIndex, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        selectedIndex = null;
        renderContacts();
        clearDetails();
    }
};

// Render list
function renderContacts() {
    list.innerHTML = "";
    contacts.forEach(function (c, i) {
        var li = document.createElement("li");
        li.innerText = c.name;

        if (i === selectedIndex) li.classList.add("active");

        li.onclick = function () {
            showDetails(i);
        };

        list.appendChild(li);
    });
}

// Show details ONLY on click
function showDetails(i) {
    selectedIndex = i;

    document.querySelectorAll("li").forEach(li => li.classList.remove("active"));
    list.children[i].classList.add("active");

    var c = contacts[i];
    helpText.style.display = "none";
    detailsBox.style.display = "block";
    dName.innerText = c.name;
    dNumber.innerText = c.number;
    dEmail.innerText = c.email;
    editBtn.disabled = false;
    deleteBtn.disabled = false;
}

// Clear
function clearDetails() {
    helpText.style.display = "block";
    detailsBox.style.display = "none";
    editBtn.disabled = true;
    deleteBtn.disabled = true;
}


