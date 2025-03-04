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
    path: "/",
  },
  {
    label: "Template Library",
    icon: <LibraryAddOutlined />,
    path: "/template-library",
  },
  {
    label: "Manage User",
    icon: <PersonOutlined />,
    path: "/userPage",
  },
];
