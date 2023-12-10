let btnDropDown = document.querySelectorAll(".btn-dropDown");

btnDropDown.forEach((dropDown) => {
  dropDown.addEventListener("click", function () {
    this.classList.toggle("show");
    let flex = this.nextElementSibling;
    flex.style.maxHeight
      ? (flex.style.maxHeight = null)
      : (flex.style.maxHeight = flex.scrollHeight + "px");

    //   console.log("clicked");
  });
});

let ContainerCountries = document.querySelector(".container-case"); // Use .container-case for class or #container-case for ID

const renderCountry = function (data, className = "") {
  const formattedPopulation = numberWithCommas(data.population);
  const html = ` <article class="country  ${className}">

  <a href="file.html">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <p class="country__row"><span>👫</span>Population:  ${formattedPopulation}</p>
      <h4 class="country__region">Region:  ${data.region}</h4>
      <h4 class="country__capital">Capital:  ${
        data.capital || "Not available"
      }</h4>
      </a>
    </div>
  </article>`;

  ContainerCountries.insertAdjacentHTML("beforeend", html);
  ContainerCountries.style.opacity = 1;
};

async function fetchData() {
  try {
    let response = await fetch("data.json");
    const data = await response.json();
    console.log(data);

    // Assuming data is an array of country objects
    data.forEach((country) => {
      renderCountry(country);
    });

    return data;
  } catch (error) {
    console.log("Error fetching data", error);
  }
}

fetchData();

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const modeToggle = document.querySelectorAll(".div2");
const modeText = document.querySelector(".modeText");
const icon = document.querySelector(".moon-solid");

modeToggle.forEach((toggle) => {
  toggle.addEventListener("click", function () {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      modeText.textContent = "Light Mode";
      icon.src = "images/brightness.svg";
    } else {
      document.body.classList.add("dark-mode");
      modeText.textContent = "Dark Mode";
      icon.src = "images/moon.svg";
    }
  });
});

let searchInput = document.querySelector(".input-search");
let errormessage = document.querySelector(".error_message");
function filterCountries(data, searchTerm) {
  return data.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

function displayFilteredCountries(filteredCountries) {
  ContainerCountries.innerHTML = "";
  if (filteredCountries.length === 0) {
    errormessage.style.display = "block"; // Display error message
  } else {
    filteredCountries.forEach((country) => {
      renderCountry(country);
    });
  }
}

searchInput.addEventListener("input", async (event) => {
  const searchTerm = event.target.value.trim();
  const allCountries = await fetchData();
  if (searchTerm === "") {
    errormessage.style.display = "none";
    displayFilteredCountries(allCountries);
  } else {
    const filteredCountries = filterCountries(allCountries, searchTerm);
    if (filteredCountries.length > 0) {
      errormessage.style.display = "none"; // Hide error message if there's a match
      displayFilteredCountries(filteredCountries);
    } else {
      displayFilteredCountries(filteredCountries);
    }
  }
});

// document.addEventListener("click", function (event) {
//   const clickedElement = event.target.closest(".ContainerCountries");

//   if (!clickedElement) return; // Exit if the click wasn't on a country element

//   const countryData = JSON.parse(clickedElement.dataset.ContainerCountries);

//   displayCountryDetails(countryData);
// });

// // Function to display detailed information about a country (can be a separate HTML page or section)
// function displayCountryDetails(data, className) {
//   const formattedhtml = ` <div class="details  ${className}">
//     <div class="country-flag">
//       <img src="${data.flag}" alt="" />
//     </div>

//     <div class="country-case">
//       <h1 class="country__name">${data.name}</h1>

//       <div class="details-country">
//         <div class="country-info">
//           <p class="Native-name">${data.nativeName}</p>
//           <p class="Population">${data.population}</p>
//           <p class="Region">${data.region}</p>
//           <p class="sub-region">${data.subregion}</p>
//           <p class="Capital">${data.capital}</p>

//           <div class="border-countries">
//             <p>Border Countries:</p>
//           </div>
//         </div>

//         <div class="info-level">
//           <p class="Top-level_Domain">${data.topLevelDomain}</p>
//           <p class="currencies">${data.currencies[0].symbol}</p>
//           <p class="languages">${data.languages.name}</p>
//         </div>
//       </div>
//     </div>
//   </div>`;

//   countryDetails.insertAdjacentHTML("beforeend", formattedhtml);
// }
// console.log(countryData); // For demonstration, log the country data
