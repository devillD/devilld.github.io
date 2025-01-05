// Function to handle URL parameters
function getURLParameter(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Function to initialize the site dropdown based on URL parameter
function initializeSiteFromURL() {
    const siteFromURL = getURLParameter("site");
    if (siteFromURL) {
        const siteDropdown = document.getElementById("torrents");
        const options = Array.from(siteDropdown.options);
        const match = options.find(option => option.value === siteFromURL);
        if (match) {
            siteDropdown.value = siteFromURL;
        } else {
            console.warn(`Site "${siteFromURL}" not found in the dropdown options.`);
        }
    }
}

// Modified getTorrent function
async function getTorrent() {
    let siteName = document.getElementById("torrents").value;

    if (siteName === '') {
        siteName = '1337x';
    }

    const query = document.getElementById("query").value;
    if (query !== '') {
        const api = "https://api.api-zero.workers.dev/" + siteName + "/" + query;

        try {
            const response = await fetch(api);
            const data = await response.json();
            displayTorrents(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}

function displayTorrents(torrents) {
    const resultsContainer = document.getElementById("data");
    resultsContainer.innerHTML = "";

    if (torrents.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
    } else {
        torrents.forEach(torrent => {
            const torrentItem = document.createElement("div");
            torrentItem.classList.add("torrent-item");

            const torrentLink = document.createElement("a");
            torrentLink.href = torrent.Magnet;
            torrentLink.textContent = torrent.Name;
            torrentLink.classList.add("torrent-link");

            const torrentInfo = document.createElement("div");
            torrentInfo.classList.add("torrent-info");
            
            const size = document.createElement("span");
            size.textContent = "Size: " + torrent.Size;
            torrentInfo.appendChild(size);

            const category = document.createElement("span");
            category.textContent = "Category: " + torrent.Category;
            torrentInfo.appendChild(category);

            const seeders = document.createElement("span");
            seeders.textContent = "Seeders: " + torrent.Seeders;
            torrentInfo.appendChild(seeders);

            const leechers = document.createElement("span");
            leechers.textContent = "Leechers: " + torrent.Leechers;
            torrentInfo.appendChild(leechers);

            const date = document.createElement("span");
            date.textContent = "Date: " + torrent.Date;
            torrentInfo.appendChild(date);

            torrentItem.appendChild(torrentLink);
            torrentItem.appendChild(torrentInfo);

            resultsContainer.appendChild(torrentItem);
        });
    }
}

// Initialize site selection on page load
window.addEventListener("DOMContentLoaded", initializeSiteFromURL);
