# Supabase Setup Instructions

## 1. Create the Ice Breaking Questions Table

Run this SQL in your Supabase SQL Editor (Database → SQL Editor):

```sql
-- Create ice_breaking_questions table
CREATE TABLE ice_breaking_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE ice_breaking_questions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
ON ice_breaking_questions
FOR SELECT
TO anon
USING (is_active = true);

-- Create policy to allow authenticated users to manage questions
CREATE POLICY "Allow authenticated users full access"
ON ice_breaking_questions
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);
```

## 2. Insert Initial Questions

Run this SQL to populate the table with your 107 ice breaking questions:

```sql
INSERT INTO ice_breaking_questions (question) VALUES
  ('What''s one thing you''re passionate about that most people don''t know?'),
  ('If you could have dinner with any historical figure, who would it be and why?'),
  ('What''s the most spontaneous thing you''ve ever done?'),
  ('What''s a skill you''ve always wanted to learn?'),
  ('Describe your ideal Saturday.'),
  ('What book or movie has had the biggest impact on you?'),
  ('If you could live anywhere in the world, where would it be?'),
  ('What''s your favorite way to unwind after a long day?'),
  ('What''s something you''re really good at that surprises people?'),
  ('If you could master any language instantly, which would you choose?'),
  ('What''s the best piece of advice you''ve ever received?'),
  ('What''s your guilty pleasure?'),
  ('If you could have any superpower, what would it be?'),
  ('What''s your favorite childhood memory?'),
  ('What''s something on your bucket list?'),
  ('What''s the most interesting place you''ve traveled to?'),
  ('If you could change careers tomorrow, what would you do?'),
  ('What''s your favorite season and why?'),
  ('What''s the best concert or show you''ve ever been to?'),
  ('What''s something you''re grateful for today?'),
  ('If you could relive one day of your life, which would it be?'),
  ('What''s your go-to karaoke song?'),
  ('What''s the most beautiful place you''ve ever seen?'),
  ('If you could time travel, would you go to the past or future?'),
  ('What''s your favorite way to stay active?'),
  ('What''s something that always makes you laugh?'),
  ('If you could have dinner with three people, living or dead, who would they be?'),
  ('What''s your favorite local spot in Mauritius?'),
  ('What''s a cause you''re passionate about?'),
  ('If you could learn any instrument, which would it be?'),
  ('What''s your favorite comfort food?'),
  ('What''s the best compliment you''ve ever received?'),
  ('If you could switch lives with someone for a day, who would it be?'),
  ('What''s your favorite way to spend a Sunday morning?'),
  ('What''s something that challenges you?'),
  ('If you could create a holiday, what would it celebrate?'),
  ('What''s your favorite quote or mantra?'),
  ('What''s the most adventurous thing you''ve ever done?'),
  ('If you could have any animal as a pet, what would it be?'),
  ('What''s your favorite thing about yourself?'),
  ('What''s a tradition you''d like to start?'),
  ('If you could master any skill overnight, what would it be?'),
  ('What''s your favorite way to give back to your community?'),
  ('What''s something you''re looking forward to?'),
  ('If you could describe yourself in three words, what would they be?'),
  ('What''s the most memorable gift you''ve ever received?'),
  ('What''s your favorite way to celebrate achievements?'),
  ('If you could have a conversation with your future self, what would you ask?'),
  ('What''s something that inspires you?'),
  ('What''s your favorite type of cuisine?'),
  ('If you could design your perfect day, what would it look like?'),
  ('What''s something you''ve learned recently?'),
  ('What''s your favorite way to connect with others?'),
  ('If you could solve one world problem, what would it be?'),
  ('What''s your favorite memory from this year?'),
  ('What''s something you''re proud of?'),
  ('If you could attend any event in history, what would it be?'),
  ('What''s your favorite thing to do outdoors?'),
  ('What''s a hobby you''d like to pick up?'),
  ('If you could write a book, what would it be about?'),
  ('What''s your favorite way to start the day?'),
  ('What''s something that makes you feel alive?'),
  ('If you could have any job for a week, what would it be?'),
  ('What''s your favorite thing about living in Mauritius?'),
  ('What''s a goal you''re working towards?'),
  ('If you could attend any concert, past or present, which would it be?'),
  ('What''s your favorite way to be creative?'),
  ('What''s something you''re curious about?'),
  ('If you could have any view from your window, what would it be?'),
  ('What''s your favorite way to treat yourself?'),
  ('What''s a lesson you''ve learned the hard way?'),
  ('If you could have any talent, what would it be?'),
  ('What''s your favorite thing to do with friends?'),
  ('What''s something that makes you unique?'),
  ('If you could redesign anything, what would it be?'),
  ('What''s your favorite way to challenge yourself?'),
  ('What''s a dream you''ve had since childhood?'),
  ('If you could meet your younger self, what would you say?'),
  ('What''s your favorite way to make someone smile?'),
  ('What''s something you''d love to be known for?'),
  ('If you could create art in any medium, what would you choose?'),
  ('What''s your favorite thing about the ocean?'),
  ('What''s a place that feels like home to you?'),
  ('If you could have any career achievement, what would it be?'),
  ('What''s your favorite way to spend time alone?'),
  ('What''s something you value in a relationship?'),
  ('If you could attend any workshop or class, what would it be?'),
  ('What''s your favorite way to express yourself?'),
  ('What''s something that always lifts your spirits?'),
  ('If you could have any view while working, what would it be?'),
  ('What''s your favorite thing about meeting new people?'),
  ('What''s a quality you admire in others?'),
  ('If you could create a perfect playlist, what would be on it?'),
  ('What''s your favorite way to celebrate life?'),
  ('What''s something you''d like to experience for the first time?'),
  ('If you could have any mentor, who would it be?'),
  ('What''s your favorite thing about your personality?'),
  ('What''s a risk you''re glad you took?'),
  ('If you could design your ideal living space, what would it include?'),
  ('What''s your favorite way to show appreciation?'),
  ('What''s something that makes you feel peaceful?'),
  ('If you could collaborate with anyone, who would it be?'),
  ('What''s your favorite way to end the day?'),
  ('What''s something you''d love to share with others?'),
  ('If you could create a perfect moment, what would it be?'),
  ('What''s your favorite thing about being you?');
```

## 3. Verify the Data

Run this query to confirm all questions were inserted:

```sql
SELECT COUNT(*) as total_questions FROM ice_breaking_questions WHERE is_active = true;
```

You should see `total_questions: 107`

## Done!

Your app is now connected to Supabase and will fetch ice breaking questions from the database. Any updates you make to the table will be reflected in both:
- Singles Socials → Ice Breaking Questions
- The Date Alchemy Dashboard → Ice Breaking Questions
