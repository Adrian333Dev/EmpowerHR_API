-- Active: 1708557140330@@127.0.0.1@5432@empower_hr_db@public
ALTER TABLE performance_reviews ADD CONSTRAINT rating_check CHECK (
  rating >= 0
  AND rating <= 5
);