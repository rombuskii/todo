import React,{useState} from 'react'
import { useTheme } from '@/context/ThemeProvider'
import styles from './animate.module.css'
import Image from 'next/image'
import Modal from './Modal'
import { useRouter } from 'next/router'

const Navbar = () => {
    const router = useRouter();
    const [slide, setSlide] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const {toggle} = useTheme();
    const switchTheme = (e) => {
        e.preventDefault();
        setSlide(prev => prev == null ? true : prev ? false : true)
        toggle()
    }

  return (
    <>
    {openModal && <Modal setOpenModal={setOpenModal}/>}
    <div className='p-2 select-none text-xl flex justify-between items-center'>
        <div onClick={e => router.push('/')} className='hover:cursor-pointer flex items-center gap-x-1'>
        <h2 className='uppercase text-2xl'>Todo</h2>
        <Image src={'/notepad.png'} height='40' width='40'/>
        </div>
        <div className='flex items-center gap-x-5'>
        <i onClick={() => setOpenModal(true)} id="user" className="duration-300 hover:scale-110 cursor-pointer text-3xl lg:mx-10 fa-solid fa-user"></i>
        <div onClick={switchTheme} className='duration-300 hover:cursor-pointer items-center flex gap-x-3 p-1 bg-white dark:bg-black border-2 rounded-2xl'>
        <p className=''>☀️</p>
        <p className=''>🌙</p>
        <p className={slide == null ? "duration-300 hover:scale-110 cursor-pointer absolute text-2xl" : slide ? `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goright}` : `duration-300 hover:scale-110 cursor-pointer absolute text-2xl ${styles.goleft}`}>⚪️</p>
        </div>
        </div>
    </div>
    </>
  )
}

export default Navbar