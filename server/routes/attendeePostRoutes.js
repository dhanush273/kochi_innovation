import express from 'express';
import { dataService } from '../services/dataService.js';

const router = express.Router();

// POST /api/social-posts - Create an attendee post record in MongoDB
router.post('/', async (req, res) => {
  try {
    const { fullName, designation, companyName, photoUrl, caption } = req.body;

    if (!fullName || !designation || !companyName) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Designation, and Company Name are required.'
      });
    }

    const postRecord = await dataService.createAttendeePost({
      fullName: fullName.trim(),
      designation: designation.trim(),
      companyName: companyName.trim(),
      photoUrl: photoUrl || '',
      caption: caption || '',
      source: 'qr_venue_registration'
    });

    res.status(201).json({
      success: true,
      message: 'Attendee social post saved successfully!',
      data: postRecord
    });
  } catch (err) {
    console.error('Error saving attendee post:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to save attendee post.'
    });
  }
});

// GET /api/social-posts - Retrieve all attendee posts
router.get('/', async (req, res) => {
  try {
    const posts = await dataService.getAllAttendeePosts();
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    console.error('Error retrieving attendee posts:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve attendee posts.'
    });
  }
});

export default router;
