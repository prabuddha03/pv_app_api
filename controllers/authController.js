const User = require('../models/User');
const admin = require('../config/firebase-config');

exports.verifyAndFetchUser = async (req, res) => {
    try {
      const { idToken } = req.body;
      
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const phoneNumber = decodedToken.phone_number;
  
      if (!phoneNumber) {
        return res.status(400).json({ 
          error: 'Phone number not found in Firebase token' 
        });
      }
  
      // Find user in MongoDB by phone number
      let user = await User.findOne({ phoneNumber });
  
      if (!user) {
        return res.status(404).json({ 
          error: 'User not found. Please contact admin to add your details.' 
        });
      }
  
      // Update Firebase UID if not already set
      if (!user.firebaseUid) {
        user.firebaseUid = decodedToken.uid;
        await user.save();
      }
  
      res.status(200).json({ 
        message: 'User verified successfully',
        user,
        isNewUser: !user.isOnboarded
      });
    } catch (error) {
      console.error('Verify user error:', error);
      res.status(500).json({ error: 'Error verifying user' });
    }
  };
  
  // Mark user as onboarded
  exports.completeOnboarding = async (req, res) => {
    try {
      const { idToken } = req.body;
      
      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      
      // Update user onboarding status
      const user = await User.findOneAndUpdate(
        { firebaseUid: decodedToken.uid },
        { isOnboarded: true },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Onboarding completed successfully',
        user
      });
    } catch (error) {
      console.error('Complete onboarding error:', error);
      res.status(500).json({ error: 'Error completing onboarding' });
    }
  };
  