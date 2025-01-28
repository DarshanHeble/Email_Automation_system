import { useState } from "react";
import { Button, Typography, Box, Toolbar } from "@mui/material";

const Header = () => {
  const [fileName, setFileName] = useState("");

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFileName(file.name); // Set the name of the selected file
    }
  };

  return (
    <Toolbar sx={{ padding: "16px" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {fileName && (
          <Typography variant="body1">{fileName}</Typography> // Display file name
        )}
        <Button variant="contained" component="label" color="primary">
          Choose CSV
          <input type="file" accept=".csv" hidden onChange={handleFileChange} />
        </Button>
      </Box>
    </Toolbar>
  );
};

export default Header;
