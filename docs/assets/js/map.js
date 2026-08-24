
// 1. Setup Map Base Configurations
const initialZoom = 6;
const initialCoordinates = [2.2137, 46.2276];


const geoserverWmsUrl = 'http://localhost:8080/geoserver/Lab_group_03/wms';


let osm = new ol.layer.Tile({
    title: 'OpenStreetMap',
    type: 'base',
    visible: true,
    source: new ol.source.OSM()
});

// Base map 2: Esri World Imagery (satellite)
let esriSatellite = new ol.layer.Tile({
    title: 'Esri Satellite',
    type: 'base',
    visible: false,
    source: new ol.source.XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
    })
});

let map = new ol.Map({
    target: document.getElementById('map'),
    layers: [],
    view: new ol.View({
        center: ol.proj.fromLonLat(initialCoordinates),
        zoom: initialZoom,
        projection: 'EPSG:3857'
    })
});

// 2. Define the individual WMS Layers
// Root Level Layers inside Overlay Group
var franceBoundaries = new ol.layer.Image({
    title: 'France boundaries',
    visible: true,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:gis_lab_case_studies__boundaries' }
    }),
    opacity: 0.5
});

var landCover = new ol.layer.Image({
    title: 'Land Cover Change',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_LCC_2021_2023' }
    })
});

// Group: concentration map 2023
var pm10_concentration_map = new ol.layer.Image({
    title: 'Concentration pm10 2023',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_pm10_concentration_map_2023' }
    })
});

var pm2p5_concentration_map = new ol.layer.Image({
    title: 'Concentration pm2p5 2023',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_pm2p5_concentration_map_2023' }
    })
});

var no2_concentration_map = new ol.layer.Image({
    title: 'Concentration no2 2023',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_no2_concentration_map_2023' }
    })
});

// Group: AMAC 2021-2023
var pm10_amac = new ol.layer.Image({
    title: 'AMAC pm10',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_pm10_2021_2023_AMAC_map' }
    })
});

var pm2p5_amac = new ol.layer.Image({
    title: 'AMAC pm2p5',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_pm2p5_2021_2023_AMAC_map' }
    })
});

var no2_amac = new ol.layer.Image({
    title: 'AMAC no2',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_no2 _2021_2023_AMAC_map' }
    })
});

// Group: Bivariate Map
var pm10_bivariate = new ol.layer.Image({
    title: 'Bivariate map pm10',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:france_pm10_2023_bivariate__france_pol_2023_bivariate' }
    })
});

var pm2p5_bivariate = new ol.layer.Image({
    title: 'Bivariate map pm2p5',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:france_pm2p5_2023_zonal_stats' }
    })
});

var no2_bivariate = new ol.layer.Image({
    title: 'Bivariate map no2',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:NO2_Bivariate' }
    })
});

// Group: CAMS December 2023
var no2_cams = new ol.layer.Image({
    title: 'CAMS no2',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_no2_2023_12' }
    })
});
var pm10_cams = new ol.layer.Image({
    title: 'CAMS pm10',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_PM10_2023_12' }
    })
});
var pm2p5_cams = new ol.layer.Image({
    title: 'CAMS pm2p5',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_CAMS_pm2p5_2023_12' }
    })
});

// Group: Average Concentration 2023
var no2_average = new ol.layer.Image({
    title: 'Average no2 Concentration',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_average_no2_2023' }
    })
});
var pm10_average = new ol.layer.Image({
    title: 'Average pm10 Concentration',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:France_average_pm10_2023' }
    })
});
var pm2p5_average = new ol.layer.Image({
    title: 'Average pm2p5 Concentration',
    visible: false,
    source: new ol.source.ImageWMS({
        url: geoserverWmsUrl,
        params: { 'LAYERS': 'Lab_group_03:FRANCE_average_PM2P5_2023' }
    })
});

// 3. Assemble Nested Layer Groups matching the hierarchy in the interface layout
let basemapLayers = new ol.layer.Group({
    title: 'Base Maps',
    layers: [osm, esriSatellite]
});

let overlayLayers = new ol.layer.Group({
    title: 'Overlay Layers',
    layers: [
        franceBoundaries,
        landCover,
        new ol.layer.Group({
            title: 'CAMS December 2023',
            layers: [pm10_cams, pm2p5_cams, no2_cams]
        }),
        new ol.layer.Group({
            title: 'Average Concentration 2023',
            layers: [pm10_average, pm2p5_average, no2_average]
        }),
        new ol.layer.Group({
            title: 'Concentration Map 2023',
            layers: [pm10_concentration_map, pm2p5_concentration_map, no2_concentration_map]
        }),
        new ol.layer.Group({
            title: 'AMAC 2021-2023',
            layers: [pm10_amac, pm2p5_amac, no2_amac]
        }),
        new ol.layer.Group({
            title: 'Bivariate Map',
            layers: [pm10_bivariate, pm2p5_bivariate, no2_bivariate]
        })
    ]
});

// 4. Bind Everything to Map Scope
map.addLayer(basemapLayers);
map.addLayer(overlayLayers);

// 5. Initialize Interactive Switcher Interface
var layerSwitcher = new LayerSwitcher({});
map.addControl(layerSwitcher);

// Scale bar
map.addControl(new ol.control.ScaleLine({
    units: 'metric'
}));

// Full screen toggle
map.addControl(new ol.control.FullScreen());

// Cursor coordinates (lon/lat in degrees, 4 decimals)
map.addControl(new ol.control.MousePosition({
    projection: 'EPSG:4326',
    coordinateFormat: function (coord) {
        return ol.coordinate.format(coord, 'Lon: {x}°  Lat: {y}°', 4);
    },
    className: 'ol-mouse-position custom-mouse-position'
}));

// Reset to the initial France view
map.addControl(new ol.control.ZoomToExtent({
    extent: ol.proj.transformExtent([-5.5, 41.0, 9.8, 51.5], 'EPSG:4326', 'EPSG:3857'),
    label: '⌂',
    tipLabel: 'Zoom to France'
}));

// Context overview map
map.addControl(new ol.control.OverviewMap({
    layers: [new ol.layer.Tile({ source: new ol.source.OSM() })],
    collapsed: true,
    tipLabel: 'Overview map'
}));

// Control styling 
var ctrlStyle = document.createElement('style');
ctrlStyle.textContent = `
  /* Scale bar: centred at the bottom of the viewport */
  .ol-scale-line {
    left: 50% !important;
    right: auto !important;
    bottom: 30px !important;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.75);
  }

  .ol-overviewmap {
    left: 8px !important;
    right: auto !important;
    bottom: 60px !important;
    top: auto !important;
  }
 
  .custom-mouse-position {
    position: absolute;
    bottom: 30px;
    left: 8px;
    right: auto;
    top: auto;
    background: rgba(255,255,255,0.85);
    padding: 3px 8px;
    border-radius: 4px;
    font-family: system-ui, sans-serif;
    font-size: 12px;
    color: #0b2d48;
  }

 
  .ol-attribution {
    font-size: 9px !important;
    right: 5px !important;
    bottom: 5px !important;
  }

  .ol-attribution ul {
    margin: 0 !important;
    padding: 2px 4px !important;
  }

  .ol-attribution a {
    font-size: 9px !important;
  }
`;
document.head.appendChild(ctrlStyle);

// 6. LEGEND

// Create the legend container inside the map
var legendPanel = document.createElement('div');
legendPanel.id = 'legend-panel';
legendPanel.innerHTML = '<div class="legend-title">LEGEND</div><div id="legend-content"></div>';
document.getElementById('map').appendChild(legendPanel);

var legendStyle = document.createElement('style');
legendStyle.textContent = `
  #legend-panel {
    position: absolute;
    top: 118px;            
    left: 8px;
    bottom: auto;
    z-index: 1000;
    background: rgba(255,255,255,0.92);
    border: 1px solid #d0d0d0;
    border-radius: 6px;
    padding: 10px 12px;
    max-height: 40%;
    max-width: 260px;
    overflow-y: auto;
    font-family: system-ui, sans-serif;
    box-shadow: 0 2px 6px rgba(0,0,0,.2);
  }
  #legend-panel .legend-title {
    font-size: 11px;
    letter-spacing: 1px;
    color: #555;
    margin-bottom: 8px;
    font-weight: 600;
  }
  #legend-panel .legend-item { margin-bottom: 10px; }
  #legend-panel .legend-item-title {
    font-size: 12px;
    color: #0b2d48;
    margin-bottom: 3px;
    font-weight: 600;
  }
  #legend-panel img { display: block; max-width: 100%; }
  #legend-panel .legend-empty { font-size: 12px; color: #888; }
`;
document.head.appendChild(legendStyle);

// Walk groups and subgroups to collect every WMS layer
function collectWmsLayers(layerGroup, found) {
    layerGroup.getLayers().forEach(function (lyr) {
        if (lyr instanceof ol.layer.Group) {
            collectWmsLayers(lyr, found);
        } else if (lyr.getSource() instanceof ol.source.ImageWMS) {
            found.push(lyr);
        }
    });
    return found;
}

// Redraw the legend from the currently visible layers
function updateLegend() {
    var content = document.getElementById('legend-content');
    content.innerHTML = '';
    var visibles = collectWmsLayers(overlayLayers, []).filter(function (l) {
        return l.getVisible();
    });

    if (visibles.length === 0) {
        content.innerHTML = '<div class="legend-empty">Switch on a layer to see its legend.</div>';
        return;
    }

    visibles.forEach(function (lyr) {
        var layerName = lyr.getSource().getParams()['LAYERS'];
        var url = geoserverWmsUrl +
            '?service=WMS&version=1.1.0&request=GetLegendGraphic' +
            '&format=image/png&width=18&height=18' +
            '&LEGEND_OPTIONS=forceLabels:on;fontAntiAliasing:true;fontSize:11' +
            '&layer=' + encodeURIComponent(layerName);

        var item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = '<div class="legend-item-title">' + lyr.get('title') + '</div>' +
                         '<img src="' + url + '" alt="Legend for ' + lyr.get('title') + '">';
        content.appendChild(item);
    });
}
collectWmsLayers(overlayLayers, []).forEach(function (lyr) {
    lyr.on('change:visible', updateLegend);
});

updateLegend();
