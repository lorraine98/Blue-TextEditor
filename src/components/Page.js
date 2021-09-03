import Editor from "./Editor.js";
import LandingPage from "./LandingPage.js";

export default function Page({ $target, initialState }) {

    const $page = document.createElement('div')
    $page.className = 'page'
    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $target.appendChild($page)
    }

    this.render()

    new Editor({
        $target: $page
    })

    new LandingPage({
        $target: $page
    })
}