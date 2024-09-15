
//Return to Main Menu when button is pressed
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('menu_button').addEventListener('click', () => {
        // Define the dimensions for the new popup window
        const width = 300;
        const height = 400;

        // Get the current window ID
        chrome.windows.getCurrent((currentWindow) => {
            // Open popup.html in a new popup window
            chrome.windows.create({
                url: chrome.runtime.getURL('popup.html'),
                type: 'popup',
                width: width,
                height: height
            }, () => {
                // Close the current window
                chrome.windows.remove(currentWindow.id);
            });
        });
    });
});

// Handle close button
const closeButton = document.getElementById('close-popup');
if (closeButton) {
    closeButton.addEventListener('click', () => {
        window.close(); // Close the window if it was opened by window.open()
    });
}


/*--------------------------------------------
    CSV STUFF
--------------------------------------------*/

/*
document.addEventListener('DOMContentLoaded', () => {
    const csvData = `MCC Code,Chase Freedom Unlimited®,Wells Fargo Active Cash® Card,Capital One Venture Rewards Credit Card,Blue Cash Preferred® Card from American Express,Capital One SavorOne Cash Rewards Credit Card,Chase Sapphire Preferred® Card,U.S. Bank Visa® Platinum Card,Wells Fargo Reflect® Card,Discover it® Cash Back,Darb Card
    7623,1.89% cashback,4.63% cashback,1x points,2x points,4.47% cashback,3x points,1.47% cashback,1x points,5x points,1.44% cashback
    8931,4.87% cashback,1.17% cashback,1x points,5x points,4.67% cashback,5x points,4x points,4x points,2.53% cashback,4.81% cashback`;

    function parseCSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        return lines.slice(1).map(line => {
            const values = line.split(',');
            let obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });
            return obj;
        });
    }

    const parsedData = parseCSV(csvData);

    const inputField = document.getElementById('mcc-code-input');
    const searchButton = document.getElementById('submit');

    searchButton.addEventListener('click', () => {
        const mccCode = inputField.value.trim();
        const result = parsedData.find(item => item['MCC Code'] === mccCode);

        if (result) {
            // Convert result to a query string format
            const resultParams = Object.entries(result).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
            
            // Open functional.html with MCC code and result parameters
            window.location.href = `functional.html?${resultParams}`;
        } else {
            alert(`No results found for MCC Code ${mccCode}`);
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const resultsContainer = document.getElementById('results-container');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Iterate over query parameters and display results
    for (const [key, value] of params.entries()) {
        if (key !== 'MCC Code') {
            const paragraph = document.createElement('p');
            paragraph.textContent = `${key}: ${decodeURIComponent(value)}`;
            resultsContainer.appendChild(paragraph);
        }
    }
});
*/


document.addEventListener('DOMContentLoaded', () => {
    // Hardcoded card data
    const cardData = {
        "Chase Freedom Unlimited": ["1.89% cashback", "4.63% cashback", "1x points"],
        "Wells Fargo Active Cash Card": ["4.87% cashback", "1.17% cashback", "1x points"],
        "Capital One Venture Rewards Credit Card": ["2x points", "4.47% cashback", "3x points"],
        "Blue Cash Preferred Cash from American Express": ["1x points", "4.47% cashback", "1.47% cashback"],
        "Capital One SavorOne Cash Rewards Credit Card": ["4.67% cashback", "5x points", "4x points"],
        "Chase Sapphire Preferred Card": ["5x points", "2.53% cashback", "4.81% cashback"],
        "US Band Visa Platinum Card": ["3x points", "4x points", "4x points"],
        "Wells Fargo Reflect Card": ["4.87% cashback", "1.44% cashback", "1x points"],
        "Discover It Cash Back": ["4.67% cashback", "2x points", "5x points"],
        "Darb Card": ["5x points", "4.81% cashback", "1.44% cashback"]
    };

    // Populate the sections based on the hardcoded card data
    function populateCardData() {
        Object.entries(cardData).forEach(([cardName, benefits]) => {
            const section = document.getElementById(cardName.replace(/ /g, '_'));

            if (section) {
                const benefitsList = section.querySelector('.benefit-list');
                benefitsList.innerHTML = ''; // Clear existing list items

                benefits.forEach(benefit => {
                    const listItem = document.createElement('li');
                    listItem.textContent = benefit;
                    benefitsList.appendChild(listItem);
                });
            }
        });
    }

    // Initial call to populate data
    populateCardData();

    // Navigation functionality (if needed)
    document.querySelectorAll('.icon-button').forEach(button => {
        button.addEventListener('click', () => {
            const pageId = button.getAttribute('data-page');
            if (pageId === 'close') {
                window.close();
            } else {
                showPage(pageId); // Implement showPage function if necessary
            }
        });
    });
});
