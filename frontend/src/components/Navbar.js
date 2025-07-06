import "./Navbar.css"

export default function Navbar() {
    return <nav className="nav">
        <ul>
            <li> <a href="/"> Single Prompt</a> </li>
            <li> <a href="/">Multiple Prompts</a> </li>

        </ul>

        <ul>
            <li> <a href="/">Account</a> </li>
        </ul>
        </nav>
}