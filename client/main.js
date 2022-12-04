const complimentBtn = document.getElementById("complimentButton");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment);



const fortuneBtn = document.getElementById("fortuneButton");

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

fortuneBtn.addEventListener('click', getFortune);



const clearBtn = document.getElementById("clear");

const clearDisplay = () => {
    complimentContainer.innerHTML = ``;
};

clearBtn.addEventListener('click', clearDisplay);



const classComplimentsBtn = document.getElementById("classComplimentButton");
const complimentContainer = document.getElementById("complimentContainer");

const getClassCompliments = () => {
    axios.get("http://localhost:4000/api/compliments/classmates")
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
};

classComplimentsBtn.addEventListener('click', getClassCompliments);

const complimentDisplay = (results) => {
    let cards = ``;
    for (let i = 0; i < results.length; i++) {
        cards += `
            <div class = "card" id="center">

                <br />

                <h2>Here is compliment #${results[i].id}!</h2>

                <h3 id = "name">Name: ${results[i].name}</h3>
                <h3 id = "encouragement">Encouragement: ${results[i].encouragement}</h3>
                <h3 id = "likes">Likes: ${results[i].likes}</h3>

                <h4>Update likes with the plus and minus below</h4>

                <button onclick="updateCompliment(${results[i].id}, 'plus')" id="likes" type="plus">+</button>
                <button onclick="updateCompliment(${results[i].id}, 'minus')" id="likes" type="minus">-</button>

                <button onclick="deleteCompliment('${results[i].id}')">Delete Compliment</button>
                <p>------------------------------------------------------------------</p>

            </div>
        `;
    }
    complimentContainer.innerHTML = cards;
};



const deleteCompliment = (id) => {
    axios.delete(`http://localhost:4000/api/compliments/classmates/${id}`).then(res => {
        const data = res.data;
        complimentDisplay(data)
    })
    .catch(err => console.log(err))
};



const newComplimentBtn = document.createElement("newComplimentButton");
const form = document.querySelector('form');

const postNewCompliment = (body) => {
    axios.post(`http://localhost:4000/api/compliments/classmates`, body)
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
};

const submitHandler = (event) => {
    event.preventDefault()

    let name = document.querySelector('#firstName')
    let encouragement = document.querySelector('#encouragement')
    let likes = document.querySelector('.likes')

    let newCompliment = {
        name: name.value,
        encouragement: encouragement.value,
        likes: likes.value
    }

    postNewCompliment(newCompliment);

    name.value = ''
    encouragement.value = ''
    likes.value = ''
}



