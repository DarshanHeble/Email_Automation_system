import { Add, Dashboard, LibraryAdd } from "@mui/icons-material";

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const mainItems: MenuItem[] = [
  {
    label: "New",
    icon: <Add />,
    onClick: () => console.log("Add"),
  },
  {
    label: "Dashboard",
    icon: <Dashboard />,
    onClick: () => console.log("Darsboard"),
  },
  {
    label: "Template Library",
    icon: <LibraryAdd />,
    onClick: () => console.log("Template Library"),
  },
];
