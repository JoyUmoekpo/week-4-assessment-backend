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
}