INSERT INTO users(
  user_id, username, password
) VALUES
  (1, 'walnut', NULL),
  (2, 'love10', 'bothered'),
  (3, 'benny', NULL),
  (4, 'test', '1234');

INSERT INTO polls(
  poll_id, user_id, prompt
) VALUES
  (1, 1, 'Best programming language for games'),
  (2, 3, 'How would you feel if you didn''t have breakfast this morning?'),
  (3, 2, 'Rate ween'),
  (4, 1, 'President 2024'),
  (5, 1, 'Rank the 2D marios - no soup');

INSERT INTO topics(
  topic_id, name
) VALUES
  (1, 'politics'),
  (2, 'it make you go hmmm');

INSERT INTO choices(
  choice_id, poll_id, text, votes
) VALUES
  (1, 1, 'C', 20),
  (2, 1, 'C++', 32),
  (3, 1, 'C#', 200),
  (4, 1, 'Rust oh no no no 💀', 2),

  (5, 2, 'But I did eat breakfast this morning', 500),
  (6, 2, 'I didn''t', 1000),
  (7, 2, 'Hungry, tired', 1),

  (8, 3, '1', 1000),
  (9, 3, '2', 1),
  (10, 3, '3', 1),
  (11, 3, '4', 1),
  (12, 3, '5', 1),
  (13, 3, '6', 1),
  (14, 3, '7', 100),

  (15, 4, 'Doland Drumph', 1),
  (16, 4, 'Joe Brandon', 1),
  (17, 4, 'Leon Kenedy', 2),

  (18, 5, '1', 50),
  (19, 5, '2', 12),
  (20, 5, '3', 88),
  (21, 5, 'World', 70),
  (22, 5, 'Wonder', 100);
