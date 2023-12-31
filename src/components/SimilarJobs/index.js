import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {eachDetails} = props
  return (
    <li className="similar-job-item">
      <div className="container">
        <div className="row jobDetails-header mb-3">
          <div className="col-3">
            <img
              className="jobDetails-companyLogo"
              src={eachDetails.company_logo_url}
              alt="similar job company logo"
            />
          </div>
          <div className="col-9">
            <h1 className="jobDetails-title">{eachDetails.title}</h1>
            <div className="jobDetails-rating-container mt-1">
              <AiFillStar className="jobDetails-rating-star" />
              <p className="jobDetails-rating-text">{eachDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3 col-lg-2 d-flex">
            <MdLocationOn className="jobDetails-container-middle-icons" />
            <p className="jobDetails-container-middle-text">
              {eachDetails.location}
            </p>
          </div>
          <div className="col-3 col-lg-2 d-flex">
            <BsFillBriefcaseFill className="jobDetails-container-middle-icons" />
            <p className="jobDetails-container-middle-text">
              {eachDetails.employment_type}
            </p>
          </div>
          <div className="col-12">
            <h1 className="jobDetails-description-heading ">Description</h1>
            <p className="jobDetails-description">
              {eachDetails.job_description}
            </p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
