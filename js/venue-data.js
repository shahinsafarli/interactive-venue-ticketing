// Venue data model for the Grand City Theatre.
// The seat map is built from this data, so seats are not written by hand in HTML.

const venue = {
    name: "Grand City Theatre",
    type: "Auditorium / Theatre",
    currency: "€",

    // Price categories (the key is used as the category id)
    categories: {
        premium: { name: "Premium", price: 45 },
        standard: { name: "Standard", price: 30 },
        economy: { name: "Economy", price: 18 },
        balcony: { name: "Balcony", price: 24 }
    },

    // Sections from the stage to the back of the hall.
    // aisleAfter = seat number after which the centre aisle is placed.
    sections: [
        {
            id: "front",
            name: "Front Stalls",
            category: "premium",
            rows: ["A", "B", "C", "D"],
            seatsPerRow: 16,
            aisleAfter: 8
        },
        {
            id: "middle",
            name: "Middle Stalls",
            category: "standard",
            rows: ["E", "F", "G", "H", "I", "J"],
            seatsPerRow: 18,
            aisleAfter: 9
        },
        {
            id: "rear",
            name: "Rear Stalls",
            category: "economy",
            rows: ["K", "L", "M", "N"],
            seatsPerRow: 20,
            aisleAfter: 10
        },
        {
            id: "balcony",
            name: "Balcony",
            category: "balcony",
            rows: ["P", "Q", "R", "S"],
            seatsPerRow: 22,
            aisleAfter: 11
        }
    ],

    // Seats that are already sold (format: row-number)
    unavailableSeats: [
        "A-7", "A-8", "A-9", "B-1", "B-16",
        "C-4", "C-5", "E-9", "E-10",
        "F-1", "F-2", "G-12", "H-5", "H-6", "H-7",
        "J-18", "K-3", "K-15", "L-10", "L-11",
        "M-20", "N-1", "N-2", "P-11", "P-12",
        "Q-5", "R-17", "R-18", "S-1", "S-22"
    ]
};

// Creates a list of seat objects from the sections above.
// Example seat: { id: "A-5", row: "A", number: 5, sectionId: "front", category: "premium" }
function createSeatList() {
    const seats = [];

    venue.sections.forEach(function (section) {
        section.rows.forEach(function (row) {
            for (let number = 1; number <= section.seatsPerRow; number++) {
                const id = row + "-" + number;
                seats.push({
                    id: id,
                    row: row,
                    number: number,
                    sectionId: section.id,
                    category: section.category,
                    unavailable: venue.unavailableSeats.includes(id)
                });
            }
        });
    });

    return seats;
}

// Small helpers to find data by id
function getSection(sectionId) {
    return venue.sections.find(function (section) {
        return section.id === sectionId;
    });
}

function getCategory(categoryId) {
    return venue.categories[categoryId];
}

function formatPrice(amount) {
    return venue.currency + amount;
}
