const mongoose = require("mongoose");

const EVENT_TYPES = [
  "CODING_HACKATHON",
  "AI_WORKSHOP",
  "ROBOTICS",
  "GAMING"
];

const REGISTRATION_STATUSES = ["PENDING", "CONFIRMED", "CANCELLED"];

const registrationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: [3, "Student name must contain at least 3 characters"],
      maxlength: [50, "Student name cannot exceed 50 characters"]
    },

    collegeEmail: {
      type: String,
      required: [true, "College email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/i,
        "Must be a valid college email ending in .edu or .ac.in"
      ]
    },

    rollNumber: {
      type: String,
      required: [true, "Roll number is required"],
      uppercase: true,
      trim: true,
      match: [
        /^[A-Z0-9]{8,10}$/,
        "Roll number must contain 8 to 10 alphanumeric characters"
      ]
    },

    eventType: {
      type: String,
      required: [true, "Event type is required"],
      enum: {
        values: EVENT_TYPES,
        message: `Event type must be one of: ${EVENT_TYPES.join(", ")}`
      },
      trim: true
    },

    teamSize: {
      type: Number,
      required: [true, "Team size is required"],
      min: [1, "Team size must be at least 1"],
      max: [4, "Team size cannot exceed 4"],
      validate: {
        validator: Number.isInteger,
        message: "Team size must be an integer"
      }
    },

    ticketPrice: {
      type: Number,
      required: [true, "Ticket price is required"],
      min: [0, "Ticket price cannot be negative"],
      validate: {
        validator: Number.isFinite,
        message: "Ticket price must be a valid number"
      }
    },

    discountCode: {
      type: String,
      trim: true,
      uppercase: true,
      default: undefined
    },

    finalAmount: {
      type: Number,
      required: [true, "Final amount is required"],
      min: [0, "Final amount cannot be negative"]
    },

    status: {
      type: String,
      enum: {
        values: REGISTRATION_STATUSES,
        message: `Status must be one of: ${REGISTRATION_STATUSES.join(", ")}`
      },
      default: "PENDING"
    },

    registrationDate: {
      type: Date,
      default: Date.now,
      validate: {
        validator: function (value) {
          return value instanceof Date && !Number.isNaN(value.getTime()) && value <= new Date();
        },
        message: "Registration date cannot be in the future"
      }
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Cross-field schema validation. The controller also checks this on PUT
// after combining existing values with the fields supplied by the client.
registrationSchema.pre("validate", function (next) {
  if (this.eventType === "AI_WORKSHOP" && this.teamSize !== 1) {
    this.invalidate(
      "teamSize",
      "AI Workshop only permits individual registrations"
    );
  }
  next();
});

module.exports = mongoose.model("Registration", registrationSchema);
