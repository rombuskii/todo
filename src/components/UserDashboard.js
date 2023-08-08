import React, {useRef, useState, useEffect} from 'react'
import { useAuth } from '@/context/AuthContext'
import Editable from './Editable';
import { db } from '../../firebase';
import {doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc}from 'firebase/firestore'



const UserDashboard = ({todos}) => {
    const {currentUser} = useAuth();
    const titleRef = useRef(null)
    const [current, setCurrent] = useState(null);
    const [notes, setNotes] = useState([])
    const [text, setText] = useState('')
    const [hidden, setHidden] = useState(true)
    const [title, setTitle] = useState('')
    const [msg, setMsg] = useState('')
    const [search, setSearch] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [display, setDisplay] = useState(notes)
    const [listVisibility, setListVisibility] = useState(true);
    console.log(notes)

    useEffect(() => {
        setMsg('')
        init();
    }, [title])

    const init = async() => {
        try {
            const docRef = doc(db, "todos", currentUser.uid)
            let docSnap = await getDoc(docRef)
            if(docSnap.exists()) {
                docSnap = docSnap.data()
                if(docSnap && docSnap.entries) {
                    setNotes(docSnap.entries)
                    setDisplay(docSnap.entries)
                } else {
                    null;
                }
            } else {
                null
            }
        } catch(error) {
            console.error('Ooops')
        }
    }

    const showForm = (e) => {
        e.preventDefault();
        setHidden(false);
        titleRef.current.focus();
    }

    const createNote = async(e) => {
        e.preventDefault();
        if(!title) {
            setMsg('Title required!')
            return;
        }
        if(notes.some(note => note.title == title)) {
            setMsg('Note with name already exists!')
            return;
        }
        let note = {title: title, content: ''}
        const docRef = doc(db, "todos", currentUser.uid)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            await updateDoc(docRef, {entries: arrayUnion(note)})
        } else {
            await setDoc(docRef, {entries: arrayUnion(note)})
        }
        setMsg('')
        setNotes(prev => {
            let val = prev;
            val.unshift(note)
            return val;
        })
        setTitle('')
        setText('')
        setHidden(true)
        setCurrent(note)
        setDisplay(notes)
    } 

    const save = async(e) => {
        //IMPLEMENT PERMANENT CRUD SOLUTION
        e.preventDefault();
        let index = notes.findIndex(note => note.title == current.title)
        let copy = notes
        copy[index].content = text
        const docRef = doc(db, "todos", currentUser.uid)
        await updateDoc(docRef, {entries: copy})
        setNotes(copy)
        alert('Note Saved')
    }

    const remove = async(e) => {
        //IMPLEMENT PERMANENT CRUD SOLUTION
        let filtered;
        e.preventDefault();
        setNotes(prev => {
            filtered =  prev.filter(note => note.title != current.title)
            return filtered;
        })
        const docRef = doc(db, "todos", currentUser.uid)
        await updateDoc(docRef, {entries: arrayRemove(current)})
        setText('')
        setCurrent(null)
        setDisplay(filtered)
        alert('Note Deleted')
    }

    const changeTitle =  async(e, new_title) => {
        //IMPLEMENT PERMANENT CRUD SOLUTION
        e.preventDefault();
        if(notes.some(note => note.title == new_title)) {
            alert('Note with name already exists!')
            return;
        }
        let index = notes.findIndex(note => note.title == current.title)
        let copy = notes
        copy[index].title = new_title
        setNotes(copy)
        const docRef = doc(db, "todos", currentUser.uid)
        await updateDoc(docRef, {entries: copy})
        setEditMode(false)
    }

    const probe = (e) => {
        e.preventDefault();
        if(!search) {
            setDisplay(notes)
        }
        let filtered = notes.filter(note => note.title.startsWith(search))
        setDisplay(filtered)
        
    }

  return (
    <div className={listVisibility ? 'w-screen grid grid-cols-2' : 'w-screen grid grid-cols-1'}>
        <div className={listVisibility ? 'flex h-screen flex-col' : 'hidden'}>
            <div className='text-md lg:text-xl border-2 flex justify-between items-center p-1'>
                <h3>Notes</h3>
                <form onSubmit={probe}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder='Search...' className='p-1 text-sm w-full max-w-[10ch] gap-x-1 lg:max-w-[30ch]'/>
                </form>
                <i onClick={showForm} className="fa-solid duration-300 hover:scale-110 cursor-pointer fa-plus"></i>
            </div>
            <div className='flex-1 flex flex-col gap-y-2 border-2 p-1 h-full w-full overflow-auto'>
                <form onSubmit={createNote} className={hidden ? 'hidden' : 'p-1 flex items-center gap-x-3'}>
                    <input ref={titleRef} value={title} onChange={e => setTitle(e.target.value)} placeholder='Title...' className='p-1 rounded-xl w-full max-w-[10ch] lg:max-w-[40ch]'></input>
                    <i onClick={createNote} className="fa-solid fa-check bg-black p-1 rounded-full border-2 duration-300 hover:bg-white cursor-pointer"></i>
                    <i onClick={e => setHidden(prev => !prev)} className="fa-solid fa-xmark bg-black p-1 rounded-full border-2 duration-300 hover:bg-white cursor-pointer"></i>
                    {msg}
                </form>
                <div className='overflow-auto'>
                {notes && notes.length > 0 && display.map(note => {
                    if(current == note) {
                        return (
                            <Editable editMode={editMode} setEditMode={setEditMode} changeTitle={changeTitle} note={note} save={save} remove={remove}/>
                        )
                    }
                    return (
                        <p className='hover:cursor-pointer w-full p-2' onClick={e => {e.preventDefault; setCurrent(note); setText(note.content)}}>{note.title}</p>
                    )
                })}
                </div>
            </div>
        </div>
        <div className='flex h-screen flex-col'>
        <div className='flex justify-start items-center p-1 border-2'>
            <h3 className='flex-1 uppercase text-center'>{current?.title}</h3>
            <i onClick={e => setListVisibility(prev => !prev)} className="mr-2 duration-300 hover:scale-110 cursor-pointer lg:text-xl fa-solid fa-expand"></i>
            </div>
        <textarea value={text} onChange={e => setText(e.target.value)} disabled={current == null} className='w-screen outline-none bg-gray-500 border-2 border-white h-screen overflow-scroll break-all p-1 align-top'></textarea>
        </div>
    </div>
  )
}

export default UserDashboard