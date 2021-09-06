export default function LandingPage({ $target, postNewDocument }) {

    const onClick = (e) => {
        if (e.target.matches(".new-post-btn")) {
            postNewDocument()
        }
    }

    $target.addEventListener('click', onClick);

    this.render = () => {
        $target.innerHTML = `
            <div class="landingpage">
                <h1>WELCOME!<h1>
                <button class="new-post-btn">new post</button>
                <p>←Select document</p>
            </div>
        `;

    }
    this.render()
}