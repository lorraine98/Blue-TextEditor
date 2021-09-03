import { initRouter } from "../utils/router.js"
export default function Editor({ $target, initialState }) {

    this.state = initialState



    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        const $editor = document.createElement('textarea')
        $target.appendChild($editor)
    }

    this.route = () => {
        const { pathname } = window.location;
        const splitedPath = pathname.split('/');
        if (!splitedPath.includes('new-post')) {
            return;
        }
        $target.innerHTML = ``
        this.setState()
    };

    this.route();
    initRouter(() => this.route());
}