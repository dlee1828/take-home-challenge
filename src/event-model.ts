import mongoose from 'mongoose'
export interface Event extends Document {
  name: string
  flyer: string
  groupAvi: string
  timezone: string
  startUtc: Date
  endUtc: Date
  url: string
  venueName: string
  groupName: string
  location: any
  _id: string
}

// Define the GeoJSON Point schema
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const eventSchema = new mongoose.Schema<Event>({
  name: {type: String, required: true},
  flyer: {type: String, required: true},
  groupAvi: {type: String, required: true},
  timezone: {type: String, required: true},
  startUtc: {type: Date, required: true},
  endUtc: {type: Date, required: true},
  url: {type: String, required: true},
  venueName: {type: String, required: true},
  groupName: {type: String, required: true},
  location: {type: pointSchema, required: true},
})

export const EventModel = mongoose.model<Event>('Event', eventSchema)
