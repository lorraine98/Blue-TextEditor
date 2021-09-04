export default function Editor({ $target, initialState }) {

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $target.innerHTML = `
            <div class="editor-container">
               <input class="editor-title" placeholder="Heading.."/>
               <textarea class="editor-content"></textarea>
            </div>
        `
    }
    this.render()
}