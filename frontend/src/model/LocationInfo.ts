import L from "leaflet";

export type LocationInfo ={
    locationName:string;
    locationCity:string;
    locationCoordinates:L.LatLngLiteral;
    locationType:string;
}