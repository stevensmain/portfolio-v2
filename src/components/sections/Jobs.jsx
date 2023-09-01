import React, { useState, useEffect, useRef } from 'react'
import { srConfig } from '../../utils/config'
import sr from '../../utils/scrollReveal'
import Title from '../ui/Title'

const jobsData = [
  {
    title: 'Frontend developer',
    company: 'Cesa MS',
    location: 'Montevideo, Uruguay',
    range: 'Junio 2022 - Actualmente',
    url: 'https://co.linkedin.com/company/korvuss'
  },
  {
    title: 'Frontend developer',
    company: 'Korvuss S.A.S.',
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
    url: 'https://co.linkedin.com/company/korvuss'
  }
]

const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0)
  const [tabFocus, setTabFocus] = useState(null)
  const tabs = useRef([])
  const revealContainer = useRef(null)

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig())
  }, [])

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
  useEffect(() => focusTab(), [tabFocus])

  return (
    <section className='max-w-3xl mx-auto flex flex-col justify-center h-screen' id='jobs' ref={revealContainer}>
      <Title prevMark='02. '>Where I’ve Worked</Title>

      <div className='flex flex-col w-full md:flex-row pt-12 gap-5'>
        <div className='relative z-3 w-full md:w-fit flex overflow-auto md:flex-col scroll' role='tablist' aria-label='Job tabs'>
          {jobsData &&
            jobsData.map((node, i) => {
              const { company } = node
              return (
                <button
                  key={i}
                  onClick={() => setActiveTabId(i)}
                  ref={el => (tabs.current[i] = el)}
                  id={`tab-${i}`}
                  role='tab'
                  aria-selected={activeTabId === i}
                  aria-controls={`panel-${i}`}
                  className={`flex items-center w-full h-10 px-4 pb-2 pt-0 text-slate-600 whitespace-nowrap duration-300 hover-light-navy ${activeTabId === i ? 'active text-slate-100' : ''}`}
                >
                  {company}
                </button>
              )
            })}
        </div>

        <div className='relative shrink-1'>
          {jobsData &&
            jobsData.map((node, i) => {
              const { title, url, company, range } = node

              return (
                <div
                  id={`panel-${i}`}
                  key={i}
                  role='tabpanel'
                  tabIndex={activeTabId === i ? '0' : '-1'}
                  aria-labelledby={`tab-${i}`}
                  aria-hidden={activeTabId !== i}
                  hidden={activeTabId !== i}
                  className='w-full py-2 md:py-0 px-1'
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

    </section>
  )
}

export default Jobs
