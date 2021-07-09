import { PageContent } from "@havan/react-components";
import axios from "axios";
import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../services/api";
import { decode } from "jsonwebtoken";
import { ContainerDiv } from "./styles";
import { createContext } from "react";

type User = {
  nome: string;
  codigo: string;
  id: string;
  avatar?: string;
};

type AuthState = {
  token: string;
  user: User;
};

type AuthContextData = {
  signOut(): void;
  user: User;
  signIn(token: string): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const CadastroOrigem: React.FC = ({ children } ) => {
  //const { id } = useParams();

 


  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@HavanLabs:token");
    const user = localStorage.getItem("@HavanLabs:user");


    

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${user}`;

      return {
        token,
        user: JSON.parse(user),
      };

    }
    

    return {} as AuthState;

    
  });
  console.log(data.user)

  const getUser = useCallback((token: string) => {
    const { nom, sub, id, rol } = decode(token) as { nom: string; sub: string; id: string, rol: string };
    const user = {
      nome: nom,
      codigo: sub,
      id: id,
      role: rol

    };
    

    localStorage.setItem("@HavanLabs:token", token);
    localStorage.setItem("@HavanLabs:user", JSON.stringify(user));


    setData({ token, user });
    console.log(user)
  }, []);

  const initialValue = {
    origem: "",
    idUsuarioCadastro: Number(data.user.id),
    finalidade: ""
  }  
  
  const [values, setValues] = useState(initialValue);
  const history = useHistory();

  function onChange(ev: { target: { name: any; value: any; }; }) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }

  const [status, setStatus] = useState({
    origem: "",
    senha: "",
    mensagem: ""
  })

  function route(){
    history.push('/origem');
  }


  async function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    const response =  await axios.post('https://clienteapi.dev.havan.com.br/OrigemCadastro/AdicionarOrigemCadastro', values);
    setStatus(response.data);     

  }    

  return (
    <PageContent title="Origem" >
      <ContainerDiv >
        <form onSubmit={onSubmit}>
          <form className="row g-3">
            <div className="form-floating col-md-3">
              <input type="text" className="form-control" id="origem" placeholder="Origem" value={values.origem} name="origem" onChange={onChange} />
              <label htmlFor="floatingInput">Origem</label>
            </div>
            <div className=" form-floating col-md-9">
              <input type="text" className="form-control" id="finalidade" placeholder="Finalidade" value={values.finalidade} name="finalidade" onChange={onChange} />
              <label htmlFor="floatingInput">Finalidade</label>
            </div>
            <tr></tr>
          </form>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Confirmar</button>
          </div>
          <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Confirmação de Cadastro</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  {status.origem ? (
                    <p>{status.mensagem} <br></br>
                    Sua origem cadastrada é: {status.origem} <br></br> 
                    Sua Senha é: {status.senha}
                    </p>
                  ): 
                    <p>{status.mensagem}</p>                         
                  }
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={route}>OK</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </ContainerDiv>
    </PageContent>
  );
};
