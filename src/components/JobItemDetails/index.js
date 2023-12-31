import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaRegShareSquare} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'
import './index.css'

const jobDetailsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: [],
    similarJobDetails: [],
    jobDetailsApiStatus: jobDetailsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      jobDetailsApiStatus: jobDetailsApiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const jobDetailsApi = 'https://apis.ccbp.in/jobs/'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(`${jobDetailsApi}${id}`, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.job_details
      const formattedData = {
        companyLogoUrl: fetchedData.company_logo_url,
        companyWebsiteUrl: fetchedData.company_website_url,
        employmentType: fetchedData.employment_type,
        id: fetchedData.id,
        jobDescription: fetchedData.job_description,
        location: fetchedData.location,
        packagePerAnnum: fetchedData.package_per_annum,
        rating: fetchedData.rating,
        title: fetchedData.title,
        skills: fetchedData.skills,
        lifeAtCompanyDescription: fetchedData.life_at_company.description,
        lifeAtCompanyImageUrl: fetchedData.life_at_company.image_url,
      }
      const fetchedSimilarJobDetails = data.similar_jobs

      this.setState({
        jobItemDetails: formattedData,
        similarJobDetails: fetchedSimilarJobDetails,
        jobDetailsApiStatus: jobDetailsApiStatusConstants.success,
      })
    } else {
      this.setState({
        jobDetailsApiStatus: jobDetailsApiStatusConstants.failure,
      })
    }
  }

  renderSimilarJobs = () => {
    const {similarJobDetails} = this.state
    return (
      <ul className="similar-jobs-container">
        {similarJobDetails.map(eachJob => (
          <SimilarJobs key={eachJob.id} eachDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {jobItemDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills = [],
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
    } = jobItemDetails
    return (
      <div className="container-fluid">
        <div className="jobDetails-container">
          <div className="row jobDetails-header mb-3">
            <div className="col-3 col-lg-1">
              <img
                className="jobDetails-companyLogo"
                src={companyLogoUrl}
                alt="job details company logo"
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
              <div className="d-flex flex-row justify-content-between">
                <h1 className="jobDetails-description-heading ">Description</h1>
                <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
                  Visit
                  <FaRegShareSquare className="ml-1" />
                </a>
              </div>

              <p className="jobDetails-description">{jobDescription}</p>
            </div>
            <div className="col-12">
              <h1 className="jobDetails-description-heading ">Skills</h1>
              <ul className="skills-container">
                {skills.map(eachSkill => (
                  <li key={eachSkill.name} className="d-flex skill-container">
                    <div className="skill-img-container">
                      <img
                        className="skill-img"
                        src={eachSkill.image_url}
                        alt={eachSkill.name}
                      />
                    </div>
                    <p className="jobDetails-description">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-10">
              <h1 className="jobDetails-description-heading ">
                Life at company
              </h1>
              <p className="jobDetails-description">
                {lifeAtCompanyDescription}
              </p>
            </div>
            <div className="col-2">
              <div className="life-at-company-images-container">
                <img
                  className="w-100"
                  src={lifeAtCompanyImageUrl}
                  alt="life at company"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h1 className="jobDetails-description-heading">Similar Jobs</h1>
          </div>
          <div className="col-12">{this.renderSimilarJobs()}</div>
        </div>
      </div>
    )
  }

  renderJobDetailsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobDetailsViews = () => {
    const {jobDetailsApiStatus} = this.state
    switch (jobDetailsApiStatus) {
      case jobDetailsApiStatusConstants.inProgress:
        return this.renderLoader()
      case jobDetailsApiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case jobDetailsApiStatusConstants.failure:
        return this.renderJobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobItemDetails-bg-container">
          {this.renderAllJobDetailsViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
