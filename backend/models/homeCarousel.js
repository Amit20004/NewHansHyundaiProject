const  mongoose =require("mongoose")

const carouselSchema = new mongoose.Schema(
  {
    imageName: {
      type: String,
      required: true, // e.g., "summer-sale-banner.jpg"
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true, // e.g., "/uploads/carousel/summer-sale-banner.jpg"
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

const Home_Carousel = mongoose.model("Home_Carousel", carouselSchema);

module.exports=Home_Carousel;
