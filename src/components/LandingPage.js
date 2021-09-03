// import LinkButton from "../commons/LinkButton"

export default function LandingPage({ $target }) {
    const $landingPage = document.createElement('div')

    // new LinkButton({
    //     $target: $landingPage, initialState: {
    //         text: 'New Post',
    //         link: '/'
    //     }
    // })
    $landingPage.innerHTML = `
        <h1>WELCOME!<h1>
        <button>new post</button>
        <p>←Select document</p>
    `

    $target.appendChild($landingPage)
}