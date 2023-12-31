import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  console.log(history)
  return (
    <nav className="navbar">
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/">
          <div className="website-logo-container">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt=" website logo"
            />
          </div>
        </Link>
        <div className="nav-menu-container">
          <ul className="d-flex flex-row">
            <Link to="/">
              <li className="nav-menu-item ">Home</li>
            </Link>
            <Link to="/jobs">
              <li className="nav-menu-item ">Jobs</li>
            </Link>
          </ul>
        </div>
        <ul className="logout-button-container">
          <li>
            <button className="logout-button " type="button" onClick={onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
