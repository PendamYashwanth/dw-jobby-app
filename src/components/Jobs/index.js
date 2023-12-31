import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobProfile from '../Profile'
import JobItem from '../JobItem'
import JobsFilterGroup from '../JobsFilterGroup'
import './index.css'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const jobsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileDetails: '',
    jobDetails: [],
    profileApiStatus: profileApiStatusConstants.initial,
    jobsApiStatus: jobsApiStatusConstants.initial,
    typeOfEmployment: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    const profileApi = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(profileApi, options)

    if (response.ok === true) {
      this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
      const data = await response.json()
      const fetchedData = data.profile_details
      const formattedData = {
        name: fetchedData.name,
        profileImageUrl: fetchedData.profile_image_url,
        shortBio: fetchedData.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstants.failure})
    }
  }

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state
    return <JobProfile profileDetails={profileDetails} />
  }

  renderProfileFailureView = () => (
    <div>
      <button
        type="button"
        className="retry-button"
        onClick={this.getProfileData}
      >
        Retry
      </button>
    </div>
  )

  getJobsData = async () => {
    const {typeOfEmployment, salaryRange, searchInput} = this.state

    this.setState({jobsApiStatus: jobsApiStatusConstants.inProgress})
    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${salaryRange}&search=${searchInput}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(jobsApi, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.jobs
      const formattedData = fetchedData.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: formattedData,
        jobsApiStatus: jobsApiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiStatusConstants.failure})
    }
  }

  renderJobsSuccessView = () => {
    const {jobDetails} = this.state
    const noOfJobs = jobDetails.length
    console.log(noOfJobs)
    if (noOfJobs === 0) {
      return (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </>
      )
    }
    return (
      <ul className="jobItems-container">
        {jobDetails.map(eachJob => (
          <JobItem key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" className="retry-button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllProfileViews = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiStatus.inProgress:
        return this.renderLoader()
      case profileApiStatusConstants.success:
        return this.renderProfileSuccessView()
      case profileApiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderAllJobsViews = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiStatusConstants.inProgress:
        return this.renderLoader()
      case jobsApiStatusConstants.success:
        return this.renderJobsSuccessView()
      case jobsApiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  changeTypeOfEmployment = (value, isChecked) => {
    const {typeOfEmployment} = this.state
    if (isChecked) {
      typeOfEmployment.push(value)
    } else {
      const index = typeOfEmployment.indexOf(value)
      typeOfEmployment.splice(index, 1)
    }
    this.setState({typeOfEmployment}, this.getJobsData)
  }

  changeSalaryRange = value => {
    this.setState({salaryRange: value}, this.getJobsData)
  }

  onSearch = () => this.getJobsData()

  handleInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="container mb-3">
        <div className="row">
          <div className="col-8 d-flex flex-row">
            <div className="search-input-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.handleInputChange}
                value={searchInput}
              />
            </div>
            <button
              className="search-icon-container"
              type="button"
              data-testid="searchButton"
              onClick={this.onSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-responsive-container">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-5 col-lg-3">
                  {this.renderAllProfileViews()}
                  <JobsFilterGroup
                    changeTypeOfEmployment={this.changeTypeOfEmployment}
                    changeSalaryRange={this.changeSalaryRange}
                  />
                </div>
                <div className="col-12 col-md-7 col-lg-9">
                  {this.renderSearchBar()}
                  {this.renderAllJobsViews()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
