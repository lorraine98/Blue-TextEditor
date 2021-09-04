import { initRouter, push } from "../utils/router.js"

export default function LandingPage({ $target }) {
    this.setState = nextState => {
        this.state = { ...nextState }
        this.render()
    }

    const onClick = (e) => {
        if (e.target.matches(".new-post-btn")) {
            console.log("onclick new post")
            push('new-post')
        }
    }

    $target.addEventListener('click', onClick);

    this.render = () => {
        $target.innerHTML = `
            <div class="landingpage">
                <h1>WELCOME!<h1>
                <button class="new-post-btn">new post</button>
                <p>←Select document</p>
            </div>
        `;

    }

    this.route = () => {
        const { pathname } = window.location;
        const splitedPath = pathname.split('/');
        if (!Array.isArray(splitedPath) || !splitedPath.every((path) => path === '')) {
            return;
        }
        $target.innerHTML = ``
        this.setState();
    };

    this.route();
    initRouter(() => this.route());
}