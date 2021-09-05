import Nav from "./commons/Nav.js"
import Editor from "./components/Editor.js"
import LandingPage from "./components/LandingPage.js"
import { initRouter } from "./utils/router.js"
import { getItem, setItem } from "./utils/storage.js"

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
    new Nav({
        $target,
        initialState: DUMMY_DATA
    })

    const $page = document.createElement('div')
    $page.className = "page"
    $target.appendChild($page)

    const TEMP_POST_SAVE_KEY = 'temp-post'
    const post = getItem(TEMP_POST_SAVE_KEY, {
        title: '',
        content: ''
    })

    const landingPage = new LandingPage({
        $target: $page
    })

    const editor = new Editor({
        $target: $page,
        initialState: post,
        onEditing: (post) => {
            setItem(TEMP_POST_SAVE_KEY, {
                ...post,
                tempSaveData: new Date()
            })
        }
    })

    this.route = () => {
        const { pathname } = window.location;
        // await fetchList()
        if (pathname === '/') {
            landingPage.setState()
        }
        else if (pathname.includes('/new-post')) {
            editor.setState()
        }
    };

    window.addEventListener('popstate', () => {
        this.route()
    })

    // const fetchList = async () => {
    //     const docs = await request(`/documents`, {
    //         method: 'GET',
    //     });
    //     if (docs) {
    //         docList.setState(docs);
    //     }
    // };

    this.route();
    initRouter(() => this.route());
}
