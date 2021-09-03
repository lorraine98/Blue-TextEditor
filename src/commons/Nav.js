export default function PostList({ $target, initialState, onClick }) {
    const $postList = document.createElement('div')

    this.state = initialState

    $target.appendChild($postList)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        renderPosts($target, this.state)
    }

    this.render()
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