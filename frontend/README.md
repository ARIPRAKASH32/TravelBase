# TravelBase

TravelBase is an existing HTML, CSS and JavaScript travel agency project. The frontend uses Bootstrap 5, Bootstrap Icons and Chart.js from their public CDNs; destination photography is served by Unsplash. An internet connection is required for those assets.

The frontend sample catalogue includes Indian destinations such as Agra, Kerala, Jaipur and Ladakh. Prices are displayed in Indian rupees (INR). Flask, SQLAlchemy and MySQL are used for backend development; the current backend phase connects customer registration, shared login, role-based dashboards and logout.

## Run the Flask application on Windows

1. Install Python and MySQL, then create the database:

   ```sql
   CREATE DATABASE travelbase_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. From the project root, create and activate a virtual environment and install dependencies:

   ```powershell
   python -m venv backend\.venv
   backend\.venv\Scripts\Activate.ps1
   python -m pip install -r backend\requirements.txt
   ```

   In VS Code, select `backend\.venv\Scripts\python.exe` as the Python interpreter.

3. Copy the example settings to `backend\.env`, then set a private `FLASK_SECRET_KEY` and your MySQL `DATABASE_URL`. Do not commit `backend\.env`.

   ```powershell
   Copy-Item backend\.env.example backend\.env
   ```

4. Create the tables, create the first admin, and run Flask:

   ```powershell
   python -m flask --app backend.app:create_app init-db
   python -m backend.seed_admin
   python -m backend.run
   ```

5. Open [http://127.0.0.1:5000](http://127.0.0.1:5000). Customers register at `/register`; customers and admins use `/login`.

## Current backend scope

The database models and secure authentication foundation are in place, including password hashing, CSRF checks, sessions and role protection. Package browsing and management, bookings, profile updates, enquiries, payments and reports are still pending backend phases. Existing static dashboards and demo interactions for those features have not yet been connected to MySQL. The admin account is created only through the seed script; there is no public admin registration.
