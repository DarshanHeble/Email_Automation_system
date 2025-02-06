import { Dashboard, LibraryAdd } from "@mui/icons-material";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const mainItems: MenuItem[] = [
  {
    label: "Dashboard",
    icon: <Dashboard />,
    path: "/", // Correct path for navigation
  },
  {
    label: "Template Library",
    icon: <LibraryAdd />,
    path: "/template-library", // Correct path for navigation
  },
];
