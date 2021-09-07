import Editor from "./Editor.js"
import { updateDocument } from "../utils/api.js";

export default function DocEditPage({ $target, initialState }) {

    this.state = initialState

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


    const editor = new Editor({
        $target,
        initialState: {
            title: '', content: ''
        },
        onEditing: (doc) => {
            
        }
    })


    this.render = () => {
        editor.setState({})
    }

    this.render()
}