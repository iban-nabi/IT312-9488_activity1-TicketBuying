//function to create a bar graph
function createBarGraph(canvas, data){
    new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
            plugins: {
                legend: {
                    position: 'right',
                    align: 'start',
                    labels: {
                        font: {
                            size: 17
                        }
                    }
                }
            },
            scale: {
                ticks: {
                  precision: 0,
                  font:{
                    size: 15
                  }
                }
              },
        }
    });
}

// populate data for bar graph
function populateData(labelData, dataSets, eachLabel, bgColor, multiValue){
    const graphData = {
        labels : labelData,
        datasets: [
               ]
    };

    if(multiValue){
        for(let i=0; i<eachLabel.length; i++){
            graphData.datasets.push({
                label: eachLabel[i], // The label for the new dataset
                data: Object.values(dataSets[eachLabel[i]]), // The data for the new dataset
                backgroundColor: bgColor[i] // The background color for the new dataset
            });
        }
    }else{
        for(let i=0; i<eachLabel.length; i++){
            graphData.datasets.push({
                label: eachLabel[i], // The label for the new dataset
                data: [dataSets[eachLabel[i]]], // The data for the new dataset
                backgroundColor: bgColor[i] // The background color for the new dataset
            });
        }
    }
    return graphData;
}

/*retrieve data*/
const users = JSON.parse(localStorage.getItem('users'));
const selectedEvent = JSON.parse(localStorage.getItem('selectedEvent'));
const events = JSON.parse(localStorage.getItem('events'));

//common utilities
var labels = [];
var graphColors = ['#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#ffff00', '#e377c2', '#1f77b4'];
events.forEach(e=>{
    labels.push(e.title);
})

/*reservation chart*/
const reserveCanvas = document.getElementById('reserveChart').getContext('2d');
const reserveCounts= {
        'Entablado': 0,
        'Perlas ng Silangan': 0,
        'Pinoy Soundtrip': 0,
        'Pagninilay-nilay': 0,
        'Sulyap ng Musika': 0,
        'Cantate Domino': 0,
        'Total': 0,
    };

selectedEvent.forEach(events => {
    reserveCounts[events.title]++;
    reserveCounts['Total']++;
})
var reservationLabel = [''];
labels.push('Total');
const reserveData = populateData(reservationLabel, reserveCounts, labels, graphColors, false);
createBarGraph(reserveCanvas,reserveData);
labels.pop();


/*seats available chart*/
const availableSeatsCavnas= document.getElementById('seatsAvailChart').getContext('2d');
const seatsAvailableCounts= {
    'Entablado': {
        'balconySeats':0,
        'orchestraSeats':0
    },
    'Perlas ng Silangan': {
        'balconySeats':0,
        'orchestraSeats':0
    },
    'Pinoy Soundtrip': {
        'balconySeats':0,
        'orchestraSeats':0
    },
    'Pagninilay-nilay': {
        'balconySeats':0,
        'orchestraSeats':0
    },
    'Sulyap ng Musika': {
        'balconySeats':0,
        'orchestraSeats':0
    },
    'Cantate Domino': {
        'balconySeats':0,
        'orchestraSeats':0
    }
};
events.forEach(e => {
    seatsAvailableCounts[e.title]['balconySeats']=e.num_seats_bal-e.curr_seat_bal;
    seatsAvailableCounts[e.title]['orchestraSeats']=e.num_seats_orch-e.curr_seat_orch;
})
var seatsAvailLabels = ['Balcony Seats', 'Orchestra Seats'];
const seatsAvailableData = populateData(seatsAvailLabels, seatsAvailableCounts, labels,graphColors,true);
createBarGraph(availableSeatsCavnas,seatsAvailableData);


/*age chart*/
const ageCanvas = document.getElementById('ageChart').getContext('2d');

// Function to calculate age range
function getAgeRange(age) {
    if (age < 18) return 'Under 18';
    if (age >= 18 && age <= 22) return '18-22';
    if (age >= 23 && age <= 25) return '23-25';
    if (age >= 26 && age <= 30) return '26-30';
    if (age >= 31 && age <= 34) return '31-34';
    if (age >= 35 && age <= 40) return '35-40';
    if (age >= 41 && age <= 45) return '41-45';
    if (age >= 46 && age <= 50) return '46-50';
    return '51 and above';
}

//populate ageRangeCounts
const ageRangeCounts = {
    'Entablado': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Perlas ng Silangan': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Pinoy Soundtrip': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Pagninilay-nilay': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Sulyap ng Musika': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Cantate Domino': {
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    },
    'Total':{
        'Under 18': 0,
        '18-22': 0,
        '23-25': 0,
        '26-30': 0,
        '31-34': 0,
        '35-40': 0,
        '41-45': 0,
        '46-50': 0,
        '51 and above': 0,
    }
};

for(let i = 0; i<users.length; i++){
    let ageRange = getAgeRange(users[i].age);
    ageRangeCounts[selectedEvent[i].title][ageRange]++;
    ageRangeCounts['Total'][ageRange]++;
}

labels.push('Total');
var ageLabels = ['Under 18', '18-22', '23-25', '26-30', '31-34', '35-40', '41-45', '46-50', '51 and above'];
const ageData = populateData(ageLabels, ageRangeCounts, labels,graphColors,true);
createBarGraph(ageCanvas, ageData);