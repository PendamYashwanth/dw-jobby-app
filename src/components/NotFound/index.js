import './index.css'

const NotFound = () => (
  <div className="not-found-bg-container">
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png "
              alt="not found"
            />
            <h1 className="text-white">Page Not Found</h1>
            <p className="text-secondary">
              We are sorry, the page you requested could not be found
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
