const year_display = document.getElementById('year-display');
const right_btn = document.getElementById('right_btn');
const left_btn = document.getElementById('left_btn');
const award_data_container = document.getElementById("award_data_container");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const lastYear = 2021;

// Mock data function
function getDataFromYear(year) {
    console.log({ year });
    if (year === 2023) {
        return [
            {
                name: 'Test',
                month: '1',
                groupName: '2',
                winnerCat: '3',
                year: '4'
            },
        ];
    } else if (year === 2022) {
        return [
            {
                name: 'sdhf',
                month: 'sdff',
                groupName: '2',
                winnerCat: '3',
                year: '4'
            },
            {
                name: 'Test 2',
                month: '12',
                groupName: '22',
                winnerCat: '32',
                year: '42'
            }
        ];
    } else {
        return [];
    }
}

// Initialize display with the current year
year_display.innerHTML = currentYear;
right_btn.classList.add("disabled");
(()=> {
    updateAwardData(currentYear)
})()

// Function to update the display of award data
function updateAwardData(year) {
    // Clear the container before appending new data
    award_data_container.innerHTML = '';
    const tempDiv = document.createElement('div');

    const awardData = getDataFromYear(year);
    if(awardData.length === 0) {
        tempDiv.innerHTML = 'No data found!';
        award_data_container.appendChild(tempDiv.firstChild);
        return;
    }

    awardData.forEach(el => {
        const data = prepareAwardData(el);
        // Create a temporary div to convert HTML string to DOM nodes
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Append all child nodes from the temporary div to the container
        while (tempDiv.firstChild) {
            award_data_container.appendChild(tempDiv.firstChild);
        }
    });
}

// Function to handle button clicks
function handleClick(direction) {
    const displayedYear = parseInt(year_display.innerText);

    if (direction === 'left') {
        if (displayedYear > lastYear) {
            year_display.innerHTML = displayedYear - 1;
            right_btn.classList.remove("disabled");
            updateAwardData(displayedYear - 1);

            // Disable the 'left' button if the year is less than or equal to the lastYear
            if (displayedYear - 1 <= lastYear) {
                left_btn.classList.add("disabled");
            }
        }
    }

    if (direction === 'right') {
        if (displayedYear < currentYear) {
            year_display.innerHTML = displayedYear + 1;
            left_btn.classList.remove("disabled");
            updateAwardData(displayedYear + 1);

            // Disable the 'right' button if the year is greater than or equal to the currentYear
            if (displayedYear + 1 >= currentYear) {
                right_btn.classList.add("disabled");
            }
        }
    }
}

// Function to prepare award data
function prepareAwardData(data) {
    const { name, month, groupName, winnerCat, year } = data;

    return `
        <div class="col-sm-4">
            <div class="award-all">
                <div class="award-single">
                    <h4 class="award-name">${name}</h4>
                    <span>${month}</span>
                    <span>${groupName}</span>
                    <span>${winnerCat}</span>
                    <span>Quarter | Month | ${year}</span>
                </div>
            </div>
        </div>
    `;
}

// Event listeners for buttons
left_btn.addEventListener('click', () => handleClick('left'));
right_btn.addEventListener('click', () => handleClick('right'));
