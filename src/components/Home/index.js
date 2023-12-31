import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bg-container d-flex flex-column justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="jobs">
              <button className="find-jobs-button" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default Home
