export default function Editor({ $target, initialState }) {
    const $editor = document.createElement('textarea')

    this.state = initialState

    $target.appendChild($editor)

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {

    }
    this.render()
}