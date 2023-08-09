import React from 'react'

const Footer = () => {
  return (
    <div className='border-t-1 z-20 text-center'>
    <div className='flex justify-center items-center gap-5 py-2'>
        <a href={'https://instagram.com/'}><i className="duration-300 fa-brands text-lg sm:text-2xl fa-instagram dark:hover:text-white hover:scale-110 cursor-pointer"></i></a>
        <a href={'https://github.com/ekedayen-e'}><i className="duration-300 fa-brands text-lg sm:text-2xl fa-github hover:scale-110  dark:hover:text-white cursor-pointer"></i></a>
        <a href={'https://www.linkedin.com/in/ekedayen-e/'}> <i className="duration-300 fa-brands text-lg sm:text-2xl fa-linkedin dark:hover:text-white hover:scale-110 cursor-pointer"></i></a>
    </div>
    © TODO
    </div>
  )
}

export default Footer