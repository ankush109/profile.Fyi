How to start :

1.  docker compose build
2.  docker compose up

(ps:I have used mongo atlass URL in the docker compose file as the mongo Image was having issue !)

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
