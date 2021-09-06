import Nav from "./commons/Nav.js"
import LandingPage from "./components/LandingPage.js"
import DocEditPage from "./components/DocEditPage.js"
import { initRouter } from "./utils/router.js"


export default function App({ $target }) {
    new Nav({
        $target,
        initialState: []
    })

    const $doc = document.createElement('div')
    $doc.className = "doc"
    $target.appendChild($doc)

    const landingPage = new LandingPage({
        $target: $doc
    })

    const docEditPage = new DocEditPage({
        $target: $doc,
        initialState: { docId: getDocIdByCurUrl() }
    })

    this.route = () => {
        const { pathname } = window.location;
        if (pathname === '/') {
            landingPage.render()
        }
        //TODO:change
        else if (pathname.includes('/new')) {
            docEditPage.setState()
        }
        else if (pathname.includes('/documents/')) {
            docEditPage.setState({ docId: getDocIdByCurUrl() })
        }
        else {
            alert('404 Not Found')
        }
    };

    window.addEventListener('popstate', () => {
        this.route()
    })

    this.route();
    initRouter(() => this.route());
}
