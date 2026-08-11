var noBtn = document.querySelector(".btn1");

// move NO button
noBtn.addEventListener("mouseover", moveButton);

function moveButton() {
    var parent = document.querySelector(".form");

    var maxX = parent.clientWidth - noBtn.offsetWidth;
    var maxY = parent.clientHeight - noBtn.offsetHeight;

    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// YES button
function sayYes() {
    let username = localStorage.getItem("username");
    if (!navigator.onLine) {
        alert("check your internet connection ")
    }
    else{
    fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: username
        })
    })

        .then(res => res.json())
        .then(data => {
            alert(" thank you accpeting my proposel ❤️");
            window.location.href = "acept.html";
        })
        .catch(err => console.log(err));
    }
}