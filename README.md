# Interactive Venue Ticketing System

Web & Mobile I – student project (HTML, CSS, JavaScript).

A front-end ticket selection website for a theatre. The user can explore the
venue map, click a seat to inspect it (details + price) and then add it to the
cart with the **ADD TO CART** button.

## Venue

**Grand City Theatre** – auditorium / theatre style venue.

| Section        | Rows  | Seats per row | Seats | Category | Price |
|----------------|-------|---------------|-------|----------|-------|
| Front Stalls   | A – D | 16            | 64    | Premium  | €45   |
| Middle Stalls  | E – J | 18            | 108   | Standard | €30   |
| Rear Stalls    | K – N | 20            | 80    | Economy  | €18   |
| Balcony        | P – S | 22            | 88    | Balcony  | €24   |

Total: **340 seats**. Every section has a centre aisle. Some seats are already
sold and are shown as unavailable.

The rows are slightly curved around the stage (like in a real theatre), so the
seats at the ends of a row are a bit closer to the stage than the middle seats.

### Layout sketch

```
                      +-----------------------+
                      |         STAGE         |
                      +-----------------------+

 Front Stalls (A-D)     ###                       ###
 Premium                    #####   |   #####

 Middle Stalls (E-J)   ####                         ####
 Standard                   ######  |  ######

 Rear Stalls (K-N)    #####                           #####
 Economy                    #######  |  #######

 ------------------------- balcony -------------------------
 Balcony (P-S)       ######                             ######
 Balcony                    ########  |  ########

 [Entrance Left]            centre aisle         [Entrance Right]
```

## Seat states

- **Available** – can be clicked and inspected
- **Inspected** – currently selected, details shown in the side panel
- **In cart** – already added to the cart
- **Unavailable** – already sold, cannot be added

## How the seat map is generated

The venue is described in `js/venue-data.js` (sections, rows, seats per row,
category and the list of sold seats). `createSeatList()` turns this into one
object per seat, and `renderSeatMap()` in `js/app.js` loops over the sections
and rows and creates a `<button>` for every seat. Each seat is moved up a little
with `getCurveOffset()`, so the rows are curved around the stage.

Clicking a seat only **inspects** it: the details and price are shown in the
side panel. The ADD TO CART button is only enabled for available seats.

## Project structure

```
index.html          page structure
css/style.css       styles and responsive layout
js/venue-data.js    venue data model (sections, rows, prices)
js/app.js           application logic
```

## How to run

No build step needed. Open `index.html` in a browser
(or use the Live Server extension in VS Code).

## Weekly plan

- **Week 1** – choose the venue, sketch the layout, define sections and prices,
  create the HTML/CSS interface and the JavaScript data model.
- **Week 2** – generate the seat map from data, seat states, seat inspection.
- **Week 3** – zoom/move/reset controls, cart, totals, localStorage.
- **Week 4** – responsiveness, edge cases, testing, polish, mouse navigation bonus.

## Progress

- [x] Week 1 – venue design, page structure, styles, data model
- [x] Week 2 – seat map generated from data, curved rows, seat states, seat inspection
- [ ] Week 3 – map navigation, cart, localStorage
- [ ] Week 4 – final polish and bonus
