import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";

type ModelEditingProps = {};

const ModelEditing = (props: ModelEditingProps) => {
  return (
    <Card className="section">
      <CardHeader
        className="section-title"
        title="Go further and fix the bias!"
      />
      <CardContent className="section-content">
        <p>So much editing</p>
        <p>Unbelievable</p>
      </CardContent>
    </Card>
  );
};

export default ModelEditing;
