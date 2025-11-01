# Supabase Authentication Setup with Manual Approval

This guide sets up user authentication with a manual approval workflow. Users can sign up and log in, but only approved users can access gated content.

## Step 1: Create User Profiles Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create user_profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can read own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Policy: Public can read approved status (needed for login check)
CREATE POLICY "Public can read approval status"
ON user_profiles
FOR SELECT
TO anon
USING (true);

-- Policy: Service role can manage all profiles (for admin approval)
CREATE POLICY "Service role can manage profiles"
ON user_profiles
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to auto-update updated_at
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## Step 2: Create Automatic Profile Creation Trigger

This automatically creates a profile when a user signs up:

```sql
-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, is_approved)
  VALUES (NEW.id, NEW.email, false);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile after user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_profile();
```

## Step 3: Verify Setup

Check that the table was created:

```sql
SELECT COUNT(*) as profile_count FROM user_profiles;
```

You should see `0` initially (no profiles yet).

## How to Approve Users

After a user signs up, they'll have `is_approved = false`. To approve them:

1. Go to Supabase → **Table Editor** → `user_profiles`
2. Find the user by their email
3. Edit the row and set `is_approved` to `true`
4. Save

The user will immediately have access to gated content on their next page load.

## Troubleshooting

**If profiles aren't being created automatically:**
- Check that the trigger was created successfully
- Verify the `auth.users` table exists
- Check Supabase logs for any errors

**To manually create a profile for an existing user:**
```sql
INSERT INTO user_profiles (id, email, is_approved)
VALUES ('[USER_UUID]', 'user@example.com', true);
```
