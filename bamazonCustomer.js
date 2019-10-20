const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Un1c0rnZ!",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    userInput();
  });
  

function userInput() {
    inquirer.prompt([
        {
            message: "What would you like to do?",
            type: "list",
            choices: ["Buy something", "Exit"],
            name: "userChoice"
        }
    ]).then(response => {
        if(response.userChoice === "Exit") {
            console.log("Goodbye");
            connection.end();
        }
        else {
            buyProduct();
        }
    })
}

function buyProduct() {
    connection.query("SELECT * FROM products", function(err,res) {
        if(err) console.log(err);
        const productArray = [];
        for(const product of res) {
            productArray.push(`ID: ${product.id} Product: ${product.product_name} Price: $${product.price}`);
        }
        inquirer.prompt([
            {
                message: "What would you like to buy?",
                type: "list",
                choices: productArray,
                name: "productChoice"
            }
        ]).then(response => {
            const product = res[productArray.indexOf(response.productChoice)];
            inquirer.prompt([
                {
                    message: "How many units would you like to buy?",
                    type: "number",
                    name: "productQuantity"
                }
            ]).then(response2 => {
                if(response2.productQuantity > product.stock_quantity) {
                    console.log("Insufficient quantity");
                }
                else {
                    console.log(`Your total is $${parseFloat(product.price) * parseInt(response2.productQuantity)}`);
                    connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [product.stock_quantity - response2.productQuantity, product.id], 
                    function(err, res) {
                        if(err) console.log(err)
                    })
                }
                userInput();
            })
        })
    })
}