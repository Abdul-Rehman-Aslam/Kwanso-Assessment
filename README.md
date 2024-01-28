Here's a README.md file that explains the steps you've described:

# Kwanso Test Project

This project uses a PostgreSQL database named `kwanso_test` running on port `5433` or you can change the  .env according to your desired port.

## Database Setup

1. Install PostgreSQL if you haven't already done so.
2. Create a new PostgreSQL database named `kwanso_test`.
3. Ensure that your PostgreSQL server is running on port `5433` or `YOUR_DB_PORT`.

## Running Migrations

After setting up the database, you can run the migrations with the following command:

```bash
npm run migration:run

This command will create the necessary tables in the kwanso_test database and insert an initial admin user.

Admin User
The migrations will create an admin user with the following credentials:

Email: admin@gmail.com
Password: admin

API Testing
After running the migrations, you can test the APIs using Swagger or Postman.
Note: There might be an issue with Swagger where the token is not persisting in the Authorization header. If you encounter this issue, please use Postman for API testing.


1. Log in as the admin user to get an access token. You can do this by hitting the login API with the admin user's credentials. The API will return an access token.
2. Copy the access token and add it to the Authorization header as a Bearer token when making requests to other APIs.
3. Test the invite API by sending a request with the email of the user you want to invite.
4. Test the signUp API by sending a request with the email you used to invite the user. This will create a new user.
5. Test the resend invite API. This will invalidate the previous invite token and update the expiry time.
6. Test the task APIs. You can filter tasks by user and task status, and use pagination. You can also create and update tasks.
7. Test the getAllTasks API. As an admin, you can see all tasks. Other users can only see their own tasks.

