# Plant E-commerce
This is the frontend of the Plant E-commerce website.
I aimed to build this application following best practices: it is fully responsive, optimized for performance using React Query, and features state management with Zustand (with persisted store).

The frontend is designed to work seamlessly with the backend, providing a smooth user experience for browsing products, managing the cart, placing orders, and handling authentication.

##  Live Demo
This project is a personal, non-commercial application hosted on free-tier hosting services.

- The **frontend** is always accessible: [Live Demo](https://plant-ecommerce-ui.onrender.com)
- The **backend** may take a few seconds to start ("wake up") due to free hosting limitations.  
  To use the app fully, make sure to open the backend link first: [Backend Host](https://plant-ecommerce-m9zd.onrender.com)

Additional resources:
- [Backend Repository](https://github.com/RybaLP/Plant-Ecommerce)


## Tech Stack
- **Framework**: React Vite
- **Libraries** : Zustand, React Tanstack Query, Axios
- **Version Control:** Git, GitHub
- **Deployment:** Render

## Features 
- User registration and login
- JWT authentication with refresh tokens
- Cart management
- Placing orders
- Product operations
- Adding, editing, and deleting reviews by clients
- Stripe payment integration
- Admin role features
- Advanced product filtering and search
- Order history and status tracking
- Integrated with Backend
## Project Structure

```
src/
├─ api               # Api clients, Api functions
├─ components        # Reusable components
├─ hooks             # React Query caching
├─ interfaces        # Reusable TypeScript Interfaces
├─ pages             # Pages
├─ store             # Zustand stores (state management core)
|- types             # Typing
├─ utils             # Helper functions
|- App,tsx           # Defined all routes
|- main.tsx          # Core of application 

```

##  How to Run Locally

Follow these steps to run the backend on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/your-username/plant-ecommerce.git
cd eccomerce
```

### 2. Configure environment variables
Create a `.env` file in the root of the project and add the backend API URL:

```bash
# Backend API URL
VITE_API_URL="http://example-api.com"
```

## 3. Run application
Open terminal, and paste those commands in provided order : 

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on port 5173 by default.
You can access it in your browser at:

```
http://localhost:5173
```