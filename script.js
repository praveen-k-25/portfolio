document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(
    ".section, .hero-content, .tech-card, .project-card, .service-card"
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
        element.classList.add("reveal"); // Ensure reveal class is present
      }
    });
  };

  // Add reveal class initially to all sections for animation
  revealElements.forEach((el) => el.classList.add("reveal"));

  window.addEventListener("scroll", revealOnScroll);
  // Trigger once on load
  revealOnScroll();

  // Cursor Glow Effect
  const cursorGlow = document.querySelector(".cursor-glow");
  if (cursorGlow) {
    document.addEventListener("mousemove", (e) => {
      cursorGlow.style.left = e.clientX + "px";
      cursorGlow.style.top = e.clientY + "px";
    });
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      if (navLinks.style.display === "flex") {
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "80px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.background = "#050505";
        navLinks.style.padding = "2rem";
        navLinks.style.borderBottom = "1px solid #333";
      }
    });
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
      // Close mobile menu if open
      if (window.innerWidth <= 768 && navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      }
    });
  });

  function showNotification(message, iconName, iconColor) {
    const container = document.getElementById("notification-container");

    // Create notification element
    const notification = document.createElement("div");
    notification.classList.add("notification");

    // Create icon element
    const icon = document.createElement("i");
    icon.setAttribute("data-lucide", iconName); // 👈 change icon you want
    icon.style.color = iconColor;
    icon.style.stroke = iconColor;

    // Create text node (message)
    const textNode = document.createTextNode(" " + message);

    // Add icon + text to notification
    notification.appendChild(icon);
    notification.appendChild(textNode);

    // Now append notification to container
    container.appendChild(notification);

    // Render Lucide icons
    lucide.createIcons();

    // Remove after animation ends (3.5 sec)
    setTimeout(() => {
      notification.remove();
    }, 3500);
  }

  const FormSubmission = async (data) => {
    try {
      const response = await fetch(
        "https://project-initiate-back-ts.onrender.com/user/contact-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.success) {
        showNotification("Mail Sent Successfully", "check-check", "#19be56ff");
        document.getElementById("form-name").value = "";
        document.getElementById("form-email").value = "";
        document.getElementById("form-message").value = "";
      } else {
        showNotification(result.message, "triangle-alert", "#f59e0b");
      }
    } catch (err) {
      showNotification("Sorry, Mail Not Sent", "ban", "#dc2626");
    }
  };

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const name = document.getElementById("form-name").value;
      const email = document.getElementById("form-email").value;
      const message = document.getElementById("form-message").value;
      // Add your form submission logic here
      const data = {
        name,
        email,
        message,
      };
      FormSubmission(data);
    });
  }
});
