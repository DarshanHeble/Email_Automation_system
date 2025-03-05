import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { mainItems } from "../constants/sidebar";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import { AddOutlined, EmailOutlined } from "@mui/icons-material";
import GetNameDialog from "./GetNameDialog";
import { useState } from "react";
import { v4 } from "uuid";
import { addEmailTask, getAllEmailTasks } from "../utils/database/emailTask";
import { useQuery } from "@tanstack/react-query";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  async function saveEmailTask(name: string) {
    const id = v4();
    addEmailTask(id, name).catch((error) =>
      alert(`Failed to add email task: ${error.message}`)
    );
  }

  const { data } = useQuery({
    queryKey: ["emailTasks"],
    queryFn: getAllEmailTasks,
  });

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
          {data?.map((task, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleNavigate(`/email-task/${task.id}`)}
            >
              <ListItemIcon>
                <EmailOutlined />
              </ListItemIcon>
              <ListItemText primary={task.name} />
            </ListItemButton>
          ))}
        </List>
      </Box>

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
