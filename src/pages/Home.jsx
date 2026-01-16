import React from "react";
import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";

function Home({
	filter,
	limit,
	sortBy,
	isLoading,
	error,
	filterCoins,
	setFilter,
	setLimit,
	setSortBy,
}) {
	return (
		<>
			<div className="top-controls">
				<FilterInput
					filter={filter}
					onFilterChange={(e) => setFilter(e.target.value)}
				/>
				<LimitSelector
					limit={limit}
					onLimitChange={(e) => setLimit(e.target.value)}
				/>
				<SortSelector
					sortBy={sortBy}
					onSortChange={(e) => setSortBy(e.target.value)}
				/>
			</div>
			{isLoading && <span className="loader"></span>}
			{error && <div className="error">{error}</div>}

			{!isLoading && !error && (
				<main className="grid">
					{filterCoins.length > 0 ? (
						filterCoins.map((coin) => <CoinCard key={coin.id} coin={coin} />)
					) : (
						<div>Coin doesnt exits</div>
					)}
				</main>
			)}
		</>
	);
}

export default Home;
