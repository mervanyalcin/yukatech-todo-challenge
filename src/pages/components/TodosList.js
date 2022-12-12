import { Delete, Done, Edit, SettingsBackupRestore } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { completeTodo, deleteTodo, removeFromDeleted } from "../../firebase.js";

export default function TodosList({ id, title, todostatus, createdby }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  function deleteTodoHandle() {
    deleteTodo(id);
  }

  function editTodoHandle() {
    navigate(`/edit/${id}`)
    
  }

  function completeTodoHandle() {
    completeTodo(id);
  }

  function removeFromDeletedHandle() {
    removeFromDeleted(id);
  }

  return (
    <TableRow
      key={id}
      sx={{
        mb: "5px",
        ...((todostatus === "Deleted" && {
          backgroundColor: "rgba(255, 0, 0, 0.4)",
        }) ||
          (todostatus === "Completed" && {
            backgroundColor: "rgba(0, 255, 0, 0.6)",
          })),
      }}
    >
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell align="right">{createdby}</TableCell>
      <TableCell align="right">{todostatus} </TableCell>
      <TableCell align="right">
        <Button onClick={deleteTodoHandle} sx={{ color: "inherit" }}>
          <Delete />
        </Button>
        <Button onClick={editTodoHandle} sx={{ color: "inherit" }}>
          <Edit />
        </Button>
        <Button onClick={completeTodoHandle} sx={{ color: "inherit" }}>
          <Done />
        </Button>
        {user.status === "admin" && todostatus.toString() !== "Pending" && (
          <Button onClick={removeFromDeletedHandle} sx={{ color: "inherit" }}>
            <SettingsBackupRestore />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
