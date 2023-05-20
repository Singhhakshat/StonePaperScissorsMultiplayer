    function start(){
      const user = document.getElementById('u-name').value;
      const round = document.getElementById('round');
      const container = document.getElementById('container');
      document.getElementById('data').style.display = "none";
      let enable = 'yes';

      console.log(user);
      if(user == ""){
        alert('Please enter a value');
      }
      else{
        container.style.display = "flex";

        const socket = io('https://spc-serv.onrender.com'); // Replace with your server URL

        socket.on('connect', () => {
          console.log('Connected to server');
          socket.emit('user-name', user);
        });

        socket.on('round' , (data) =>{
          round.innerHTML = `Round - ${data}`;
        });

        socket.on('opponent', (data) =>{
          document.getElementById('opponent').innerHTML = `Playing against ${data}`;
        })

        socket.on('result', (data) =>{
          alert(data);
          enable = 'yes';
        })

        socket.on('final', (data) =>{
          alert(data);
        })

        document.getElementById('stone').addEventListener('click', () => {
          if(enable=='yes'){
            socket.emit('move', 'stone');
            enable ='no';
            console.log('stone');
          }
        });
        
        document.getElementById('paper').addEventListener('click', () => {
          if(enable=='yes'){
            socket.emit('move', 'paper');
            enable = 'no';
            console.log('paper');
          }
        });
        
        document.getElementById('scissors').addEventListener('click', () => {
          if(enable=='yes'){
            socket.emit('move', 'scissors');
            enable = 'no';
            console.log('scissors');
          }
        });

        socket.on('disconnect', () => {
          console.log('Disconnected from server');
        });
      }
    }