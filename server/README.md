backend -> 
   add a .env file and copy paste this :
       USER_ACCESS_SECRET=ankush
       DATABASE_URL="mongodb+srv://souvik3469:souvik3469@cluster0.j6tmyo5.mongodb.net/test1"

      Using  docker : 
              docker build -t server .
              docker run --name server -p 5000:5000 -d server
     
