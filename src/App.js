import React, { Component } from 'react'
import axios from 'axios'
import {Grid,Row,Col,Media,FormGroup,FormControl,InputGroup,Glyphicon} from 'react-bootstrap'

class App extends Component {
	constructor(props){
		super(props)
		this.state={books:[],query:'',loading:true,error:null}
	}
	getBooks(){
		const BASE_URL='https://www.googleapis.com/books/v1/volumes?'
		let FETCH_URL=`${BASE_URL}q=${this.state.query}`
		axios.get(FETCH_URL)
			.then(response=>{
				const books=response.data.items
				this.setState({books,loading:false,error:null})
			})
			.catch(err=>{this.setState({loading:false,error:err})})
	}
	render() {
		const mappedBooks=this.state.books.map((book,idx)=>{

			let title=book.volumeInfo.title
			let authors=book.volumeInfo.authors
			let publisher=book.volumeInfo.publisher
			let pubDate=book.volumeInfo.publishedDate
			let infoLink=book.volumeInfo.infoLink
			let image=book.volumeInfo.imageLinks.smallThumbnail
			let link=book.volumeInfo.previewLink
			const mappedAuthors=authors ? authors.map((author,i)=>{
				return <span key={i}>{author}</span>
			}):null
			return(
				<Media>
					<Media.Left align="top">
						<a href={link}>
							<img width={64} height={64} src={image} alt={title}/>
						</a>
					</Media.Left>
					<Media.Body>
						<Media.Heading>{title}</Media.Heading>
						<p>{mappedAuthors}</p>
						<p>{publisher}</p>
						<p>{pubDate}</p>
						<p><a href={infoLink}>{infoLink}</a></p>
						<hr/>
					</Media.Body>

				</Media>	
			)
		})
		return (
		<div >
			<Grid>
				<Row className="show-grid">
					<Col md={4}/>
					<Col md={4}>
						<h1 className="app-header">Book Finder</h1>
						<FormGroup>
							<InputGroup>
								<FormControl type="text" placeholder="Search for Book" 
									value={this.state.query}
									onChange={(evt)=>{this.setState({query:evt.target.value})}}
									onKeyPress={(evt)=>{if(evt.key==='Enter'){this.getBooks()}}}/>
								<InputGroup.Addon onClick={()=>this.getBooks()}>
									<Glyphicon glyph="search"></Glyphicon>
								</InputGroup.Addon>
							</InputGroup>
						</FormGroup>
						<div>
							{mappedBooks}
						</div>
					</Col>
					<Col md={4}/>
				</Row>
			</Grid>
		</div>
		)
	}
}
export default App
