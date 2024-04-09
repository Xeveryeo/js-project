// Replace with your own API key
const apiKey = 'RnnCjDF1qlAegHSfEjgn2nA0R12izNsY';

// Function to fetch events from the API
async function fetchEvents(searchTerm, countryCode) {
  // Construct the URL with the search term and country code
  const url = new URL('https://app.ticketmaster.com/discovery/v2/events.json');
  url.searchParams.append('apikey', apiKey);
  url.searchParams.append('keyword', searchTerm);
  url.searchParams.append('countryCode', countryCode);

  // Fetch the events from the API
  const response = await fetch(url);
  const data = await response.json();

  // Return the events
  return data._embedded.events;
}

// Function to display the events
function displayEvents(events) {
  // Get the events section
  const eventsSection = document.getElementById('events');

  // Clear any existing events
  eventsSection.innerHTML = '';

  // Loop through the events
  for (const event of events) {
    // Create a new event box
    const eventBox = document.createElement('div');
    eventBox.classList.add('event-box');

    // Add the event name
    const eventName = document.createElement('h3');
    eventName.textContent = event.name;
    eventBox.appendChild(eventName);

    // Add the event date
    const eventDate = document.createElement('p');
    eventDate.textContent = new Date(event.dates.start.localDate).toLocaleDateString();
    eventBox.appendChild(eventDate);

    // Add the event venue
    const eventVenue = document.createElement('p');
    eventVenue.textContent = event._embedded.venues[0].name;
    eventBox.appendChild(eventVenue);

    // Add the event to the events section
    eventsSection.appendChild(eventBox);
  }
}

// Function to handle form submission
async function handleSubmit(event) {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the search term and country code
  const searchTerm = document.getElementById('search').value;
  const countryCode = document.getElementById('country').value;

  // Fetch and display the events
  const events = await fetchEvents(searchTerm, countryCode);
  displayEvents(events);
}

// Get the form and add a submit listener
const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);