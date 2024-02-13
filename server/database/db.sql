CREATE DATABASE auth_demo;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE waifus(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    price VARCHAR(255) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE permissions(
    id SERIAL PRIMARY KEY,
    permission VARCHAR(255) UNIQUE NOT NULL
);

-- Still need to create some more on this and add relations
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INT
);