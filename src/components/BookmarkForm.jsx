// import React, { useState } from "react"
// import Box from "@mui/material/Box"
// import TextField from "@mui/material/TextField"
// import Button from "@mui/material/Button"
// import Typography from "@mui/material/Typography"
// import AddIcon from "@mui/icons-material/Add"

// export default function BookmarkForm({ onAdd }) {
//   const [title, setTitle] = useState("")
//   const [url, setUrl] = useState("")

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!title || !url) return

//     onAdd({ title, url })

//     setTitle("")
//     setUrl("")
//   }

//   return (
//     <Box sx={{ width: "100%", p: 4 }}>
      
//       {/* 🔵 Heading */}
//       <Typography
//         variant="h4"
//         sx={{
//           fontWeight: "bold",
//           mb: 3,
//           textAlign: "center",
//           background: "linear-gradient(90deg, #1976d2, #42a5f5)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Smart Bookmark App
//       </Typography>

//       {/* 🟢 Single Line Form */}
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           gap: 2,
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           label="Bookmark Title"
//           variant="outlined"
//           size="small"
//           fullWidth
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <TextField
//           label="Bookmark URL"
//           variant="outlined"
//           size="small"
//           fullWidth
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{
//             height: "40px",
//             px: 3,
//             fontWeight: "bold",
//           }}
//         >
//           Add
//         </Button>
//       </Box>
//     </Box>
//   )
// }

import React, { useState } from "react"
import { supabase } from "../supabaseClient"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"

export default function BookmarkForm({ user, setBookmarks }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !url) return

    const { data, error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url,
          user_id: user.id,
        },
      ])
      .select()

    if (!error && data) {
      setBookmarks((prev) => [...data, ...prev])
      setTitle("")
      setUrl("")
    }
  }

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 3,
          textAlign: "center",
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Smart Bookmark App
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="Bookmark Title"
          size="small"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Bookmark URL"
          size="small"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ height: "40px", px: 3, fontWeight: "bold" }}
        >
          Add
        </Button>
      </Box>
    </Box>
  )
}

