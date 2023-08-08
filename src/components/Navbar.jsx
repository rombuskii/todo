import React,{useState} from 'react'
import { useTheme } from '@/context/ThemeProvider'
import styles from './animate.module.css'
const Navbar = () => {
    const [slide, setSlide] = useState(null)
    const {toggle} = useTheme();
    const switchTheme = (e) => {
        e.preventDefault();
        setSlide(prev => prev == null ? true : prev ? false : true)
        toggle()
    }

  return (
    <div className='p-2 select-none text-xl flex justify-between items-center'>
        <h2 className='uppercase text-2xl'>Todo</h2>
        <div onClick={switchTheme} className='hover:cursor-pointer items-center flex gap-x-3 p-1 bg-black border-2 rounded-2xl'>
        <p className=''>☀️</p>
        <p className=''>🌙</p>
        <p className={slide == null ? "duration-300 hover:scale-110 cursor-pointer absolute text-2xl" : slide ? `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goright}` : `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goleft}`}>⚪️</p>
        </div>
    </div>
  )
}

export default Navbar