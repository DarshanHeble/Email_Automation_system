import { FC, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { Container, Fab, IconButton, Stack } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";

import { updateEmailTaskTemplateId } from "../utils/database/emailTask";
import { getTemplates } from "../utils/database/templates";
import { Template, User } from "../Types";
import { DeleteOutlined, PersonAddAlt1 } from "@mui/icons-material";

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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );

  const { data: templates } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  const handleTemplateChange = async (_event: any, value: Template | null) => {
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
        <IconButton color="error" onClick={() => deleteUser(row.original)}>
          <DeleteOutlined />
        </IconButton>
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <Stack direction={"row"}>
        <Fab
          variant="extended"
          onClick={() => {
            setOpenUserDialog(true);
          }}
          sx={{ mb: "1rem" }}
        >
          <PersonAddAlt1 sx={{ mr: "1rem" }} /> Create New User
        </Fab>
        <Autocomplete
          options={templates || []}
          getOptionLabel={(option) => option.name}
          value={selectedTemplate}
          onChange={handleTemplateChange}
          renderInput={(params) => (
            <TextField {...params} label="Select Template" variant="outlined" />
          )}
        />
      </Stack>
    ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default EmailTask;
