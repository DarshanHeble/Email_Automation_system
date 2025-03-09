import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CableOutlined,
  DeleteOutlined,
  PersonAddAlt1,
} from "@mui/icons-material";
import { Button, Container, Fab, IconButton, Stack } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

import { updateEmailTaskTemplateId } from "../utils/database/emailTask";
import { getTemplates } from "../utils/database/templates";
import { Template, User } from "../Types";

import ArraySelectorDialog from "../components/dialog/ArraySelectorDialog";
import {
  getTemplateDataByTaskId,
  getUsersByTaskId,
} from "../utils/database/utils";
import {
  addTaskUserLinkage,
  deleteTaskUserLinkage,
} from "../utils/database/taskUserLinkage";
import { getAllUsers } from "../utils/database/user";

function EmailTask() {
  const { taskId } = useParams<{ taskId: string }>();

  if (!taskId) return null;

  return (
    <Container sx={{ marginBlock: 3 }}>
      <EmailTaskUserPage taskId={taskId} />
    </Container>
  );
}

const EmailTaskUserPage: FC<{ taskId: string }> = ({ taskId }) => {
  const queryClient = useQueryClient();

  const [open, SetOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [currAction, setCurrAction] = useState<"template add" | "user add">(
    "user add"
  );
  // const [selectedField, setSelectedField] = useState<User>();

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const { data: template } = useQuery({
    queryKey: ["template"],
    queryFn: () => getTemplateDataByTaskId(taskId),
  });

  // Update the selectedTemplate state when template data changes
  useEffect(() => {
    if (template) {
      setSelectedTemplate(template);
    }
  }, [template]);

  const { data: taskUsers } = useQuery({
    queryKey: ["taskUserLinkage", taskId],
    queryFn: () => getUsersByTaskId(taskId),
  });

  const addUserMutation = useMutation({
    mutationFn: (userId: string) => addTaskUserLinkage(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskUserLinkage", taskId] });
    },
  });

  const handleTemplateChange = async (value: Template | null) => {
    setSelectedTemplate(value);
    if (value && taskId) {
      try {
        await updateEmailTaskTemplateId(taskId, value.id);
        console.info("Template ID updated successfully.");
      } catch (error) {
        console.error("Failed to update template ID:", error);
      }
    }
  };

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteTaskUserLinkage(taskId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskUserLinkage", taskId] });
    },
  });

  const handleDeleteUser = (user: User) => {
    deleteUserMutation.mutate(user.id);
  };

  const handleAddUser = (user: User) => {
    addUserMutation.mutate(user.id);
    SetOpen(false);
  };

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
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: userColumns,
    data: taskUsers || [],
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
        {/* <IconButton onClick={() => editUser(row.original)}>
          <EditOutlined />
        </IconButton> */}
        <IconButton
          color="error"
          onClick={() => handleDeleteUser(row.original)}
        >
          <DeleteOutlined />
        </IconButton>
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={1}
      >
        <Fab
          variant="extended"
          size="medium"
          onClick={() => {
            setCurrAction("user add");
            SetOpen(true);
          }}
          sx={{ mb: "1rem" }}
        >
          <PersonAddAlt1 sx={{ mr: "1rem" }} /> Add New User
        </Fab>
        <Button
          sx={{ mb: "1rem" }}
          variant="outlined"
          onClick={() => {
            setCurrAction("template add");
            SetOpen(true);
          }}
        >
          <CableOutlined sx={{ mr: 1 }} />
          {selectedTemplate ? selectedTemplate.name : "Connect a Template"}
        </Button>
        <Button>Select a field </Button>
      </Stack>
    ),
  });

  function handleClose() {
    SetOpen(false);
  }

  const availableUsers = useMemo(() => {
    if (!users || !taskUsers) return [];
    return users.filter(
      (user) => !taskUsers.some((taskUser) => taskUser.id === user.id)
    );
  }, [users, taskUsers]);

  return (
    <>
      <MaterialReactTable table={table} />
      {currAction === "template add" ? (
        <ArraySelectorDialog<Template>
          open={open}
          title="Connect a template"
          options={templates || []}
          text={selectedTemplate}
          getOptionLabel={(option) => option.name}
          onClose={handleClose}
          onSubmit={(value) => {
            if (value) handleTemplateChange(value);
          }}
        />
      ) : (
        <ArraySelectorDialog<User>
          open={open}
          title="Connect a User"
          options={availableUsers || []}
          text={null}
          getOptionLabel={(option) => option.name}
          onClose={handleClose}
          onSubmit={(value) => {
            if (value) handleAddUser(value);
          }}
        />
      )}
    </>
  );
};

export default EmailTask;
