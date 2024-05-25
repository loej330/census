DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(31),
    password VARCHAR(31)
    -- is a bunch of booleans in the main user table the best way to store settings?
);

CREATE TABLE polls (
    poll_id SERIAL PRIMARY KEY,
    user_id INT, FOREIGN KEY (user_id) REFERENCES users (user_id),
    prompt VARCHAR(255)
);

CREATE TABLE topics (
    topic_id SERIAL PRIMARY KEY,
    name VARCHAR(63)
);

CREATE TABLE choices (
    choice_id SERIAL PRIMARY KEY,
    -- poll_id INT REFERENCES polls(poll_id),
    poll_id INT, FOREIGN KEY (poll_id) REFERENCES polls (poll_id),
    text VARCHAR(255),
    votes INT -- need to confirm that this is more efficient than getting a sum of votes
);
/*

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES polls(poll_id),
    user_id INT REFERENCES users(user_id), 
    -- comment_id INT REFERENCES comments(comment_id), -- for replies, of course
    text VARCHAR(255),
    votes INT
);

CREATE TABLE votes (
    vote_id SERIAL PRIMARY KEY,
    poll_id INT REFERENCES polls(poll_id),
    user_id INT REFERENCES users(user_id),
    choice_id INT REFERENCES choices(choice_id)
); */
