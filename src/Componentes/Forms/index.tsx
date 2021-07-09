import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { decode } from "jsonwebtoken";

import { ContainerDiv } from "./styles";

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



export const Forms= (id: any) => {
  var [selectValue, setSelectValue] = React.useState("");
  var list = [
    {id: "true", name: 'Ativo'},
    {id: "false", name: 'Inativo'},
  ];

  var idNum = String(id.id.id);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@HavanLabs:token");
    const user = localStorage.getItem("@HavanLabs:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return {
        token,
        user: JSON.parse(user),
      };
    }
    

    return {} as AuthState;
  });

  const getUser = useCallback((token: string) => {
    const { nom, sub, id } = decode(token) as { nom: string; sub: string; id: string };
    const user = {
      nome: nom,
      codigo: sub,
      id: id,
    };

    localStorage.setItem("@HavanLabs:token", token);
    localStorage.setItem("@HavanLabs:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
    console.log(user)
  }, []);

  
  const initialValue = {
    idUsuarioAlteracao: Number(data.user.id),
    idOrigemCadastro: Number(idNum),
    ativo: selectValue,
    origem: "",
    senha: ""
  }

  console.log(initialValue)

  const [values, setValues] = useState(initialValue);
  const history = useHistory();  
  
  useEffect(() => {
    if (id) {
      api.get(`/OrigemCadastro/ObterOrigemCadastro/${idNum}`)
      .then((response) => { 
        setValues(response.data);
        console.log(response.data)
      
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  function onChange(ev: { target: { name: any; value: any; }; }) {
    const { name, value } = ev.target;

    setValues({ ...values, [name]: value });
  }
  console.log(values)

  
  function onSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    var ativoBool = true

    if (selectValue === "false") {
      ativoBool = false

    }

    api.post('/OrigemCadastro/AlterarOrigemCadastro', {
      idUsuarioAlteracao: Number(data.user.id),
      idOrigemCadastro: Number(idNum),
      ativo: ativoBool
      
    })
    
      .then((response) => {
        setValues(response.data);
        
        history.push('/origem');
      });  
      console.log(selectValue)

    }
  return (   
    
    <ContainerDiv>
      <form className="row g-3" onSubmit={onSubmit}>
          <div className="form-floating col-md-1">
            <input type="text" className="form-control" id="Origem" placeholder="Origem" name="origem" onChange={onChange} value={values.idOrigemCadastro} disabled/>
            <label htmlFor="floatingInput">Id</label>
          </div>
          <div className="form-floating col-md-3">
            <input type="text" className="form-control" id="Origem" placeholder="Origem" name="origem" onChange={onChange} value={values.origem} disabled/>
            <label htmlFor="floatingInput">Origem</label>
          </div>
          <div className="form-floating col-md-3">
            <input type="text" className="form-control" id="senha" placeholder="Senha" name="senha" onChange={onChange} value={values.senha} disabled/>
            <label htmlFor="floatingInput">Senha</label>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select className="form-select" id="ativo" value={selectValue} aria-label="ativo" name="ativo" onChange={e => setSelectValue(e.target.value)}>
                {list.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>Confirmar</button>
          </div>
          <tr></tr>
        </form>   
    </ContainerDiv>
  );
};
