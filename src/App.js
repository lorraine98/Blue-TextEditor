import PostList from "./commons/Nav.js"

const DUMMY_DATA = [
    {
        "id": 1, // Document id
        "title": "노션을 만들자", // Document title
        "documents": [
            {
                "id": 2,
                "title": "블라블라",
                "documents": [
                    {
                        "id": 3,
                        "title": "함냐함냐",
                        "documents": []
                    }
                ]
            }
        ]
    },
    {
        "id": 4,
        "title": "hello!",
        "documents": []
    }
]

export default function App({ $target }) {
    new PostList({
        $target,
        initialState: DUMMY_DATA
    })
}
