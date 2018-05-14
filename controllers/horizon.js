var express = require('express');
var router = express.Router();
var StellarSdk = require('stellar-sdk');

// The source account is the account we will be signing and sending from.
var sourceSecretKey = 'SBEIC2LB5YBET63NZZWOYC4SDKF76ZVVQJKXHSKFVVWVLQ6VKXJAD4NX';
var sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
var sourcePublicKey = sourceKeypair.publicKey();
var receiverPublicKey = 'GAJUTZBH5GTVDBVFAXEBFEHSVQ4D2C3ZXIJPR5I3GYM3ASHRJLGX3EFE';

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
//var server = new StellarSdk.Server('https://horizon.stellar.org');
// var server = new StellarSdk.Server('http://localhost:8000/');

StellarSdk.Network.useTestNetwork();
// StellarSdk.Network.usePublicNetwork();


router.get('/', function (req, res) {
    res.render('horizon/index', {
        title: 'Horizon Testing Tools'
    });
});

router.get('/transaction', async function (req, res) {
    var str = "<p>start testing transaction...</p>";
    var transaction;

    // Transactions require a valid sequence number that is specific to this account.
    // We can fetch the current sequence number for the source account from Horizon.
    await server.loadAccount(sourcePublicKey)
        .then(function (account) {
            transaction = new StellarSdk.TransactionBuilder(account)
                // Add a payment operation to the transaction
                .addOperation(StellarSdk.Operation.payment({
                    destination: receiverPublicKey,
                    // The term native asset refers to lumens
                    asset: StellarSdk.Asset.native(),
                    // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
                    // the decimal. They are represented in JS Stellar SDK in string format
                    // to avoid errors from the use of the JavaScript Number data structure.
                    amount: '8.34567',
                }))
                // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
                // .addMemo(StellarSdk.Memo.text('Hello world!'))
                .build();
            str += "<p>start signing transaction with pyament...</p>";

            // Sign this transaction with the secret key
            // NOTE: signing is transaction is network specific. Test network transactions
            // won't work in the public network. To switch networks, use the Network object
            // as explained above (look for StellarSdk.Network).
            transaction.sign(sourceKeypair);
            str += "<p>transaction signed...</p>";

            // Let's see the XDR (encoded in base64) of the transaction we just built
            console.log(transaction.toEnvelope().toXDR('base64'));
            str += "<p>transaction's XDR is:</p>";
            str += "<p>" + transaction.toEnvelope().toXDR('base64') + "</p>";

        })
        .catch(function (e) {
            console.error(e);
        });

    await server.submitTransaction(transaction)
        .then(function (transactionResult) {
            console.log(JSON.stringify(transactionResult, null, 2));
            console.log('\nSuccess! View the transaction at: ');
            console.log(transactionResult._links.transaction.href);
        })
        .catch(function (err) {
            console.log('An error has occured:');
            console.log(err);
        });

    str += "<p>transaction submitted, see console for output</p>";

    res.render('horizon/index', {
        title: 'Horizon Testing Tools',
        dynamic_content: str
    });
});

// localhost:3000/trade_aggregation
router.get('/trade_aggregation', async function (req, res) {
    var str = "<p>start testing trade_aggregation...</p>";

    // now try trade aggregator
    const assetObject1 = StellarSdk.Asset.native();
    const assetObject2 = new StellarSdk.Asset(
        "CMA",
        "GD6OHWXPO7T46SEL2SNAFKGHLQZQ467U6MMDFKZ6BR3UXCINQ4BP3IZA"
    );
    trade_aggregation = server.tradeAggregation(
        assetObject1,
        assetObject2,
        Date.now() - (1000 * 3600 * 24 * 10), // 1 days
        Date.now(),
        1000 * 60 * 5 // 5 minutes
    );
    // console.log(trade_aggregation);
    str += "<p>transaction_aggregation builder created, check console</p>";

    console.log(trade_aggregation.url);
    str += "<p><a href='" + trade_aggregation.url + "'>Trade Agg URL</a></p>";

    res.render('horizon/index', {
        title: 'Horizon Testing Tools',
        dynamic_content: str
    });
});

// localhost:3000/trust_recp
router.get('/trust_recp', async function (req, res) {
    var str = "<p>start building trustline...</p>";

    // Keys for accounts to issue and receive the new asset
    var issuingPublicKey = 'GAIUIQNMSXTTR4TGZETSQCGBTIF32G2L5P4AML4LFTMTHKM44UHIN6XQ';
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SD6UAQTLV3AB2G3OO5IKIBZVRYRSZTQ6OGYK4EQMDG7V7HD3LNP3ZLSP');

    // Create an object to represent the new asset
    var astroDollar = new StellarSdk.Asset('AstroDollar', issuingPublicKey);

    // First, the receiving account must trust the asset
    server.loadAccount(receivingKeys.publicKey())
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: astroDollar,
                    limit: '1000'
                }))
                .build();
            transaction.sign(receivingKeys);
            console.log('going to trust the issuing account');
            return server.submitTransaction(transaction)
                .then(function (transactionResult) {
                    console.log(JSON.stringify(transactionResult, null, 2));
                    console.log('\nSuccess! View the transaction at: ');
                    console.log(transactionResult._links.transaction.href);

                    str += JSON.stringify(transactionResult, null, 2);

                    res.render('horizon/index', {
                        title: 'Horizon Testing Tools',
                        dynamic_content: str
                    });
                });
        })
});

// localhost:3000/trust_recp
router.get('/untrust_recp', async function (req, res) {
    var str = "<h1><a href='/'>Home</a></h1>";
    str += "<p>start to untrust...</p>";

    // Keys for accounts to issue and receive the new asset
    var issuingPublicKey = 'GAIUIQNMSXTTR4TGZETSQCGBTIF32G2L5P4AML4LFTMTHKM44UHIN6XQ';
    var receivingKeys = StellarSdk.Keypair
        .fromSecret('SD6UAQTLV3AB2G3OO5IKIBZVRYRSZTQ6OGYK4EQMDG7V7HD3LNP3ZLSP');

    // Create an object to represent the new asset
    var astroDollar = new StellarSdk.Asset('AstroDollar', issuingPublicKey);

    // First, the receiving account must trust the asset
    server.loadAccount(receivingKeys.publicKey())
        .then(function (receiver) {
            var transaction = new StellarSdk.TransactionBuilder(receiver)
                // The `changeTrust` operation creates (or alters) a trustline
                // The `limit` parameter below is optional
                .addOperation(StellarSdk.Operation.changeTrust({
                    asset: astroDollar,
                    limit: "0"
                }))
                .build();
            transaction.sign(receivingKeys);
            console.log('going to untrust the issuing account');
            return server.submitTransaction(transaction)
                .then(function (transactionResult) {
                    console.log(JSON.stringify(transactionResult, null, 2));
                    console.log('\nSuccess! View the transaction at: ');
                    console.log(transactionResult._links.transaction.href);

                    str += JSON.stringify(transactionResult, null, 2);

                    res.render('horizon/index', {
                        title: 'Horizon Testing Tools',
                        dynamic_content: str
                    });
                });
        })
});

//TODO need to fix payment and receive
// localhost:3000/payment
router.get('/payment', async function (req, res) {
    var str = "<p>start testing payment...</p>";

    request.post({
        url: 'http://localhost:8006/payment',
        form: {
            amount: '1',
            asset_code: 'AstroDollar',
            asset_issuer: 'GAIUIQNMSXTTR4TGZETSQCGBTIF32G2L5P4AML4LFTMTHKM44UHIN6XQ',
            destination: 'GACZKTYVNAAYCBBOM3IDL25MFESTZF62YCJTGR5FAKWCTLCSUWD57PNM',
            source: 'SAV75E2NK7Q5JZZLBBBNUPCIAKABN64HNHMDLD62SZWM6EBJ4R7CUNTZ'
        }
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            console.error('ERROR!', error || body);
        } else {
            console.log('SUCCESS!', body);
        }

        str += "<p>payment post finished, check console</p>";
        str += body;
        str += JSON.stringify(StellarSdk.xdr.TransactionEnvelope.fromXDR(JSON.stringify(body.result_xdr), 'base64'));

        res.render('horizon/index', {
            title: 'Horizon Testing Tools',
            dynamic_content: str
        });
    });
});

// localhost:3000/receive
router.post('/receive', function (request, response) {
    var payment = request.body;

    // `receive` may be called multiple times for the same payment, so check that
    // you haven't already seen this payment ID.
    // if (getPaymentByIdFromDb(payment.id)) {
    //   return response.status(200).end();
    // }

    // Because we have one Stellar account representing many customers, the
    // customer the payment is intended for should be in the transaction memo.
    // var customer = getAccountFromDb(payment.memo);

    // You need to check the asset code and issuer to make sure it's an asset
    // that you can accept payment to this account for. In this example, we just
    // convert the amount to USD and adding the equivalent amount to the customer
    // balance. You need to implement `convertToUsd()` yourself.
    // var dollarAmount = convertToUsd(
    //   payment.amount, payment.asset_code, payment.asset_issuer);
    // addToBankAccountBalance(customer, dollarAmount);
    //
    // console.log('Added ' + dollarAmount + ' USD to account: ' + customer);
    console.log("Now receiving a payment at port 8005");
    console.log(payment);
    console.log("Amount is:");
    console.log(payment.amount);
    console.log("Payment receive finished. ");

    response.status(200).end();
});

//router.listen(8005,
//function () {
//    console.log('Bridge server callbacks running on port 8005!');
//    console.log('Bridge server callbacks running on port 8005!');
//});

module.exports = router;
