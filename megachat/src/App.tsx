import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./4thtask/Chat";
import Posts from "./5th/Posts";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Chat />} />
				<Route path="/posts" element={<Posts />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
