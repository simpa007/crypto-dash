import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
	const [coins, setCoins] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [limit, setLimit] = useState(10);

	// useEffect(() => {
	// 	fetch(API_URL)
	// 		.then((res) => {
	// 			if (!res.ok) throw new Error("cannot fetch data");
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			console.log(data);
	// 			setCoins(data);
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			setError(err.message);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(
					`${API_URL}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
				);
				if (!res.ok) throw new Error("failed to fetch data");
				const data = await res.json();
				console.log(data);
				setCoins(data);
				setIsLoading(false);
			} catch (error) {
				setError(error.message);
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <div className="error">{error}</div>}

			<div className="controls">
				<label htmlFor="limit">Select:</label>
				<select
					id="limit"
					value={limit}
					onChange={(e) => setLimit(Number(e.target.value))}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
				</select>
			</div>
			{!isLoading && !error && (
				<main className="grid">
					{coins.map((coin) => (
						<CoinCard key={coin.id} coin={coin} />
					))}
				</main>
			)}
		</>
	);
}

export default App;
