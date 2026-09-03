'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { Coordinates, Driver, Location } from '@/lib/types'

const driverIcon = new L.DivIcon({
  className: 'custom-driver-marker',
  html: '<div style="background:#1264e8;border:3px solid white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;box-shadow:0 2px 8px #10213f66">●</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

const pickupIcon = new L.DivIcon({
  className: 'custom-pickup-marker',
  html: '<div style="background:#f5b800;border:3px solid white;border-radius:50%;width:24px;height:24px;box-shadow:0 2px 8px #10213f66"></div>',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function MapRecenter({ center }: { center: Coordinates }) {
  const map = useMap()
  useEffect(() => { map.setView([center.lat, center.lng], map.getZoom()) }, [center, map])
  return null
}

export function LeafletMap({ drivers = [], pickup, dropoff, center = { lat: 24.7136, lng: 46.6753 }, route = false }: { drivers?: Driver[]; pickup?: Location; dropoff?: Location; center?: Coordinates; route?: boolean }) {
  const routePoints: [number, number][] = pickup && dropoff ? [[pickup.coordinates.lat, pickup.coordinates.lng], [24.735, 46.684], [dropoff.coordinates.lat, dropoff.coordinates.lng]] : []
  return (
    <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={false} className="z-0">
      <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapRecenter center={center} />
      {drivers.map((driver) => <Marker key={driver.id} position={[driver.currentLocation.lat, driver.currentLocation.lng]} icon={driverIcon}><Popup>{driver.name} · {driver.rating} ★</Popup></Marker>)}
      {pickup && <Marker position={[pickup.coordinates.lat, pickup.coordinates.lng]} icon={pickupIcon}><Popup>نقطة الانطلاق</Popup></Marker>}
      {dropoff && <Marker position={[dropoff.coordinates.lat, dropoff.coordinates.lng]} icon={pickupIcon}><Popup>الوجهة</Popup></Marker>}
      {route && routePoints.length > 0 && <Polyline positions={routePoints} pathOptions={{ color: '#1264e8', weight: 5, dashArray: '8 10' }} />}
    </MapContainer>
  )
}
