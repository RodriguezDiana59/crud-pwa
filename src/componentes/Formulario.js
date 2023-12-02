import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Axios, { axios } from 'axios';
import Table from 'react-bootstrap/Table';

function Formulario() {

  const [id, setId]=useState(0);
  const [nombre, setNombre]=useState("");
  const [apellido, setApellido]=useState("");
  const [tabla3,setTabla3]=useState([]);
  const [editar,setEditar]=useState(false);
  
  const add = (e) =>{
    e.preventDefault();
    Axios.post("http://192.168.1.104:3001/create",{
      id:id,  
      nombre:nombre,
      apellido:apellido
    }).then(()=>{
      alert("Usuario registrado");
      limpiar();
    });
  }

  const eliminarFormulario = (id) => {
    if(window.confirm("¿Desea eliminar el usuario")){
      Axios.delete(`http://192.168.1.104:3001/delete/${id}`).then(() => {
        const eliminarTabla = tabla3.filter((user) => user.id !==id);
        setTabla3(eliminarTabla);
      });
    }


  };
  const limpiar = ()=>{
    setEditar(false);
    setId('');
    setNombre('');
    setApellido('');
  }
  const update = (e) => {
    e.preventDefault();
    Axios.put('http://192.168.1.104:3001/update',
    {
      id:id,
      nombre:nombre,
      apellido:apellido,
    }).then((response) => {
      getTabla3();
      alert(response.data);
    })
  }

  const editarUsuario = (val)=> {
    setEditar(true);
    setNombre(val.nombre);
    setApellido(val.apellido);
    setId(val.id);
  }
  const getTabla3 = () =>{
    Axios.get('http://192.168.1.104:3001/tabla3').then((response)=>{
      setTabla3(response.data);
    })
      
  }
  
  return (
    <>
    <Form>
      <Row>
        <Col>
          <Form.Control placeholder="Id" 
          value={id}
          onChange={(event)=>{
            setId(event.target.value)
          }}/>
        </Col>
        <Col>
          <Form.Control placeholder="Nombre"
          value={nombre}
          onChange={(event)=>{
            setNombre(event.target.value)
          }} />
        </Col>
        <Col>
          <Form.Control placeholder="Apellido"
          value={apellido}
          onChange={(event)=>{
            setApellido(event.target.value)
          }} />
        </Col>
      </Row>
    {
      editar?

      <div>
      <Col xs="auto" className="my-1">
          <Button type="submit" onClick={update}>Actualizar</Button>
        </Col>
        <Col xs="auto" className="my-1">
          <Button type="submit" onClick={limpiar}>Limpiar</Button>
        </Col>
      </div>
      :
      <Col xs="auto" className="my-1">
          <Button type="submit" onClick={add}>Registrar</Button>
        </Col>

    }
    </Form>
    <Col xs="auto" className="my-1">
      <Button type="submit" onClick={getTabla3}>Listar</Button>
      </Col>
<Table striped bordered hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {tabla3.map((val)=>(
        <tr key={val.id}>
          <td>{val.id}</td>
          <td>{val.nombre}</td>
          <td>{val.apellido}</td>
          <td> <button variant="info"
          onClick={()=>{
            editarUsuario(val)
          }}>Editar</button>{''}<button variant="danger" onClick={()=>{
            eliminarFormulario(val.id)
          }}>Eliminar</button></td>
        </tr>
        ))}
      </tbody>
    </Table>
  </>


    
  )
}

export default Formulario;

