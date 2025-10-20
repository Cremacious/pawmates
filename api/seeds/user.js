import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const maleNames = [
  'Max',
  'Rover',
  'Jasper',
  'Moose',
  'Blaze',
  'Hunter',
  'Rocky',
  'Charlie',
  'Benji',
];

const femaleNames = [
  'Sapphire',
  'Kiki',
  'Ruby',
  'Luna',
  'Bella',
  'Lily',
  'Harley',
  'Piper',
  'Fluffy',
  'Dot',
  'Pebbles',
  'Sadie',
];

const genderPreferences = ['male', 'female', 'both'];

const bioDescriptors = [
  'Treat addict',
  'Cat lover',
  'Foodie',
  'Walking enthusiast',
  'Bookworm',
  'Movie buff',
  'Music lover',
  'Car ride junkie',
  'Beach bum',
  'City pup',
  'Outdoor enthusiast',
  'Bird watching binger',
  'Yoga enthusiast',
  'Craft treat connoisseur',
  'Food fanatic',
  'Adventure seeker',
  'Night owl',
  'Early bird',
];

const generateBio = () => {
  const descriptors = bioDescriptors
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  return descriptors.join(' | ');
};

const generateRandomUser = (gender, index) => {
  const names = gender === 'male' ? maleNames : femaleNames;
  const name = names[index];
  const age = Math.floor(Math.random() * (45 - 21 + 1) + 21);
  return {
    name,
    email: `${name.toLowerCase()}${age}@example.com`,
    password: bcrypt.hashSync('password123', 10),
    age,
    gender,
    genderPreference:
      genderPreferences[Math.floor(Math.random() * genderPreferences.length)],
    bio: generateBio(),
    image: `/${gender}/${index + 1}.jpg`,
  };
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await User.deleteMany({});

    const maleUsers = maleNames.map((_, i) => generateRandomUser('male', i));
    const femaleUsers = femaleNames.map((_, i) =>
      generateRandomUser('female', i)
    );

    const allUsers = [...maleUsers, ...femaleUsers];

    await User.insertMany(allUsers);

    console.log('Database seeded successfully with users having concise bios');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedUsers();
