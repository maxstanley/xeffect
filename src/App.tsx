import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./Pages"

export default function App(): JSX.Element {
  return (
	<>
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				>
				</Route>
			</Routes>
		</Router>
	</>
  );
}

