// const app = require('express')();
// let port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on ${port}`));

// app.get("/", (req, res) => {
//     res.send({ "test": "This is a test" })
// })

const { Builder, By, until } = require('selenium-webdriver');
var fs = require('fs');
var nodemailer = require('nodemailer');
var testScenario = 'Checkout as Guest';
var category = 'Suéteres';
var product = 'Suéter Blanco';
var quantity = 1;
var paymentMethod = 'Bank transfer';
var randomUser = "emaildeprueba";
var destinationEmails = 'miki@imprimu.com, sebastian@imprimu.com, wouter@imprimu.com';

var transporter = nodemailer.createTransport({
    host: "imprimuprint.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'test_reports@imprimuprint.com',
        pass: 'T3st2021',
    },
});
let date_ob = new Date();

let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = ("0" + date_ob.getHours()).slice(-2);
let minutes = ("0" + date_ob.getMinutes()).slice(-2);

var timestamp = date + "-" + month + "-" + year + " " + hours + ":" + minutes;
var timestamp3 = date + "-" + month + "-" + year + " " + hours + "_" + minutes;

function timestamp2() {

    let hours2 = ("0" + date_ob.getHours()).slice(-2);
    let minutes2 = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds2 = ("0" + date_ob.getSeconds()).slice(-2);
    let tmstmp = hours2 + ":" + minutes2 + ":" + seconds2;

    return tmstmp
}

var fileName = 'Web Test - Imprimu - ' + timestamp3 + '.txt';

function randomEmail(randomEmailAddress) {
    var email = randomEmailAddress + getRandomArbitrary() + "@imprimu.com"
    return email;
}

function getRandomArbitrary() {
    var num = Math.random() * (10000 - 1) + 1;
    return Math.round(num);
}

fs.writeFile(fileName, 'Web Test on imprimu.com started at: ' + timestamp2() + '\n', function(err) {
    if (err) throw err;
    console.log('File TestsLog.txt created');
});

(async function imprimuTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        try {
            await driver.get('https://www.imprimu.com');
            await driver.manage().setTimeouts({ implicit: 2000 });
            console.log('Loaded: Homepage');
            fs.appendFile(fileName, '\n' + 'Loaded: Homepage', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to access homepage');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to access homepage' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }

        try {
            await driver.findElement(By.linkText(category)).click();
            await driver.manage().setTimeouts({ implicit: 2000 });
            console.log('Loaded: Category page');
            fs.appendFile(fileName, '\n' + 'Loaded: Category page', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to access', category, 'section');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to access ' + category + ' section' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }

        try {
            await driver.findElement(By.linkText(product)).click();
            await driver.manage().setTimeouts({ implicit: 2000 });
            console.log('Loaded: Product page');
            fs.appendFile(fileName, '\n' + 'Loaded: Product page', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to access to', product, 'page');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to access ' + product + ' section' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        // try {
        //     const nombre = await driver.findElement(By.css('iframe')).getAttribute('name');
        //     const iframe = driver.findElement(By.name(nombre));
        //     await driver.switchTo().frame(iframe);
        // } catch (error) {
        //     console.log('Error trying to enter Facebook iframe');
        //     console.log('Error message: ', error.message);
        //     fs.appendFile(fileName, '\n' + 'Error trying to enter Facebook iframe' + '\n' + 'Error message: ' + error.message, function(err) {
        //         if (err) throw err;
        //     });
        //     sendReport();
        //     return;
        // }
        // try {
        //     const ruta = await driver.findElements(By.css('path'));
        //     await ruta[3].click();
        //     await driver.manage().setTimeouts({ implicit: 2000 });
        //     console.log('Clicked: Facebook chat plugin closed');
        //     fs.appendFile(fileName, '\n' + 'Clicked: Facebook chat plugin closed', function(err) {
        //         if (err) throw err;
        //     });
        // } catch (error) {
        //     console.log('Error trying close Facebook chat iframe');
        //     console.log('Error message: ', error.message);
        //     fs.appendFile(fileName, '\n' + 'Error trying to close Facebook chat iframe' + '\n' + 'Error message: ' + error.message, function(err) {
        //         if (err) throw err;
        //     });
        //     sendReport();
        //     return;
        // }
        // try {
        //     await driver.switchTo().defaultContent(); // Leave Facebook chat iframe
        //     await driver.manage().setTimeouts({ implicit: 2000 });
        //     console.log('Facebook iframe left');
        //     fs.appendFile(fileName, '\n' + 'Facebook iframe left', function(err) {
        //         if (err) throw err;
        //     });
        // } catch (error) {
        //     console.log('Error trying to leave Facebook iframe');
        //     console.log('Error message: ', error.message);
        //     fs.appendFile(fileName, '\n' + 'Error trying to leave Facebook iframe' + '\n' + 'Error message: ' + error.message, function(err) {
        //         if (err) throw err;
        //     });
        //     sendReport();
        //     return;
        // }
        try {
            await driver.findElement(By.name('addtocart-58')).click();
            await driver.manage().setTimeouts({ implicit: 2000 });
            console.log('Clicked: Add to cart button');
            fs.appendFile(fileName, '\n' + 'Clicked: Add to cart button', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to access to Cart page');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to access to Cart page ' + timestamp2() + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            try {
                await driver.findElement(By.name('checkout')).click();
                await driver.manage().setTimeouts({ implicit: 2000 });
            } catch (error) {
                await driver.findElement(By.name('addtocart-58')).click(); //go back to last step
                await driver.manage().setTimeouts({ implicit: 2000 });
                await driver.findElement(By.name('checkout')).click();
            }
            console.log('Clicked: Checkout button');
            fs.appendFile(fileName, '\n' + 'Clicked: Checkout button', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to start checkout');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to start checkout' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('checkoutasguestbutton')).click();
            await driver.manage().setTimeouts({ implicit: 2000 });
            console.log('Clicked: Checkout as guest button');
            fs.appendFile(fileName, '\n' + 'Clicked: Checkout as guest button', function(err) {
                if (err) throw err;
            });
        } catch (error) {
            console.log('Error trying to click on checkout as guest');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to click on checkout as guest' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('Email')).sendKeys(randomEmail(randomUser));
            console.log('Filled: New email address');
            fs.appendFile(fileName, '\n' + 'Filled: New email address', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter new email address');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter new email address' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('newaddressnextstepbutton')).click();
            console.log('Clicked: Submit new email address');
            await driver.manage().setTimeouts({ implicit: 5000 });
            fs.appendFile(fileName, '\n' + 'Clicked: Submit new email address', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to submit new email address at: ', timestamp2());
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to submit new email address' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.FirstName')).click();
        } catch (error) {
            console.log(error);
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.FirstName')).sendKeys("PrimerNombre");
            console.log('Filled: First Name in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: First Name in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter first name in Billing Address Form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter first name in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.LastName')).sendKeys("PrimerApellido");
            console.log('Filled: Last Name in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: Last Name in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter last name in Billing Address Form at: ', timestamp2());
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter last name in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.Address1')).sendKeys('Direccion1');
            console.log('Filled: Address 1 in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: Address 1 in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter address 1 in Billing Address Form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter address 1 in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.City')).sendKeys('Ciudad');
            console.log('Filled: City in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: City in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter city in Billing Address Form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter city in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.PhoneNumber')).sendKeys('12345678');
            console.log('Filled: Phone Number in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: Phone Number in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter phone number in Billing Address Form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter phone number in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.name('BillingNewAddress.Email')).sendKeys(randomEmail(randomUser));
            console.log('Filled: Email in Billing Address Form');
            fs.appendFile(fileName, '\n' + 'Filled: Email in Billing Address Form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to enter email in Billing Address Form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to enter email in Billing Address Form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            const btn = await driver.findElements(By.css('button'));
            await btn[1].click();
            console.log('Clicked: Submit new billing address form');
            fs.appendFile(fileName, '\n' + 'Clicked: Submit new billing address form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to submit new billing address form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to submit new billing address form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            const btn2 = await driver.findElements(By.css('button'));
            await btn2[2].click();
            console.log('Clicked: Submit new shipping address form at: ', timestamp2());
            fs.appendFile(fileName, '\n' + 'Clicked: Submit new shipping address form', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to submit new shipping address form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to submit new shipping address form' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('shippingmethodnextstepbutton')).click();
            console.log('Clicked: Selected pickup at store and continue at: ', timestamp2());
            fs.appendFile(fileName, '\n' + 'Clicked: Selected pickup at store and continue', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to submit new shipping address form');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to select pickup at store and continue' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('paymentmethodnextstepbutton')).click();
            console.log('Clicked: Continue with Bank Transfer Payment Method');
            fs.appendFile(fileName, '\n' + 'Clicked: Continue with Bank Transfer Payment Method', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to continue with bank transfer payment method');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to continue with bank transfer payment method' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('paymentinfonextstepbutton')).click();
            console.log('Clicked: Confirm Bank Transfer Payment Method');
            fs.appendFile(fileName, '\n' + 'Clicked: Confirm Bank Transfer Payment Method', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to confirm bank transfer payment method');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to confirm bank transfer payment method' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('confirmordernextstepbutton')).click();
            console.log('Clicked: Confirm order');
            fs.appendFile(fileName, '\n' + 'Clicked: Confirm order', function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to confirm order');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to confirm order' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            await driver.findElement(By.className('orderprocessedcontinuebutton')).click();
            console.log('Clicked: Back to homepage');
            console.log('Test finished successfully! at:', timestamp2());
            fs.appendFile(fileName, '\n' + 'Clicked: Back to homepage' + '\n' + 'Test finished successfully! at: ' + timestamp2(), function(err) {
                if (err) throw err;
            });

        } catch (error) {
            console.log('Error trying to back to homepage');
            console.log('Error message: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error trying to back to homepage' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
            return;
        }
        try {
            var title = await driver.getTitle();
            console.log('Last page loaded:', title);
            sendReport();

        } catch (error) {
            console.log('Error trying to get page title');
            console.log('Error message: ', error.message);
            sendReport();
            return;
        }

    } catch {
        (error => {
            console.log('Error initializing a chrome session');
            console.log('Error: ', error.message);
            fs.appendFile(fileName, '\n' + 'Error initializing a chrome session' + '\n' + 'Error message: ' + error.message, function(err) {
                if (err) throw err;
            });
            sendReport();
        })
    } finally {
        await driver.quit();
    }
})();

function sendReport() {
    var mailOptions = {
        from: 'test_reports@imprimuprint.com',
        to: destinationEmails,
        subject: 'Test report for imprimu.com - ' + timestamp,
        text: "Hi! Attached you'll find the results of web test performed on imprimu.com at " + timestamp + '\n\n' +
            'Test scenario: ' + testScenario + '\n\n' +
            'Category: ' + category + '\n\n' +
            'Product: ' + product + '\n\n' +
            'Quantity: ' + quantity + '\n\n' +
            'Payment Method: ' + paymentMethod + '\n\n' +
            'If you have any questions regarding this report, please email us to: sebastian@imprimu.com' + '\n\n' + 'Imprimu',
        attachments: [{
            path: fileName
        }]
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}