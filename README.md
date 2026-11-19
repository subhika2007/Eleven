# Elegant Silks & Sarees - Full-Stack Store

React 18 + Bootstrap 5 (frontend) | Spring Boot 3.4.1 / Java 17 / JPA (backend) | MySQL | WhatsApp Click-to-Chat

## Run it (3 steps)

1. **MySQL** - install MySQL 8, make sure it is running. Edit user/password if needed in
   `backend/src/main/resources/application.properties` (default: root / root), or set `DB_USERNAME` and `DB_PASSWORD`.
   The database `elegant_silks`, all tables and the 15 products are created automatically on first start.
   (Manual alternative: run `database/schema.sql` then `database/data.sql`.)
2. **Backend** (Java 17 + Maven):
   ```
   cd backend
   mvn spring-boot:run          # http://localhost:8080/api/products
   ```
3. **Frontend** (Node 18+):
   ```
   cd frontend
   npm install
   npm run dev                  # http://localhost:5173
   ```

## Before going live
* Copy `frontend/.env.example` to `frontend/.env` and set `VITE_PUBLIC_SITE_URL` to your real https address.
  The WhatsApp message contains the product link and product image URL built from this address, so it must be public
  (localhost links will not open for the shop owner).
* Production build: `npm run build` (output in `frontend/dist`). Serve `dist` with any web server and route `/api` to the backend,
  or set `VITE_API_URL`. Add your site address to `app.cors.allowed-origins` in `application.properties`.

## Things the shop must confirm (not on the flyer)
* The flyer shows **15** products, not 16. Add a 16th with one more `INSERT` in `backend/src/main/resources/data.sql`
  (and put its photo in `frontend/public/products/`). Existing databases: run the INSERT in MySQL.
* Fabric, sizes, stock quantity and whether Roundneck T-shirts / Shorts / Track Pant are Men, Women or both
  (currently tagged UNISEX, shown under both Women and Men). Sizes are blank so customers type a size on the order form.
  To enable size buttons, fill the `sizes` column, e.g. `S,M,L,XL`.
* Prices are exactly as on the flyer, per pack (pc counts shown). No original price/discount is stored.
* Offers are in `frontend/src/services/offers.js` with dates (year 2026 assumed). Each offer hides itself after its end date.
* Product photos are cropped from the flyer (low resolution). For HD: paste an image URL per product into `frontend/image-sources.json`
  and run `npm run fetch-images` (downloads into `public/products/`), or just copy your own JPGs there with the same file names.
  Image paths in the database may also be full `https://` URLs.

## Logo colours
`frontend/public/logo/` has transparent versions: `logo-burgundy.png` (header), `logo-white.png` (footer), `logo-gold.png` (hero),
`logo-rose.png`, `logo-original.png`.

## Structure
```
backend/src/main/java/com/elegantsilks/store/{config,controller,entity,repository,service,dto,exception}
frontend/src/{components,pages,context,services,data,styles}
database/{schema.sql,data.sql}
```
## API
GET /api/products | /api/products/{id} | /api/products/search?keyword= | /api/products/category/{category}
POST /api/orders | GET /api/orders/{id}

Order prices are always recalculated on the server from the database.
