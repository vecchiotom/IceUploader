'use strict';

var config = {
  name: "IceHax's File Uploader"
}

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: 0 }
    this.firstitem = React.createRef();
    this.seconditem = React.createRef();
    this.thirditem = React.createRef();
  }

  click(n) {
    this.setState({ selected: n })
  }

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#" onClick={() => { this.setState({ selected: 0 }); }}>{this.props.name}</a>

        <ul class="navbar-nav mr-auto">
          <li class={(this.state.selected == 0) ? "nav-item active" : "nav-item"} onClick={() => this.click(0)}>
            <a class="nav-link" href="#">Home {(this.state.selected == 0 && <span class="sr-only">current</span>)}</a>
          </li>
          <li class={(this.state.selected == 1) ? "nav-item active" : "nav-item"} onClick={() => this.click(1)}>
            <a class="nav-link" href="#" >Contact Me {(this.state.selected == 1 && <span class="sr-only">current</span>)}</a>
          </li>
          {/*           <li class={(this.state.selected == 2) ? "nav-item active" : "nav-item"} onClick={()=>this.setState({selected:2})}>
            <a class="nav-link" href="#" >Contacts {(this.state.selected == 2 && <span class="sr-only">current</span>)}</a>
          </li>
 */}        </ul>
      </nav>
    )
  }
}

class Uploader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      uploaded: false,
      uploading: false
    }
  }
  click(e) {
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
      xhr: function () {
        var myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          // For handling the progress of the upload
          myXhr.upload.addEventListener('progress', function (e) {
            if (e.lengthComputable) {
              $('progress').attr({
                value: e.loaded,
                max: e.total,
              });
            }
          }, false);
        }
        return myXhr;
      }
    });
  }
  render() {
    if (this.state.uploading)
      return (
        <div class={this.props.class} id={this.props.id}>

        </div>
      );
    else if (this.state.uploaded)
      return (
        <div class={this.props.class} id={this.props.id}>

        </div>
      );
    else
      return (
        <div class={this.props.class} id={this.props.id}>
          <form id="file">
            <div class="form-group row">
              <label for="filename" class="col-4 col-form-label">File Name (optional)</label>
              <div class="col-8">
                <div class="input-group">
                  <input id="filename" name="filename" type="text" class="form-control" />
                </div>
                <br></br>
                <div class="mb-3">
                  <input class="form-control" name="file" type="file" id="formFile" />
                </div>
              </div>
            </div>
            <div class="form-group row">
              <div class="offset-4 col-8">
                <button name="submit" type="submit" class="btn btn-primary" onClick={(e) => this.click(e)}>Upload</button>
              </div>
            </div>
            <progress id="progress"></progress>
          </form>
        </div>
      )
  }
}
const domContainer = document.querySelector('#content');
const root = ReactDOM.createRoot(domContainer);

root.render((
  <div>
    <Navbar name={config.name} />
    <h1 class="center-vert">Upload Files</h1>
    <Uploader id="uploader" class="center rounded-border" />
  </div>
));