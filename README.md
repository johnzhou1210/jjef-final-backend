Backend Requirements

Database (PostgreSQL, Sequlize)
  1. Create 2 or more models, each with 2 or more fields
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/models/entry.js
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/models/list.js
  2. 2 or models should be associated with each other
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 16-21)
API (Express, Sequelize, CRUD operations)
  1. Write routes to add new instances to each model
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 31-38 and 212-215)
  2. Write routes that returns all instances from each model
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 25-29 and 126-135)
  3. Write routes that return individual instances from each model based on their IDs
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 76-92 and 152-163)
  4. Write routes to update instances in each model
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 50-73 and 179-186)
  5. Write routes to remove instances form each model, based on their IDs
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 95-112 and 218-227)
  6. Write a route that returns one instance from a model, and all instances associated with it in a different model
    https://github.com/johnzhou1210/jjef-final-backend/blob/main/index.js (lines 126-135)
