DROP SCHEMA IF EXISTS main cascade;
CREATE SCHEMA main;

CREATE TABLE main.tree (
    tree_id SERIAL PRIMARY KEY,
    tree_color INT NOT NULL,
    tree_x INT NOT NULL,
    tree_y INT NOT NULL,
    tree_height INT NOT NULL
);

CREATE TABLE main.monkey (
    monkey_id SERIAL PRIMARY KEY,
    tree_id INT REFERENCES main.tree(tree_id),
    monkey_color INT NOT NULL,
    monkey_climb_height INT NOT NULL
);

--ONE TO MANY EXAMPLE
-- CREATE TABLE main.tree_monkeys (
--     tree_monkey_id SERIAL PRIMARY KEY,
--     tree_id INT REFERENCES main.trees(tree_id),
--     monkey_id INT REFERENCES main.monkeys(monkey_id),
--     event_desc VARCHAR(255)
-- );