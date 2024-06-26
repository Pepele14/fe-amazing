import logo from "../assets/logo-color.png";

function Header() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#3F72AF", color: "#F9F7F7" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/" style={{ color: "#F9F7F7" }}>
            <img src={logo} alt="Logo" style={{ height: "80px" }} />{" "}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/diary"
                  style={{ color: "#F9F7F7" }}
                >
                  MyDiary
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/publicarea"
                  style={{ color: "#F9F7F7" }}
                >
                  Public Pages
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/profilepage"
                  style={{ color: "#F9F7F7" }}
                >
                  Profile
                </a>
              </li>
              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
