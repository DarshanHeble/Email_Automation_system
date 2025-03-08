import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { mainItems } from "../constants/sidebar";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import GetNameDialog from "./dialog/GetNameDialog";
import { useState, MouseEvent } from "react";
import { v4 } from "uuid";
import {
  addEmailTask,
  deleteEmailTask,
  getAllEmailTasks,
} from "../utils/database/emailTask";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [open, setOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
    taskId: string | null;
  } | null>(null);

  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  async function saveEmailTask(name: string) {
    const id = v4();
    addEmailTask(id, name)
      .then(() => refetch())
      .catch((error) => alert(`Failed to add email task: ${error.message}`));
  }

  const { data, refetch } = useQuery({
    queryKey: ["emailTasks"],
    queryFn: getAllEmailTasks,
  });

  const handleContextMenu = (event: MouseEvent, taskId: string) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
            taskId,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };
  const handleEmailTaskDelete = async () => {
    if (contextMenu?.taskId) {
      await deleteEmailTask(contextMenu.taskId);
      refetch();
    }

    setContextMenu(null);
  };

  return (
    <>
      <Box
        sx={{
          minWidth: isOpen ? "14rem" : "2rem",
          borderRight: 1,
          borderColor: "divider",
          paddingTop: 2,
          // transition: "all 0.5s ease",
        }}
      >
        <List component="nav">
          <ListItemButton onClick={() => setOpen(true)}>
            <ListItemIcon>
              <AddOutlined />
            </ListItemIcon>
            <ListItemText primary="New Task" />
          </ListItemButton>
          {mainItems.map((item, index) => (
            <ListItemButton
              key={index}
              // sx={{ transition: "all 2s ease" }}
              onClick={() => handleNavigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isOpen && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>All Task</ListSubheader>
          {data ? (
            data.length > 0 ? (
              data?.map((task, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleNavigate(`/email-task/${task.id}`)}
                  onContextMenu={(event) => handleContextMenu(event, task.id)}
                >
                  <ListItemIcon>
                    <EmailOutlined />
                  </ListItemIcon>
                  <ListItemText primary={task.name} />
                </ListItemButton>
              ))
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ paddingInlineStart: "1rem" }}
              >
                No Tasks Available
              </Typography>
            )
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
              <CircularProgress />
            </Box>
          )}
        </List>
      </Box>

      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>
          <EditOutlined sx={{ mr: 2 }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleEmailTaskDelete} sx={{ color: "red" }}>
          <DeleteOutlined sx={{ mr: 2 }} /> Delete
        </MenuItem>
      </Menu>

      <GetNameDialog
        open={open}
        label="Email Task Name"
        onClose={() => setOpen(false)}
        onSubmit={saveEmailTask}
      />
    </>
  );
};

export default Sidebar;
