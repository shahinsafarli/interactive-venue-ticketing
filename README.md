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

### Layout sketch

```
                  +-----------------------+
                  |         STAGE         |
                  +-----------------------+

 Front Stalls     A     ########   ########
 (Premium)        D     ########   ########

 Middle Stalls    E    #########   #########
 (Standard)       J    #########   #########

 Rear Stalls      K   ##########   ##########
 (Economy)        N   ##########   ##########

 ------------------------ balcony ------------------------
 Balcony          P  ###########   ###########
 (Balcony)        S  ###########   ###########

 [Entrance Left]          aisle          [Entrance Right]
```

## Seat states

- **Available** – can be clicked and inspected
- **Inspected** – currently selected, details shown in the side panel
- **In cart** – already added to the cart
- **Unavailable** – already sold, cannot be added

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
