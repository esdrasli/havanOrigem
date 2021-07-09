import React, { useState, useEffect } from "react";
import { BotoesCabecalho, ContainerDiv } from "../TabelaRegistroOrigem/styles";


import { Link } from "react-router-dom";
import api from "../../services/api";


interface origem {
  id: string
  origem: string,
  dataCadastro: Date,
  dataAlteracao?: Date,
  ativo: boolean,
  finalidade: string,
  idUsuarioAlteracao?: string,
  idUsuarioCadastro?: string 
}
 
function Registros({data =[]}){
  let [order, setOrder] = useState(1);
  let [colunmOrder, setColunmOrder] = useState('origem');
  let [origens, setOrigens] = useState<origem[]>([]);
  let [filter, setFilter] = useState('');

  const handleOrder = (fieldName: React.SetStateAction<string>) => {
    setOrder(-order);
    setColunmOrder(fieldName);
  }

  const handleFilter = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilter(e.target.value)
  }
  const origemFiltro = origens
  .filter((origem) => origem.origem.toLowerCase().includes(filter.toLowerCase()));

  var [selectValue, setSelectValue] = React.useState("");
  var list = [
    {id: "1", name: 'ativo'},
    {id: "2", name: 'inativo'},
  ];

  data = data.sort((a, b) => {
    return a[colunmOrder] < b[colunmOrder] ? -order : order;
  });  

  useEffect(() => {
   
    api.get('/OrigemCadastro/ObterTodos')
    .then((response) => {
      
      setOrigens(response.data)
     
    });
  }, [data]);

  function filtroAtivo(ativo? : boolean) {
    if ((selectValue === "1" && ativo) || (selectValue === "2" && !ativo) || (selectValue === "")){     
        return true
      }else {
        return false
      }   
  }
   
  return <ContainerDiv>  

  <form className="row g-6">
          <div className="form-floating col-md-4">
            <input 
            type="search" 
            className="form-control" 
            id="search"  
            value={filter}
            placeholder="Busca" 
            onChange={handleFilter}
            />
            <label htmlFor="floatingInput">Origem</label>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <select className="form-select" 
              id="ativo" 
              value={selectValue} 
              aria-label="ativo" 
              name="ativo" 
              onChange={e => setSelectValue(e.target.value)}>
                {list.map((item, index) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <BotoesCabecalho >              
              <button type="submit" 
              className="btn btn-outline-secondary"    
              >
                <i className="fas fa-filter btn-fl"
                >&nbsp;</i>
              Limpar Filtro</button>              
              <Link to="/Origem/CadastroOrigem">
                <button type="button" className="btn btn-primary">
                  <i className="fas fa-plus">&nbsp;</i>
              Adicionar</button>
              </Link>              
            </BotoesCabecalho>     
        </form>  
  <ContainerDiv>
    <table className="table table-dtriped table-hover shadow sm">
      <thead>
        <tr>
          <th scope="col" onClick={e => handleOrder("origem")}>Origem</th>
          <th scope="col" onClick={e => handleOrder("finalidade")}>Finalidade</th>
          <th scope="col" onClick={e => handleOrder("situacao")}>Situação</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
          {origemFiltro.filter(e => filtroAtivo(e.ativo)).map((data, Id) => (
          <tr key={Id} >
            <td>{data?.origem}</td>
            <td>{data?.finalidade}</td>
            <td>{data?.ativo ? 'Ativo' : 'Inativo'}</td>
            <td>
              <Link to={`/origem/alterarOrigem/${data?.id}`}>
                <button type="button" className="btn btn-outline-primary" >
                  <i className="fas fa-pencil-alt"></i>
                </button>
              </Link>     
            </td>
          </tr>        
        ))}                   
      </tbody>
    </table> 
  </ContainerDiv>
  </ContainerDiv>

}

export default Registros;
