import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <li className="jobDetails-container">
      <Link to={`/jobs/${id}`}>
        <div className="container">
          <div className="row jobDetails-header mb-3">
            <div className="col-3 col-lg-1">
              <img
                className="jobDetails-companyLogo"
                src={companyLogoUrl}
                alt="company logo"
              />
            </div>
            <div className="col-9 col-lg-11">
              <h1 className="jobDetails-title">{title}</h1>
              <div className="jobDetails-rating-container mt-1">
                <AiFillStar className="jobDetails-rating-star" />
                <p className="jobDetails-rating-text">{rating}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3 col-lg-2 d-flex">
              <MdLocationOn className="jobDetails-container-middle-icons" />
              <p className="jobDetails-container-middle-text">{location}</p>
            </div>
            <div className="col-3 col-lg-2 d-flex">
              <BsFillBriefcaseFill className="jobDetails-container-middle-icons" />
              <p className="jobDetails-container-middle-text">
                {employmentType}
              </p>
            </div>
            <div className="col-6 col-lg-8 text-right">
              <p className="jobDetails-container-middle-text">
                {packagePerAnnum}
              </p>
            </div>
            <div className="col-12">
              <h1 className="jobDetails-description-heading ">Description</h1>
              <p className="jobDetails-description">{jobDescription}</p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
