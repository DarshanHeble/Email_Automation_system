import {
  DashboardOutlined,
  LibraryAddOutlined,
  PersonOutlined,
} from "@mui/icons-material";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const mainItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/", // Correct path for navigation
  },
  {
    label: "Template Library",
    icon: <LibraryAddOutlined />,
    path: "/template-library", // Correct path for navigation
  },
  {
    label: "Manage User",
    icon: <PersonOutlined />,
    path: "/userPage", // Correct path for navigation
  },
];
