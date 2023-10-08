import React, { useState, useEffect } from 'react'
import useScrollDirection from '../hooks/useScrollDirection'
import IconLogo from './icons/Logo'
import Menu from './Sidebar'

const Nav = () => {
  const scrollDirection = useScrollDirection('down')
  const [scrolledToTop, setScrolledToTop] = useState(true)

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    {
      name: 'About',
      url: '/#about'
    },
    {
      name: 'Experience',
      url: '/#jobs'
    },
    {
      name: 'Projects',
      url: '/#projects'
    },
    {
      name: 'Contact',
      url: '/#contact'
    }
  ]

  const ResumeLink = (
    <a className='text-slate-400 border-slate-400 border px-4 py-2 rounded duration-200 hover:text-emerald-300 hover:border-esmerald-300 hover:bg-slate-300/20' href='/resume.pdf' target='_blank' rel='noopener noreferrer'>
      Resume
    </a>
  )

  return (
    <header className={`fixed top-0 py-4 w-full h-24 flex justify-between px-8 md:px-24 duration-200 ease-in items-center bg-[var(--navy)] z-10 backdrop-blur-md ${scrollDirection === 'down' && '-translate-y-24'} ${!scrolledToTop && 'shadow-xl'}`}>
      <div
        className='h-12 w-12' data-aos='fade'
        data-aos-duration='300'
        data-aos-easing='ease-in'
      >
        <a href='/#hero' aria-label='home'>
          <IconLogo />
        </a>
      </div>

      <Menu navLinks={navLinks} />

      <nav className='hidden lg:inline-flex text-slate-400'>
        <ol className='flex items-center justify-between gap-8'>
          {navLinks.map(({ url, name }, i) =>
            <li
              data-aos='fade-down'
              data-aos-duration='300'
              data-aos-delay={`${i}00`}
              data-aos-easing='ease-in'
              key={i}
            >
              <a className='pointer text-slate-400 hover:text-emerald-300' href={url}>{`0${i + 1}. ${name}`}</a>
            </li>
          )}
          <li
            data-aos='fade-down'
            data-aos-duration='300'
            data-aos-delay={`${navLinks.length}00`}
            data-aos-easing='ease-in'
          >
            {ResumeLink}
          </li>
        </ol>
      </nav>
    </header>
  )
}

export default Nav
