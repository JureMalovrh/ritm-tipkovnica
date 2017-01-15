import React from "react";
import Route from "react-router";
import App from "./components/App";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Training from "./components/Training";
import Theory from "./components/Theory";
import Achievements from "./components/Achievements";
import First from "./components/First";
import Settings from "./components/Settings";

export default (
	<Route component={App}>
		<Route path="/" component={First} />
		<Route path="/menu" component={Menu} />
		<Route path="/training" component={Training} />
		<Route path="/theory/:page" component={Theory} />
		<Route path="/achievements" component={Achievements} />
		<Route path="/settings" component={Settings} />
	</Route>
);
