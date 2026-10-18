// Main application script

// All seats of the venue, created from the data model
const seats = createSeatList();

// Shows each price category with its price and number of seats in the legend
function renderPriceLegend() {
    const legend = document.getElementById("priceLegend");
    legend.innerHTML = "";

    Object.keys(venue.categories).forEach(function (categoryId) {
        const category = getCategory(categoryId);
        const seatCount = seats.filter(function (seat) {
            return seat.category === categoryId;
        }).length;

        const item = document.createElement("li");
        const box = document.createElement("span");
        box.className = "legend-box cat-" + categoryId;

        item.appendChild(box);
        item.append(" " + category.name + " – " + formatPrice(category.price) + " (" + seatCount + " seats)");
        legend.appendChild(item);
    });
}

renderPriceLegend();
