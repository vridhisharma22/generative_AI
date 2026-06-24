emailjs.init("Q0xALhwV3sdWXbqFH");

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-form");
    const button = document.getElementById("register-btn");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        button.textContent = "SENDING...";
        button.disabled = true;

        emailjs.sendForm(
            "service_dr4smk8",
            "template_thgl9bs",
            this
        )
        .then(() => {

            alert("Message sent successfully!");

            form.reset();

            button.textContent = "SEND MESSAGE";
            button.disabled = false;

        })
        .catch((error) => {

            console.error(error);

            alert("Failed to send message.");

            button.textContent = "SEND MESSAGE";
            button.disabled = false;
        });
    });
});
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});