export default function Editor({ $target, initialState }) {

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $target.innerHTML = `
            <h1 class="editor-title">제목입니다</h1>
            <textarea class="editor-content"></textarea>
        `
    }
    this.render()
}