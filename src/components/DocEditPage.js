import Editor from "./Editor.js"
import { getItem, setItem } from "../utils/storage.js"
import { request } from "../utils/api.js"

export default function DocEditPage({ $target, initialState }) {

    this.state = initialState
    const getDocSaveKey = () => `temp-doc-${this.state.docId}`

    this.setState = async nextState => {
        const prevDocId = this.state.docId;
        this.state = { ...this.state, ...nextState }
        if (prevDocId !== nextState.docId) {
            await fetchPost()
            return
        }
        this.render()
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

    const fetchPost = async () => {
        const { docId } = this.state

        if (docId !== 'new') {
            const doc = await request(`/documents/${docId}`)

            this.setState({ ...this.state, post: doc })
        }
    }
}