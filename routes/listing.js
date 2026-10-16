const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

//New Route
router.get("/new", isLoggedIn, listingController.rendernewForm);

const categories = {
  homes: { value: "home", title: "Homes", subtitle: "Places to stay" },
  experiences: {
    value: "experience",
    title: "Experiences",
    subtitle: "Things to do",
  },
  services: {
    value: "service",
    title: "Services",
    subtitle: "Help for your trip",
  },
};

router.get(
  "/category/:type",
  wrapAsync(async (req, res) => {
    const cat = categories[req.params.type];
    if (!cat) throw new ExpressError(404, "Category not found");

    const allListings = await Listing.find({ category: cat.value });
    res.render("listings/category", {
      allListings,
      title: cat.title,
      subtitle: cat.subtitle,
    });
  }),
);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isOwner, wrapAsync(listingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
