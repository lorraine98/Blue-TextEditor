import Editor from "./Editor.js"
import { getItem, setItem } from "../utils/storage.js"

export default function PostEditPage({ $target, initialState }) {

    const TEMP_POST_SAVE_KEY = 'temp-post'
    const post = getItem(TEMP_POST_SAVE_KEY, {
        title: '',
        content: ''
    })

    let timer = null

    const editor = new Editor({
        $target,
        initialState: post,
        onEditing: (post) => {
            if (timer !== null) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setItem(TEMP_POST_SAVE_KEY, {
                    ...post,
                    tempSaveData: new Date()
                })
            }, 1000)
        }
    })

    this.state = initialState

    this.setState = nextState => {
        this.state = { ...this.state, ...nextState }
        this.render()
    }

    this.render = () => {
        editor.render()
    }
    this.render()
}