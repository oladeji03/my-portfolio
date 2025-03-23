document.addEventListener("DOMContentLoaded", function() {
    let sections = document.querySelectorAll("section");

    function reveal() {
        sections.forEach((section) => {
            let top = section.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;
            if (top < windowHeight - 100) {
                section.style.opacity = "1";
                section.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", reveal);
    reveal(); // Run the function on page load

    // Form submission logic for Formspree
    let form = document.querySelector("form");

    if (form) { // Ensure the form exists before adding event listener
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission
            
            let formData = new FormData(form);
            let jsonData = {};
            
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch(form.action, {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }).then(response => {
                if (response.ok) {
                    alert("Message sent successfully!");
                    form.reset();
                } else {
                    alert("Error sending message. Please try again.");
                }
            }).catch(error => {
                alert("Something went wrong. Check your internet connection.");
            });
        });
    }
});