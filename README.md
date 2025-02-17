# SWIFT Code API

SWIFT Code API and database implementation.

## Tech Stack

This project uses the following technologies:

- **Node.js**
- **Express**
- **TypeScript**
- **Sequelize**
- **SheetJS (xlsx)**
- **PostgreSQL**
- **Docker**
- **Jest**

## Prerequisites

Before running the Swift API project, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/).
- [Docker](https://www.docker.com/).
- [Docker Compose](https://docs.docker.com/compose/).
- [Git](https://git-scm.com/downloads).

## Installation and Running the Project

Follow these steps to set up and run the Swift API project:

1. **Clone the Repository**: Clone the project repository to your local machine using the following command:

   ```bash
   git clone https://github.com/zaura333/swift-api.git
   ```

2. **Navigate to the Project Directory**: Change into the project's root directory:

   ```bash
   cd swift-api
   ```

3. **Install Dependencies**: Install the necessary Node.js dependencies:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**: Create a `.env` file in the root directory of the project and configure the necessary environment variables as required by your database. Necessary variables:
````
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=
NODE_ENV=development
PORT=8080
````

5. **Run the Application Using Docker Compose**: Start the application along with database and tests using Docker Compose. Migrations and seeders will be run upon the server start.
Open Docker Desktop and make sure it is running. Run the following command from the project directory:

   ```bash
   docker-compose up
   ```

   This command will build and start the Docker containers as defined in the `docker-compose.yml` file.

6. **Access the API**: Once the application is running, you can access the API. The containerized app is bound to port 8080 (`http://localhost:8080/`).

## Database

### Structure

The project utilizes a relational PostgreSQL database, structured with four tables implemented through Sequelize models and migrations:

1. **Countries**: This table contains **all** ISO2 codes along with their corresponding country names. The data is precomputed and serves as a reference for validation purposes.
2. **Timezones**: This table stores the time zones that appear in the dataset.
3. **Towns**: This table is used to store towns, each linked to a specific time zone and country.
4. **Banks**: This table holds SWIFT code details, referencing both a town and a country.

The decision to divide the database into the aforementioned tables was made to ensure **data normalization**, **efficiency**, and **clarity** in managing relationships between entities. Here's the reasoning behind this structure:

1. **Countries Table**: By isolating country data (ISO2 codes and names) into a separate table, we avoid redundancy and ensure consistency. This precomputed table serves as a single source of truth for country-related information, simplifying validation and updates.

2. **Timezones Table**: Time zones are stored independently to accommodate their potential reuse across multiple towns or regions. This separation prevents duplication and allows for easier maintenance of time zone data.

3. **Towns Table**: Towns are linked to both a country and a time zone, establishing clear relationships. This design ensures that each town is associated with the correct geographical and temporal context without duplicating country or time zone information.

4. **Banks Table**: While banks are primarily associated with towns (which already reference countries), the explicit inclusion of the ISO2 country code in the Banks table enhances data retrieval clarity. This redundancy simplifies queries and ensures that country information is readily accessible, even if the town reference is not directly used.

In summary, this structure promotes data integrity and reduces redundancy. However, the current design has certain **limitations**: due to the structure of the POST request body, it is not possible to add a timezone to newly created towns without relying on precomputed data.

Additionally, since the initial dataset did not include addresses for every entry, the **address field** in the database is optional. However, for the POST endpoint, the address is a required field, and a **specific format** has been enforced to implement extraction of town-related information. The allowed formats are either **"STREET;TOWN;PROVINCE;CODE"** or **"TOWN;PROVINCE"**, both of which were derived from the patterns observed in the initial dataset. This structured approach ensures consistency and enables accurate parsing of town data from the address field.

### Migrations

The database is configured using **Sequelize migrations**, which manage the schema and structure of the tables.

### Seeders

Two initial seeders are used to populate the database with essential data:

1. **Country Seeder**: This seeder populates the database with ISO2 country codes and their corresponding names.
2. **Excel Parser**: This seeder processes an Excel file containing the initial dataset and populates the relevant tables in the database. It utilizes **SheetJS** to parse spreadsheet data into JSON format. To ensure data integrity and consistency, there are **transactions** during the insertion process, guaranteeing that all operations are completed successfully or rolled back in case of errors.

## API Endpoints

Here is specification of the available endpoints:

### **GET /v1/swift-codes/:swift-code**

**Description**: Fetch details of a single SWIFT code whether for a headquarter or branche.

**Response**:

- for headquarter - if SWIFT code ends as 'XXX':

```
{
    "address": string,
    "bankName": string,
    "countryISO2": string,
    "countryName": string,
    "isHeadquarter": bool,
    "swiftCode": string
    “branches”: [
{
"address": string,
"bankName": string,
"countryISO2": string,
"isHeadquarter": bool,
"swiftCode": string
},
{
"address": string,
"bankName": string,
"countryISO2": string,
"isHeadquarter": bool,
"swiftCode": string
}, . . .
]
}

```

- for a branch:

```
{
    "address": string,
    "bankName": string,
    "countryISO2": string,
    "countryName": string,
    "isHeadquarter": bool,
    "swiftCode": string
}
```

### **GET /v1/swift-codes/:countryISO2code**

**Description**: Fetch all SWIFT codes with details for a specific country (both headquarters and branches).

**Response**:

```
{
    "countryISO2": string,
    "countryName": string,
    "swiftCodes": [
        {
            "address": string,
    		 "bankName": string,
    		 "countryISO2": string,
    		 "isHeadquarter": bool,
    		 "swiftCode": string
        },
        {
            "address": string,
    		 "bankName": string,
    		 "countryISO2": string,
    		 "isHeadquarter": bool,
    		 "swiftCode": string
        }, . . .
    ]
}
```

### GET endpoints note:

The app treats the param as SWIFT code or ISO2 code based on the params length.

- If the param has 11 characters, it's treated as a SWIFT code.
- If param has 2 characters, it's treated as ISO2 code.
- Otherwise, param is considered invalid.

### **POST /v1/swift-codes**

**Description**: Create new SWIFT code entries to the database for a specific country.

**Request Body**:

```
{
    "address": string (in format "STREET;TOWN;PROVINCE;CODE" or "TOWN;PROVINCE"),
    "bankName": string,
    "countryISO2": string,
    "countryName": string,
    "isHeadquarter": bool,
    "swiftCode": string,
}

```

Due to the implemented structure of the database, countryName and isHeadquarter are optional for this request.

Although the database enforces validation to ensure records are stored in uppercase, the request handling is designed to be **case-insensitive**. Any necessary formatting, such as converting input to uppercase, is performed **before** creating a new record, ensuring consistency and compliance with the database requirements.

**Response**:

```
{
    "message": string,
}

```

### **DELETE /v1/swift-codes/:swift-code**

**Description**: swift-code data if swiftCode matches the one in the database.

**Response**:

```
{
  "message": string,
}
```

### **GET /health**

**Description**: Endpoint to confirm if the server is running. Used for running tests in Docker.

## Testing

### **Unit Tests**

The Swift API project includes unit tests to ensure that individual components of the application behave as expected. Unit tests are written using **Jest** ensuring the API is reliable and that changes don't introduce bugs.

You can run the unit tests using the following command:

```bash
npm run test
```

### **Integration Tests (Potential for Improvement)**

While the project currently has a solid set of **unit tests**, there is room for improvement in terms of **integration tests**. Implementing comprehensive integration tests will help ensure the system works smoothly as a whole.

## Additional Information

- **Linting and Formatting**: The project includes ESLint and Prettier configurations for code quality and formatting. You can run the linter using:

  ```bash
  npm run lint
  ```

- **Git Hooks**: Husky is used to manage Git hooks, ensuring code quality checks are run before commits and pushes.
