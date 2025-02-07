import { Card, CardActionArea, CardContent } from "@mui/material";

function TemplateCard() {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div
            className="Preveiw"
            style={{ height: "5rem", borderBottom: "1px solid" }}
          >
            Preview
          </div>
          <h1>Title</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TemplateCard;
