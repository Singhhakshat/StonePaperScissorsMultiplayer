    // function start(){
    //   const user = document.getElementById('u-name').value;
    //   const room = document.getElementById('r-name').value;
    //   const round = document.getElementById('round');
    //   const container = document.getElementById('container');
    //   let enable = 'yes';

    //   console.log(user);
    //   if(user == "" || room == ""){
    //     alert('Please enter a value');
    //   }
    //   else{
    //     document.getElementById('data').style.display = "none";
    //     container.style.display = "flex";

    //     const socket = io('https://spc-serv.onrender.com'); // Replace with your server URL
          
    //     socket.on('connect', () => {
    //       console.log('Connected to server');
    //       socket.emit('user-name', user);
    //       socket.emit('room-name', room);
    //     });

    //     socket.on('round' , (data) =>{
    //       round.innerHTML = `Round - ${data}`;
    //     });

    //     socket.on('opponent', (data) =>{
    //       document.getElementById('opponent').innerHTML = `Playing against ${data}`;
    //     })

    //     socket.on('result', (data) =>{
    //       document.getElementById('stone').style.border = "none";
    //       document.getElementById('paper').style.border = "none";
    //       document.getElementById('scissors').style.border = "none";
    //       roundResult(data);
    //       enable = 'yes';
    //     })

    //     socket.on('final', (data) =>{
    //       alert(data);
    //     })

    //     document.getElementById('stone').addEventListener('click', () => {
    //       document.getElementById('stone').style.border = "5px solid black";
    //       if(enable=='yes'){
    //         socket.emit('move', 'stone');
    //         enable ='no';
    //         console.log('stone');
    //       }
    //     });
        
    //     document.getElementById('paper').addEventListener('click', () => {
    //       document.getElementById('paper').style.border = "5px solid black";
    //       if(enable=='yes'){
    //         socket.emit('move', 'paper');
    //         enable = 'no';
    //         console.log('paper');
    //       }
    //     });
        
    //     document.getElementById('scissors').addEventListener('click', () => {
    //       document.getElementById('scissors').style.border = "5px solid black";
    //       if(enable=='yes'){
    //         socket.emit('move', 'scissors');
    //         enable = 'no';
    //         console.log('scissors');
    //       }
    //     });

    //     socket.on('disconnect', () => {
    //       console.log('Disconnected from server');
    //     });
    //   }
    // }

    // function roundResult(data){
    //   document.getElementById('container').style.display = "none";
    //   document.getElementById('round-result').style.display = "flex";
    //   if(data){
    //     document.getElementById('r-res-text').innerHTML = `You have won this round`;
    //   }
    //   else{
    //     document.getElementById('r-res-text').innerHTML = `OOPS! You lost this round`;
    //   }
    // }

    // function nextRound(){
    //   document.getElementById('container').style.display = "flex";
    //   document.getElementById('round-result').style.display = "none";
    // }

    function start(){
      const user = document.getElementById('u-name').value;
      const room = document.getElementById('r-name').value;
      const round = document.getElementById('round');
      const container = document.getElementById('container');

      const rock = './media/rock.jpeg';
      const paper = './media/paper.jpeg';
      const scissors = './media/scissors.jpeg';
      let myChoice;

      let opponentt;

      if(user == "" || room == ""){
        alert('Please enter a value');
      }
      else{

        document.getElementById('formm').style.display = "none";
        document.getElementById('playButton').style.display = "block";
        document.getElementById('btn').disabled = true;
        document.getElementById('btn').innerHTML = 'waiting for other player..';
        const socket = io('https://spc-mul.vercel.app/'); // Replace with your server URL
          
        socket.on('connect', () => {
          console.log('Connected to server');
          socket.emit('join-room', room);

        });

        socket.on('start', (val)=>{
          document.getElementById('btn').innerHTML = 'Play!';
          document.getElementById('btn').disabled = val;
          socket.emit('user-name', user);
        });

        socket.on('opponent', (opponent)=>{
          document.getElementById('opponent').innerHTML=`Playing against ${opponent}`;
          opponentt = opponent;
        });

        socket.on('round', (val)=>{
          document.getElementById('round').innerHTML=`Round ${val}`;
        });

        socket.on('tie', (val)=>{
          console.log('result recieved');

          if(myChoice == 'rock'){
            document.getElementById('my-img').src = rock;
            document.getElementById('opp-img').src = rock;
          }
          else if(myChoice == 'paper'){
            document.getElementById('my-img').src = paper;
            document.getElementById('opp-img').src = paper;
          }
          else{
            document.getElementById('my-img').src = scissors;
            document.getElementById('opp-img').src = scissors;
          }

          document.getElementById('container').style.display = 'none';
          document.getElementById('round-result').style.display = 'flex';

          document.getElementById('r-res-text').innerHTML = `It's a Tie!!`;
          
        });

        socket.on('round-result', (result)=>{
          console.log('result recieved');

          // document.getElementById('r-res-text').innerHTML = ((result)? `You won this round`: `opponent won this roound`);

          if(result===true){
            document.getElementById('r-res-text').innerHTML = `${user} Won this round!!`;

            if(myChoice == 'rock'){
              document.getElementById('my-img').src = rock;
              document.getElementById('opp-img').src = scissors;
            }
            else if(myChoice == 'paper'){
              document.getElementById('my-img').src = paper;
              document.getElementById('opp-img').src = rock;
            }
            else{
              document.getElementById('my-img').src = scissors;
              document.getElementById('opp-img').src = paper;
            }
          }
          else{
            document.getElementById('r-res-text').innerHTML = `${opponentt} Won this round!!`;

            if(myChoice == 'rock'){
              document.getElementById('my-img').src = rock;
              document.getElementById('opp-img').src = paper;
            }
            else if(myChoice == 'paper'){
              document.getElementById('my-img').src = paper;
              document.getElementById('opp-img').src = scissors;
            }
            else{
              document.getElementById('my-img').src = scissors;
              document.getElementById('opp-img').src = rock;
            }
          }
          
          document.getElementById('container').style.display = 'none';
          document.getElementById('round-result').style.display = 'flex';
        });

        socket.on('final', (res)=>{
          console.log('final result');
          document.getElementById('container').style.display = 'none';
          document.getElementById('final-result').style.display = 'flex';


          if(res===true){
            document.getElementById('fr-text').innerHTML = `${user} Is the Winner!!`;
            document.getElementById('fr-img').src = `https://media.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif`;
          }
          else{
            document.getElementById('fr-text').innerHTML = `${opponentt} Is the Winner!!`;
            document.getElementById('fr-img').src =  `https://media.giphy.com/media/JYZ397GsFrFtu/giphy.gif`;
          }
        });

        document.getElementById('restart-button').addEventListener('click', () => {
          document.getElementById('final-result').style.display = 'none';
          document.getElementById('data').style.display = 'block';
          document.getElementById('formm').style.display = 'none';
          socket.emit('reset', 'reset');
          document.getElementById('stone').style.border = 'none';
          document.getElementById('paper').style.border = 'none';
          document.getElementById('scissors').style.border = 'none';
        });


                document.getElementById('stone').addEventListener('click', () => {
                document.getElementById('stone').style.border = "5px solid black";
                  socket.emit('move', 'stone');
                  myChoice = 'rock';
                  console.log('stone');
              });
              
              document.getElementById('paper').addEventListener('click', () => {
                document.getElementById('paper').style.border = "5px solid black";
                  socket.emit('move', 'paper');
                  myChoice = 'paper';
                  console.log('paper');
              });
              
              document.getElementById('scissors').addEventListener('click', () => {
                document.getElementById('scissors').style.border = "5px solid black";
                  socket.emit('move', 'scissors');
                  myChoice = 'scissors';
                  console.log('scissors');
              });

        socket.on('disconnect', () => {
          console.log('Disconnected from server');
          alert('disconnected from server');
        });
      }
    }

    function play(){
      document.getElementById('data').style.display = "none";
      document.getElementById('container').style.display = "flex";
    }

    function nextRound(){
      document.getElementById('round-result').style.display='none';
      document.getElementById('container').style.display='flex';
      document.getElementById('stone').style.border = 'none';
      document.getElementById('paper').style.border = 'none';
      document.getElementById('scissors').style.border = 'none';
    }