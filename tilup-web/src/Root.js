import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainApp from './apps/MainApp';
import MyApp from './apps/MyApp';

const Root = () => (
    <BrowserRouter>
        <div>
					<Route exact path="/" component={MainApp}/>
					<Route exact path="/my" component={MyApp}/>
				</div>
    </BrowserRouter>
);

export default Root;
