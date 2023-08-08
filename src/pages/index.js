import Image from 'next/image'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import UserDashboard from '@/components/UserDashboard'
import { useAuth } from '@/context/AuthContext'
import { db } from '../../firebase'
import {doc, getDoc, updateDoc, arrayRemove, arrayUnion, setDoc}from 'firebase/firestore'

const inter = Inter({ subsets: ['latin'] })


export default function Home({todos}) {
  const {currentUser} = useAuth()
  return (
    <>
    {currentUser && <UserDashboard todos={todos}/>}
    {!currentUser && <Login/>}
    </>
  )
}
