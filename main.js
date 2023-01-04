song="";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightwristX,rightwristY,20);
    if(rightwristY>0 && rightwristY<=100){
        document.getElementById("speed").innerHTML="Speed =  0.5x";
        song.rate(0.5);
    }
    else if(rightwristY>100 && rightwristY<=200){
        document.getElementById("speed").innerHTML="Speed =  1x";
        song.rate(1);
    }
    else if(rightwristY>200 && rightwristY<=300){
        document.getElementById("speed").innerHTML="Spedd =  1.5";
        song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400){
        document.getElementById("speed").innerHTML="Speed =  2x";
        song.rate(2);
    }
    else if(rightwristY>400 && rightwristY<=500){
        document.getElementById("speed").innerHTML="Speed =  2.5x";
        song.rate(2.5);
    }
    if(scoreleftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    InnumberleftwristY=Number(leftwristY);
    removedecimals=floor(InnumberleftwristY);
    volume=removedecimals/500;
    document.getElementById("volume").innerHTML="volume =  "+volume;
    song.setVolume(volume);
    }
    
}
function modelLoaded(){
    console.log("Posenet is intiatilized.");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.pause();
}
function gotPoses(results){
    if (results.length>0){

        console.log(results);
        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("score Leftwrist =  "+scoreleftwrist);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX = "+leftwristX+" leftwristY = "+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwristX = "+rightwristX+"rightwristY = "+rightwristY);
        
    }
    
}