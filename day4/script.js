const form = document.getElementById('contactForm');
const message = document.getElementById("message");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    
        if (!name) {
            alert("Please enter your name");
            return;
        } 

        if (!validateEmail(email)) {
            alert("Please enter a valid email");
            return;
        }

        message.textContent = "Thank you for reaching out!";
        message.style.display = "block";
        form.reset();
        });

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }