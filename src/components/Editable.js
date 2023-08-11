import React,{useState} from 'react'

const Editable = ({changeTitle, save, remove, note, editMode, setEditMode}) => {
    const [title, setTitle] = useState(note.title)

  return (
    <>
        {editMode && 
        <>
        <form onSubmit={e => changeTitle(e, title)} className='p-1 flex items-center gap-x-2 lg:gap-x-3'>
        <input required value={title} onChange={e => setTitle(e.target.value)} placeholder='New Title...' className='dark:text-white dark:bg-black text-black p-1 rounded-xl w-full max-w-[10ch] lg:max-w-[40ch]'/>
        <i onClick={e => changeTitle(e, title)} className="fa-solid fa-check dark:bg-black p-1 rounded-full border-2 duration-300 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-black cursor-pointer"></i>
        <i onClick={e => setEditMode(prev => !prev)} className="fa-solid fa-xmark dark:bg-black p-1 rounded-full border-2 duration-300 hover:bg-gray-300 dark:hover:bg-white dark:hover:text-black cursor-pointer"></i>
        </form>
        </>
        }
        {!editMode &&
        <div className='hover:cursor-pointer w-full p-2 bg-gray-200 dark:bg-white dark:text-black flex justify-between items-center'>
        <p className='' onClick={e => {e.preventDefault; setCurrent(note); setText(note.content)}}>{note.title}</p>
        <div className='flex gap-x-2 lg:gap-x-5 break-all'>
            <i onClick={save} id="save-icon" className="fa-solid duration-300 hover:text-green-500 scale-110 cursor-pointer fa-floppy-disk"></i>
            <i onClick={e => setEditMode(prev => !prev)} className="fa-solid duration-300 hover:text-blue-500 scale-110 cursor-pointer fa-pen-to-square"></i>
            <i onClick={remove} id="delete-icon" className="fa-solid duration-300 hover:text-red-500 scale-110 cursor-pointer fa-trash"></i>
        </div>
        </div>
        }
    </>
  )
}

export default Editable