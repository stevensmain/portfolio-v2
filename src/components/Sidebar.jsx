import React, { useState, useEffect, useRef } from 'react'

const Menu = ({ navLinks }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const navRef = useRef(null)

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.querySelector('body').classList.add('active')
    } else {
      document.querySelector('body').classList.remove('active')
    }
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <nav className='block md:hidden'>

      <button
        className='relative z-10 -mr-3 p-4 border-0 bg-transparent linear duration-200'
        onClick={toggleMenu}
        aria-label='Menu'
      >
        <div className='ham-box'>
          <div className={`ham-box-inner ${menuOpen ? 'active' : ''}`} />
        </div>
      </button>

      <aside
        className={`block fixed top-0 bottom-0 py-20 px-4 w-72 max-w-md h-screen bg-light-navy duration-300 shadow z-9 ease-in ${menuOpen ? 'right-0' : '-right-full'}`}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 1 : -1}
      >
        <nav ref={navRef} className='w-full flex flex-col text-slate-400 text-center'>
          {navLinks &&
            <ol className='p-0 m-0 list-none w-full'>
              {navLinks.map(({ url, name }, i) => (
                <li key={i} className='relative mt-0 mx-auto mb-6 text-xl'>
                  <a href={url} onClick={() => setMenuOpen(false)}>
                    {name}
                  </a>
                </li>
              ))}
            </ol>}

          <a className='text-slate-400 border-slate-400 border px-4 py-3 rounded duration-200 hover:bg-neutral-800' href='/resume.pdf' target='_blank' rel='noopener noreferrer'>
            Resume
          </a>
        </nav>
      </aside>

    </nav>
  )
}

export default Menu
