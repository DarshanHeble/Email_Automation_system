import {
  Box,
  Divider,
  Fab,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { mainItems } from "../constants/sidebar";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  function handleNavigate(path: string) {
    navigate(path);
  }

  return (
    <Box
      sx={{
        minWidth: isOpen ? "14rem" : "2rem",
        borderRight: 1,
        borderColor: "divider",
        paddingTop: 2,
        // transition: "all 0.5s ease",
      }}
    >
      <Fab
        size="medium"
        sx={{ marginInlineStart: 2 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu />
      </Fab>
      <List component="nav">
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
    </Box>
  );
};

export default Sidebar;
