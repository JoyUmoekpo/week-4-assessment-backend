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
            <div class = "card">

                <h1>Here are all compliments!</h1>

                <p id = "complimentId">Compliment Id: ${results[i].id}</p>            
                <p id = "name">Name: ${results[i].name}</p>
                <p id = "encouragement">Encouragement: ${results[i].encouragement}</p>
                <p id = "likes">Likes: ${results[i].likes}</p>

                <h3>Update likes with the plus and minus below</h3>

                <button onclick="updateCompliment(${results[i].id}, 'plus')" id="likes" type="plus">+</button>
                <button onclick="updateCompliment(${results[i].id}, 'minus')" id="likes" type="minus">-</button>

                <button onclick="deleteCompliment('${results[i].id}')">Delete Compliment</button>
                <p>------------------------------------------------------------------------</p>
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



