import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// import { v4 as uuid } from 'uuid'
// import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import About from './components/About/About'
import SearchBox from './components/Home/Home'
import ShoeList from './components/ShoeList/ShoeList'
// import SearchBox from './components/Home/SearchBox'
// import ShoeInput from './components/ShoeInput/ShoeInput'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sneakers: [],
      searchField: ''
    }
  }

  componentDidMount () {
    fetch('https://api.thesneakerdatabase.com/v1/sneakers?limit=100')
      .then(res => res.json())
      .then(sneakers => (this.setState({ sneakers: sneakers.results })))
      .catch(console.error)
  }

  // setSneaker = (sneakers) => {
  //   this.setState({ sneakers: sneakers })
  // }

  searchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  // setUser = user => this.setState({ user })

  // handleChange = e => {
  //   this.setState({ searchField: e.target.value })
  // }
  //
  render () {
    const { sneakers, searchField } = this.state
    const filterSneaker = sneakers.filter(sneaker =>
      sneaker.brand.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <Fragment>
        <Header />
        <main className="container">
          <Route exact path='/about' render= {() => (
            <About />
          )}/>
          <Route exact path='/' render= {() => (
            <SearchBox placeholder='Search Shoes' searchChange={this.searchChange} />
          )}/>
          <Route exact path='/' render= {() => (
            <ShoeList sneakers={filterSneaker} />
          )}/>
          <div>
            {console.log(searchField) }
          </div>
        </main>
      </Fragment>
    )
  }
}

export default App
