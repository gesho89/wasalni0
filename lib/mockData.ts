import {
  Passenger,
  Driver,
  Ride,
  Service,
  RideRating,
} from './types'

// Sample Passengers
export const mockPassengers: Passenger[] = [
  {
    id: 'p1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    role: 'passenger',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
    rating: 4.8,
    reviewCount: 156,
    favoriteLocations: [
      {
        name: 'المنزل',
        address: 'حي النخيل، الرياض',
        coordinates: { lat: 24.7136, lng: 46.6753 },
      },
      {
        name: 'العمل',
        address: 'وسط البلد، الرياض',
        coordinates: { lat: 24.7577, lng: 46.6944 },
      },
    ],
  },
  {
    id: 'p2',
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    phone: '+966502345678',
    role: 'passenger',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    rating: 4.9,
    reviewCount: 98,
  },
]

// Sample Drivers
export const mockDrivers: Driver[] = [
  {
    id: 'd1',
    name: 'محمود السيد',
    email: 'mahmoud@example.com',
    phone: '+966503456789',
    role: 'driver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mahmoud',
    rating: 4.9,
    reviewCount: 238,
    carModel: 'هيونداي إلنترا',
    carColor: 'أبيض',
    carPlate: 'ح ع س 1234',
    currentLocation: { lat: 24.7136, lng: 46.6753 },
    isOnline: true,
    earnings: 15800,
    totalRides: 238,
    acceptanceRate: 98,
    documents: [
      { type: 'license', status: 'verified', expiryDate: '2026-06-15' },
      { type: 'id', status: 'verified', expiryDate: '2028-12-20' },
      { type: 'insurance', status: 'verified', expiryDate: '2025-08-10' },
    ],
  },
  {
    id: 'd2',
    name: 'علي محمد',
    email: 'ali@example.com',
    phone: '+966504567890',
    role: 'driver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali',
    rating: 4.7,
    reviewCount: 156,
    carModel: 'تويوتا يارس',
    carColor: 'أسود',
    carPlate: 'ح ع ع 5678',
    currentLocation: { lat: 24.7577, lng: 46.6944 },
    isOnline: true,
    earnings: 12500,
    totalRides: 156,
    acceptanceRate: 95,
    documents: [
      { type: 'license', status: 'verified', expiryDate: '2025-10-30' },
      { type: 'id', status: 'verified', expiryDate: '2027-03-15' },
      { type: 'insurance', status: 'pending', expiryDate: '2025-09-20' },
    ],
  },
  {
    id: 'd3',
    name: 'كريم شامي',
    email: 'karim@example.com',
    phone: '+966505678901',
    role: 'driver',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
    rating: 4.6,
    reviewCount: 112,
    carModel: 'نيسان التيما',
    carColor: 'فضي',
    carPlate: 'ح ع ب 9012',
    currentLocation: { lat: 24.72, lng: 46.68 },
    isOnline: true,
    earnings: 9200,
    totalRides: 112,
    acceptanceRate: 92,
    documents: [
      { type: 'license', status: 'verified', expiryDate: '2026-01-20' },
      { type: 'id', status: 'verified', expiryDate: '2029-05-10' },
      { type: 'insurance', status: 'verified', expiryDate: '2025-11-15' },
    ],
  },
]

// Sample Services
export const mockServices: Service[] = [
  {
    id: 's1',
    type: 'ride',
    name: 'سيارة أجرة',
    icon: 'car',
    basePrice: 5,
    pricePerKm: 1.5,
    pricePerMinute: 0.5,
  },
  {
    id: 's2',
    type: 'delivery',
    name: 'نقل وتوصيل',
    icon: 'package',
    basePrice: 8,
    pricePerKm: 2,
    pricePerMinute: 0.3,
  },
  {
    id: 's3',
    type: 'motorcycle',
    name: 'دراجة نارية',
    icon: 'bike',
    basePrice: 3,
    pricePerKm: 1,
    pricePerMinute: 0.4,
  },
]

// Sample Rides
export const mockRides: Ride[] = [
  {
    id: 'r1',
    passengerId: 'p1',
    driverId: 'd1',
    serviceType: 'ride',
    pickup: {
      name: 'حي النخيل',
      address: 'حي النخيل، الرياض',
      coordinates: { lat: 24.7136, lng: 46.6753 },
    },
    dropoff: {
      name: 'وسط البلد',
      address: 'وسط البلد، الرياض',
      coordinates: { lat: 24.7577, lng: 46.6944 },
    },
    status: 'completed',
    estimatedFare: 25,
    actualFare: 28,
    distance: 12.5,
    duration: 18,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1080000).toISOString(),
    rating: {
      id: 'rat1',
      rideId: 'r1',
      ratedBy: 'p1',
      ratedUser: 'd1',
      rating: 5,
      comment: 'سائق ممتاز وسيارة نظيفة جداً',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1080000).toISOString(),
    },
  },
  {
    id: 'r2',
    passengerId: 'p1',
    driverId: 'd2',
    serviceType: 'ride',
    pickup: {
      name: 'حي الروضة',
      address: 'حي الروضة، الرياض',
      coordinates: { lat: 24.75, lng: 46.67 },
    },
    dropoff: {
      name: 'حي الملز',
      address: 'حي الملز، الرياض',
      coordinates: { lat: 24.73, lng: 46.71 },
    },
    status: 'completed',
    estimatedFare: 18,
    actualFare: 19,
    distance: 8.2,
    duration: 14,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 45000).toISOString(),
    completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 840000).toISOString(),
    rating: {
      id: 'rat2',
      rideId: 'r2',
      ratedBy: 'p1',
      ratedUser: 'd2',
      rating: 4,
      comment: 'طريق جيد ولكن الرحلة كانت قصيرة',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 840000).toISOString(),
    },
  },
  {
    id: 'r3',
    passengerId: 'p2',
    driverId: 'd3',
    serviceType: 'ride',
    pickup: {
      name: 'مول العالمية',
      address: 'مول العالمية، الرياض',
      coordinates: { lat: 24.78, lng: 46.72 },
    },
    dropoff: {
      name: 'منطقة الحمراء',
      address: 'منطقة الحمراء، الرياض',
      coordinates: { lat: 24.71, lng: 46.65 },
    },
    status: 'completed',
    estimatedFare: 22,
    actualFare: 24,
    distance: 10.5,
    duration: 16,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    acceptedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 50000).toISOString(),
    completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 960000).toISOString(),
    rating: {
      id: 'rat3',
      rideId: 'r3',
      ratedBy: 'p2',
      ratedUser: 'd3',
      rating: 5,
      comment: 'رائع جداً، سائق محترف',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 960000).toISOString(),
    },
  },
]

// Sample Ratings
export const mockRatings: RideRating[] = [
  {
    id: 'rating1',
    rideId: 'r1',
    ratedBy: 'p1',
    ratedUser: 'd1',
    rating: 5,
    comment: 'خدمة ممتازة جداً',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rating2',
    rideId: 'r2',
    ratedBy: 'p1',
    ratedUser: 'd2',
    rating: 4,
    comment: 'جيد جداً',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rating3',
    rideId: 'r3',
    ratedBy: 'p2',
    ratedUser: 'd3',
    rating: 5,
    comment: 'سائق احترافي وسيارة نظيفة',
    createdAt: new Date().toISOString(),
  },
]

// Export all mock data
export const mockData = {
  passengers: mockPassengers,
  drivers: mockDrivers,
  services: mockServices,
  rides: mockRides,
  ratings: mockRatings,
}

// Helper functions
export function getDriversNearby(
  coordinates: { lat: number; lng: number },
  radius: number = 5
): Driver[] {
  return mockDrivers.filter((driver) => {
    const distance = Math.sqrt(
      Math.pow(driver.currentLocation.lat - coordinates.lat, 2) +
        Math.pow(driver.currentLocation.lng - coordinates.lng, 2)
    )
    return distance <= radius && driver.isOnline
  })
}

export function calculateFare(
  distance: number,
  duration: number,
  service: Service
): number {
  return Math.round(
    service.basePrice + distance * service.pricePerKm + (duration / 60) * service.pricePerMinute
  )
}

export function getAverageRating(driverId: string): { rating: number; count: number } {
  const ratings = mockRatings.filter((r) => r.ratedUser === driverId)
  if (ratings.length === 0) return { rating: 0, count: 0 }
  const average = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
  return { rating: Math.round(average * 10) / 10, count: ratings.length }
}
