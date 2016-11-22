import React from 'react';
import Navbar from './Navbar'

class Training extends React.Component {
	render() {
		return (
			<div> 
				<Navbar signedIn={true}/>
				<div className="col-md-offset-2 col-md-8 placeholder">
					Training view
				</div>
			</div>
		);
	}
}

export default Training;