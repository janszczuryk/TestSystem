# Blueprint

Written down ideas for this project

## 1. [Backend] Endpoint table

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
| GET | /annoucements | Get list of annoucements |
| POST | /annoucements | Create a new annoucement |
| GET | /annoucements/:announcement_id | Get an annoucement information |
| PUT | /annoucements/:announcement_id | Update an annoucement |
| DELETE | /annoucements/:announcement_id | Delete an annoucement |
| POST | /images | Create (upload) a new image |
| GET | /images/:image_id | Get (binary) an image |
| DELETE | /images/:image_id | Delete an image |
| GET | /accounts/:account_id/chat | Get a chat with another account |
| POST | /accounts/:account_id/chat | Create a new chat with another account |
| DELETE | /accounts/:account_id/chat | Delete a chat with another account |

ADDITIONAL INFOMRATION:
1. Get list query parameters:
    - `filter={...}` - allows to filter by defined fields
    - `order={...}` - allows to order by defined fields
    - `page_size=10/20/30` - size of a page, how many records will be returned
    - `page=123` - page numer
2. Authentication
    - Authentication will be realized throught JWT token.
    - Endpoint `/login` provide JWT token as a result of logging user in
    - Additionaly `/login` endpoint will provide basic information about user
