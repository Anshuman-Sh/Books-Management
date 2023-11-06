# Books-Management
API endpoints and their usage -->
auth -> 
(i) /auth/signup -> This endpoint will create a user with a token to authenticate.
(ii) /auth/login -> This will login a user and generate a new token everytime a user login.
(iii) /auth/logout -> This will logout the user and make token expire by setting the value of isDeleted field in token document to true.

book ->
(i) /book/create -> This endpoint creates a book with title, author, summary and also takes a token to identify which user wants to create it.
(ii) /book/viewBooks -> This will display all the books created by the user.
(iii) /book/viewBook -> This will display a book by specifying its bookId in the req.query.
(iv) /book/update -> This will take updatedData in req.body and bookId in req.query to update the book user wants.
(v) /book/delete -> This will delete a book by specifying its bookId in the req.query.

Instructions to set up and run locally -->
(i) create .env file or edit env.example.
(ii) npm start
(iii) import postman collection.
