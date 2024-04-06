const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  weeks: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  tuition: {
    type: Number,
    required: [true, "Please add a tuition cost"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootCamp: {
    type: mongoose.Schema.ObjectId,
    ref: "BootCamp",
    required: true,
  },
  //   user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //     required: true,
  //   },
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootCampId) {
  const obj = await this.aggregate([
    {
      $match: { bootCamp: bootCampId },
    },
    {
      $group: {
        _id: "$bootCamp",
        averageCost: { $avg: "$tuition" },
      },
    },
  ]);

  try {
    await this.model("BootCamp").findByIdAndUpdate(bootCampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
CourseSchema.post("save", function () {
  this.constructor.getAverageCost(this.bootCamp);
});

// Call getAverageCost before remove
CourseSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.bootCamp);
});

module.exports = mongoose.model("Course", CourseSchema);
