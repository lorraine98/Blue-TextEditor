import Nav from "./commons/Nav.js"
import LandingPage from "./components/LandingPage.js"
import PostEditPage from "./components/PostEditPage.js"
import { initRouter } from "./utils/router.js"

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
        initialState: []
    })

    const $page = document.createElement('div')
    $page.className = "page"
    $target.appendChild($page)

    const landingPage = new LandingPage({
        $target: $page
    })

    const postEditPage = new PostEditPage({
        $target: $page
    })

    this.route = () => {
        const { pathname } = window.location;
        // await fetchList()
        if (pathname === '/') {
            landingPage.setState()
        }
        else if (pathname.includes('/new-post')) {
            postEditPage.setState()
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
