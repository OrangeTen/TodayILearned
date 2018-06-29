import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainApp from './apps/MainApp';
import MyApp from './apps/MyApp';
import { PATH } from './consts/consts';

const Root = () => (
    <BrowserRouter>
      	<div>
					{/* Main App */}
					<Route exact path="/" component={MainApp}/>
					<Route exact path="/search/:string" render={({match}) =>
					(
						<MainApp type={PATH.SEARCH} data={match.params.string} />
					)} />
					<Route exact path="/repo/:index" render={({match}) =>
					(
						<MainApp type={PATH.REPO} index={match.params.index} />
					)} />
					<Route exact path="/til/:index" render={({match}) =>
					(
						<MainApp type={PATH.TIL} index={match.params.index} />
					)} />

					{/* MyApp */}
					<Route exact path="/:id" render={({match}) =>
					(
						<MyApp data={1} id={match.params.id} />
					)} />
				</div>
    </BrowserRouter>
);

export default Root;
