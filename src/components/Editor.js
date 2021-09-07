import { updateDocument } from "../utils/api.js";

export default function Editor({ $target, initialState = {
    title: '',
    content: ''
} }) {

    this.state = initialState

    this.setState = nextState => {
        this.validateState(nextState);
        this.state = { ...this.state, ...nextState }
        const $title = $target.querySelector('[name=title]')
        const $content = $target.querySelector('[name=content]')
        if ($title && $content) {
            $title.value = this.state.title
            $content.value = this.state.content
            return
        }
        this.render()
    }

    this.validateState = state => {
        if (state?.title && typeof state.title !== 'string') {
            throw new Error("title must be string")
        }
        if (state?.content && typeof state.content !== 'string') {
            throw new Error("content must be string")
        }
        if (state?.docId && typeof state.docId !== 'number') {
            throw new Error("docId must be number")
        }
    }

    this.render = () => {
        if ($target.querySelector('.editor-container')) {
            return;
        }
        $target.innerHTML = `
                <div class="editor-container">
                    <div class="editor">
                    <input class="editor-title" name="title" placeholder="Heading.." value="${this.state.title}"/>
                    <textarea class="editor-content" name="content">${this.state.content}</textarea>
                    </div>
                </div>
                `
    }

    this.onkeyup = (e) => {
        const { target } = e
        const name = target.getAttribute('name')

        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            this.onEditing(this.state)
        }
    }

    let timer = null
    this.onEditing = (doc) => {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            updateDocument(doc.docId, doc.title, doc.content)
        }, 1000)
    }

    $target.addEventListener('keyup', e => this.onkeyup(e))

}