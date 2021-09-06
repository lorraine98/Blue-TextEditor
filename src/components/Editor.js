export default function Editor({ $target, onEditing, initialState = {
    title: '',
    content: ''
} }) {

    this.state = initialState

    this.setState = nextState => {
        this.validationState(nextState);
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

    this.validationState = state => {
        if (state?.title && typeof state.title !== 'string') {
            throw new Error("title must be string")
        }
        if (state?.content && typeof state.content !== 'string') {
            throw new Error("content must be string")
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
                    <div>
                        <input type="file"/>
                    </div>
                </div>
                `
    }
    this.render()

    this.onkeyup = (e) => {
        const { target } = e
        const name = target.getAttribute('name')

        if (this.state[name] !== undefined) {
            const nextState = {
                ...this.state,
                [name]: target.value
            }
            this.setState(nextState)
            onEditing(this.state)
        }
    }

    $target.addEventListener('keyup', e => this.onkeyup(e))
}