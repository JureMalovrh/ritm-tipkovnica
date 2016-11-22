import React from 'react';
import Navbar from './Navbar';

class Theory extends React.Component {
	render() {
		return (
		<div>
			<Navbar signedIn={true}/>
			<div className="col-md-offset-4 col-md-4">
				Theory view
			</div>		
	 	</div>
	);
	}
}

export default Theory;