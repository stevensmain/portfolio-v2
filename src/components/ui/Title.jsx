const Title = ({
  size = '3xl',
  prevMark = null,
  children
}) => {
  return (
    <h2 className='text-2xl text-slate-400 font-base section-title'>
      {prevMark && prevMark}
      <strong className='text-3xl text-slate-300 ml-3 font-bold md:whitespace-nowrap'>{children}</strong>
    </h2>
  )
}

export default Title
