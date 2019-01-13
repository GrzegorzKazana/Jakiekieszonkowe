import React from "react";
import {
  Map,
  WMSTileLayer,
  GeoJSON,
  Marker,
  Popup,
  ZoomControl
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import xd from "../../../Common/GeoJSON_POL_1.json";

// Marker - webpack icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

//http://colorbrewer2.org/#type=sequential&scheme=BuPu&n=9
const colors = [
  "#bfd3e6",
  "#9ebcda",
  "#8c96c6",
  "#8c6bb1",
  "#88419d",
  "#810f7c",
  "#4d004b"
];
//"#F3F0E9",
// lat: 51.93,
// lng: 19.15,
// zoom: 6.5,

export default class MapContent extends React.Component {
  state = {
    lat: 51.93,
    lng: 20.15,
    zoom: 6,
    zoomBounds: null,
    maxBounds: null
  };

  mapAvgToColor = avg => {
    const { provinceData } = this.props;
    const min = provinceData ? provinceData.min : avg;
    const max = provinceData ? provinceData.max : avg;
    const idx = Math.floor(((colors.length - 1) * (avg - min)) / (max - min));
    return colors[idx];
  };

  onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: this.clickedOnFeature
    });
  };

  style = feature => {
    const { provinceData } = this.props;
    const provinceStat =
      provinceData &&
      provinceData.list.find(pd => pd.id === feature.properties.ID);
    return {
      fillColor:
        provinceStat && provinceStat.avg > 0
          ? this.mapAvgToColor(provinceStat.avg)
          : "#F3F0E9",
      weight: 3,
      opacity: 1,
      color: "#000",
      fillOpacity: 1
    };
  };

  highlightFeature = e => {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: "#000"
    });
  };

  resetHighlight = e => {
    this.refs.geojson.leafletElement.resetStyle(e.target);
  };

  clickedOnCity = (e, id) => {
    this.props.clickedOnCity(id);
  };

  clickedOnFeature = e => {
    // prevents from Map element onClick trigger
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
    const provId = e.target.feature.properties.ID;
    this.refs.map.leafletElement.fitBounds(e.target.getBounds(), {
      maxZoom: 8
    });
    //delay to let animation finish
    setTimeout(() => this.props.clickedOnProvince(provId), 250);
  };

  clickedOnMap = e => {
    // notyify clicked outside provinces
    this.refs.map.leafletElement.fitBounds(this.state.maxBounds);
    this.props.clickedOnCountry();
  };

  componentDidMount = () => {
    this.setState({
      maxBounds: this.refs.map.leafletElement.getBounds()
    });
  };

  render() {
    const { cityData } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map
        useFlyTo
        ref="map"
        animate={false}
        center={position}
        zoom={this.state.zoom}
        minZoom={6}
        maxBounds={this.state.maxBounds}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          marginLeft: "auto",
          marginRight: "0"
        }}
        onClick={this.clickedOnMap}
        zoomControl={false}
      >
        <ZoomControl position="bottomright" />
        <WMSTileLayer
          layers="ne:ne_10m_admin_0_countries"
          // layers="ne:ne"
          title={false}
          url="https://demo.boundlessgeo.com/geoserver/ows"
        />
        <GeoJSON
          ref="geojson"
          data={xd}
          style={this.style}
          onEachFeature={this.onEachFeature}
        />
        {cityData &&
          cityData.list &&
          cityData.list.map((city, idx) => {
            return (
              <Marker
                key={idx}
                position={[city.latitude, city.longitude]}
                onMouseOver={e => e.target.openPopup()}
                onMouseOut={e => {
                  e.target.closePopup();
                }}
                onClick={e => this.clickedOnCity(e, city.id)}
              >
                <Popup closeButton={false}>
                  <div style={{ textAlign: "center" }}>{city.name}</div>
                </Popup>
              </Marker>
            );
          })}
      </Map>
    );
  }
}
