document.addEventListener("DOMContentLoaded", _ => {
    gacelaLogoColor();
});

function gacelaLogoColor() {
    let gacelaLogo = document.querySelector('#gacela-logo-head svg g');
    if (gacelaLogo !== null) {
        let svgColor = localStorage.theme !== 'dark' ? '#123456' : '#b8b8b8';
        gacelaLogo.setAttribute('stroke', svgColor);
    }
}

window.toDarkMode = function () {
    localStorage.theme = "dark";
    localStorage.setItem('preference-theme', "theme-dark");
    window.updateTheme();
}

window.toLightMode = function () {
    localStorage.theme = "light";
    localStorage.setItem('preference-theme', "theme-light");
    window.updateTheme();
}

function updateTheme() {
    switch (localStorage.theme) {
        case 'dark':
            document.documentElement.classList.add('theme-dark');
            document.documentElement.setAttribute('color-theme', 'dark');
            addDynamicallyCssHighlightTheme('dark');
            break;

        default:
            document.documentElement.classList.remove('theme-dark');
            document.documentElement.setAttribute('color-theme', 'light');
            addDynamicallyCssHighlightTheme('light');
            break;
    }

    gacelaLogoColor();
}

function addDynamicallyCssHighlightTheme(theme) {
    const head = document.querySelector('head');

    const oldTheme = document.querySelector('.highlight_theme') ?? null;
    if (oldTheme !== null) {
        head.removeChild(oldTheme);
    }

    const style = document.createElement('link');
    style.classList.add('highlight_theme');
    style.href = `/syntax-theme-${theme}.css`;
    style.type = 'text/css';
    style.rel = 'stylesheet';
    head.append(style);
}

updateTheme();
