import { request } from "../utils/api.js"

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
}

function renderPosts(parentPost, currentPost) {
    if (!currentPost) return;

    currentPost.map(post => {
        const $postElement = document.createElement('div')
        const { id, title, documents: nextPost } = post
        $postElement.dataset.id = id
        $postElement.textContent = title
        parentPost.appendChild($postElement)
        renderPosts($postElement, nextPost)
    })
}