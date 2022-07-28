export {Nav}

function Nav() {
    return <nav>
        <div className="main-nav-area">
            <div className="logo-area">NoTes</div>
            <ul>
                <li><a href="/#">Home</a></li>
                <li><a href="/#">My NoTes</a></li>
                <li><a href="/#">Create <i className="fa-solid fa-plus"></i></a></li>
            </ul>
        </div>
        <div className="user-nav-area">
            <ul>
                <li><a href="/#">Log in</a></li>
                <li><a href="/#">Sign up</a></li>
            </ul>
        </div>
    </nav>
}