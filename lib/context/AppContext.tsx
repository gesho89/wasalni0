'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Passenger, Driver, Ride, User } from '../types'
import { mockPassengers, mockDrivers, mockRides } from '../mockData'

interface AppState {
  currentUser: User | null
  currentRide: Ride | null
  upcomingRides: Ride[]
  completedRides: Ride[]
  userRole: 'passenger' | 'driver' | 'admin' | null
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ROLE'; payload: 'passenger' | 'driver' | 'admin' | null }
  | { type: 'SET_CURRENT_RIDE'; payload: Ride | null }
  | { type: 'UPDATE_RIDE_STATUS'; payload: { rideId: string; status: string } }
  | { type: 'ADD_UPCOMING_RIDE'; payload: Ride }
  | { type: 'COMPLETE_RIDE'; payload: string }
  | { type: 'LOGOUT' }

const initialState: AppState = {
  currentUser: null,
  currentRide: null,
  upcomingRides: [],
  completedRides: mockRides.filter((r) => r.status === 'completed'),
  userRole: null,
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload }

    case 'SET_ROLE':
      return { ...state, userRole: action.payload }

    case 'SET_CURRENT_RIDE':
      return { ...state, currentRide: action.payload }

    case 'UPDATE_RIDE_STATUS':
      if (state.currentRide?.id === action.payload.rideId) {
        return {
          ...state,
          currentRide: { ...state.currentRide, status: action.payload.status as any },
        }
      }
      return state

    case 'ADD_UPCOMING_RIDE':
      return {
        ...state,
        upcomingRides: [...state.upcomingRides, action.payload],
      }

    case 'COMPLETE_RIDE':
      const ride = state.upcomingRides.find((r) => r.id === action.payload)
      if (ride) {
        return {
          ...state,
          upcomingRides: state.upcomingRides.filter((r) => r.id !== action.payload),
          completedRides: [...state.completedRides, { ...ride, status: 'completed' }],
          currentRide: null,
        }
      }
      return state

    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

interface AppContextType extends AppState {
  dispatch: React.Dispatch<AppAction>
  loginAsPassenger: (passengerId: string) => void
  loginAsDriver: (driverId: string) => void
  loginAsAdmin: () => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value: AppContextType = {
    ...state,
    dispatch,
    loginAsPassenger: (passengerId: string) => {
      const passenger = mockPassengers.find((p) => p.id === passengerId)
      if (passenger) {
        dispatch({ type: 'SET_USER', payload: passenger })
        dispatch({ type: 'SET_ROLE', payload: 'passenger' })
      }
    },
    loginAsDriver: (driverId: string) => {
      const driver = mockDrivers.find((d) => d.id === driverId)
      if (driver) {
        dispatch({ type: 'SET_USER', payload: driver })
        dispatch({ type: 'SET_ROLE', payload: 'driver' })
      }
    },
    loginAsAdmin: () => {
      const adminUser: User = {
        id: 'admin1',
        name: 'المسؤول',
        email: 'admin@example.com',
        phone: '+966501234567',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        rating: 0,
        reviewCount: 0,
      }
      dispatch({ type: 'SET_USER', payload: adminUser })
      dispatch({ type: 'SET_ROLE', payload: 'admin' })
    },
    logout: () => {
      dispatch({ type: 'LOGOUT' })
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
