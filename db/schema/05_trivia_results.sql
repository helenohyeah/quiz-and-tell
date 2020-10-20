DROP TABLE IF EXISTS trivia_results CASCADE;

CREATE TABLE trivia_results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  date_completed TIMESTAMP NOT NULL
);
