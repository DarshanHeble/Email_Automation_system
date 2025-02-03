import React, { useState } from "react";
import { Button, Typography, Box, Toolbar } from "@mui/material";
import { invoke } from "@tauri-apps/api/core";

// Define the structure of a single record from the CSV
interface EmailRecord {
  name: string;
  email: string;
  subject: string;
  body: string;
  time: string; // Time as string, you can use Date if needed
}

const Header: React.FC = () => {
  const [fileName, setFileName] = useState<string>("");
  const [sortedData, setSortedData] = useState<EmailRecord[]>([]); // Use EmailRecord type

  return (
    <Toolbar sx={{ padding: "16px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {fileName && <Typography variant="body1">{fileName}</Typography>}
        <Button variant="contained" component="label" color="primary">
          Choose CSV
          <input type="file" accept=".csv" hidden />
        </Button>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        {sortedData.length > 0 && (
          <Typography variant="h6">Sorted Emails</Typography>
        )}
        <ul>
          {sortedData.map((record, index) => (
            <li key={index}>
              <Typography variant="body2">
                {record.name} - {record.email} - {record.time}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Toolbar>
  );
};

export default Header;
