const terminal = document.getElementById("terminalBody");

const terminalLines = [
    {
        command: "whoami",
        output: "Mayank Shashank Gupta"
    },
    {
        command: "role",
        output: "Aspiring DevOps Engineer"
    },
    {
        command: "stack",
        output: "AWS · Kubernetes · Docker · Terraform",
        highlight: true
    },
    {
        command: "delivery",
        output: "GitHub Actions · Jenkins · Argo CD",
        highlight: true
    },
    {
        command: "focus",
        output: "Automation · CI/CD · GitOps"
    },
    {
        command: "experience",
        output: "2 internships · hands-on projects"
    },
    {
        command: "status",
        output: "available_for_full_time = true",
        success: true
    }
];

let terminalLineIndex = 0;
let terminalCharacterIndex = 0;
let terminalHTML = "";

function typeTerminal() {

    if (!terminal) {
        return;
    }

    if (
        terminalLineIndex >=
        terminalLines.length
    ) {

        terminal.innerHTML =
            terminalHTML +
            `<div class="term-line">
                <span class="term-prompt">$</span>
                <span>_</span>
                <span class="cursor"></span>
            </div>`;

        return;
    }

    const current =
        terminalLines[terminalLineIndex];

    if (terminalCharacterIndex === 0) {

        terminalHTML +=
            `<div class="term-line">
                <span class="term-prompt">$</span>
                <span class="term-command">
                    ${current.command}
                </span>
            </div>
            <div class="term-output ${
                current.highlight
                    ? "term-highlight"
                    : ""
            } ${
                current.success
                    ? "term-success"
                    : ""
            }">`;

    }

    if (
        terminalCharacterIndex <
        current.output.length
    ) {

        terminalHTML +=
            current.output[
                terminalCharacterIndex
            ];

        terminalCharacterIndex++;

        terminal.innerHTML =
            terminalHTML +
            `<span class="cursor"></span>`;

        setTimeout(
            typeTerminal,
            18
        );

    } else {

        terminalHTML += "</div>";

        terminalCharacterIndex = 0;
        terminalLineIndex++;

        setTimeout(
            typeTerminal,
            110
        );
    }
}

typeTerminal();


const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


if (
    menuToggle &&
    navMenu
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle(
                    "open"
                );

            menuToggle.classList.toggle(
                "open",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


const navLinks = [
    ...document.querySelectorAll(
        ".nav-link"
    )
];


navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                navMenu.classList.remove(
                    "open"
                );

                menuToggle.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    }
);


const sections = [
    ...document.querySelectorAll(
        "main section"
    )
];


const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach(
        section => {

            const top =
                section.offsetTop -
                170;

            const bottom =
                top +
                section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY < bottom
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            link.classList.toggle(
                "active",
                link.getAttribute(
                    "href"
                ) ===
                `#${currentSection}`
            );

        }
    );

};


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }
            );

        },
        {
            threshold: 0.08
        }
    );


document
    .querySelectorAll(".reveal")
    .forEach(
        (element, index) => {

            element.style.transitionDelay =
                `${Math.min(index * 45, 360)}ms`;

            revealObserver.observe(
                element
            );

        }
    );


const navbar =
    document.getElementById(
        "navbar"
    );

const progress =
    document.getElementById(
        "scrollProgress"
    );


const updateScrollUI = () => {

    if (navbar) {

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 18
        );

    }


    if (progress) {

        const maxScroll =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            maxScroll > 0
                ? (
                    window.scrollY /
                    maxScroll
                ) * 100
                : 0;

        progress.style.width =
            `${Math.min(
                percentage,
                100
            )}%`;

    }

};


window.addEventListener(
    "scroll",
    updateScrollUI,
    {
        passive: true
    }
);


updateScrollUI();


const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


const projectCards = [
    ...document.querySelectorAll(
        ".project-card"
    )
];


projectCards.forEach(
    card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width
                    ) * 100;

                const y =
                    (
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height
                    ) * 100;

                card.style.setProperty(
                    "--mouse-x",
                    `${x}%`
                );

                card.style.setProperty(
                    "--mouse-y",
                    `${y}%`
                );

            }
        );

    }
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            if (navMenu) {
                navMenu.classList.remove(
                    "open"
                );
            }

            if (menuToggle) {

                menuToggle.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);


const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            navMenu
        ) {

            navMenu.classList.remove(
                "open"
            );

            if (menuToggle) {

                menuToggle.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);