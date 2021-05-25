song_1="";
song_2="";
lx="";
ly="";
rx="";
ry="";
left_score="";
song1_status="";
song2_status="";
function preload()
{
song_1=loadSound("runaway.mp3");
song_2=loadSound("conqueror.mp3");
}

function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',getPoses);
}

function modelLoaded()
{
    console.log("Posenet is intitialized");
}

function draw()
{
image(video,0,0,600,500)

song1_status=song_1.isPlaying();
song2_status=song_2.isPlaying();
fill('purple');
stroke('black');
if(left_score>0.2)
{
    circle(lx,ly,20);
    song_2.stop();
    if (song1_status==false)
    {
        song_1.play();
        document.getElementById("playing_music").innerHTML="Runaway"
    }
    
    
}
}

function pause()
{
    playing_music.pause();
}

function stop()
{
    playing_music.stop();
}

function getPoses(result)
{
if(result.length>0)
{
    console.log(result);
    lx=result[0].pose.leftWrist.x;
    rx=result[0].pose.rightWrist.x;
    ly=result[0].pose.leftWrist.y;
    ry=result[0].pose.rightWrist.y;
    console.log("lx: ",lx);
    console.log("rx: ",rx);
    console.log("ly: ",ly);
    console.log("ry: ",ry);
    left_score=result[0].pose.keypoints[9].score;
    console.log("left score is: ",left_score);
}
}

function play()
{
    playing_music.play();
    playing_music.volume(1);
    playing_music.speed(1);
}