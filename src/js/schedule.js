const today = new Date("2025-03-21");

try {
    const response = await fetch('/backend/schedule.json');
    const data = await response.json()
    const movies = data.movies

    const dates = movies.map(movie => movie.date)
    const uniqueDates = Array.from(new Set(dates))
    const finalDatesArray = []

    uniqueDates.forEach(date => {
        const dateObject = new Date(date)
        if(dateObject.getTime() === today.getTime()){
            finalDatesArray.push('Today')
        } else {
            const day = dateObject.getDate()
            const month = dateObject.toLocaleString('default', { month: 'short' })
            finalDatesArray.push(`${day} ${month}.`)
        }
    })

    const datesBox = document.querySelector('#dates')

    finalDatesArray.forEach((date, index) => {
        const html = `
            <div class="date ${index === 0 && 'active'}">${date}</div>
            ${index < finalDatesArray.length - 1 ? '<div class="vertical-line"></div>' : ''}
        `
        datesBox.insertAdjacentHTML('beforeend', html)
    })

    const datesElements = document.querySelectorAll('.date')
    const datesElementsArr = Array.from(datesElements)
    let selectedDate = uniqueDates[0]

    const appendMovies = (selectedDate) => {
        const moviesBox = document.querySelector('#moviesContainer')

        let finalHtml = ``
        let html = ``

        movies.forEach((movie, index) => {
            if(movie.date === selectedDate){

                let hoursHtml = ``
                movie.hours.forEach(hour => {
                    hoursHtml += `<div class="hour">${hour}</div>`
                })

                let leftSeatsHtml = ``
                movie.seats_left.forEach(row => {
                    row.forEach(seat => {
                        if(seat === -1){
                            leftSeatsHtml += `<div class="no-square seat"></div>`
                        } else if(seat === 0){
                            leftSeatsHtml += `<div class="available seat"></div>`
                        } else {
                            leftSeatsHtml += `<div class="reserved seat"></div>`
                        }
                    })
                })

                let rightSeatsHtml = ``
                movie.seats_right.forEach(row => {
                    row.forEach(seat => {
                        if(seat === -1){
                            rightSeatsHtml += `<div class="no-square seat"></div>`
                        } else if(seat === 0){
                            rightSeatsHtml += `<div class="available seat"></div>`
                        } else {
                            rightSeatsHtml += `<div class="reserved seat"></div>`
                        }
                    })
                })

                html = `
                    <div class="movie-card">
                        <div class="movie-card-left">
                            <img src="${movie.image}" alt="movie_img" draggable="false">
                            <div class="movie-info">
                                <div class="top-part">
                                    <h2>${movie.name}</h2>
                                    <p class="genres">${movie.genres}</p>
                                    <p class="description">${movie.description}</p>
            
                                    <div class="hours">
                                        ${hoursHtml}
                                    </div>
                                </div>

                                <button class="book-btn">
                                    Book
                                </button>
                            </div>
                        </div>

                        <div class="movie-card-right">
                            <p class="title">Choose your seats</p>

                            <div class="seats">
                                <div class="seats-left">${leftSeatsHtml}</div>
                                <div class="seats-right">${rightSeatsHtml}</div>
                            </div>

                            <div class="legend">
                                <div class="category">
                                    <div class="circle reserved"></div>
                                    <p>Reserved</p>
                                </div>

                                <div class="category">
                                    <div class="circle available"></div>
                                    <p>Available</p>
                                </div>

                                <div class="category">
                                    <div class="circle selected"></div>
                                    <p>Selected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                finalHtml += html
            }

        })

        moviesBox.innerHTML = finalHtml
    }

    appendMovies(selectedDate)

    datesElementsArr.forEach((date, index) => {
        date.addEventListener('click', () => {
            datesElementsArr.forEach(date => date.classList.remove('active'));
            date.classList.add('active');
            selectedDate = uniqueDates[index];
            console.log(selectedDate);
            appendMovies(selectedDate);
    
            initializeSeatSelection();
            initializeHourSelection();
        });
    });
    
    const initializeHourSelection = () => {
        const hourBtns = document.querySelectorAll('.hour');
    
        hourBtns.forEach(hour => {
            hour.addEventListener('click', () => {
                hourBtns.forEach(hour => hour.classList.remove('selected'));
                hour.classList.toggle('selected');
            });
        });
    };
    
    const initializeSeatSelection = () => {
        const movieCards = document.querySelectorAll('.movie-card');
    
        movieCards.forEach(movieCard => {
            const seats = movieCard.querySelectorAll('.seat');
    
            seats.forEach(seat => {
                seat.addEventListener('click', () => {
                    document.querySelectorAll('.movie-card .seat.selected').forEach(selectedSeat => {
                        if (!movieCard.contains(selectedSeat)) {
                            selectedSeat.classList.remove('selected');
                        }
                    });
    
                    if (seat.classList.contains('available')) {
                        seat.classList.toggle('selected');
                    }
                });
            });
        });
    };
    
    initializeSeatSelection();
    initializeHourSelection();

    

} catch (error) {
    console.error('Error:', error);
}