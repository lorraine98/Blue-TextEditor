import { request } from "../utils/api.js"
import { push } from "../utils/router.js"

export default function Nav({ $target, initialState, postNewDocument, deleteDocument }) {
    const $navContainer = document.createElement('div')
    $navContainer.className = 'nav-container'
    $target.appendChild($navContainer)

    $navContainer.innerHTML = `
        <div>
            <h1 class="logo">Blue Text Editor</h1>
            <button class="new-post-btn">new post</button>
        </div>
    `
    const $docContainer = document.createElement('div')
    $docContainer.className = 'doc-container'
    $navContainer.appendChild($docContainer)

    const onClick = async (e) => {
        const id = e.target.closest('.nav-document')?.dataset?.id
        if (e.target.matches(".new-post-btn")) {
            const document = await postNewDocument()
            this.setState({ documents: [...this.state.documents, document] });
        }
        else if (e.target.matches(".logo")) {
            push(`/`)
        }
        else if (e.target.matches(".nav-document")) {
            push(`/documents/${id}`)
        }
        else if (e.target.matches(".delete-post-btn")) {
            this.setState({ documents: this.state.documents.filter(doc => doc.id !== +id) });
            deleteDocument(id)
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
            throw new Error(`documents must be an array`);
        }
        if (Array.isArray(state.documents)) {
            state.documents.forEach(doc => this.validateDocument(doc));
        }
    }

    this.validateDocument = (document) => {
        if (typeof document?.id !== 'number') {
            throw new Error(`id must be a number::${document?.id}`);
        }
        if (document?.title != null && typeof document?.title !== 'string') {
            throw new Error(`title must be a string::${typeof document?.title}`);
        }
        if (!Array.isArray(document?.documents)) {
            throw new Error(`documents must be an array`);
        }
    }

    this.render = () => {
        $docContainer.innerHTML = ``;
        renderDocs($docContainer, this.state.documents)
    }

    this.render()

    const fetchDocs = async () => {
        const documents = await request('/documents')
        this.setState({ documents })
    }

    fetchDocs()

}

function renderDocs(parentDoc, currentDoc, depth = 0) {
    if (!Array.isArray(currentDoc)) {
        return;
    }
    currentDoc.forEach(doc => {
        const $docElement = document.createElement('div')
        $docElement.style.paddingLeft = `${depth * 8}px`;
        $docElement.classList.add("nav-document");

        const $deleteBtn = document.createElement('button')
        $deleteBtn.textContent = "delete"
        $deleteBtn.classList.add('delete-post-btn')

        const { id, title, documents: nextDoc } = doc
        $docElement.dataset.id = id
        $docElement.textContent = title
        parentDoc.appendChild($docElement)
        $docElement.appendChild($deleteBtn)
        renderDocs($docElement, nextDoc, depth + 1)
    })
}