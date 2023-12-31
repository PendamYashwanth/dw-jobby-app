import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsFilterGroup = props => {
  const {changeTypeOfEmployment, changeSalaryRange} = props

  const onChangeTypeOfEmployment = event => {
    const isChecked = event.target.checked
    changeTypeOfEmployment(event.target.value, isChecked)
  }

  const onChangeSalaryRange = event => {
    changeSalaryRange(event.target.value)
  }

  const renderTypeOfEmployment = () => (
    <div>
      <h1 className="filter-groups-heading">Type of Employment</h1>
      <ul className="filter-item-container">
        {employmentTypesList.map(eachItem => (
          <li className="filter-item " key={eachItem.employmentTypeId}>
            <input
              className="checkbox"
              id={eachItem.employmentTypeId}
              type="checkbox"
              value={eachItem.employmentTypeId}
              onChange={onChangeTypeOfEmployment}
            />
            <label className="filter-label" htmlFor={eachItem.employmentTypeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderSalaryRange = () => (
    <>
      <h1 className="filter-groups-heading">salary Range</h1>
      <ul className="filter-item-container">
        {salaryRangesList.map(eachItem => (
          <li className="filter-item" key={eachItem.salaryRangeId}>
            <input
              className="radio"
              id={eachItem.salaryRangeId}
              type="radio"
              value={eachItem.salaryRangeId}
              name="salary"
              onChange={onChangeSalaryRange}
            />
            <label className="filter-label" htmlFor={eachItem.salaryRangeId}>
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filter-group-container">
      {renderTypeOfEmployment()} {renderSalaryRange()}
    </div>
  )
}

export default JobsFilterGroup
