import { Card, CardActionArea, CardContent } from "@mui/material";
import { FC } from "react";

interface TemplateCardProps {
  title: string;
  preview: string;
}

const TemplateCard: FC<TemplateCardProps> = ({ title, preview }) => {
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div
            className="Preview"
            style={{ height: "5rem", borderBottom: "1px solid" }}
            dangerouslySetInnerHTML={{ __html: preview }}
          />
          <h1>{title}</h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TemplateCard;
