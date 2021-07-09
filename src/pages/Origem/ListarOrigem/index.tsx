import { PageContent } from "@havan/react-components";
import { Container } from "./styles";
import Registros, {  } from "../../../Componentes/TabelaRegistroOrigem";


export const ListarOrigem: React.FC = () => { 

  return (
    <PageContent title="Origem">
      <Container>        
        <Registros ></Registros>            
      </Container>        
    </PageContent>
  );
};
