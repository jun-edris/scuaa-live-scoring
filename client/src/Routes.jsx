import { lazy, Suspense, useContext } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import Wrapper from './containers/Wrapper';
import LoadingPage from './components/LoadingPage';
import { AuthContext } from './context/AuthContext';
const Games = lazy(() => import('./pages/Games'));
const About = lazy(() => import('./pages/About'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const Contact = lazy(() => import('./pages/Contact'));
const AuthSettings = lazy(() => import('./pages/Settings/AuthSettings'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Match = lazy(() => import('./pages/Match'));
const Team = lazy(() => import('./pages/Team'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const User = lazy(() => import('./pages/User'));
const Stats = lazy(() => import('./pages/Stats'));
const Scoreboard = lazy(() => import('./pages/Scoreboard'));

const Routes = () => {
	const AuthenticatedRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					authContext.isAuthenticated() ? (
						<div>{children}</div>
					) : (
						<Redirect to="/" />
					)
				}
			/>
		);
	};

	const LoginRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					!authContext.isAuthenticated() ? (
						<div>{children}</div>
					) : authContext.isAuthorized() ? (
						<Redirect to="/dashboard" />
					) : (
						<Redirect to="/home" />
					)
				}
			/>
		);
	};

	const AdminRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					authContext.isAuthenticated() && authContext.isAdmin() ? (
						<Wrapper>{children}</Wrapper>
					) : authContext.isAuthenticated() ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/" />
					)
				}
			/>
		);
	};

	const FacilitatorRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					authContext.isAuthenticated() && authContext.isFacilitator() ? (
						<Wrapper>{children}</Wrapper>
					) : authContext.isAuthenticated() ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/" />
					)
				}
			/>
		);
	};

	const ScoringBoardRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					authContext.isAuthenticated() ? (
						<div>{children}</div>
					) : authContext.isAuthenticated() ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/" />
					)
				}
			/>
		);
	};

	const AuthorizedRoute = ({ children, ...rest }) => {
		const authContext = useContext(AuthContext);

		return (
			<Route
				{...rest}
				render={() =>
					authContext.isAuthenticated() &&
					(authContext.isFacilitator() || authContext.isAdmin()) ? (
						<Wrapper>{children}</Wrapper>
					) : authContext.isAuthenticated() ? (
						<Redirect to="/home" />
					) : (
						<Redirect to="/" />
					)
				}
			/>
		);
	};

	return (
		<Router>
			<Suspense fallback={<LoadingPage />}>
				<Switch>
					<LoginRoute exact path="/">
						<Login />
					</LoginRoute>
					<AuthenticatedRoute exact path="/home">
						<Home />
					</AuthenticatedRoute>
					<AuthenticatedRoute exact path="/about">
						<About />
					</AuthenticatedRoute>
					<AuthenticatedRoute exact path="/contact">
						<Contact />
					</AuthenticatedRoute>
					<AuthenticatedRoute exact path="/settings">
						<Settings />
					</AuthenticatedRoute>
					<AuthenticatedRoute exact path="/stats/:matchId">
						<Stats />
					</AuthenticatedRoute>
					<AuthorizedRoute exact path="/dashboard">
						<Dashboard />
					</AuthorizedRoute>
					<AuthorizedRoute exact path="/auth-settings">
						<AuthSettings />
					</AuthorizedRoute>
					<AdminRoute exact path="/user">
						<User />
					</AdminRoute>
					<FacilitatorRoute exact path="/match">
						<Match />
					</FacilitatorRoute>
					<FacilitatorRoute exact path="/games">
						<Games />
					</FacilitatorRoute>
					<AdminRoute exact path="/team">
						<Team />
					</AdminRoute>
					<ScoringBoardRoute exact path="/scoreboard/:matchId">
						<Scoreboard />
					</ScoringBoardRoute>
					<Route path="*">
						<NotFound />
					</Route>
				</Switch>
			</Suspense>
		</Router>
	);
};

export default Routes;
