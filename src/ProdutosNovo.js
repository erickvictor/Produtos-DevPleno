import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Produtos extends Component {
  constructor(props){
    super(props)
    
    this.handleNewProduto = this.handleNewProduto.bind(this)
    
    this.state = {
      redirect: false
    }
    
  }
  handleNewProduto(){
    const produto = {
      produto: this.refs.produto.value,
      categoria: this.refs.categoria.value
    }
    this.props.createProduto(produto)
      .then((res)=> this.setState({ redirect: '/produtos/categoria/'+produto.categoria } ))
  }
  render(){
    const { categorias } = this.props
    if(this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    return (<div className='col-md-6'>
              <h2>Novo produto</h2>
              <select ref='categoria' className='form-control'>
                {categorias
                  .map((c) => <option key={c.id} value={c.id}>{c.categoria}</option>)
                }
              </select>
              <input 
                placeholder='Nome do novo produto' 
                className='form-control' 
                ref='produto' />
              <button onClick={this.handleNewProduto} className='btn btn-success'>
              <span className='glyphicon glyphicon-floppy-disk'></span> Salvar</button>
            </div>)
  }
}

export default Produtos
