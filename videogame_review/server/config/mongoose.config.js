const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to ${process.env.DB_NAME}`))
    .catch(err => console.log(`Something went wrong when connecting to the ${process.env.DB_NAME}`, err));