# Debug Guide - localStorage Cart Issue

## Testing Steps

### 1. Open Browser Console (F12)
- Press F12 to open Developer Tools
- Go to "Console" tab
- You'll see logs like:
  - `📦 Getting cart from localStorage: [...]`
  - `✅ Item added to cart: Product Name`

### 2. Check Browser Storage
- In Dev Tools, go to "Application" tab
- Look for "Local Storage"
- Find your website domain
- You should see keys: `glowaura_cart` and `glowaura_favorites`

### 3. Test Flow
**Step 1:** Add item from ProductCard
- Should see in console: `✅ Item added to cart: [Product Name]`

**Step 2:** Check localStorage
- Application tab > Local Storage > glowaura_cart
- Should show: `[{"id": 1, "name": "...", "quantity": 1, ...}]`

**Step 3:** Navigate to Cart page
- Should see: `📦 Getting cart from localStorage: [...]`
- Item should display on page

### 4. If Items Don't Show
Check console for errors - look for:
- `❌ Error reading cart from localStorage:`
- `❌ Error adding to cart:`
- Missing properties (price, image, etc.)

## What We Fixed
✅ Price parsing (handles strings like "$24.99")
✅ Missing properties (shade, category fallbacks)
✅ Event listeners (cart updates when product added)
✅ Logging (now shows what's being stored/retrieved)

## Next: Try These Steps
1. Open shop/home page in one tab
2. Open Developer Tools (F12)
3. Add a product to cart
4. Watch console logs
5. Go to cart page - item should appear

If still not working, paste the console error messages! 🔍
