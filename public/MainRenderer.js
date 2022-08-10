'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.state = { selected: 0 };
    _this.firstitem = React.createRef();
    _this.seconditem = React.createRef();
    _this.thirditem = React.createRef();
    return _this;
  }

  _createClass(Navbar, [{
    key: "click",
    value: function click(n) {
      this.setState({ selected: n });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "nav",
        { "class": "navbar navbar-expand-lg navbar-dark bg-dark" },
        React.createElement(
          "a",
          { "class": "navbar-brand", href: "#", onClick: function onClick() {
              _this2.setState({ selected: 0 });
            } },
          this.props.name
        ),
        React.createElement(
          "ul",
          { "class": "navbar-nav mr-auto" },
          React.createElement(
            "li",
            { "class": this.state.selected == 0 ? "nav-item active" : "nav-item", onClick: function onClick() {
                return _this2.click(0);
              } },
            React.createElement(
              "a",
              { "class": "nav-link", href: "#" },
              "Home ",
              this.state.selected == 0 && React.createElement(
                "span",
                { "class": "sr-only" },
                "current"
              )
            )
          ),
          React.createElement(
            "li",
            { "class": this.state.selected == 1 ? "nav-item active" : "nav-item", onClick: function onClick() {
                return _this2.click(1);
              } },
            React.createElement(
              "a",
              { "class": "nav-link", href: "#" },
              "Planner ",
              this.state.selected == 1 && React.createElement(
                "span",
                { "class": "sr-only" },
                "current"
              )
            )
          ),
          React.createElement(
            "li",
            { "class": this.state.selected == 2 ? "nav-item active" : "nav-item", onClick: function onClick() {
                return _this2.setState({ selected: 2 });
              } },
            React.createElement(
              "a",
              { "class": "nav-link", href: "#" },
              "Contacts ",
              this.state.selected == 2 && React.createElement(
                "span",
                { "class": "sr-only" },
                "current"
              )
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(React.Component);

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


var domContainer = document.querySelector('#content');
var root = ReactDOM.createRoot(domContainer);

root.render(React.createElement(Navbar, { name: "IceHax's Motorcycle Trip-Planner" }));