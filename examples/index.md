# rc-dialog@1.0.0

---

dialog

---

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css">



## show dialog

````html

<div id="d1"></div>

````

````js

require(['../','react'],function(Dialog,React){

  function close(){
    console.log('close');
  }

  function show(){
    console.log('show');
  }

  var dialog = React.renderComponent(
      (<Dialog title="第一个弹框" onClose={close} onShow={show} visible={true}>
        <p>第一个dialog</p>
      </Dialog>),
      document.getElementById('d1')
  );
});

````

## with trigger


````html

<div id="d2"></div>

````

````js

require(['../','react'],function(Dialog,React){

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
    render : function(){
      return (
        <div>
          <button className="btn btn-primary" onClick={this.handleTrigger}>show dialog</button>
          <Dialog title="第二个弹框" visible={this.state.showDialog}>
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

  React.renderComponent(
    <MyControl/>,
    document.getElementById('d2')
  );
});

````
