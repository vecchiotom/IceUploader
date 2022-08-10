'use strict';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 0 }
    this.firstitem = React.createRef();
    this.seconditem = React.createRef();
    this.thirditem = React.createRef();
  }

  click(n) {
    this.setState({selected:n})
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#" onClick={() => { this.setState({ selected: 0 }); }}>{this.props.name}</a>

        <ul class="navbar-nav mr-auto">
          <li class={(this.state.selected == 0) ? "nav-item active" : "nav-item"} onClick={()=>this.click(0)}>
            <a class="nav-link" href="#">Home {(this.state.selected == 0 && <span class="sr-only">current</span>)}</a>
          </li>
          <li class={(this.state.selected == 1) ? "nav-item active" : "nav-item"} onClick={()=>this.click(1)}>
            <a class="nav-link" href="#" >Planner {(this.state.selected == 1 && <span class="sr-only">current</span>)}</a>
          </li>
          <li class={(this.state.selected == 2) ? "nav-item active" : "nav-item"} onClick={()=>this.setState({selected:2})}>
            <a class="nav-link" href="#" >Contacts {(this.state.selected == 2 && <span class="sr-only">current</span>)}</a>
          </li>
        </ul>
      </nav>
    )
  }
}

/* class Content extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        gay
      </div>
    )
  }
} */
const domContainer = document.querySelector('#content');
const root = ReactDOM.createRoot(domContainer);

root.render((
  <Navbar name="IceHax's Motorcycle Trip-Planner" />
));