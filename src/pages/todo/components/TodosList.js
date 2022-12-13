import { Delete, Done, Edit, SettingsBackupRestore } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeTodoStatus } from "../../../firebase.js";

export default function TodosList({ id, title, todostatus, createdby }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  function editTodoHandle() {
    navigate(`/edit/${id}`);
  }

  function completeTodoHandle(id, todoStatus) {
    changeTodoStatus(id, todoStatus);
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
        {todostatus !== "Deleted" && (
          <Button
            onClick={() => {
              completeTodoHandle(id, "Deleted");
            }}
            sx={{ color: "inherit" }}
          >
            <Delete />
          </Button>
        )}
        {todostatus !== "Completed" && (
          <Button
            onClick={() => {
              completeTodoHandle(id, "Completed");
            }}
            sx={{ color: "inherit" }}
          >
            <Done />
          </Button>
        )}

        <Button onClick={editTodoHandle} sx={{ color: "inherit" }}>
          <Edit />
        </Button>

        {user.status === "admin" && todostatus.toString() !== "Pending" && (
          <Button
            onClick={() => {
              completeTodoHandle(id, "Pending");
            }}
            sx={{ color: "inherit" }}
          >
            <SettingsBackupRestore />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
