import React from "react"
import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import BookmarkForm from "./BookmarkForm"
import BookmarkList from "./BookmarkList"

export default function Dashboard({ user }) {
  const [bookmarks, setBookmarks] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (!error) {
      setBookmarks(data || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchBookmarks()
  }, [])

  return (
    <div>
      {/* ✅ PASS setBookmarks HERE */}
      <BookmarkForm
        user={user}
        setBookmarks={setBookmarks}
      />

      <BookmarkList
        bookmarks={bookmarks}
        setBookmarks={setBookmarks}
        loading={loading}
      />
    </div>
  )
}
