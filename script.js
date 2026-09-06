document.addEventListener("DOMContentLoaded", () => {
    // Reveal Animations
    const animatedElements = document.querySelectorAll(".card, .project-card, .edu-card, section h2");

    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    animatedElements.forEach(el => observer.observe(el));

    // Skill Tab Filtering Logic
    const tabBtns = document.querySelectorAll(".tab-btn");
    const skillCards = document.querySelectorAll(".skills-grid .card");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-category");

            skillCards.forEach(card => {
                const categories = card.getAttribute("data-category");
                if (filter === "all" || categories.includes(filter)) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });

    // Smooth Scroll Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Modal Display Logic
    const phytoCard = document.getElementById("phyto-card");
    const phytoModal = document.getElementById("phyto-modal");
    const closeBtn = document.getElementById("modal-close-btn");

    if (phytoCard && phytoModal && closeBtn) {
        phytoCard.addEventListener("click", () => {
            phytoModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });

        const closeModal = () => {
            phytoModal.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        closeBtn.addEventListener("click", closeModal);

        phytoModal.addEventListener("click", (e) => {
            if (e.target === phytoModal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && phytoModal.classList.contains("active")) {
                closeModal();
            }
        });
    }
});