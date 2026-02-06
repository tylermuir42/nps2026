import "../css/style.css";
import "../css/conditions.css";

import{
    getParkData,
    getParkAlerts,
    getParkVisitorCenters
} from "./parkService.mjs";

import {
    activityListTemplate,
    alertTemplate,
    visitorCenterTemplate
} from "./templates.mjs";

import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts){
    const alertsContainer = document.querySelector(".alerts > ul");
    alertsConstainer.innerHTML = "";
    const html = alerts.map(alertTemplate);
    alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(centers){
    const centersContainer = document.querySelector(".visitor ul");
    const html = centers.map(visitorCenterTemplate);
    centersContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivites(activities){
    const activitiesContainer = document.querySelector(".activites ul");
    const html = activityListTemplate(activities);
    activitiesContainer.insertAdjacentHTML("afterbegin", html);
}

async function init(){
    const parkData = await getParkData();
    const alerts = await getParkAlerts(parkData.parkCode);
    const visitorCenters = await getParkVisitorCenters(parkData.parkCode);

    setActivites(parkData.activities);
    setVisitorCenters(visitorCenters);
    setHeaderFooter(parkData);
    setAlerts(alerts);
}

init();