# Redesign GlowAura Beauty Shop Page

## Information Gathered:
- Current: Broad categories (Lip etc.), name-filter, cream theme, basic cards.
- Target: 5 categories x 5 sub-products, pink/beige/white/gold luxury theme, cards with image/name/price/rating/desc/add-cart.

## Plan:
1. [x] src/data/products.js: Add 25+ products with 'category' field matching sub-categories. (25 luxury beauty products created)
2. src/pages/Shop.jsx: Update categories array to sub-categories, filter by category field + search.
3. [x] src/pages/Shop.css: New luxury pink/gold theme vars, enhanced cards (glassmorphism, hover, responsive).
4. [x] src/components/ProductCard.jsx: Add description prop display, styled Add to Cart button (no alert, toast optional).

**Dependent**: ProductCard.jsx update.

**Followup**: Test responsive/dev server, hot reload.

Confirm to proceed?
