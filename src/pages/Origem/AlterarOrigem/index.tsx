import { PageContent } from "@havan/react-components";
import React from "react";
import { useParams } from "react-router-dom";
import { Forms } from "../../../Componentes/Forms";

export const AlterarOrigem: React.FC = () => {
  const id = useParams();
  console.log(id)
  
  
  return (
    <PageContent title="Origem">    
      <Forms id={id}></Forms>
    </PageContent>
  );
};