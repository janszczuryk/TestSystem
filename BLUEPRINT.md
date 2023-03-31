# Blueprint

Written down ideas for this project

## 1. [Organization] Epics

  1. Preparing foundation of project
      * Prepare docker compose services
      * Prepare list of necessary npm packages
      * Prepare basic runnable nodejs project
      * Organize basic directory structure
      * Prepare database entity schema
      * Prepare database entities
      * Prepare database enitites migrations
      
  2. Preparing backend - accounts
      * Create a get-one endpoint
      * Document accounts
  
  3. Preparing backend - categories
      * Create a create endpoint
      * Create an update endpoint
      * Create a delete endpoint
      * Create a get-one endpoint
      * Create a find-all endpoint
      * Document categories
  
  4. Preparing backend - authorization
      * Create a register endpoint
      * Create a login endpoint
      * Create a logout endpoint
      * Prepare handling authorized users and not authorized users
      * Prepare mechanism of authorization expiration
      * Document authorization
  
  5. Preparing backend - announcements
      * Create a create endpoint
      * Create an update endpoint
      * Create a delete endpoint
      * Create a get-one endpoint
      * Create a find-all endpoint
      * Document announcements
      
  6. Preparing backend - images
      * Create a create endpoint
      * Create a delete endpoint
      * Create a get-one endpoint (with binary response)
      * Document images
  
  7. Preparing backend - chat
      * Create a create endpoint
      * Create a delete endpoint
      * Create a get-one endpoint
      * Create mechanizm of exchanging messages between two users
  
  8. Preparing frontend - components
  
  9. Preparing frontend - accounts
  
  10. Preparing frontend - announcements
  
  11. Preparing frontend - categories
  
  12. Preparing frontend - authorization
  
  13. Preparing frontend - chat
  
  14. Documenting of the project

## 2. [Backend] Endpoint table

  | METHOD | ENDPOINT | SHORT DESCRIPTION |
  | --- | --- | --- |
  | POST | /login | Login to an account with given credentials |
  | POST | /logout | Logout from an account |
  | POST | /register | Register a new account |
  | GET | /accounts/:account_id | Get an account information |
  | GET | /categories | Get list of categories |
  | POST | /categories | Create a new categories |
  | GET | /categories/:category_id | Get a category information |
  | PUT | /categories/:category_id | Update a category |
  | DELETE | /categories/:category_id | Delete a category |
  | GET | /announcements | Get list of announcements |
  | POST | /announcements | Create a new announcement |
  | GET | /announcements/:announcement_id | Get an announcement information |
  | PUT | /announcements/:announcement_id | Update an announcement |
  | DELETE | /announcements/:announcement_id | Delete an announcement |
  | POST | /images | Create (upload) a new image |
  | GET | /images/:image_id | Get (binary) an image |
  | DELETE | /images/:image_id | Delete an image |
  | GET | /accounts/:account_id/chat | Get a chat with another account |
  | POST | /accounts/:account_id/chat | Create a new chat with another account |
  | DELETE | /accounts/:account_id/chat | Delete a chat with another account |
  
  ADDITIONAL ENDPOINT INFORMATION:
  1. Get list query parameters:
      * `filter={...}` - allows to filter by defined fields
      * `order={...}` - allows to order by defined fields
      * `page_size=10/20/30` - size of a page, how many records will be returned
      * `page=123` - page numer
  2. Authentication
      * Authentication will be realized throught JWT token.
      * Endpoint `/login` provide JWT token as a result of logging user in
      * Additionaly `/login` endpoint will provide basic information about user

