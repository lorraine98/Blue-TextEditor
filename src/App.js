import Nav from "./commons/Nav.js"
import LandingPage from "./components/LandingPage.js"
import Editor from "./components/Editor.js"
import { initRouter, push } from "./utils/router.js"
import { request, getDocIdByCurUrl, postDocument, fetchDocument } from "./utils/api.js"


export default function App({ $target }) {
    const nav = new Nav({
        $target,
        initialState: { documents: [] },
        postNewDocument: (parentId) => this.postNewDocument(parentId),
        deleteDocument: (id) => this.deleteDocument(id)
    })

    const $doc = document.createElement('div')
    $doc.className = "doc"
    $target.appendChild($doc)

    const landingPage = new LandingPage({
        $target: $doc,
    })

    const editor = new Editor({
        $target: $doc
    })

    this.postNewDocument = async (parentId) => {
        const document = await postDocument(parentId);
        document.documents = document.documents ?? [];
        push(`/documents/${document.id}`)
        return document;
    }

    this.deleteDocument = async (id) => {
        await request(`/documents/${id}`, {
            method: "DELETE",
        });
        push(`/`)
    }

    this.route = async () => {
        const { pathname } = window.location;
        if (pathname === '/') {
            landingPage.render()
        }
        else if (pathname.includes('/documents/')) {
            const docId = +getDocIdByCurUrl()
            const document = await fetchDocument(docId)
            const { title, content } = document
            editor.setState({ title, content, docId })
        }
        else {
            alert('404 Not Found')
        }
    };

    window.addEventListener('popstate', () => {
        this.route()
    })

    this.route()
    initRouter(() => this.route())
}
