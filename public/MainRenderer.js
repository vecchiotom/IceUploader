'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var config = {
  name: "IceHax's File Uploader"
};

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
              "Contact Me ",
              this.state.selected == 1 && React.createElement(
                "span",
                { "class": "sr-only" },
                "current"
              )
            )
          ),
          "        "
        )
      );
    }
  }]);

  return Navbar;
}(React.Component);

var Uploader = function (_React$Component2) {
  _inherits(Uploader, _React$Component2);

  function Uploader(props) {
    _classCallCheck(this, Uploader);

    var _this3 = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this, props));

    _this3.state = {
      uploaded: false,
      link: ""
    };
    return _this3;
  }

  _createClass(Uploader, [{
    key: "click",
    value: function click(e) {
      var _this4 = this;

      e.preventDefault();
      $.ajax({
        // Your server script to process the upload
        url: 'upload',
        type: 'POST',

        // Form data
        data: new FormData($('form')[0]),

        // Tell jQuery not to process data or worry about content-type
        // You *must* include these options!
        cache: false,
        contentType: false,
        processData: false,

        // Custom XMLHttpRequest
        xhr: function xhr() {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            // For handling the progress of the upload
            myXhr.upload.addEventListener('progress', function (e) {
              if (e.lengthComputable) {
                $('progress').attr({
                  value: e.loaded,
                  max: e.total
                });
              }
            }, false);
          }
          return myXhr;
        },
        success: function success(data) {
          _this4.setState({ uploaded: true, link: data.link });
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (this.state.uploaded) return React.createElement(
        "div",
        { "class": this.props.class, id: this.props.id },
        React.createElement(
          "h2",
          { style: { color: 'green', textAlign: "center", marginTop: "10%" } },
          "Uploaded!"
        ),
        " ",
        React.createElement("br", null),
        React.createElement(
          "p",
          { style: { textAlign: "center", fontSize: "200%" } },
          "Find your file at ",
          React.createElement(
            "a",
            { href: this.state.link },
            "this link"
          )
        )
      );else return React.createElement(
        "div",
        { "class": this.props.class, id: this.props.id },
        React.createElement(
          "form",
          { id: "file" },
          React.createElement(
            "div",
            { "class": "form-group row" },
            React.createElement(
              "label",
              { "for": "filename", "class": "col-4 col-form-label" },
              "File Name (optional)"
            ),
            React.createElement(
              "div",
              { "class": "col-8" },
              React.createElement(
                "div",
                { "class": "input-group" },
                React.createElement("input", { id: "filename", name: "filename", type: "text", "class": "form-control" })
              ),
              React.createElement("br", null),
              React.createElement(
                "div",
                { "class": "mb-3" },
                React.createElement("input", { "class": "form-control", name: "file", type: "file", id: "formFile" })
              )
            )
          ),
          React.createElement(
            "div",
            { "class": "form-group row" },
            React.createElement(
              "div",
              { "class": "offset-4 col-8" },
              React.createElement(
                "button",
                { name: "submit", type: "submit", "class": "btn btn-primary", onClick: function onClick(e) {
                    return _this5.click(e);
                  } },
                "Upload"
              )
            )
          ),
          React.createElement("progress", { id: "progress" })
        )
      );
    }
  }]);

  return Uploader;
}(React.Component);

var domContainer = document.querySelector('#content');
var root = ReactDOM.createRoot(domContainer);

root.render(React.createElement(
  "div",
  null,
  React.createElement(Navbar, { name: config.name }),
  React.createElement(
    "h1",
    { "class": "center-vert" },
    "Upload Files"
  ),
  React.createElement(Uploader, { id: "uploader", "class": "center rounded-border" })
));