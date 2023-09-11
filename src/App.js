import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import { green, blue } from "@mui/material/colors";

import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";

import { numGuessAreaRows, numGuessAreaColumns } from "./utils/sizes";
import boxStyleVariants from "./utils/keyboardAndGuessAreaBoxTypes";

const ListOfWords = require("./utils/fiveLetterWords.json");

// Logic for grid
const randomIndex = Math.floor(Math.random() * ListOfWords.words.length);
//const answer = ListOfWords.words[randomIndex];
const answer = 'mmang';

let letterUsedNoMatch = [];
console.log (answer);

let saveAll;

// =====================================================================================================================
// Main App 
function App() {
const KeysRow1 = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M",];

const KeysRow2 = ["Q","W","E","R","T","Y","U","I","O","P"];
const KeysRow3 = ["S","D","F","G","H","J","K","L"];
const KeysRow4 = ["Z","X","C","V","B","N","M",];

  const initialKeyBoard = () => {
    let keys = KeysRow1.map((letter) => ({
      ...boxStyleVariants.keyboardUnusedKey,
      letter: letter,
    }));
    const backspaceKey = {
      ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
      width: 90,
      letter: "Delete",
      isBackspaceKey: true,
    };
    const enterKey = {
      ...boxStyleVariants.keyboardUnusedKey,
      width: 90,
      letter: "Enter",
      isEnterKey: true,
    };
    //keys.unshift(backspaceKey);

    keys = [...keys.slice(0, 19), backspaceKey, ...keys.slice(19)];
    keys.push(enterKey);
    return keys;
  };
  
  // ++++++++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox));
  const [activeRowIdx, setActiveRowIdx] = useState(0); // the index of the first letter that gets added to the active row.
  const [keyboard, setKeyboard] = useState(initialKeyBoard);
  
  const [completedRows, setCompletedRows] = useState([])
  const [remainingRows, setRemainingRows] = useState(new Array((numGuessAreaRows - 1) * numGuessAreaColumns).fill(boxStyleVariants.blankBox));
  
  const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

  // Keyboard Callbacks
  const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {
    // Print current key

    if (activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
      return; // activeRow is empty as such, there are no letters to erase.
    }

    if (attrsOfKeyThatUserClicked.isBackspaceKey) {
      const newActiveRow = activeRow.slice();
      newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
      setActiveRow(newActiveRow);
      setActiveRowIdx(activeRowIdx - 1);
      //letterUsedNoMatch.pop();
      return;
    }

    if (activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) {
      // evaluate user's work that is now in activeRow. The feedback boxes get
      // stored in a 5-element array and get pushed into the completedRows.
      // the activeRow gets reset to 5 blank boxes.
      // the number of elements in remainingRows gets reduced by 5.
      // if the remainingRows is empty, game is over. Display a message in the
      // message center.
      if (remainingRows.length <= 0 && completedRows.length === 25) {
        console.log('No More Spaces Left');
        return;
      }


      // Get the input word and checks if the word is in the json file.
      let inputWordToCompare = [];
      let inputWordToFind = ''
      activeRow.forEach((inActiveRow, index) => {
        inputWordToCompare.push(inActiveRow.letter.toLowerCase());
        inputWordToFind += inActiveRow.letter.toLowerCase();
      });
      console.log(inputWordToFind);
      if (!ListOfWords.words.includes(inputWordToFind)) {
        console.log("No valid Word");
        //return;
      }

      // Gets the answer to compare.
      let answerForCompare = [];
      for (let i = 0; i < answer.length; i++) {
        answerForCompare.push(answer.charAt(i));
      }

      // ++++++++++++++++++++++++++++++++++++++++++++++++
      // Compare the answer and the input.
      // Check for correct character in position.
      const tempRow = activeRow.slice();
      for (let index = 0; index < answerForCompare.length; index++) {
        for (let indexy = 0; indexy < inputWordToCompare.length; indexy++) {
          if (answerForCompare[indexy] === inputWordToCompare[index]){
            tempRow[index] = {...boxStyleVariants.partialMatch, letter: inputWordToCompare[index],};
          }
          
        }
      }
      // Correct position.
      for (let index = 0; index <inputWordToCompare.length; index++) {
        let winCount = 0;
        if (answerForCompare[index] === inputWordToCompare[index]) {
          tempRow[index] = {...boxStyleVariants.exactMatch, letter: inputWordToCompare[index],};
          winCount++;
          if (winCount > 4){  // Win condition
            console.log("Win");
            return;
          }
        }
      }
      for (let index = 0; index <inputWordToCompare.length; index++) { // No match
        if (tempRow[index].backgroundColor === boxStyleVariants.blankBox.backgroundColor) {
          tempRow[index] = {...boxStyleVariants.noMatch, letter: inputWordToCompare[index].toUpperCase(),};
          letterUsedNoMatch.push(tempRow[index])
        }
      }

      let tempkeyboard = keyboard;
      for (let x = 0; x < letterUsedNoMatch.length; x++){
        for (let Y = 0; Y < tempkeyboard.length; Y++) {
          if (letterUsedNoMatch[x].letter ===  tempkeyboard[Y].letter){
            tempkeyboard[Y] = {...boxStyleVariants.noMatch, letter: letterUsedNoMatch[x].letter.toUpperCase()};
          } 
        }
      }
      letterUsedNoMatch = [];
      setKeyboard(tempkeyboard);

      // Change to the next row.
      // Add the active line to completedRrow
      tempRow.forEach((element)=> {
        element.letter = element.letter.toUpperCase();
        completedRows.push(element);
      })

      // Takes 5 from remaining rows
      for (let i = 0; i < 5; i++) {
        remainingRows.shift();
      }

      const newActiveRow = new Array(numGuessAreaColumns).fill(boxStyleVariants.notEvaluated);
      setActiveRow(newActiveRow);
      setActiveRowIdx(0); // Reset the column index to the first column.
      return;

      
    } // End of activeRowIdx === numGuessAreaColumns


    // ignore the enter key as there are not enough letters in activeRow
    if (attrsOfKeyThatUserClicked.isEnterKey) {
      return;
    }
    
    // activeRow is already full.
    if (activeRowIdx === numGuessAreaColumns) {
      return;
    }

    const newActiveRow = activeRow.slice();
    newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
    setActiveRow(newActiveRow);
    setActiveRowIdx(activeRowIdx + 1);
    //letterUsedNoMatch.push(attrsOfKeyThatUserClicked);
    // console.log(JSON.stringify(activeRow));
};


  return (
    <Fragment>
      <Box
        margin="auto"
        sx={{
          height: 1600,
          width: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-top ",
          alignItems: 'center',
        }}
      >
        <TopBanner />
        <GuessArea guessAreaBoxes={allBoxes} />
        <MessageCenter />
        <Keyboard
          keyboard={keyboard}
          onClickCallback={keyboardKeyPressedCallBack}
        />
      </Box>
    </Fragment>
  );
}

export default App;
