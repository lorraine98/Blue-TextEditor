export default function LandingPage({ $target }) {

    this.render = () => {
        $target.innerHTML = `
            <div class="landingpage">
                <h1>WELCOME!<h1>
                <p>Click</p>
                <button class="new-post-btn">new post</button>
                <p>or</p>
                <p>←Select document</p>
            </div>
        `;

    }
    this.render()
}