import React from "react"
import { supabase } from "../supabaseClient"
import { DataGrid } from "@mui/x-data-grid"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"

export default function BookmarkList({
  bookmarks = [],
  setBookmarks,
  loading,
}) {
  const deleteBookmark = async (id) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

    if (!error) {
      setBookmarks((prev) =>
        prev.filter((bookmark) => bookmark.id !== id)
      )
    }
  }

  // 🟢 Define DataGrid columns
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "url",
      headerName: "URL",
      flex: 1.5,
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1976d2", textDecoration: "none" }}
        >
          {params.value}
        </a>
      ),
    },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteBookmark(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  return (
    <div style={{ padding: "40px" }}>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={bookmarks}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  )
}
