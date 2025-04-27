Inside the dataset folder, you will find movie details that can be added to your database.
This data will be used to perform semantic search on the movies.

Clone the repository to your local machine.

Create an .env or .env.local file in the root directory of the project.

Inside the .env file, define the following environment variables:

API_TOKEN=<your_together_ai_token>
MONGODB_URI=<your_mongodb_connection_url>

Install project dependencies:
npm install


Start the development server:
npm run dev