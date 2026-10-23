// Main application script

// All seats of the venue, created from the data model
const seats = createSeatList();

// Seat buttons by seat id, so a seat button can be updated quickly
const seatButtons = {};

// Id of the seat that is currently inspected (null = no seat selected)
let inspectedSeatId = null;

// Text shown for each seat state
const stateNames = {
    "available": "Available",
    "in-cart": "In cart",
    "unavailable": "Sold (unavailable)"
};

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

    // clicking a seat only inspects it, it does not add it to the cart
    button.addEventListener("click", function () {
        inspectSeat(seat.id);
    });

    seatButtons[seat.id] = button;
    updateSeatButton(seat);
    return button;
}

// Returns the state of a seat: "available" or "unavailable"
function getSeatState(seat) {
    if (seat.unavailable) {
        return "unavailable";
    }
    return "available";
}

// Updates the classes and the label of a seat button so it shows the right state
function updateSeatButton(seat) {
    const button = seatButtons[seat.id];
    const state = getSeatState(seat);

    button.className = "seat cat-" + seat.category + " " + state;
    if (seat.id === inspectedSeatId) {
        button.classList.add("inspected");
    }

    button.setAttribute("aria-label", "Row " + seat.row + ", seat " + seat.number + ", " + stateNames[state]);
    button.title = "Row " + seat.row + ", seat " + seat.number;
}

// Selects a seat for inspection. Only one seat can be inspected at a time.
function inspectSeat(seatId) {
    const previousId = inspectedSeatId;
    inspectedSeatId = seatId;

    if (previousId !== null) {
        updateSeatButton(findSeat(previousId));
    }
    updateSeatButton(findSeat(seatId));
    showSeatDetails(findSeat(seatId));
}

// Fills the seat details panel with the data of the inspected seat
function showSeatDetails(seat) {
    const section = getSection(seat.sectionId);
    const category = getCategory(seat.category);

    document.getElementById("detailsPlaceholder").hidden = true;
    document.getElementById("detailsList").hidden = false;

    document.getElementById("detailSection").textContent = section.name;
    document.getElementById("detailRow").textContent = seat.row;
    document.getElementById("detailSeat").textContent = seat.number;
    document.getElementById("detailCategory").textContent = category.name;
    document.getElementById("detailPrice").textContent = formatPrice(category.price);
    document.getElementById("detailStatus").textContent = stateNames[getSeatState(seat)];
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
