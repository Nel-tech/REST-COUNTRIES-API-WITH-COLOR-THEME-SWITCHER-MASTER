document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const countryCode = urlParams.get("alpha3Code");

  async function fetchCountryDetails(countryCode) {
    try {
      const response = await fetch("data.json");
      const countryData = await response.json();

      const country = countryData.find(
        (country) => country.alpha3Code === countryCode
      );
      displayCountryDetails(country);
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  }

  document.addEventListener("click", async function (event) {
    if (event.target.classList.contains("border-btn")) {
      const countryCode = event.target.dataset.countryCode;
      const countryData = await fetchCountryDetails(countryCode);
      if (countryData) {
        displayCountryDetails(countryData);
      }
    }
  });

  function displayCountryDetails(country) {
    document.querySelector(".country__name").textContent = ` ${country.name}`;
    document.querySelector(".country-flag img").src = country.flag;
    document.querySelector(".Native-name").textContent = country.nativeName;
    document.querySelector(".Population").textContent = country.population;
    document.querySelector(".Region").textContent = country.region;
    document.querySelector(".subregion").textContent = country.subregion;
    document.querySelector(".Capital").textContent = country.capital;
    document.querySelector(".Top-level_Domain").textContent =
      country.topLevelDomain;
    document.querySelector(".currencies").textContent =
      country.currencies[0].name;
    const languages = country.languages.map((language) => language.name);
    document.querySelector(".languages").textContent = languages.join(", ");

    const borders = country.borders;
    const borderBtnContainer = document.querySelector(".border-countries");
    borderBtnContainer.innerHTML = ""; // Clear previous content

    if (borders.length > 0) {
      borders.forEach((border) => {
        const button = document.createElement("button");
        button.classList.add("border-btn");
        button.textContent = border; // Set button text content to the country name
        button.dataset.countryCode = border; // Assuming countryCode refers to the border country's code

        borderBtnContainer.appendChild(button);
      });
    } else {
      // Handle case where there are no border countries available
      const noBordersMessage = document.createElement("span");
      noBordersMessage.textContent = "No border countries available";
      borderBtnContainer.appendChild(noBordersMessage);
    }
  }

  fetchCountryDetails(countryCode);
});

const backButton = document.querySelector(".btn-back");
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});
