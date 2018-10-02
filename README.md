#### Start application

1) Install dependencies

        npm install

2) Start mail catcher server (maildev)
    
        npm run start_mail_catcher_server
        
    Next you can open mail catcher server web interface. (localhost:1080)
        
3) Set up database
        
    - application was tested with postgres, but another sql database should work too
    - database details (host etc.) must be added to db config (./ormconfig.json)
        
4) Insert prepared fake data to database
    
        npm run seed
        
5) Start application server
        
        npm run start
        

#### Application can be tested with the help of postman collection, which is in data directory.
