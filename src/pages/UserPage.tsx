import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { User } from "../Types";
import { Container, Fab, IconButton } from "@mui/material";
import { EditOutlined, PersonAddAlt1 } from "@mui/icons-material";
import UserDialog from "../components/dialog/UserDialog";
import { addUser } from "../utils/database/user";

function UserTable() {
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const userColumns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
    ],
    []
  );

  const userTable = useMaterialReactTable({
    columns: userColumns,
    data: [],

    enableRowNumbers: true,
    enableEditing: true,
    enableRowActions: true,
    // Disable some features
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    getRowId: (row) => row.id,
    initialState: {
      columnOrder: [
        "mrt-row-numbers",
        "id",
        "name",
        "email",
        "mrt-row-actions",
      ],
    },
    renderRowActions: ({ row }) => (
      <div>
        <IconButton onClick={() => editUser(row.original)}>
          <EditOutlined />
        </IconButton>
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <Fab
        variant="extended"
        onClick={() => {
          setOpenUserDialog(true);
        }}
        sx={{ mb: "1rem" }}
      >
        <PersonAddAlt1 sx={{ mr: "1rem" }} /> Create New User
      </Fab>
    ),
  });

  async function handleSaveUser(user: User) {
    console.log(user);
    await addUser(user);
    setOpenUserDialog(false);
  }

  function handleCloseDialog() {
    setOpenUserDialog(false);
  }

  function editUser(user: User) {
    setSelectedUser(user);
    setOpenUserDialog(true);
  }
  return (
    <>
      <MaterialReactTable table={userTable} />
      <UserDialog
        open={openUserDialog}
        user={selectedUser}
        onSave={handleSaveUser}
        onClose={handleCloseDialog}
      />
    </>
  );
}

const UserPage = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <UserTable />
    </Container>
  );
};

export default UserPage;
