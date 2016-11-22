import React from 'react';
import Navbar from './Navbar';


//TODO: make buttons take all the view possible (whole div), translate menu values
class Menu extends React.Component {


  render() {
    //NOTE: maybe do this with map
    var _this = this; //just to have instance inside forEach
    var menuValues = ["training", "theory", "achievements", "settings"];
    var htmlMenu = [];
    menuValues.forEach(function(id) {
      htmlMenu.push(
        <div key={id} className="menu">
          <button key={id} onClick={_this.routeMenu.bind(_this, id)}> {id} </button>
        </div>)
    });
    return (
      <div>
        <Navbar signedIn={true}/>
        <div className="col-md-offset-4 col-md-4">
          {htmlMenu}
        </div>
      </div>
    );
  }
  routeMenu(id) {
    this.props.history.push('/'+id);
  }



}

export default Menu;