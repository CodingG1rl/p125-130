song1="";
song2="";
scoreLeftWrist = 0;
scoreRightWrist = 0;
rightWristX=0;
rightWristY=0;
leftWristX=0;
leftWristY=0;

function preload(){ 
    song1=loadSound("Let-it-go.mp3"); 
    song2=loadSound("River-flows-in-you.mp3");
    
}

function modelLoaded(){
    console.log('PoseNet is initialized');
}

function setup(){

    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreNose=results[0].pose.keypoints[8].score;
        console.log("scoreRightWrist="+scoreRightWrist+"scoreLeftWrist="+scoreLeftWrist);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

    }
}



function draw(){
    image(video,0,0,600,500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status== false){
            song1.play();
            document.getElementById("song").innerHTML="Playing - Let it go from Frozen"
        }
    }
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status== false){
            song2.play();
            document.getElementById("song").innerHTML="Playing - The river flows in you"
        }
    }
}