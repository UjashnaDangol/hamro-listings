import Listing from "../models/listingModel.js"


//create listing
export const createListing = async (req,res) =>{


    try {

          const { 
      title,
      description,
      city,
      address,
      price,
      bedrooms,
      bathrooms,}
    = req.body;

    const imageUrls = req.files?.map((file) => file.path) || []

    const listing = await Listing.create({
        title,
      description,
      city,
      address,
      price,
      bedrooms,
      bathrooms,
      images: imageUrls,
      owner: req.user._id,
    })
if (!listing) {
      return res.status(400).json({
        success: false,
        message: "Failed to create listing",
      });
    }

   return res.status(201).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get listing

export const getListing = async (req,res) => {

  try {

    const { city,
      minPrice,
      maxPrice,
      page = 1,
      keyword = "",} = req.query

      const query = {}

      if(city){
        query.city = city
      }

      if(keyword){
        query.title ={
          $regex : keyword , 
          $options : "i"
        }}

      if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

 
    

    const limit = 8;

    const listings = await Listing.find(query)
    .populate("owner","name email")
    .sort({createdAt : -1})
    .skip((page - 1) * limit)
    .limit(limit);

const total =
  await Listing.countDocuments(query);
  
    res.json({
      success : true ,
      total,
      page : Number(page),
      data : listings
    })
      }
    
  catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

// get single listing

export const getListingById = async (req,res) =>{

  try {
    const listing = await Listing.findById(req.params.id)
                  .populate("owner" , "name email")
  


 if (!listing){
  return res.status(404).json({message:"Listing not found",})
 }

     listing.views = (listing.views || 0) + 1;

    await listing.save();


 return res.json({
  success : true ,
  data : listing
 })
    
  } catch (error) {
  return  res.status(500).json({
      message: error.message,
    });
  }
 
}

//update listing
export const updateListing = async (
  req,
  res
) => {
  try {
    const listing =
      await Listing.findById(
        req.params.id
      );

    if (!listing) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (
      listing.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

  Object.assign(listing , req.body)

  if(req.files?.length){
    listing.images = req.files.map((file) => file.path)
  }

    await listing.save();

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
   return  res.status(500).json({
      message: error.message,
    });
  }
};


//delete listing
export const deleteListing = async (
  req,
  res
) => {
  try {
    const listing =
      await Listing.findById(
        req.params.id
      );

    if (!listing) {
      return res.status(404).json({
        message: "Not found",
      });
    }

      if (listing.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await listing.deleteOne();

    return res.json({
      message: "Listing deleted",
    });
  } catch (error) {
   return res.status(500).json({
      message: error.message,
    });
  }
};