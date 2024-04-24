# plantScript

plantScript is a web application that provides information about various plants. It allows users to search for plants, view their details, and manage plant data. The project integrates with the [Perenual API](https://perenual.com/docs/api) to retrieve plant information.

## Features

- Search for plants by name or other attributes
- View detailed information about each plant, including:
  - General information (common name, scientific name, family, origin, etc.)
  - Dimensions and size
  - Life cycle and reproduction details
  - Care requirements (watering, sunlight, soil, etc.)
  - Characteristics (growth rate, toxicity, attracts, etc.)
  - Images and URLs
- Create, edit, and delete plant records
- User-friendly interface built with Vue.js and Vuetify
- Integration with the Perenual API for retrieving plant data

## Technologies Used

- Frontend:
  - Vue.js
  - Vuetify (UI component library)
  - TypeScript
  - Axios (HTTP client)
- Backend:
  - Node.js
  - Express.js
  - MongoDB (database)
  - Mongoose (MongoDB object modeling)
- External API:
  - Perenual API (https://perenual.com/docs/api)
- Other:
  - Git (version control)

## Project Focus

The main focus of this project is personal development in front-end and back-end technologies, with a strong emphasis on the back-end integration development. The project aims to showcase the integration of a third-party API (Perenual API) to retrieve plant data and provide a seamless user experience.

By working on this project, the developer aims to enhance their skills in:
- Building a robust back-end using Node.js and Express.js
- Integrating with external APIs and handling data retrieval
- Designing and implementing a database schema using MongoDB and Mongoose
- Developing a responsive and interactive front-end using Vue.js and Vuetify
- Implementing search and filtering functionalities
- Creating, updating, and deleting records in the database

## Getting Started

### Prerequisites

- Node.js (v12 or above)
- MongoDB (running instance)
- Perenual API key (sign up at https://perenual.com to obtain an API key)

### Installation


1. Clone the repository: git clone https://github.com/babeeshka/plantScript.git

2. Navigate to the project directory: cd plantScript

3. Install the dependencies: npm install

4. Set up the environment variables:
- Create a `.env` file in the root directory
- Define the following variables:
  ```
  PORT=3000
  MONGODB_URI=mongodb://localhost:27017/plantscript
  PERENUAL_API_KEY=your-api-key
  ```

5. Start the development server: npm run dev

6. Open your browser and visit `http://localhost:3000` to access the application.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).