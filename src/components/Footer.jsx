import "./footer.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="col-md-4 d-flex align-items-center">
          <a
            href="/"
            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
          >
            <svg className="bi" width="30" height="24">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a>
          <span className="fixed-footer" style={{ color: "#F9F7F7" }}>
            Developed with love by your beloved Pepe.
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#twitter"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#instagram"></use>
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <svg className="bi" width="24" height="24">
                <use xlink:href="#facebook"></use>
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
