import Tour from '../models/tourModel.js';
import catchAsync from './../utils/catchAsync.js';

export const getOverview = catchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template


  // 3) Render that template using tour data from 1)


  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

export const getTour = catchAsync(async(req, res) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({slug: req.params.slug}).populate({ path: 'review' , fields: 'review rating user'});
  // 2) Build template


  // 3) Render template using data from 1)
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour
  });
});