const searchButton = document.getElementById("search");
searchButton.addEventListener("click", getWeather);

function getWeather() {
  const location = document.querySelector(".location").value;
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=7HLTSCZRV5B72P2HTUSFM5GCT&contentType=json`,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      console.log(json);
      return renderWeather(json);
    });
}

function renderWeather(json) {
  const renderArea = document.querySelector(".result");
  renderArea.innerHTML = "";
  const locationTitle = document.createElement("h2");
  locationTitle.innerText = json.resolvedAddress;
  const temp = json.currentConditions.temp;
  const celciusTemp = Math.round(((temp - 32) * 5) / 9);
  const tempDiv = document.createElement("div");
  tempDiv.innerText = `Temperatura = ${celciusTemp}`;
  changeBg(celciusTemp);

  renderArea.appendChild(locationTitle);
  renderArea.appendChild(tempDiv);
}

function changeBg(celciusTemp) {
  const body = document.querySelector("body");
  switch (true) {
    case celciusTemp < 10:
      body.style.background = "linear-gradient(to bottom, #0000FF, #87CEFA)";
      break;

    case celciusTemp > 10 && celciusTemp < 20:
      body.style.background = "linear-gradient(to bottom, #FFFF00, #FFFFE0)";
      break;

    case celciusTemp > 20 && celciusTemp < 30:
      body.style.background = "linear-gradient(to bottom, #FFA500, #FFD700)";
      break;

    case celciusTemp > 30:
      body.style.background = "linear-gradient(to bottom, #FF0000, #FF7F7F)";
      break;
  }
}
