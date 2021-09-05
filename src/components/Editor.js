export default function Editor({ $target, onEditing, initialState = {
    title: '',
    content: ''
} }) {

    this.state = initialState

    this.setState = nextState => {
        this.state = { ...this.state, ...nextState }
        $target.querySelector('[name=title]').value = this.state.title
        $target.querySelector('[name=content]').value = this.state.content
        this.render()
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
            console.log(nextState)
            this.setState(nextState)
            onEditing(this.state)
        }
        // else if (this.state[content]) {
        //     console.log(target)
        // }
    }

    $target.addEventListener('keyup', e => this.onkeyup(e))
}