
import React from 'react'

// import { useEffect, useState } from "react"
// import { supabase } from "./supabaseClient"
// import Login from "./components/Login"
// import BookmarkForm from "./components/BookmarkForm"
// import BookmarkList from "./components/BookmarkList"


// export default function App() {
//   const [user, setUser] = useState(null)

//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data.session?.user ?? null)
//     })

//     supabase.auth.onAuthStateChange((_event, session) => {
//       setUser(session?.user ?? null)
//     })
//   }, [])

//   if (!user) return <Login />

//   return (
//     <div className="max-w-xl mx-auto mt-10">
//       <h1 className="text-2xl font-bold">Smart Bookmark App</h1>
//       <BookmarkForm user={user} />
//       <BookmarkList user={user} />
//     </div>
//   )
// }

import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <Dashboard user={session.user} />
      )}
    </>
  )
}
