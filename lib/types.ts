// User Types
export type UserRole = 'passenger' | 'driver' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: UserRole
  avatar: string
  rating: number
  reviewCount: number
}

export interface Passenger extends User {
  role: 'passenger'
  favoriteLocations?: Location[]
  paymentMethod?: string
}

export interface Driver extends User {
  role: 'driver'
  carModel: string
  carColor: string
  carPlate: string
  currentLocation: Coordinates
  isOnline: boolean
  earnings: number
  totalRides: number
  acceptanceRate: number
  documents: DriverDocument[]
}

export interface DriverDocument {
  type: 'license' | 'id' | 'insurance'
  status: 'verified' | 'pending' | 'expired'
  expiryDate: string
}

// Location Types
export interface Location {
  name: string
  address: string
  coordinates: Coordinates
}

export interface Coordinates {
  lat: number
  lng: number
}

// Service Types
export type ServiceType = 'ride' | 'delivery' | 'motorcycle'

export interface Service {
  id: string
  type: ServiceType
  name: string
  icon: string
  basePrice: number
  pricePerKm: number
  pricePerMinute: number
}

// Ride/Trip Types
export type RideStatus = 'requested' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
export type RideType = 'ride' | 'delivery' | 'motorcycle'

export interface Ride {
  id: string
  passengerId: string
  driverId?: string
  serviceType: RideType
  pickup: Location
  dropoff: Location
  status: RideStatus
  estimatedFare: number
  actualFare?: number
  distance?: number
  duration?: number
  createdAt: string
  acceptedAt?: string
  completedAt?: string
  rating?: RideRating
}

export interface RideRequest {
  id: string
  rideId: string
  passengerId: string
  passenger: Passenger
  pickup: Location
  dropoff: Location
  estimatedFare: number
  serviceType: RideType
  createdAt: string
  expiresAt: string
}

// Rating Types
export interface RideRating {
  id: string
  rideId: string
  ratedBy: string // userId
  ratedUser: string // userId
  rating: number
  comment: string
  createdAt: string
}

// Admin Statistics
export interface AdminStats {
  totalRides: number
  activeRides: number
  totalEarnings: number
  totalUsers: number
  totalDrivers: number
  totalPassengers: number
  averageRideRating: number
  completionRate: number
}

// Chat/Support Types
export interface Message {
  id: string
  senderId: string
  receiverId: string
  text: string
  createdAt: string
  read: boolean
}

// Payment Types
export interface Payment {
  id: string
  rideId: string
  passengerId: string
  amount: number
  method: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: string
}

// Context Types
export interface RideContextType {
  currentRide: Ride | null
  upcomingRides: Ride[]
  completedRides: Ride[]
  setCurrentRide: (ride: Ride | null) => void
  requestRide: (ride: Ride) => void
  completeRide: (rideId: string) => void
}

export interface UserContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  logout: () => void
}

// Mock Data Types
export interface MockData {
  passengers: Passenger[]
  drivers: Driver[]
  rides: Ride[]
  services: Service[]
  ratings: RideRating[]
}
