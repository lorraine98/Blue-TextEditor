import Editor from "./Editor.js"
import { getItem, setItem } from "../utils/storage.js"

export default function DocEditPage({ $target, initialState }) {

    this.state = initialState
    const getDocSaveKey = () => `temp-doc-${this.state.docId}`

    this.setState = async nextState => {
        this.validateState(nextState);
        const prevDocId = this.state.docId;
        this.state = { ...this.state, ...nextState }
        if (prevDocId === nextState?.docId) {
            return;
        }
        this.render()
    }

    this.validateState = state => {
        if (state?.docId && (typeof state.docId !== "string")) {
            throw new Error(`docId must be string::${typeof state?.docId}`)
        }
    }

    const doc = getItem(getDocSaveKey(), {
        title: '',
        content: ''
    })

    let timer = null

    const editor = new Editor({
        $target,
        initialState: doc,
        onEditing: (doc) => {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setItem(getDocSaveKey(), {
                    ...doc,
                    tempSaveData: new Date()
                })
            }, 1000)
        }
    })


    this.render = () => {
        editor.setState({})
    }

    this.render()
}