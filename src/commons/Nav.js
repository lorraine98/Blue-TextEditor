import { request } from "../utils/api.js"
import { push } from "../utils/router.js"

export default function Nav({ $target, initialState, postNewDocument, deleteDocument }) {
    const $navContainer = document.createElement('div')
    $navContainer.className = 'nav-container'
    $target.appendChild($navContainer)

    $navContainer.innerHTML = `
        <div>
            <h1 class="logo">Text Editor</h1>
            <button class="new-post-btn">new post</button>
        </div>
    `
    const $docContainer = document.createElement('div')
    $docContainer.className = 'doc-container'
    $navContainer.appendChild($docContainer)

    const onClick = async (e) => {
        const $doc = e.target.closest('.nav-document')
        const $parentDoc = $doc?.parentNode;
        const id = +$doc?.dataset?.id;
        const parentId = +$parentDoc?.dataset?.id;

        if (e.target.matches(".new-post-btn")) {
            const document = await postNewDocument()
            this.appendDocumentToRoot(document)
        }
        else if (e.target.matches(".add-btn")) {
            const document = await postNewDocument(id)
            this.appendDocumentToParent(id, document)
        }
        else if (e.target.matches(".logo")) {
            push(`/`)
        }
        else if (e.target.matches(".nav-document")) {
            push(`/documents/${id}`)
        }
        else if (e.target.matches(".delete-btn")) {
            this.removeDocument(parentId, id);
        }
    }

    $navContainer.addEventListener('click', onClick)

    this.state = initialState

    this.setState = nextState => {
        this.validateState(nextState);
        this.state = { ...this.state, ...nextState }
        this.render()
    }

    this.validateState = state => {
        if (state?.documents && !Array.isArray(state.documents)) {
            throw new Error(`documents must be an array`)
        }
        if (Array.isArray(state.documents)) {
            state.documents.forEach(doc => this.validateDocument(doc))
        }
    }

    this.validateDocument = (document) => {
        if (typeof document?.id !== 'number') {
            throw new Error(`id must be a number::${document?.id}`)
        }
        if (document?.title != null && typeof document?.title !== 'string') {
            throw new Error(`title must be a string::${typeof document?.title}`)
        }
        if (!Array.isArray(document?.documents)) {
            throw new Error(`documents must be an array`)
        }
    }

    this.removeDocument = (parentId, docId) => {
        const parentDoc = findDocumentById(this.state.documents, parentId)
        if (parentDoc) {
            parentDoc.documents = parentDoc.documents.filter(doc => doc.id !== docId)
        } else {
            this.state.documents = this.state.documents.filter(doc => doc.id !== docId)
        }
        this.setState({ documents: [...this.state.documents] });
        deleteDocument(docId)
    }

    this.appendDocumentToRoot = (document) => {
        this.setState({ documents: [...this.state.documents, document] })
    }

    this.appendDocumentToParent = (parentId, document) => {
        const parentDoc = findDocumentById(this.state.documents, parentId)
        if (parentDoc) {
            parentDoc.documents = [...parentDoc.documents, document]
        }
        this.setState({ documents: [...this.state.documents] })
    }

    this.render = () => {
        $docContainer.innerHTML = ``
        renderDocs($docContainer, this.state.documents)
    }

    this.render()

    const fetchDocs = async () => {
        const documents = await request('/documents')

        this.setState({ documents })
    }

    fetchDocs()

}



function findDocumentById(rootDocuments, id) {
    const doc = rootDocuments.find(doc => doc.id === id)
    if (doc) {
        return doc;
    }
    for (const doc of rootDocuments) {
        const subDoc = findDocumentById(doc.documents, id)
        if (subDoc) return subDoc;
    }
    return null;
}

function renderDocs(parentDoc, currentDoc, depth = 0) {
    if (!Array.isArray(currentDoc)) {
        return;
    }
    currentDoc.forEach(doc => {
        const $docElement = document.createElement('div')
        $docElement.style.paddingLeft = `${depth * 8}px`
        $docElement.classList.add("nav-document");

        const $deleteBtn = document.createElement('button')
        $deleteBtn.textContent = "delete"
        $deleteBtn.classList.add('delete-btn')

        const $addBtn = document.createElement('button')
        $addBtn.textContent = "add"
        $addBtn.classList.add('add-btn')

        const { id, title, documents: nextDoc } = doc
        $docElement.dataset.id = id
        $docElement.textContent = title
        parentDoc.appendChild($docElement)
        $docElement.appendChild($deleteBtn)
        $docElement.appendChild($addBtn)
        renderDocs($docElement, nextDoc, depth + 1)
    })
}
