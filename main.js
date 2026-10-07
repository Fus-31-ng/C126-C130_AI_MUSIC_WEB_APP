song1 = "";
song2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1Status = "";

function preload() {
    song1 = loadSound("Jurassic Park.mp3");
    song2 = loadSound("Star Wars - Imperial March.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(650, 280);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is Initialized");
}

function draw() {
    image(video, 0, 0, 600, 500);

fill("#FF0000");
    stroke("#FF0000");


    song1Status = song1.isPlaying();


    if (scoreLeftWrist > 0.2) {


        circle(leftWristX, leftWristY, 20);


        song2.stop();


        if (song1Status == false) {
            song1.play();


            document.getElementById("name").innerHTML = "Jurassic Park";
        }
    }


    if (scoreRightWrist > 0.2) {


        circle(rightWristX, rightWristY, 20);


        song1.stop();

  
        if (song2.isPlaying() == false) {
            song2.play();


            document.getElementById("name").innerHTML =
                "Star Wars - Imperial March";
        }
    }
}

function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;


        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log(
            "leftWristX = " +
            leftWristX +
            " LeftWristY = " +
            leftWristY
        );

        console.log(
            "scoreLeftWrist = " +
            scoreLeftWrist
        );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log(
            "rightWristX = " +
            rightWristX +
            " rightWristY = " +
            rightWristY
        );

        console.log(
            "scoreRightWrist = " +
            scoreRightWrist
        );
    }
}