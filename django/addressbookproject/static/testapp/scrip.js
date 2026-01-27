document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modalOverlay");
    const detailsBox = document.getElementById("detailsBox");
    const helpText = document.getElementById("helpText");

    // Select the form by ID (matches the change made in step 1)
    const contactForm = document.getElementById("contactForm");

    const nameInput = document.getElementById("modalName");
    const emailInput = document.getElementById("modalEmail");
    const numberInput = document.getElementById("modalNumber");
    const studentIdInput = document.getElementById("student_id");

    window.showDetails = function(name, number, email, id) {
        if(helpText) helpText.style.display = "none";
        if(detailsBox) detailsBox.style.display = "block";

        document.getElementById("dNameTitle").innerText = name;
        document.getElementById("dNumber").innerText = number;
        document.getElementById("dEmail").innerText = email;
        document.getElementById("deleteLink").href = "/delete/" + id + "/";

        document.getElementById("editBtn").onclick = () => {
            document.getElementById("modalTitle").innerText = "Edit Contact";
            studentIdInput.value = id;
            nameInput.value = name;
            emailInput.value = email;
            numberInput.value = number;
            modal.style.display = "flex";
        };
    };

    document.getElementById("openAddBtn").onclick = () => {
        document.getElementById("modalTitle").innerText = "Add Contact";
        studentIdInput.value = "";
        nameInput.value = "";
        emailInput.value = "";
        numberInput.value = "";
        modal.style.display = "flex";
    };

    // --- UPDATED VALIDATION LOGIC ---
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const phone = numberInput.value.trim();
            const currentId = studentIdInput.value;

            // 1. Check Name and Email
            if (!name || !email) {
                alert("Name and Email fields cannot be left empty!");
                e.preventDefault();
                return false;
            }

            // 2. Check Phone empty
            if (!phone) {
                alert("All fields are required! Please enter a phone number.");
                e.preventDefault();
                return false;
            }

            // 3. Phone Format
            let phonePattern = /^[6-9]\d{9}$/;
            if (!phonePattern.test(phone)) {
                alert("Phone must start with 6, 7, 8, or 9 and be exactly 10 digits long.");
                e.preventDefault();
                return false;
            }

            // 4. Duplicate Check
            const existingNumbers = document.querySelectorAll("#contactList li span:nth-of-type(1)");
            let isDuplicate = false;

            existingNumbers.forEach(span => {
                const parentLi = span.closest('li');
                // Be careful with the quotes in the onclick string comparison
                const onclickAttr = parentLi.getAttribute('onclick');
                const isCurrentlyEditingThis = currentId && onclickAttr.includes(currentId);

                if (span.innerText.trim() === phone && !isCurrentlyEditingThis) {
                    isDuplicate = true;
                }
            });

            if (isDuplicate) {
                alert("This phone number is already saved!");
                e.preventDefault();
                return false;
            }

            return true;
        });
    }

    document.getElementById("modalCancelBtn").onclick = () => {
        modal.style.display = "none";
    };
});


