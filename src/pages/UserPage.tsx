import { useMemo, useState } from "react";
import { type User } from "../Types";
import { Container, Fab, IconButton } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  DeleteOutlined,
  EditOutlined,
  PersonAddAlt1,
} from "@mui/icons-material";
import UserDialog from "../components/dialog/UserDialog";
import {
  addUser,
  getAllUsers,
  removeUser,
  updateUser,
} from "../utils/database/user";

// type CellProps = {
//   cell: MRT_Cell<User>;
// };

function UserTable() {
  const queryClient = useQueryClient();

  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

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
      {
        accessorKey: "dob",
        header: "DOB",
        // Cell: ({ cell }: CellProps) => {
        //   return <div>{dob ? new Date(dob).toLocaleDateString() : "-"}</div>;
        // },
      },
    ],
    []
  );

  const userTable = useMaterialReactTable({
    columns: userColumns,
    data: users || [],

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
        "dob",
        "mrt-row-actions",
      ],
    },
    muiTablePaperProps: {
      sx: {
        display: "flex",
        flexDirection: "column",
        height: "-webkit-fill-available",
      },
    },
    muiTableContainerProps: {
      sx: {
        height: "-webkit-fill-available",
      },
    },
    renderRowActions: ({ row }) => (
      <div style={{ display: "flex" }}>
        <IconButton onClick={() => editUser(row.original)}>
          <EditOutlined />
        </IconButton>
        <IconButton color="error" onClick={() => deleteUser(row.original)}>
          <DeleteOutlined />
        </IconButton>
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <Fab
        variant="extended"
        size="medium"
        onClick={() => {
          setOpenUserDialog(true);
        }}
        sx={{ mb: "1rem" }}
      >
        <PersonAddAlt1 sx={{ mr: "1rem" }} /> Create New User
      </Fab>
    ),
  });

  async function handleSaveUser(user: User, action: "create" | "update") {
    if (action === "create") {
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers ? [...prevUsers, user] : [user]
      );
      await addUser(user);
    } else if (action === "update") {
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers?.map((u) => (u.id === user.id ? user : u))
      );
      await updateUser(user);
    }
    setOpenUserDialog(false);
    setSelectedUser(undefined);
  }

  function handleCloseDialog() {
    setSelectedUser(undefined);
    setOpenUserDialog(false);
  }

  function editUser(user: User) {
    setSelectedUser(user);
    setOpenUserDialog(true);
  }

  async function deleteUser(user: User) {
    // `confirm` is synchronous, so no need for `await`
    const isConfirmed = await confirm(
      `Are you sure you want to delete this user ${user.name}?`
    );

    if (isConfirmed) {
      await removeUser(user.id);
      queryClient.setQueryData<User[]>(["users"], (prevUsers) =>
        prevUsers?.filter((u) => u.id !== user.id)
      );
    }
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
    <Container sx={{ marginBlock: 3 }}>
      <UserTable />
    </Container>
  );
};

export default UserPage;
