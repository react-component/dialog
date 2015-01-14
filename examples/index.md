# rc-dialog@2.x

---


<link href="https://a.alipayobjects.com/bootstrap/3.3.1/css/bootstrap.css" rel="stylesheet" />
<link href="../assets/bootstrap.css" rel="stylesheet" />

<script>
if(!window.console){
  window.console = {
    log:function(){}
  };
}
</script>


## call methods

````html

<div id="d1"></div>

````

````js
/** @jsx React.DOM */

var React = require('react');
var Dialog = require('../');

function close(){
  console.log('close');
}

function show(){
  console.log('show');
}

var dialog = React.render(
    (<Dialog title="第一个弹框" onClose={close} onShow={show}
    style={{width:500}}
    >
      <p>第一个dialog</p>
    </Dialog>),
    document.getElementById('d1')
);

setTimeout(function(){
  dialog.show();
},100);
````

## use props


````html

<div id="d2"></div>

````

````js
/** @jsx React.DOM */

var React = require('react');
var Dialog = require('../');

var MyControl = React.createClass({
  getInitialState: function () {
    return {
      showDialog : false
    };
  },

  _show : function(){
    this.setState({
      showDialog : true
    });
  },

  _hide : function(){
    this.setState({
      showDialog : false
    });
  },

  handleTrigger : function(){
    this._show();
  },

  handleSave : function(){
    this._hide();
  },

  handleClose : function(){
    this._hide();
  },

  onShow:function(){
    console.log(document.activeElement);
  },

  render : function(){
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleTrigger}>show dialog</button>
        <Dialog title="第二个弹框" visible={this.state.showDialog}
        onClose={this.handleClose}
        onShow={this.onShow}
        style={{width:600}}
         >
          <input/>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <p>第二个弹出框内容</p>
          <div className="modal-footer">
            <button className="btn" onClick={this.handleClose} >Close</button>
            <button className="btn btn-primary" onClick={this.handleSave}>Save changes</button>
          </div>
        </Dialog>
      </div>
    );
  }
});

React.render(
  <MyControl/>,
  document.getElementById('d2')
);
````
