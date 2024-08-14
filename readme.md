



Without Docker (local machine ) :
      in the server copy & paste the below env 
      npm i 
      npx prisma generate (will make all the tables sync )
      npm run dev
     -> backend is running on port 5000


    frontend -> 
      npm i 
      npm run dev


With Docker : 

backend -> 
   add a .env file and copy paste this :
       USER_ACCESS_SECRET=ankush
       DATABASE_URL="mongodb+srv://souvik3469:souvik3469@cluster0.j6tmyo5.mongodb.net/test1"

      Using  docker : 
              docker build -t server .
              docker run --name server -p 5000:5000 -d server
frontend -> 
       using docker:
            docker build -t client .
            docker run --name server -p 3000:3000 -d client


-> this will spin up the frontend and backend i tried to combine them in docker-compose but it didnt start something wrong with a binary fails the build .




Features : 

    1. I have used Context API for global state management and React Query ( auto refetching , custom caching reduces code complexity and a lot of things )
    2. I have added a json file for a list of products 
    3. All the functions like addtoCart () , remove from cart are written there and used everywhere in the codebase 
    4. I have saved the user's cart data into its local storage so that the state is saved 
              -> I have used key values to store each user to its cartitems []
                    for eg:  USERID : [{},{}] .... 

     5. So when the page firts render I have called a function which checks if the localstorage has any data with the current logged in User'ID
            -> if yes then it pulls the data and saves in the state 
            -> if not then it makes a  new entry with user id and empty cart 
            -> when he adds a item i am calling a funtion which syncs the cartitem with that .

      6. I have added filters:
              i) based on pricing
              ii) based on tags 
              iii) basded on  price high to low / low to high 
              iv) search functionality
        



















