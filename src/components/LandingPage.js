export default function LandingPage({ $target }) {

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