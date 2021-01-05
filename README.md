# Artifact Shopping Cart

Shopping cart interview submission for Artifact Uprising.

# To Launch

Run: `docker-compose up`.

Site will then be hosted at `localhost:8080/`.

# To Dev

You'll need to have a mongo database up and running according to the `.env` file in `backend/`.

You can either do this manually, or simply run `docker-compose up mongo`.

Then, run `npm run start` in `backend/` and `npm run dev` in `frontend/`.

# Structure

**Database**: mongodb (unsecured; shouldn't be launched as-is) with mongoose for communication/model management

**Server**: expressjs, with swaggerJSDoc to display swagger file at `/api-docs` when developing.

**Frontend**: react with react-bootstrap. UI was tested on both desktop and mobile.

This site doesn't have or maintain users. Instead, it just uses shopping carts. On page load, the frontend posts to `/carts`. If there isn't a `Cart` cookie in that request, a brand new cart will be created and returned and the `Cart` cookie will be set. If there is a `Cart` cookie, we will first attempt to find the cart with that ID and, if that fails, will fallback to creating a new cart.

Cart entries with 0 or negative counts will be automatically removed from the user's shopping cart.
