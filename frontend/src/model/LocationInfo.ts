import L from "leaflet";

export type LocationInfo ={
    locationId:string;
    locationName:string;
    locationCity:string;
    locationDescription:string;
    locationCoordinates:L.LatLngLiteral;
    locationLatCoordinate:number;
    locationLngCoordinate:number;
    locationType:string;
}