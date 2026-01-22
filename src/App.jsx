import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import CoinDetails from "./pages/CoinDetails";
import NotFound from "./pages/NotFound";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);
	const [filter, setFilter] = useState("");
	const [sortBy, setSortBy] = useState("market_cap_desc");

	const filterCoins = coins
		.filter((coin) => {
			return (
				coin.name.toLowerCase().includes(filter.toLowerCase()) ||
				coin.symbol.toLowerCase().includes(filter.toLowerCase())
			);
		})
		.slice()
		.sort((a, b) => {
			switch (sortBy) {
				case "market_cap_desc":
					return b.market_cap - a.market_cap;

				case "market_cap_asc":
					return a.market_cap - b.market_cap;

				case "price_desc":
					return b.current_price - a.current_price;

				case "price_asc":
					return a.current_price - b.current_price;

				case "change_desc":
					return b.price_change_percentage_24h - a.price_change_percentage_24h;

				case "change_asc":
					return a.price_change_percentage_24h - b.price_change_percentage_24h;
			}
		});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
				);
				if (!res.ok) throw new Error("failed to fetch data");
				const data = await res.json();
				setCoins(data);
				setIsLoading(false);
			} catch (error) {
				setError(error.message);
				setIsLoading(false);
			}
		};
		fetchData();
	}, [limit]);

	return (
		<>
			<Header />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							filter={filter}
							limit={limit}
							sortBy={sortBy}
							setFilter={setFilter}
							setLimit={setLimit}
							setSortBy={setSortBy}
							isLoading={isLoading}
							error={error}
							filterCoins={filterCoins}
						/>
					}
				/>
				<Route path="/about" element={<About />} />
				<Route path="/coin/:id" element={<CoinDetails />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
