const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const clearBtn = document.getElementById("clear");
const classComplimentsBtn = document.getElementById("classComplimentButton");
const complimentContainer = document.getElementById("complimentContainer");
const newComplimentBtn = document.createElement("newComplimentButton");
const form = document.querySelector('form');

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

const clearDisplay = () => {
    complimentContainer.innerHTML = ``;
};

const getClassCompliments = () => {
    axios.get("http://localhost:4000/api/compliments/classmates")
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
};

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

const postNewCompliment = (body) => {
    axios.post(`http://localhost:4000/api/compliments/classmates/`, body)
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
            console.log(data);
        })
        .catch(err => console.log(err))
};

const submitHandler = (event) => {
    event.preventDefault()

    let name = document.querySelector('#firstName')
    let encouragement = document.querySelector('#userCompliment')
    let likes = document.querySelector('select[name="userLikes"]')

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

const updateCompliment = (id, type) => {
    axios.put(`http://localhost:4000/api/compliments/classmates/${id}`, {
            type
        })
        .then(res => {
            const data = res.data;
            complimentDisplay(data)
        })
        .catch(err => console.log(err))
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
clearBtn.addEventListener('click', clearDisplay);
classComplimentsBtn.addEventListener('click', getClassCompliments);
form.addEventListener('submit', submitHandler)