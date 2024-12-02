
# Backend API Documentation

## `/users/register` Endpoint

### Description

Registers a new user by accepting their first name, last name, email, and password.

### HTTP Method

`POST`

### Request Body

- `fullname` (object):
    - `fullname.firstname` (string, required): First name of the user (minimum 3 characters).
    - `fullname.lastname` (string, optional): Last name of the user (minimum 3 characters).
- `email` (string, required): Valid email address.
- `password` (string, required): Password (minimum 6 characters).


### Example Response

- `user` (object):
  - `fullname` (object):
     - `fullname.firstname` (string): First name of the user (minimum 3 characters).
     - `fullname.lastname` (string): Last name of the user (minimum 3 characters).
  - `email` (string): Valid email address.
  - `password` (string): Password (minimum 6 characters).
- `token` (String): JWT Token
    