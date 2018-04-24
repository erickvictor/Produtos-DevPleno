import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Categoria extends Component {
  constructor(props){
    super(props)
    this.loadData = this.loadData.bind(this)
    this.state ={
      produtos: [],
      categoria: {},
      id: null
    }
    this.renderProduto = this.renderProduto.bind(this)
  }
  loadData(id){
    this.setState({ id })
    this.props.loadProdutos(id)
    this.props.loadCategoria(id)
  }
  componentDidMount(){
    const id = this.props.match.params.catId
    this.loadData(id)
  }
  componentWillReceiveProps(newProps){
    if(newProps.match.params.catId !== this.state.id){
      this.loadData(newProps.match.params.catId)
    }
  }
  renderProduto(produto){
    return (
      <p className='well well-sm' key={produto.id}>
        {produto.produto} 
        <Link className="btn btn-warning btn-xs" to={'/produtos/editar/'+produto.id}><span className='glyphicon glyphicon-pencil'></span></Link>
        <button className='btn btn-danger btn-xs' 
                onClick={()=> {
                    this.props.removeProduto(produto)
                      .then(res=> this.loadData(this.props.match.params.catId))
                }}>
          <span className='glyphicon glyphicon-remove'></span>
        </button>
      </p>
    )
  }
  render(){
    return (
      <div>
        <h1>{this.props.categoria && this.props.categoria.categoria}</h1>
        {this.props.produtos.length === 0 && 
          <p className='alert alert-danger'>Nenhum produto.</p>
        }
        {this.props.produtos.map(this.renderProduto)}
        {this.props.produtos.length}
      </div>
    )

  }
}
export default Categoria
