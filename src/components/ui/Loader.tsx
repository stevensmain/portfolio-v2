import { useState, useEffect } from "react"
import anime from "animejs"
import Logo from "../icons/Logo.tsx"

interface Props {
  finishLoading?: () => void
}

const Loader = ({ finishLoading }: Props) => {
  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    })

    loader
      .add({
        targets: "#logo path",
        delay: 300,
        duration: 1500,
        easing: "easeInOutQuart",
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: "#logo #B",
        duration: 700,
        easing: "easeInOutQuart",
        opacity: 1,
      })
      .add({
        targets: "#logo",
        delay: 500,
        duration: 300,
        easing: "easeInOutQuart",
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: ".loader",
        duration: 200,
        easing: "easeInOutQuart",
        opacity: 0,
        zIndex: -1,
      })
  }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    animate()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="bg-slate-900 fixed w-full h-full inset-0 z-50 grid place-items-center loader">
      <div
        className={`w-max max-w-[100px] transition-transform ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Logo />
      </div>
    </div>
  )
}

export default Loader
