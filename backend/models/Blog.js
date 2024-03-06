import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
   userName: {
      type: String,
      required: true,
   },
   content: {
      type: String,
      required: true
   },
   likes: {
      type: Number,
      default: 0
   }
   //   rating: Number,
});

const BlogSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true
      },
      image: {
         type: String
      },

      reviews: {
         type: [reviewSchema],
         default: [],
      },

      likes: {
         type: Number,
         default: 0
      }
      // rating: {
      //    type: String,
      //    default: "5/5"
      // }
   },
   { timestamps: true }
);

export default mongoose.model("Blog", BlogSchema);