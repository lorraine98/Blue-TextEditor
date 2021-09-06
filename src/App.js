import Nav from "./commons/Nav.js"
import LandingPage from "./components/LandingPage.js"
import DocEditPage from "./components/DocEditPage.js"
import { initRouter, push } from "./utils/router.js"
import { getDocIdByCurUrl, postDocument } from "./utils/api.js"


export default function App({ $target }) {
    new Nav({
        $target,
        initialState: [],
        postNewDocument: (parentId) => this.postNewDocument(parentId)
    })

    const $doc = document.createElement('div')
    $doc.className = "doc"
    $target.appendChild($doc)

    const landingPage = new LandingPage({
        $target: $doc,
        postNewDocument: () => this.postNewDocument(null)
    })

    const docEditPage = new DocEditPage({
        $target: $doc,
        initialState: { docId: getDocIdByCurUrl() }
    })

    this.postNewDocument = async (parentId) => {
        const { id, title } = await postDocument(parentId);
        push(`/documents/${id}`)
    }

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
