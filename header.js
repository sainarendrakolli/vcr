// script.js (No changes needed for this specific request)

document.addEventListener('DOMContentLoaded', function() {
    // --- Theme Toggle Functionality ---
    const themeToggleSlider = document.getElementById('theme-toggle');
    const body = document.body;

    const applyTheme = (isDarkMode) => {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            if (themeToggleSlider) {
                themeToggleSlider.setAttribute('aria-checked', 'true');
                themeToggleSlider.setAttribute('aria-label', 'Switch to light mode');
            }
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (themeToggleSlider) {
                themeToggleSlider.setAttribute('aria-checked', 'false');
                themeToggleSlider.setAttribute('aria-label', 'Switch to dark mode');
            }
            localStorage.setItem('theme', 'light');
        }
    };

    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else if (prefersDarkMode) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }

    if (themeToggleSlider) {
        themeToggleSlider.addEventListener('click', () => {
            const isCurrentlyDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isCurrentlyDarkMode);
        });
    }

    // --- Mega Menu Functionality ---
    const megaDropdownWrappers = document.querySelectorAll('.nav-item.dropdown-mega-wrapper');
    const megaDropdownToggles = document.querySelectorAll('.mega-dropdown-toggle');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarContent');

    if (window.innerWidth >= 992) {
        megaDropdownWrappers.forEach(wrapper => {
            let timeoutId;

            wrapper.addEventListener('mouseenter', function() {
                clearTimeout(timeoutId);
                megaDropdownWrappers.forEach(otherWrapper => {
                    if (otherWrapper !== wrapper) {
                        otherWrapper.classList.remove('show');
                    }
                });
                this.classList.add('show');
            });

            wrapper.addEventListener('mouseleave', function() {
                timeoutId = setTimeout(() => {
                    this.classList.remove('show');
                }, 150);
            });

            const megaMenu = wrapper.querySelector('.dropdown-mega-menu');
            if (megaMenu) {
                megaMenu.addEventListener('mouseenter', function() {
                    clearTimeout(timeoutId);
                });
                megaMenu.addEventListener('mouseleave', function() {
                    timeoutId = setTimeout(() => {
                        wrapper.classList.remove('show');
                    }, 150);
                });
            }
        });
    }

    megaDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.innerWidth < 992) {
                event.preventDefault();
                event.stopPropagation();

                const megaWrapper = this.closest('.dropdown-mega-wrapper');

                megaDropdownWrappers.forEach(otherWrapper => {
                    if (otherWrapper !== megaWrapper) {
                        otherWrapper.classList.remove('show');
                    }
                });

                megaWrapper.classList.toggle('show');
            }
        });
    });

    document.addEventListener('click', function(event) {
        let clickedInsideMegaMenu = false;
        megaDropdownWrappers.forEach(wrapper => {
            if (wrapper.contains(event.target)) {
                clickedInsideMegaMenu = true;
            }
        });

        if (!clickedInsideMegaMenu) {
            megaDropdownWrappers.forEach(wrapper => {
                wrapper.classList.remove('show');
            });
        }
    });

    navbarToggler.addEventListener('click', function() {
        megaDropdownWrappers.forEach(wrapper => {
            wrapper.classList.remove('show');
        });
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            megaDropdownWrappers.forEach(wrapper => {
                wrapper.classList.remove('show');
            });
        }
    });

    const bsDropdownToggles = document.querySelectorAll('.mega-dropdown-toggle[data-bs-toggle="dropdown"]');
    bsDropdownToggles.forEach(toggle => {
        const bsDropdown = bootstrap.Dropdown.getInstance(toggle);
        if (bsDropdown) {
            bsDropdown.dispose();
        }
    });
});