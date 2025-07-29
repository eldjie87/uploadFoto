import { Main } from "../pages/Main.js";

function Render(...components) {
    const section = document.createElement('section');
    section.innerHTML = ``
    components.forEach(component => {
        section.appendChild(component);
    });
    return section;
}

function navigateTo(path) {
    history.pushState({}, '', path);
    route(path);
}

function route(path) {
    const routes = {
        '/': () => Render(Main()),
        // '/upload': () => Render(About()),
        '/contact': () => Render(Contact())
    };

    const render = routes[path] || (() => Render(NotFound()));
    document.querySelector('.root').innerHTML = '';
    document.querySelector('.root').appendChild(render());
}

route(location.pathname);

window.addEventListener('popstate', () => {
    route(location.pathname);
});