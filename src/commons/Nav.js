import { request } from "../utils/api.js"
import { push } from "../utils/router.js"

export default function Nav({ $target, initialState }) {
    const $navContainer = document.createElement('div')
    $navContainer.className = 'nav-container'
    $target.appendChild($navContainer)

    const navTitle = document.createElement('h1')
    navTitle.innerHTML = `Blue Text Editor`
    $navContainer.appendChild(navTitle)

    this.state = initialState

    this.setState = nextState => {
        this.validationState(nextState);
        this.state = nextState
        this.render()
    }

    this.validationState = state => {
        if (!Array.isArray(state)) {
            throw new Error("Type must be Array")
        }
    }

    this.render = () => {
        renderDocs($navContainer, this.state)
        // $navContainer.innerHTML = ` <button class="new-post-btn">new post</button>`
    }

    this.render()

    const fetchDocs = async () => {
        const docs = await request('/documents')
        this.setState(docs)
    }

    fetchDocs()
    $navContainer.addEventListener('click', e => {
        const { id } = e.target.dataset
        if (!id) {
            push(`/`)
            return
        }
        push(`/documents/${id}`)
    })
}

function renderDocs(parentDoc, currentDoc, depth = 0) {
    if (!currentDoc) return;

    currentDoc.forEach(doc => {
        const $docElement = document.createElement('div')
        $docElement.style.paddingLeft = `${depth * 8}px`;
        $docElement.classList.add("nav-document");
        const { id, title, documents: nextDoc } = doc
        $docElement.dataset.id = id
        $docElement.textContent = title
        parentDoc.appendChild($docElement)
        renderDocs($docElement, nextDoc, depth + 1)
    })
}