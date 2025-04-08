# Node PromptQL

Node PromptQL is a Node.js-based project designed to simplify and enhance the process of working with prompts and queries. This README provides an overview of its features, setup instructions, and how to run the project.

## Features

- **Dynamic Prompt Handling**: Easily manage and execute prompts.
- **Node.js Integration**: Built with Node.js for seamless backend functionality.
- **Customizable Queries**: Write simple queries effortlessly, and let the system optimize and generate the query to return data for you.
- **Lightweight and Fast**: Optimized for performance and simplicity.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

  You will also need to install yarn, just run the following commands.

      $ npm install -g pnpm

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm
      $ npm install -g pnpm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.16.0

## Getting Started

    $ git clone [GIT_PATH]
    $ cd PROJECT_TITLE
    $ pnpm install

## Configure app

Create .env file and add relevant key and values as shared separately along with code

### Database Setup

1. **Download the Database**:
	Use the following command to download the sample database:

		 $ wget https://raw.githubusercontent.com/neondatabase/postgres-sample-dbs/main/employees.sql.gz

2. **Restore the Database**:
	Run the following command to restore the database:

		 $ pg_restore -d postgresql://[user]:[password]@[neon_hostname]/employees -Fc employees.sql.gz -c -v --no-owner --no-privileges

Replace `[user]`, `[password]`, and `[neon_hostname]` with your actual database credentials.

### Run Migrations

To run database migrations, use the following command:

	$ pnpm run migrate:up

## Running the project

### Run Using Docker

To run the project using Docker, execute the following commands:

	$ docker-compose up -d --build

### Run Using PNPM

To run the project directly using PNPM, use the following command:

	$ pnpm run start
    $ pnpm start


4. **Access the Application**:
	- Open your browser and navigate to `http://localhost:3000` (or the configured port).

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. Contributions are always welcome!