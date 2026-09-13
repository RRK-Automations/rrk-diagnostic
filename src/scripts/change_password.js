const { loadEnvConfig } = require('@next/env');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables from .env.local
loadEnvConfig(process.cwd());

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI is not defined in your environment (.env.local)');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], default: 'staff' }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function changePassword() {
  const args = process.argv.slice(2);
  const targetUsername = (args[0] || process.env.TARGET_USER || 'admin').toLowerCase();
  const newPassword = args[1] || process.env.NEW_PASSWORD;

  if (!newPassword) {
    console.log('\n🔐 ASHA JYOTHI DIAGNOSTICS - ADMIN PASSWORD RESET TOOL');
    console.log('========================================================');
    console.log('Usage:');
    console.log('  npm run db:password <username> <new_password>');
    console.log('  or');
    console.log('  node src/scripts/change_password.js admin YourNewSecretPass123\n');
    console.error('❌ Error: Please provide a new password.');
    process.exit(1);
  }

  try {
    console.log(`Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    let user = await User.findOne({ username: targetUsername });
    if (!user) {
      user = await User.create({
        username: targetUsername,
        passwordHash,
        role: 'admin'
      });
      console.log(`\n✨ Created NEW admin user: "${targetUsername}" with your specified password!`);
    } else {
      user.passwordHash = passwordHash;
      await user.save();
      console.log(`\n✅ SUCCESS: Password for user "${targetUsername}" has been updated successfully!`);
    }

    await mongoose.disconnect();
    console.log('🔒 Database connection closed safely.\n');
  } catch (error) {
    console.error('❌ Failed to update password:', error.message);
    process.exit(1);
  }
}

changePassword();
