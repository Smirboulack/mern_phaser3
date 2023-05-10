const mongoose = require('mongoose');

const initDatabase = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`Nous sommes connectés à la base de données: ${db.connection.name}`);
    } catch(e){
        console.log(e.message);
        process.exit();
    }
}

module.exports = initDatabase;