# 🗑️ Skip Selection Redesign

This is a complete redesign of the **“Choose Your Skip Size”** page from [WeWantWaste.co.uk](https://wewantwaste.co.uk). The goal of this challenge was to improve the **UI/UX**, maintain functionality, and ensure full **mobile and desktop responsiveness** while dynamically fetching data from the live API.

---

## 🔗 Live Links

- 🚀 **Live Preview**: [skip-selection-redesign.vercel.app](https://skip-selection-redesign-8c5peefth-njkrs-projects.vercel.app)
- 📂 **GitHub Repo**: [https://github.com/njkr/skip-selection-redesign](https://github.com/njkr/skip-selection-redesign)

---

## 🎯 Objective

The objective was to redesign the skip selection page in a **visually unique and modern way**, distinct from the original layout. Functional features, such as skip selection, pricing, hire period, and road restriction warnings, had to be preserved and improved.

---

## 📷 Before vs After

| Original Design                                                                       | Redesigned Version                                                                    |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| [![F3xalyX.md.png](https://iili.io/F3xalyX.md.png)](https://freeimage.host/i/F3xalyX) | [![F3xacvt.md.png](https://iili.io/F3xacvt.md.png)](https://freeimage.host/i/F3xacvt) |

---

## 🛠️ Tech Stack

| Tech               | Purpose                                    |
| ------------------ | ------------------------------------------ |
| React + TypeScript | Component-based structure with type safety |
| Tailwind CSS       | Utility-first, responsive design           |
| Framer Motion      | Animations & transitions                   |
| React Icons        | Icon support                               |
| Vercel             | Deployment                                 |

---

## 🔌 API Integration

Data is fetched from:
GET https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft

### Mapped Fields:

| API Field                | UI Field                    |
| ------------------------ | --------------------------- |
| `id`                     | Internal ID                 |
| `size`                   | Skip size (e.g., "4 Yard")  |
| `price_before_vat + vat` | Final displayed price       |
| `hire_period_days`       | Hire period (e.g., 14 days) |
| `allowed_on_road`        | Displays warning badge      |
| `forbidden`              | Used for future enhancement |

---

## 🧠 Features & Improvements

- 📦 **Card-based layout** with skip image, size, and price
- ✅ **Dynamic API data** rendering
- 📱 **Responsive design** (mobile/tablet/desktop)
- ⚠️ **"Not Allowed on Road"** badge when applicable
- 💬 **Visual selection feedback**
- 📌 **Sticky footer** on mobile with summary and CTA

---

## 📦 Run Locally

To run the project on your local machine:

```bash
# Clone the repo
git clone https://github.com/njkr/skip-selection-redesign.git
cd skip-selection-redesign

# Install dependencies
npm install

# Start development server
npm run dev

# Visit the app in your browser
http://localhost:3000
```
