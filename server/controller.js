const classmateCompliments = require('./db.json'); 
let globalId = 4;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];

        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];

        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["You have fame and success in your future", "You will be financially stable in the near future", "You will have good luck in all personal matters", "Your dreams will soon be your reality", "You're in for good days soon"];

        // chooses random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);

        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },

    getClassCompliments: (req, res) => {
        res.status(200).send(classmateCompliments);
    },

    deleteCompliment: (req, res) => {
        let {
            complimentId: id
        } = req.params;
        
        let complimentIndex = classmateCompliments.findIndex(compliment => compliment.id === +id);

        classmateCompliments.splice(complimentIndex, 1);
        res.status(200).send(classmateCompliments);
    },

    postNewCompliment: (req, res) => {
        let {
            name,
            encouragement,
            likes
        } = req.body;

        let newCompliment = {
            id: globalId,
            name,
            encouragement,
            likes
        }

        classmateCompliments.push(newCompliment);

        res.status(200).send(classmateCompliments);
        globalId++;
    },

    updateCompliment: (req, res) => {
        let {
            complimentId: id
        } = req.params;

        let {
            type
        } = req.body;

        let complimentIndex = classmateCompliments.findIndex(compliment => compliment.id === +id);

        let compliment = classmateCompliments[complimentIndex];

        if (compliment.likes >= 10 && type === 'plus') {
            res.status(400).send('Cannot go above 10');
        } else if (compliment.likes === 0 && type === 'minus') {
            res.status(400).send('Cannot go below 0');
        } else if (type === 'plus'){
            compliment.likes++;
            res.status(200).send(classmateCompliments);
        } else if (type === 'minus'){
            compliment.likes--;
            res.status(200).send(classmateCompliments);
        } else {
            res.status(400);
        }        
    }
}