import { request } from "../utils/api.js"

export default function PostList({ $target, initialState }) {
    const $navContainer = document.createElement('div')
    $navContainer.className = 'nav-container'
    $target.appendChild($navContainer)

    const navTitle = document.createElement('span')
    navTitle.innerHTML = `<h1>Blue Text Editor</h1>`
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
        // $postList.setState(posts)
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