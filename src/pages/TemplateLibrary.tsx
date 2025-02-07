import { Card, CardActionArea, CardContent, Grid2 } from "@mui/material";
import TemplateCard from "../components/TemplateCard";
import { Add } from "@mui/icons-material";
import GetNameDialog from "../components/GetNameDialog";
import { useState } from "react";

function TemplateLibrary() {
  const [openNameDialog, setOpenNameDialog] = useState(false);

  function handleDialogOpen() {
    setOpenNameDialog(true);
  }

  function handleDialogSubmit(name: string) {
    console.log(name);
  }

  function handleDialogClose() {
    setOpenNameDialog(false);
  }

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <TemplateCard />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ height: "100%" }}>
            <CardActionArea sx={{ height: "100%" }} onClick={handleDialogOpen}>
              <CardContent sx={{ display: "grid", placeItems: "center" }}>
                <Add sx={{ fontSize: "6rem" }} />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
      {/* <TemplateEditor /> */}
      <GetNameDialog
        open={openNameDialog}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
      />
    </div>
  );
}

export default TemplateLibrary;
