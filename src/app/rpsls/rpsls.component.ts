import { Component } from '@angular/core';

@Component({
  selector: 'app-rpsls',
  templateUrl: './rpsls.component.html',
  styleUrls: ['./rpsls.component.css']
})
export class RpslsComponent {
  // var ele1 = document.getElementsByName("o1");
  // var ele2 = document.getElementsByName("o2");
  // var p1w = 0;
  // var p2w = 0;
  // var p1 = "a";
  // var p2 = "a";

  //Array of images
  imgArray = ["rock","paper","scissors","lizard","spock"]

  playerChoice = this.imgArray[0]
  opponentChoice = this.imgArray[0]
  result: string | boolean = ''
  pScore = 0
  oScore = 0

  // interactionArray = [
  //   ['rock', 'scissors'],
  //   ['rock', 'lizard'],
  //   ['scissors', 'lizard'],
  //   ['scissors', 'paper'],
  //   ['lizard', 'paper'],
  //   ['lizard', 'spock'],
  //   ['paper', 'spock'],
  //   ['paper', 'rock'],
  //   ['spock', 'scissors'],
  //   ['spock', 'rock'],
  // ]

  interactionObject = {
    'rock': ['scissors', 'lizard'],
    'scissors': ['lizard', 'paper'],
    'lizard': ['paper', 'spock'],
    'paper': ['spock', 'rock'],
    'spock': ['scissors', 'rock'],
  }

  bot = (arr: any) => {
    return arr[Math.trunc(Math.random() * 5)]
  }

  selection = (img: any) => {
    this.playerChoice = img
    this.opponentChoice = this.bot(this.imgArray)
    this.result = this.calculate(this.playerChoice, this.opponentChoice)
    console.log(this.playerChoice, this.opponentChoice, this.result, this.pScore, this.oScore)
  }

  calculate(p1: string, p2: string) {
    // console.log(p1, p2)
    if(p1 == p2)
      return 'draw'
    else if (this.interactionObject[p1 as keyof typeof this.interactionObject].includes(p2)) {
      this.pScore++
      return 'player wins'
    }
    else {
      this.oScore++
      return 'bot wins'
    }
  }

  // function displayRadioValue1() {
  //   for (i = 0; i < ele1.length; i++) {
  //     if (ele1[i].checked) {
  //       p1 = i;
  //       document.getElementById("player1").innerHTML =
  //         "Choice: " + ele1[i].value;
  //       document.getElementById("r1").src = imgArray[i].src;
  //       return ele1[i].value;
  //     }
  //   }
  // }

  // function displayRadioValue2() {
  //   for (i = 0; i < ele2.length; i++) {
  //     if (ele2[i].checked) {
  //       p2 = i;
  //       document.getElementById("player2").innerHTML =
  //         "Choice: " + ele2[i].value;
  //       return ele2[i].value;
  //     }
  //   }
  // }
  // function show_image(src, width, height, alt) {
  //   var img = document.createElement("img");
  //   img.src = src;
  //   img.width = width;
  //   img.height = height;
  //   img.alt = alt;

  //   // This next line will just add it to the <body> tag
  //   document.body.appendChild(img);
  // }
  // function get_image1() {
  //   show_image(imgArray[p1].src, 276, 110, "noting");
  // }
  // function get_image2() {
  //   show_image(imgArray[p2].src, 276, 110, "noting");
  // }
  // function calculate() {
  //   if (
  //     (ele1[p1].value === "s" && ele2[p2].value === "p") ||
  //     (ele1[p1].value === "p" && ele2[p2].value === "r") ||
  //     (ele1[p1].value === "r" && ele2[p2].value === "l") ||
  //     (ele1[p1].value === "l" && ele2[p2].value === "S") ||
  //     (ele1[p1].value === "s" && ele2[p2].value === "s") ||
  //     (ele1[p1].value === "s" && ele2[p2].value === "l") ||
  //     (ele1[p1].value === "l" && ele2[p2].value === "p") ||
  //     (ele1[p1].value === "p" && ele2[p2].value === "S") ||
  //     (ele1[p1].value === "s" && ele2[p2].value === "r") ||
  //     (ele1[p1].value === "r" && ele2[p2].value === "s")
  //   ) {
  //     // user 1 won
  //     p1w += 1;
  //     document.getElementById("result").innerHTML = "Player 1 Wins";
  //   } else if (
  //     (ele1[p1].value === "r" && ele2[p2].value === "r") ||
  //     (ele1[p1].value === "s" && ele2[p2].value === "s") ||
  //     (ele1[p1].value === "p" && ele2[p2].value === "p") ||
  //     (ele1[p1].value === "l" && ele2[p2].value === "l") ||
  //     (ele1[p1].value === "s" && ele2[p2].value === "S")
  //   ) {
  //     // tie, s one won.
  //     document.getElementById("result").innerHTML = "Tie";
  //   } else {
  //     // user 2 won.
  //     p2w += 1;
  //     document.getElementById("result").innerHTML = "Player 2 wins";
  //   }
  //   document.getElementById("result2").innerHTML = "Player 2 wins";
  // }
}
