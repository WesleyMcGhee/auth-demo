import "./Header.css";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">Logo</h1>
      <div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="nav-link" href="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/signup">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
