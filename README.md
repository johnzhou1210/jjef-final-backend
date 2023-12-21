Backend Requirements

Database (PostgreSQL, Sequlize)
  1. Create 2 or more models, each with 2 or more fields

  > Entry model: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/models/entry.js#L4-L41
  
  > List model: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/models/list.js#L4-L21

  2. 2 or models should be associated with each other
  > Places where associations were created:

  > /dbSync: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L17-L18
  
  > /getList: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L154-L155
  
  > /getAllLists: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L127-L128

PI (Express, Sequelize, CRUD operations)
  1. Write routes to add new instances to each model

  > /createEntry: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L31-L41
  
  > /createList: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L212-L215

  2. Write routes that returns all instances from each model

  > /getAllEntries: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L25-L29

  > /getAllListsNoEntries: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L138-L141

  3. Write routes that return individual instances from each model based on their IDs

  > /getEntry/:entry_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L75-L92

  > /getListNoEntries/:list_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L143-L148

  4. Write routes to update instances in each model

  > /updateEntry/:entry_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L43-L73

  > /updateCurrentList/:list_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L179-L209

  5. Write routes to remove instances form each model, based on their IDs

  > /deleteEntry/:entry_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L94-L112

  > /deleteList/:list_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L217-L227
  
  6. Write a route that returns one instance from a model, and all instances associated with it in a different model

  > /getList/:list_id: https://github.com/johnzhou1210/jjef-final-backend/blob/e2ce5bfdedb84346050fac34519e059ad05d6a8f/index.js#L151-L163
