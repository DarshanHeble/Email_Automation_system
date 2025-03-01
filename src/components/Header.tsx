import { Box, Toolbar } from "@mui/material";

// // Define the structure of a single record from the CSV
// interface EmailRecord {
//   name: string;
//   email: string;
//   subject: string;
//   body: string;
//   time: string; // Time as string, you can use Date if needed
// }

const Header = () => {
  return (
    <Toolbar sx={{ padding: "16px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Hello</h2>
      </Box>
    </Toolbar>
  );
};

export default Header;
