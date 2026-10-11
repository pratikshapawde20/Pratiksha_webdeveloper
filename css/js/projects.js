
document.addEventListener("DOMContentLoaded", function () {

    // Mobile navigation
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );

            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open menu");
                menuToggle.textContent = "☰";
            });
        });
    }

    // Automatically update copyright year
    const year = document.getElementById("current-year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    // Filter projects
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const noResults = document.querySelector(".no-results");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedFilter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach(function (item) {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            projectCards.forEach(function (card) {
                const category = card.dataset.category;
                const shouldShow =
                    selectedFilter === "all" || category === selectedFilter;

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCount++;
                }
            });

            if (noResults) {
                noResults.hidden = visibleCount !== 0;
            }
        });
    });

    // Preselect a service on the Contact page through its URL query.
    // Example: contact.html?service=Restaurant%20website
});
