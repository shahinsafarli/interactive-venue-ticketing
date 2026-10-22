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

// Finds a seat object by its id, for example "A-5"
function findSeat(seatId) {
    return seats.find(function (seat) {
        return seat.id === seatId;
    });
}

// Creates the row letter that is shown at the start and end of each row.
// offset moves the label up so it follows the curve of the row.
function createRowLabel(row, offset) {
    const label = document.createElement("span");
    label.className = "row-label";
    label.textContent = row;
    label.style.top = -offset + "px";
    return label;
}

// Creates one seat button.
// Seats far from the middle of the row are moved up, so the row is curved.
function createSeatButton(seat, seatsPerRow) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "seat cat-" + seat.category;
    button.textContent = seat.number;
    button.dataset.seatId = seat.id;
    button.style.top = -getCurveOffset(seat.number, seatsPerRow) + "px";
    return button;
}

// Builds the whole seat map from the venue data:
// one block for each section, one line for each row and one button for each seat
function renderSeatMap() {
    const seatMap = document.getElementById("seatMap");
    seatMap.innerHTML = "";

    venue.sections.forEach(function (section) {
        const category = getCategory(section.category);

        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section section-" + section.id;

        const title = document.createElement("h3");
        title.className = "section-title";
        title.textContent = section.name + " · " + category.name + " " + formatPrice(category.price);
        sectionDiv.appendChild(title);

        // the row labels sit next to the first and last seat, so they use the same offset
        const labelOffset = getCurveOffset(1, section.seatsPerRow);

        section.rows.forEach(function (row) {
            const rowDiv = document.createElement("div");
            rowDiv.className = "seat-row";
            rowDiv.appendChild(createRowLabel(row, labelOffset));

            for (let number = 1; number <= section.seatsPerRow; number++) {
                const seat = findSeat(row + "-" + number);
                rowDiv.appendChild(createSeatButton(seat, section.seatsPerRow));

                // empty space for the centre aisle
                if (number === section.aisleAfter) {
                    const aisle = document.createElement("span");
                    aisle.className = "aisle";
                    rowDiv.appendChild(aisle);
                }
            }

            rowDiv.appendChild(createRowLabel(row, labelOffset));
            sectionDiv.appendChild(rowDiv);
        });

        seatMap.appendChild(sectionDiv);
    });
}

renderPriceLegend();
renderSeatMap();
