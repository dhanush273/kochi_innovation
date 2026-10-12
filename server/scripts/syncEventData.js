import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { defaultEventData } from '../storage.js';

dotenv.config();

async function sync() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is missing');
    return;
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB.');

  const collection = mongoose.connection.collection('eventcontents');
  const result = await collection.findOneAndUpdate(
    { key: 'main_event' },
    { $set: { data: defaultEventData, updatedAt: new Date() } },
    { returnDocument: 'after', upsert: true }
  );

  console.log('MongoDB main_event updated successfully!');
  console.log('Speakers count in DB:', result.data?.speakers?.length || result.value?.data?.speakers?.length);
  const speakers = (result.data?.speakers || result.value?.data?.speakers || []);
  speakers.forEach((s, i) => console.log(`  ${i + 1}. [${s.id}] ${s.name} - ${s.designation} (${s.photoUrl})`));

  await mongoose.disconnect();
}

sync().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
