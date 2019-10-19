DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's hoodie", "Fashion", 20.00, 1000), ("Selfie stick", "Cameras & Photos", 10.00, 250),
("Bookshelf", "Furniture", 80.00, 150), ("Jenga", "Toys and Games", 6.88, 500),
("Couch", "Furniture", 184.99, 100), ("Wifi router", "Electronics", 58.75, 160),
("Jeans", "Fashion", 34.99, 2000), ("Sneakers", "Fashion", 41.65, 2500), 
("Wok", "Cooking", 19.80, 300), ("Flower pot", "Home and Garden", 2.49, 400);