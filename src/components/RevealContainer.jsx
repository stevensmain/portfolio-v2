import React, { useEffect, useRef } from 'react'
import { srConfig } from '../utils/config' 
import sr from '../utils/scrollReveal'

const RevealContainer = ({ children , className = 'lg:h-screen flex flex-col justify-center mb-14 lg:mb-0', ...rest }) => {
  const revealContainer = useRef(null)

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig())
  }, [])

  return (
    <section className={className} ref={revealContainer} {...rest}>
      {children}
    </section>
  )
}

export default RevealContainer
