import React from "react";

function FilterInput({ filter, onFilterChange }) {
	return (
		<div className="filter">
			<input
				type="text"
				placeholder="Enter input"
				value={filter}
				onChange={onFilterChange}
			/>
		</div>
	);
}

export default FilterInput;
