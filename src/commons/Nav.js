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
        this.state = nextState
        this.render()
    }

    this.render = () => {
        renderPosts($navContainer, this.state)
    }

    this.render()

    const fetchPosts = async () => {
        const posts = await request('/documents')
        this.setState(posts)
    }

    fetchPosts()
    $navContainer.addEventListener('click', e => push(`/documents/${e.target.dataset.id}`))
}

function renderPosts(parentPost, currentPost, depth = 0) {
    if (!currentPost) return;

    currentPost.forEach(post => {
        const $postElement = document.createElement('div')
        $postElement.style.paddingLeft = `${depth * 8}px`;
        $postElement.classList.add("nav-document");
        const { id, title, documents: nextPost } = post
        $postElement.dataset.id = id
        $postElement.textContent = title
        parentPost.appendChild($postElement)
        renderPosts($postElement, nextPost, depth + 1)
    })
}