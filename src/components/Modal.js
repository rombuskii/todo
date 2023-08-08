import React,{useState, useEffect} from 'react'
import ReactDom from 'react-dom'
import { useRouter } from 'next/router'
import { useAuth } from '@/context/AuthContext'

const Modal = (props) => {
    const router = useRouter();
    const {currentUser} = useAuth();
    const { setOpenModal } = props;
    const [_document, set_document] = useState(null)
    const {logout} = useAuth();

    useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) {return null}

    return ReactDom.createPortal(
        <div className='z-50 fixed inset-0 bg-white dark:bg-black text-black dark:text-white flex flex-col text-lg sm:text-xl'>
            <div className='flex items-center justify-between border-b
            border-solid border-slate-900 p-4'>
                <h1 className='font-extrabold text-2xl sm: text-5xl select-none'>MENU</h1>
                <i onClick={() => setOpenModal(false)} className="fa-solid fa-xmark text-lg sm:text-3xl duration-300 hover:rotate-90 cursor-pointer"></i>
            </div>
            <div className='p-4 flex flex-col gap-3'>
                {!currentUser && <h2 onClick={() => {setOpenModal(false); router.push('/login')}} className='select-none duration-300 hover:pl-2 cursor-pointer'><i className="mx-1 fa-solid fa-right-from-bracket"></i>Login/Register</h2>}
                <h2 onClick={() => {setOpenModal(false); router.push('/reset')}} className='select-none duration-300 hover:pl-2 cursor-pointer'><i className="mx-1 fa-sharp fa-solid fa-unlock"></i>Reset Password</h2>
                {currentUser && <h2 id='logout' onClick={() => {logout(); setOpenModal(false); router.push('/'); router.reload()}} className='select-none duration-300 hover:pl-2 cursor-pointer'><i className="mx-1 fa-solid fa-right-from-bracket"></i>Logout</h2>}
                
            </div>
        </div>, _document.getElementById('portal')
      )
}

export default Modal