---

# Boas vindas ao repositório do CRUD-SEQUELIZE

#### O signifcado de CRUD é Create, Read, Update and Delete...

---

#### Routes:


# POST

#### https://localhost:{port}/register

###     body: {
#####       "username": "otavio", 
#####       "email": "otavio@gmail.com", 
#####       "password":"123123"       
###     }

# POST

#### https://localhost:{port}/login

###     body: {
#####       "email": "otavio@gmail.com", 
#####       "password":"123123"       
###     }

# GET

#### https://localhost:{port}/my-account

###     headers: {
#####       "session_id ": "oasiDASUuWQ_231!", 
###     }

# PATCH

#### https://localhost:{port}/update-name

###     headers: {
#####       "session_id ": "oasiDASUuWQ_231!", 
###     }

###     body: {
#####       "new_name": "otavio bueno", 
###     }


# DELETE

#### https://localhost:{port}/delete

###     headers: {
#####       "session_id ": "oasiDASUuWQ_231!", 
###     }

###     body: {
#####       "password":"123123"       
###   }
---
  
