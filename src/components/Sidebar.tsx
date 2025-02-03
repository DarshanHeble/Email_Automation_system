import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { mainItems } from "../constants/sidebar";
import { FC } from "react";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

interface SidebarProps {
  width: string;
}

const Sidebar: FC<SidebarProps> = ({ width }) => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <Box sx={{ width: width, borderRight: 1, borderColor: "divider" }}>
      <List component="nav">
        {mainItems.map((item, index) => (
          <ListItemButton key={index} onClick={() => handleNavigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
    </Box>
  );
};

export default Sidebar;
