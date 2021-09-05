import Nav from "./commons/Nav.js"
import LandingPage from "./components/LandingPage.js"
import DocEditPage from "./components/DocEditPage.js"
import { initRouter } from "./utils/router.js"

const getDocId = () => {
    try {
        const { pathname } = window.location;
        const [, , docId] = pathname.split('/');
        return docId;
    } catch (error) {
        console.log(error);
        return 'new';
    }
}

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
        initialState: { docId: getDocId() }
    })

    this.route = () => {
        const { pathname } = window.location;
        if (pathname === '/') {
            landingPage.setState()
        }
        else if (pathname.includes('/new')) {
            docEditPage.setState({ docId: Date.now() })
        }
        else if (pathname.includes('/documents/')) {
            docEditPage.setState({ docId: getDocId() })
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
