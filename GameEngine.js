//Begins all Game engine functions
function GameStart() {
  console.log('work in progress')
  if (IsHost) {
    socket.emit('SendGameData', 'Night', NightShift)
    GameTime = setInterval(() => {
      ShiftTime += 1
      socket.emit('SendGameData', 'ShiftTime', ShiftTime)
      if (ShiftTime == 6) {
        GameEnd('Win')
      }
    }, 60000)
    AllTimers.push(GameTime)
  }
  OfficePowerDrain = setInterval(() => {
    Power -= PowerUsage
    if (Power <= 0) {
      GameEnd('Loss')
    }
  }, 1000)
  AllTimers.push(OfficePowerDrain)
  socket.emit('NightSettings', NightShift)
  theOffice.hidden = false
  Invis1.hidden = false
  Invis2.hidden = false
  LeftDoorDiv.hidden = false
  RightDoorDiv.hidden = false
  //The next part gives the offices their specifc values needed for their functions
  if (Office == 'Office1') {
    alert('Have fun with this office')
    Office2ShockActive = true
    Office2FlashActive = true
    Office3DoorsActive = true
    Office3HeatActive = true
    BoxTime = 10
    BoxTimer = setInterval(() => {
      BoxTime -= 1
      if (BoxTime <= 0) {
        GameEnd('Loss')
      }
    }, 7000)
    AllTimers.push(BoxTimer)
  }
  if (Office == 'Office2') {
    Office2ShockActive = true
    Office2FlashActive = true
    ShockCharge = false
    ShockTimer = 5000
    FlashCharge = false
    FlashTimer = 5000
  }
  if (Office == 'Office3') {
    var Office3DoorsActive = true
    Office3HeatActive = true
    Office2LeftDoor = false
    Office2RightDoor = false
    Office3LeftDoor = false
    Office3RightDoor = false
    Office4LeftDoor = false
    Office4RightDoor = false
    Office1Heat = 20
    Office1Fan = false
    Office2Heat = 20
    Office2Fan = false
    Office3Heat = 20
    Office3Fan = false
    Office4Heat = 20
    Office4Fan = false
  }
  if (Office == 'Office4') {
    Power = 3000
    Office1Power = 1000
    Office1Recieving = false
    Office2Power = 1000
    Office2Recieving = false
    Office3Power = 1000
    Office3Recieving = false
  }
  //reveals/Creates basic values for each office
  let i = Offices[Office]
  if (i.HasCameras) {
    let img = document.createElement("img")
    img.src = 'Assests/StaticScreen.jpeg'
    img.style.position = 'fixed'
    img.style.left = '0px'
    img.style.top = '0px'
    img.style.height = '791px'
    img.style.width = '1424px'
    img.hidden = true
    img.id = 'CameraStaticGIF'
    DivTrigger.appendChild(img)
    let img1 = document.createElement("img")
    img1.src = ''
    img1.style.position = 'fixed'
    img1.style.left = '0px'
    img1.style.top = '0px'
    img1.style.height = '791px'
    img1.style.width = '1424px'
    img1.hidden = true
    img1.id = 'CameraView'
    DivTrigger.appendChild(img1)
    CameraView = document.getElementById('CameraView')
    CameraStatic = document.getElementById('CameraStaticGIf')
  }
  if (i.HasDoors) {
    let img = document.createElement("img")
    img.src = 'Assests/LeftDoor.png'
    img.style.height = '647px'
    LeftDoorDiv.appendChild(img)
    let img1 = document.createElement("img")
    img1.src = 'Assests/RightDoor.png'
    img1.style.height = '647px'
    RightDoorDiv.appendChild(img1)
  }
  if (i.suit) {
    
  }
  if (i.BoxAnimatronic) {
    
  }
  if (i.SystemReset) {
    
  }
  if (i.DoorControl) {
    
  }
  if (i.PowerControl) {
    
  }
  if (i.HeatControl) {
    
  }
  if (i.LightControl) {
    
  }
  if (i.ShockControl) {
    
  }
}

//Pauses Game
function GamePause() {
  
}

//Ends all Game engine functions
function GameEnd(condition) {
  Power = 1000
  if (!leftDoor) {
    ControlDoor('left')
  }
  PowerUsage = 1
  theOffice.hidden = true
  Invis1.hidden = true
  Invis2.hidden = true
  LeftDoorDiv.hidden = true
  RightDoorDiv.hidden = true
  CamSuitTrig.hidden = true
  for (i in AllTimers) {
    clearInterval(AllTimers[i])
  }
  //next determines what the condition for the game ending was
  if (condition == 'Loss') {
    alert('Congratulations, Your a loser')
  }
  if (condition == 'Win') {
    alert('Congratulations, you won')
  }
  console.log('Are you the one that ruined it for everyone?')
}

//This will help control what audio plays and stops when
function AudioContoll(e) {
  if (!GameMute) {
    
  }
}

//Function for the trigger
function TriggerFunction() {
  if (Offices[Office].HasCameras) {
    if(CameraView.hidden = true) {
      CameraView.hidden = false
      CameraStatic.hidden = false
    } else {
      CameraView.hidden = true
      CameraStatic.hidden = true
    }
  }
}

//Will move the corresponding animatronic
function MoveAnimatronic(Animatronic) {
  if (Animatronic.Room in Animatronic.Path) {
    //Will remove animatronic name from room placement list
    let e = RoomPlacement['Cam' + Animatronic.Room].indexOf(Animatronic.Name)
    RoomPlacement['Cam' + Animatronic.Room].splice(e)
    if (Animatronic.Path[Animatronic.Room].length <= 1) {
      Animatronic.Room = Animatronic.Path[Animatronic.Room]
    } else {
      // adds animatronic to room placement list
      let i = Math.floor(Math.random() * Animatronic.Path[Animatronic.Room].length)
      Animatronic.Room = Animatronic.Path[Animatronic.Room][i]
    }
    RoomPlacement['Cam' + Animatronic.Room].push(Animatronic.Name)
    SendData('moveAnimatronic', Animatronic, Animatronic.Room)
  }
}

//The things below are temporary and will be improved and change
var movescreen = 0
function TurnScreen(direction) {
  if (direction.type == 'mouseleave') {
    movescreen = 0
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject2' && ((theOffice.style.right.replace('px', '')) - '') + 1 >= -2950) {
    movescreen = -1
    LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') + 1) + 'px'
    RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') - 1) + 'px'
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') - 1) + 'px'
  }
  if (direction.type == 'mouseenter' && direction.target.id == 'ivisObeject1' && ((theOffice.style.right.replace('px', '')) - '') - 1 <= 0) {
    movescreen = 1
    LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - 1) + 'px'
    RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + 1) + 'px'
    theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + 1) + 'px'
  }
}
function checkScreen() {
  if (((theOffice.style.right.replace('px', '')) - '') >= 0) {
    movescreen = 0
  }
  if (((theOffice.style.right.replace('px', '')) - '') <= -2490) {
    movescreen = 0
  }
  LeftDoorDiv.style.left = (((LeftDoorDiv.style.left.replace('px', '')) - '') - movescreen) + 'px'
  RightDoorDiv.style.right = (((RightDoorDiv.style.right.replace('px', '')) - '') + movescreen) + 'px'
  theOffice.style.right = (((theOffice.style.right.replace('px', '')) - '') + movescreen) + 'px'
  if ((theOffice.style.right.replace('px', '')) - '' <= -2000)  {
    CamSuitTrig.hidden = false
  } else {
    CamSuitTrig.hidden = true
  };
};

setInterval(() => {
  checkScreen()
}, 1)

Invis1.onmouseenter = TurnScreen
Invis1.onmouseleave = TurnScreen
Invis2.onmouseenter = TurnScreen
Invis2.onmouseleave = TurnScreen
//it ends at this point

//This opens and closes the doors
function ControlDoor(Door) {
  if (Door == 'left') {
    var move = 0
    LeftValue = (LeftDoorDiv.style.width.replace('px', '')) - ''
    if (LeftValue > 1) {
      move = -209
      leftDoor = true
      PowerUsage += 1
    } else {
      move = 209
      leftDoor = false
      PowerUsage -= 1
    }
    LeftDoorDiv.style.width = (LeftValue + move) + 'px'
  }
  if (Door == 'right') {
    var move = 0
    RightValue = (RightDoorDiv.style.width.replace('px', '')) - ''
    if (RightValue > 1) {
      move = -209
      rightDoor = true
      PowerUsage += 1
    } else {
      move = 209
      rightDoor = false
      PowerUsage -= 1
    }
    RightDoorDiv.style.width = (RightValue + move) + 'px'
  }
}