export default function Editor({ $target, onEditing, initialState = {
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
    }

    this.render = () => {
        if ($target.querySelector('.editor-container')) {
            return;
        }
        const content = this.parseMarkdown(this.state.content)
        console.log(content)
        $target.innerHTML = `
                <div class="editor-container">
                    <div class="editor">
                    <input class="editor-title" name="title" placeholder="Heading.." value="${this.state.title}"/>
                    <textarea class="editor-content" name="content">${content}</textarea>
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
            onEditing(this.state)
        }
    }

    $target.addEventListener('keyup', e => this.onkeyup(e))

    this.parseMarkdown = (text) => {
        const htmlText = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\n$/gim, '<br />')

        return htmlText.trim()
    }
    this.render()
}