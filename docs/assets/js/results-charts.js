/**
 * Results page charts (Chart.js) and bivariate legend swatches.
 *
 * Every array below is SAMPLE DATA so the Results page renders correctly
 * out of the box. Replace the numbers with the real values extracted from
 * your zonal-statistics / bivariate / chart .gpkg attribute tables.
 */
(function () {
  "use strict";

  const COLORS = {
    no2: "#1b6ca8",
    pm25: "#c0392b",
    pm10: "#d68910",
    grid: "rgba(11,45,72,0.08)",
  };

  const REGIONS = [
    "Île-de-France",
    "Auvergne-Rhône-Alpes",
    "Hauts-de-France",
    "Provence-Alpes-Côte d'Azur",
    "Nouvelle-Aquitaine",
  ];

  const sharedScales = {
    y: { beginAtZero: true, grid: { color: COLORS.grid } },
    x: { grid: { display: false } },
  };
/*
  function barChart(canvasId, label, data, color) {
    const el = document.getElementById(canvasId);
    if (!el || typeof Chart === "undefined") return;
    new Chart(el, {
      type: "bar",
      data: {
        labels: REGIONS,
        datasets: [{
          label: label,
          data: data,
          backgroundColor: color,
          borderRadius: 6,
          maxBarThickness: 42,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: sharedScales,
      },
    });
  }
*/
function multiBarChart(canvasId, labels, meanData, minData, maxData) {
    const el = document.getElementById(canvasId);
    if (!el || typeof Chart === "undefined") return;
    new Chart(el, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Mean Change",
            data: meanData,
            backgroundColor: "#2c3e50", // Dark Slate Blue
            borderRadius: 4,
          },
          {
            label: "Min Change",
            data: minData,
            backgroundColor: "#c0392b", // Crimson Red
            borderRadius: 4,
          },
          {
            label: "Max Change",
            data: maxData,
            backgroundColor: "#27ae60", // Emerald Green
            borderRadius: 4,
          }
        ],
      },
      options: {
        responsive: true,
        plugins: { 
          legend: { display: true, position: "top" } 
        },
        scales: {
          y: { 
            beginAtZero: false, 
            grid: { color: COLORS.grid },
            title: { display: true, text: "Concentration Change (µg/m³)" }
          },
          x: { grid: { display: false } },
        },
      },
    });
  }

const transitionClasses = ["Stable Crops", "Crop Gain", "Crop Loss"];

  // Step 6 — Multi-dataset execution using real group stats (France Crop Dynamics)
  multiBarChart("chart-no2-bar", transitionClasses, [-0.9458, -0.9458, -0.7137], [-4.6751, -4.6751, -4.6751], [3.1563, 3.1563, 3.1563]);
  multiBarChart("chart-pm25-bar", transitionClasses, [-0.8898, -0.7395, -0.7060], [-4.6751, -4.6751, -4.6751], [3.1563, 3.1563, 3.1563]);
  multiBarChart("chart-pm10-bar", transitionClasses, [-1.0476, -0.9856, -0.9227], [-4.3773, -4.3773, -4.3773], [1.1967, 1.1967, 0.7946]);

  // Step 4 — national AMAC change 2021 -> 2023 (sample data)
  (function () {
    const el = document.getElementById("chart-amac");
    if (!el || typeof Chart === "undefined") return;
    const values = [-1.8, -0.6, 0.4];
    new Chart(el, {
      type: "bar",
      data: {
        labels: ["NO2", "PM2.5", "PM10"],
        datasets: [{
          label: "Mean change 2021→2023 (µg/m³)",
          data: values,
          backgroundColor: values.map((v) => (v < 0 ? "#2166ac" : "#b2182b")),
          borderRadius: 6,
          maxBarThickness: 60,
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: COLORS.grid } },
          y: { grid: { display: false } },
        },
      },
    });
  })();

  // Step 8 — Group population exposure pie charts (Configured for 2 classes)
  function pieChart(canvasId, dataValues, colors) {
    const el = document.getElementById(canvasId);
    if (!el || typeof Chart === "undefined") return;
    new Chart(el, {
      type: "pie",
      data: {
        labels: ["Moderate Exposure (Class 2)", "High Exposure (Class 3)"],
        datasets: [{
          data: dataValues,
          backgroundColor: colors,
          borderWidth: 2,
          borderColor: "#ffffff",
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, font: { size: 11 } } } },
      },
    });
  }
// Execution for all 3 pollutants (Replace 50.0 placeholders with your group's true percentages)
  pieChart("chart-pie-no2", [60.3, 39.7], ["#ace4e4", COLORS.no2]);
  pieChart("chart-pie-pm25", [83.3, 16.7], ["#ace4e4", COLORS.pm25]);
  pieChart("chart-pie-pm10", [59.3, 40.7], ["#ace4e4", COLORS.pm10]);

  // Bivariate 3x3 legends (population x pollution). Classic blue/pink bivariate palette —
  // swap for the ramp exported from your QGIS bivariate style if it differs.
const BIVARIATE_PALETTE = [
    // Bottom Row 1 (Lowest Pollution Ramps)
    ["#ffffff", "#ffe3e7", "#ffbccc", "#ff8fa9", "#ff6b8b"],
    // Row 2
    ["#e0ffff", "#d0e4ee", "#c0c9dd", "#b0aecd", "#a092bd"],
    // Row 3
    ["#aeffff", "#9ee2ee", "#8ec7dd", "#7eadcd", "#6e92bd"],
    // Row 4
    ["#5effff", "#4ee2ee", "#3ec6dd", "#2eabcd", "#1e91bd"],
    // Top Row 5 (Highest Pollution Ramps)
    ["#00ffff", "#00dbe6", "#00b5cd", "#0090b4", "#006b9b"]
  ];

  function renderBivariateLegend(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    BIVARIATE_PALETTE.forEach((row) => {
      row.forEach((color) => {
        const cell = document.createElement("div");
        cell.style.background = color;
        container.appendChild(cell);
      });
    });
  }

  renderBivariateLegend("bivariateLegendNo2");
  renderBivariateLegend("bivariateLegendPm25");
  renderBivariateLegend("bivariateLegendPm10");
})();
