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

interface SidebarProps {
  width: string;
}

const Sidebar: FC<SidebarProps> = ({ width }) => {
  return (
    <Box sx={{ width: width, borderRight: 1, borderColor: "divider" }}>
      <List component="nav">
        {mainItems.map((item, index) => (
          <ListItemButton key={index} onClick={item.onClick}>
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
