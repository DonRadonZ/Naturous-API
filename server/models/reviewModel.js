import mongoose, { Schema } from "mongoose";
import Tour from "./tourModel.js";


const reviewSchema = new Schema({
    review: {
        type: String,
        required: [true, "A review must not be empty!"],
    },
    rating: {
        type: Number,
        required: [true, "A rating must not be empty"],
        min: 1,
        max: 5
    },
    user: [
        {
            type: Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user.']
        }
    ],
    tour: [
        {
            type: Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'Review must belong to a tour.']
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function(next){
    // this.populate({
    //     path:'tour',
    //     select:"name"}).populate({
    //         path: 'user',
    //         select: 'name photo'
    //     });
    this.populate({
            path: 'user',
            select: 'name photo'
        });
      next();
})

reviewSchema.static.calcAverageRatings = async function(tourId) {
    const stats = await this.aggregate([
      {
        $match: {tour: tourId}
      },
      {
        $group: {
            _id: '$tour',
            nRating: { $sum: 1 },
            avgRating: {$avg: `${rating}`}
        }
    } 
    ])
    console.log(stats);

    if (stats.lengtn > 0){
    await Tour.findByIdAndUpdate(tourId, {
       ratingsQuantity: stats[0].nRating,
       ratingsAverage: stats[0].avgRating 
    });
} else {
    await Tour.findByIdAndUpdate(tourId, {
        ratingsQuantity: 0,
        ratingsAverage: 4.5 
     }); 
}
};

reviewSchema.post('save', function() {

    this.constructor.calcAverageRatings(this.tour);
    
})

// findByIdAndUpdate
// findByIdAndDelete
reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r = await this.findOne();
    console.log(this.r);
    next();
});

reviewSchema.post(/^findOneAnd/,async function(){
    // await this.findOne(); does Not work here, query has already executed
    await this.r.constructor.calcAverageRatings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;

