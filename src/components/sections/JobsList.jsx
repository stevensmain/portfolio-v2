import React, { useState, useEffect, useRef } from 'react'

const jobsData = [
  {
    title: 'Frontend developer',
    company: 'Cesa MS',
    location: 'Montevideo, Uruguay',
    range: 'Junio 2022 - Actualmente',
    url: 'https://www.linkedin.com/company/cesa-management-solutions/mycompany'
  },
  {
    title: 'Frontend developer',
    company: 'Korvuss',
    location: 'Medellin, Colombia',
    range: 'Marzo 2021 - Junio 2022',
    url: 'https://co.linkedin.com/company/korvuss'
  },
  {
    title: 'Desarrollador Freelance',
    company: 'Freelance',
    location: 'Caracas, Venezuela',
    range: 'Julio 2020 - Febrero 2021',
    url: '/'
  },
  {
    title: 'Analista TI',
    company: 'Empresas Polar',
    location: 'Caracas, Venezuela',
    range: 'Enero 2018 - Mayo 2019',
    url: 'https://www.linkedin.com/company/empresas-polar'
  }
]

const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
  const tabs = useRef([])

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus()
      return
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0)
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1)
    }
  }

  // Only re-run the effect if tabFocus changes
  useEffect(() => {
    focusTab()
  }, [tabFocus])

  return (
    <div className='flex flex-col pt-12 gap-5 md:flex-row'>
      <ul className='flex flex-col' role='tablist' aria-label='Job tabs'>
        {jobsData &&
          jobsData.map(({ company }, i) => {
            return (
              <li key={i}>
                <button
                  key={i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role='tab'
                  aria-selected={activeTabId === i}
                  aria-controls={`panel-${i}`}
                  className={`w-full text-left px-4 py-2 text-slate-600 whitespace-nowrap transition-all duration-300 ease-in hover:bg-[var(--light-navy)] ${activeTabId === i ? 'text-white border-l border-[var(--light-slate)]' : ''}`}
                >
                  {company}
                </button>
              </li>
            )
          })}
      </ul>

      <div className='max-w-sm'>
        {jobsData &&
          jobsData.map(({ title, url, company, range }, i) => {
            return (
              <div
                id={`panel-${i}`}
                key={i}
                role='tabpanel'
                tabIndex={activeTabId === i ? '0' : '-1'}
                aria-labelledby={`tab-${i}`}
                aria-hidden={activeTabId !== i}
                hidden={activeTabId !== i}
                className='w-full py-2 md:py-0'
              >

                <h3 className='mb-1 text-xl font-extrabold text-slate-400'>
                  {title}
                  <a href={url} className='text-slate-300'>
                    {` @${company}`}
                  </a>
                </h3>
                <p className='range'>{range}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Jobs
