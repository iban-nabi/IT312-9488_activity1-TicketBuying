if (localStorage.getItem('events') == null) { //Creates a JSON file in the local storage ONLY IF the JSON file does not exist to prevent overriding.
    populateEvents();
}

if (window.location.href.includes("index.html")) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let selectedEventJSON = JSON.parse(localStorage.getItem('selectedEvent')) || [];

    if (users.length > selectedEventJSON.length) {
        users.pop();
        localStorage.setItem("users", JSON.stringify(users));
    } else if (users.length < selectedEventJSON.length) {
        selectedEventJSON.pop();
        localStorage.setItem("selectedEvent", JSON.stringify(selectedEventJSON));
    }
}


//if (window.location.href.includes("index.html")) {
const confirmButton = document.getElementById("confirm-btn");

//executes upon clicking the Confirm Button in index.html
function confirmInfo(event) {
    event.preventDefault(); // Prevent the form from submitting by default

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let age = document.getElementById("age").value;
    let sex = document.getElementById("sex").value;
    let address = document.getElementById("address").value;
    let phoneNumber = document.getElementById("phoneNum").value;
    let email = document.getElementById("email").value;

    // Check if any of the required fields is empty
    if (fname === "" || lname === "" || age === "" || sex === "" || address === "" || phoneNumber === "" || email === "") {
        alert("Please fill in all required fields.");

    } else if (!(/^[1-9]\d*$/.test(age))) {
        // Input is not a positive integer
        alert("Input proper age.");
    } else {
        const user = {
            first_name: fname,
            last_name: lname,
            age: age,
            sex: sex,
            address: address,
            phoneNumber: phoneNumber,
            email: email
        };

        // Add the new user to the array
        users.push(user);

        // Store the updated user array back in localStorage
        localStorage.setItem("users", JSON.stringify(users));

        // You can optionally clear the form fields after storing the data
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("age").value = "";
        document.getElementById("sex").value = "";
        document.getElementById("address").value = "";
        document.getElementById("phoneNum").value = "";
        document.getElementById("email").value = "";
        redirectEventPage(event);
    }
}
try { // included try catch to proceed and process the code below when not in index.html
    confirmButton.addEventListener("click", confirmInfo);
} catch {
    //ignore
}

//}

//redirect to event.html
function redirectEventPage(event) {
    event.preventDefault(); // since under ng form tag ung button
    window.location.href = "event.html";
}

if (window.location.href.includes("event.html")) {
    const userEvent = JSON.parse(localStorage.getItem('events'));
    // Clear text inputs when visiting/revisiting event.html
    window.addEventListener("pageshow", function (event) {
        var page = event.target;
        if (page == document) {
            document.getElementById("event-input").value = "";
            document.getElementById("date").value = "";
            document.getElementById("venue").value = "";
            document.getElementById("seat-input").value = "";
        }
    });

    var day;
    var time;
    var performers;
    var price;
    var submitButton = document.getElementById("submit-btn");
    var eventsJSON = JSON.parse(localStorage.getItem('events'));
    var chosenEvent = document.getElementById("event-input").addEventListener("change", readEvents);
    let chosen = "";

    //executes when picking an Event option in event.html
    function readEvents() {
        chosen = document.getElementById("event-input").value;
        for (let i = 0; i <= 5; i++) {
            if (chosen == ("event" + (i + 1))) {
                //set autofill
                document.getElementById("date").value = eventsJSON[i].date;
                document.getElementById("venue").value = eventsJSON[i].venue;
                document.getElementById("ticket-price").textContent = eventsJSON[i].price;
            }
        }
    }

    //executes upon clicking the Submit Button in events.html
    function eventReserveInfo(event) {
        let selectedEventJSON = JSON.parse(localStorage.getItem('selectedEvent')) || [];
        let eventsJSON = JSON.parse(localStorage.getItem('events'));

        //checks if fields are empty.
        if (
            (document.getElementById("event-input")).value === "" ||
            document.getElementById("date") === "" ||
            document.getElementById("venue") === "" ||
            (document.getElementById("seat-input")).value === "") {
            alert("Please fill in all required fields.");
        } else {
            for (let i = 0; i <= 5; i++) {
                if (chosen == ("event" + (i + 1))) {
                    const selectedEvent = {
                        venue: eventsJSON[i].venue,
                        title: eventsJSON[i].title,
                        theme: eventsJSON[i].theme,
                        performers: eventsJSON[i].performers,
                        day: eventsJSON[i].day,
                        date: eventsJSON[i].date,
                        time: eventsJSON[i].time,
                        price: eventsJSON[i].price,
                        curr_bal: 0,
                        curr_orch: 0,
                        seat: (document.getElementById("seat-input")).options[(document.getElementById("seat-input")).selectedIndex].text
                    }

                    if (document.getElementById("seat-input").value == 'seat1') {
                        selectedEvent.curr_bal = eventsJSON[i].curr_seat_bal + 1;
                        userEvent[i].curr_seat_bal += 1;
                    } else {
                        selectedEvent.curr_orch = eventsJSON[i].curr_seat_orch + 1;
                        userEvent[i].curr_seat_orch += 1;
                    }
                    localStorage.setItem("events", JSON.stringify(userEvent));
                    selectedEventJSON.push(selectedEvent);
                    localStorage.setItem("selectedEvent", JSON.stringify(selectedEventJSON));
                }
            }
            redirectTicketPage(event);
        }
    }
    submitButton.addEventListener("click", eventReserveInfo);
}

//redirect to ticket.html
function redirectTicketPage(event) {
    event.preventDefault(); // since under ng form tag ung button
    window.location.href = "Ticket.html";
}

// For ticket.html
if (window.location.href.includes("Ticket.html")) {
    const selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));
    const lengthEvent = selectedEvent.length - 1;
    const userEvent = JSON.parse(localStorage.getItem('events'));
    const users = JSON.parse(localStorage.getItem('users'));
    const lengthUser = users.length - 1;
    let i = 0;
    for (i; i <= 5; i++) {
        if (selectedEvent[lengthEvent].title == userEvent[i].title) {
            break;
        }
    }

    //UserDetails
    //name
    document.getElementById("name").textContent = users[lengthUser].first_name + " " + users[lengthUser].last_name;
    //contact
    document.getElementById("contact").textContent = users[lengthUser].phoneNumber;
    //address
    document.getElementById("address").textContent = users[lengthUser].address;

    //EventDetails
    //venue
    document.getElementById("event-venue").textContent = selectedEvent[lengthEvent].venue;
    //title
    document.getElementById("event-title").textContent = selectedEvent[lengthEvent].title + ":";
    //theme
    document.getElementById("event-theme").textContent = selectedEvent[lengthEvent].theme;
    //performers
    document.getElementById("cca").textContent = selectedEvent[lengthEvent].performers;
    //day
    document.getElementById("day").textContent = selectedEvent[lengthEvent].day;
    //date
    document.getElementById("date").textContent = selectedEvent[lengthEvent].date;
    //time
    document.getElementById("time").textContent = selectedEvent[lengthEvent].time;
    //section
    document.getElementById("sec-value").textContent = selectedEvent[lengthEvent].seat;
    //seat
    if (selectedEvent[lengthEvent].seat === "Balcony") {
        document.getElementById("seat-value").textContent = selectedEvent[lengthEvent].curr_bal;
    } else {
        document.getElementById("seat-value").textContent = selectedEvent[lengthEvent].curr_orch;
    }
    //price
    document.getElementById("price").textContent = selectedEvent[lengthEvent].price;
    //date purchased
    var dot = document.getElementById("dot");
    dot.textContent = new Date().toLocaleDateString();
}

//note: delete events JSON after updating.
function populateEvents() {
    let events = [
        {//event1
            title: "Entablado",
            theme: "A Glimpse of SLU CCA's Originial Musical Productions",
            date: "09 Sept 2023",
            day: "Saturday",
            time: "6:15pm",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "Fr. Joseph Van den Daelen, CICM, CCA Theater",
            performers: "Center for Culture and the Arts",
            price: "200"
        },
        {//event2
            title: "Perlas ng Silangan",
            theme: "Pearl of the Orient Seas",
            date: "28 Oct 2023",
            day: "Saturday",
            time: "2:00pm",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "Melvin Jones Grandstand",
            performers: "SLU Dance Troupe",
            price: "150"
        },
        {//event3
            title: "Pinoy Soundtrip",
            theme: "Isang Gabi ng Musika at Ligaya",
            date: "20 Oct 2023",
            day: "Saturday",
            time: "6:15pm",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "SLU Maryheights Oval",
            performers: "SLU Concert Orchestra",
            price: "FREE ADMISSION"
        },
        {//event4
            title: "Pagninilay-nilay",
            theme: "Contemplation and Meditation",
            date: "13 Oct 2023",
            day: "Friday",
            time: "6:15pm",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "CCA Building - C013",
            performers: "Tanghalang SLU",
            price: "FREE ADMISSION"
        },
        {//event5
            title: "Sulyap ng Musika",
            theme: "Tinig ng Nakaraan, Ngayon at Bukas",
            date: "14 Oct 2023",
            day: "Saturday",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "Baguio Convention and Cultural Center",
            performers: "SLU Marching Band",
            price: "170"
        },
        {//event6
            title: "Cantate Domino",
            theme: "Sing a New Song to The Lord",
            date: "29 Nov 2023",
            day: "Wednesday",
            time: "6:00pm",
            num_seats_bal: 359,
            curr_seat_bal: 0,
            num_seats_orch: 381,
            curr_seat_orch: 0,
            venue: "SLU Saint Aloysius Gonzaga Parish",
            performers: "SLU Glee Club",
            price: "200"
        }
    ]
    localStorage.setItem("events", JSON.stringify(events)); //Creates a JSON file with the key "events" in the local storage
}